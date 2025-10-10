<script lang="ts">
	import type { BaseItem, KeyPressedActions, SearchComboboxProps } from './SearchCombobox.types';

	let {
		items = $bindable([]),
		placeholder,
		showList = $bindable(false),
		inputValue = $bindable(''),
		onPressEnter,
		onKeyDown,
		onSelect,
		children
	}: SearchComboboxProps<any> = $props();

	let focusedItemIndex = $state<number | null>(null);

	$effect(() => {
		if (items) {
			focusedItemIndex = 0;
		}
	});

	const unfocusedItemKeyPressedActions: KeyPressedActions = new Map([
		[
			'ArrowDown',
			() => {
				focusedItemIndex = 0;
			}
		],
		[
			'ArrowUp',
			() => {
				focusedItemIndex = items.length - 1;
			}
		],
		[
			'Enter',
			() => {
				if (items.length > 0) {
					focusedItemIndex = 0;
					return;
				}
				choose(items[focusedItemIndex as number]);
				onPressEnter?.(inputValue);
			}
		]
	]);

	const focusedItemKeyPressedActions: KeyPressedActions = new Map([
		[
			'ArrowDown',
			() => {
				focusedItemIndex = ((focusedItemIndex as number) + 1) % items.length;
			}
		],
		[
			'ArrowUp',
			() => {
				focusedItemIndex = ((focusedItemIndex as number) - 1 + items.length) % items.length;
			}
		],
		[
			'Enter',
			() => {
				choose(items[focusedItemIndex as number]);
				onPressEnter?.(inputValue);
			}
		]
	]);

	function debounce(func: Function, delay: number) {
		let timeout: NodeJS.Timeout;
		return (...args: any[]) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => func(...args), delay);
		};
	}

	function handleKey(event: KeyboardEvent) {
		showList = true;
		const keyPressedActions =
			focusedItemIndex === null ? unfocusedItemKeyPressedActions : focusedItemKeyPressedActions;

		keyPressedActions.get(event.key)?.();
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			return;
		}

		debounce(() => onKeyDown?.(inputValue), 300)();
	}

	function choose(item: BaseItem) {
		inputValue = item.name;
		showList = false;
		focusedItemIndex = null;
		inputRef?.blur();
		onSelect?.(item);
	}

	let inputRef: HTMLInputElement;

	function handleUnfocus() {
		focusedItemIndex = null;
		showList = false;
	}
</script>

<div class="combo" role="presentation" onfocusout={handleUnfocus} aria-label="Search Combobox">
	<input
		type="text"
		bind:value={inputValue}
		bind:this={inputRef}
		{placeholder}
		onkeydown={handleKey}
		onfocus={() => (showList = true)}
		role="combobox"
		aria-autocomplete="list"
		aria-expanded={showList}
		aria-controls="search-list"
		aria-activedescendant={focusedItemIndex !== null ? `option-${focusedItemIndex}` : undefined}
	/>

	{#if showList && items.length > 0}
		<ul id="search-list" role="listbox">
			{#each items as item, i}
				<li
					role="option"
					aria-selected={focusedItemIndex === i}
					class:selected={focusedItemIndex === i}
					onmousedown={() => choose(item)}
				>
					{@render children(item)}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.combo {
		position: relative;
		width: 580px;
		max-width: 100%;
	}

	input {
		width: 100%;
		height: 54px;
		padding: 0 24px;
		font-size: 16px;
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-full);
		outline: none;
		transition: all 0.2s ease;
		background: var(--glass);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		color: var(--text);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
	}

	input::placeholder {
		color: var(--text);
		opacity: 0.5;
	}

	input:focus {
		background: var(--glass-hover);
		border-color: var(--border-hover);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
	}

	ul {
		position: absolute;
		z-index: 100;
		background: rgba(28, 38, 56, 0.95);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-md);
		list-style: none;
		margin: 12px 0 0;
		padding: 8px;
		width: 100%;
		max-height: 380px;
		overflow-y: auto;
		box-shadow:
			0 4px 6px rgba(0, 0, 0, 0.1),
			0 20px 40px rgba(0, 0, 0, 0.3);
	}

	li {
		padding: 10px 14px;
		cursor: pointer;
		transition: all 0.15s ease;
		color: var(--text);
		border-radius: var(--radius-sm);
		margin: 2px 0;
	}

	li:hover {
		background: rgba(255, 255, 255, 0.06);
	}

	li.selected {
		background: rgba(248, 186, 136, 0.12);
	}

	li.selected:hover {
		background: rgba(248, 186, 136, 0.16);
	}
</style>
