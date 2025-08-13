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
	}

	input {
		width: 100%;
		padding: 0.75rem 1rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		outline: none;
		transition: border-color 0.2s;
		background: #fafafa;
		box-shadow: none;
	}

	input:focus {
		border-color: #3f51b5;
		box-shadow: 0 2px 8px rgba(63, 81, 181, 0.08);
	}

	ul {
		position: absolute;
		z-index: 10;
		background: white;
		border: 1px solid #ccc;
		border-radius: 4px;
		list-style: none;
		margin: 0;
		padding: 0.25rem 0;
		width: 100%;
		overflow-y: auto;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	}

	li {
		padding: 0.35rem 1rem;
		cursor: pointer;
		transition: background 0.2s;
	}

	li.selected,
	li:hover {
		background: #e3eafc;
	}

	li.selected {
		font-weight: 500;
		color: #3f51b5;
	}
</style>
