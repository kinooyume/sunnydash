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

	// NOTE: Asuming that focusedItemIndex is not null
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

	// debounce handleKey
	//
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

	// unfocus on click

	let inputRef: HTMLInputElement;

	function handleUnfocus() {
		focusedItemIndex = null;
		showList = false;
	}
</script>

<div
	class="combo"
	role="presentation"
	onfocusout={handleUnfocus}
	aria-label="Search Combobox"
>
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
		width: 800px;
		max-width: 100%;
	}

	input {
		width: 100%;
		padding: 0.875rem 1.25rem;
		font-size: 1rem;
		border: 1px solid var(--border);
		border-radius: 16px;
		outline: none;
		transition: all 0.2s ease;
		background: var(--background);
		color: var(--text);
		box-shadow: none;
	}

	input::placeholder {
		color: var(--text);
		opacity: 0.5;
	}

	input:focus {
		border-color: var(--accent);
		box-shadow: 0 0 0 3px rgba(248, 186, 136, 0.12);
	}

	ul {
		position: absolute;
		z-index: 10;
		background: linear-gradient(180deg, var(--surface) 0%, #1a2a3d 100%);
		border: 1px solid var(--border);
		border-radius: 16px;
		list-style: none;
		margin: 0.5rem 0 0;
		padding: 0.5rem;
		width: 100%;
		max-height: 360px;
		overflow-y: auto;
		box-shadow:
			0 4px 6px rgba(0, 0, 0, 0.1),
			0 12px 24px rgba(0, 0, 0, 0.25);
	}

	li {
		padding: 0.625rem 0.875rem;
		cursor: pointer;
		transition: all 0.15s ease;
		color: var(--text);
		border-radius: 10px;
		margin: 2px 0;
	}

	li:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	li.selected {
		background: rgba(248, 186, 136, 0.1);
		color: var(--accent);
	}

	li.selected:hover {
		background: rgba(248, 186, 136, 0.15);
	}
</style>
