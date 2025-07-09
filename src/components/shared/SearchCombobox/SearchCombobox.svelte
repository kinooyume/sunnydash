<script lang="ts">
	import type { BaseItem, KeyPressedActions, SearchComboboxProps } from './SearchCombobox.types';

	let {
		items,
		placeholder,
		showList = $bindable(false),
		onSelect,
		children
	}: SearchComboboxProps<any> = $props();

	let inputValue = $state('');
	let focusedItemIndex = $state<number | null>(null);

	let filtered = $derived(
		items.filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
	);

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
				focusedItemIndex = filtered.length - 1;
			}
		]
	]);

	// NOTE: Asuming that focusedItemIndex is not null
	const focusedItemKeyPressedActions: KeyPressedActions = new Map([
		[
			'ArrowDown',
			() => {
				focusedItemIndex = ((focusedItemIndex as number) + 1) % filtered.length;
			}
		],
		[
			'ArrowUp',
			() => {
				focusedItemIndex = ((focusedItemIndex as number) - 1 + filtered.length) % filtered.length;
			}
		],
		['Enter', () => choose(filtered[focusedItemIndex as number])]
	]);

	function handleKey(event: KeyboardEvent) {
		if (!filtered.length) return;

		const keyPressedActions =
			focusedItemIndex === null ? unfocusedItemKeyPressedActions : focusedItemKeyPressedActions;

		keyPressedActions.get(event.key)?.();
	}

	function choose(item: BaseItem) {
		inputValue = item.name;
		showList = false;
		focusedItemIndex = null;
		onSelect?.(item);
	}
</script>

<div class="combo">
	<input
		type="text"
		bind:value={inputValue}
		{placeholder}
		oninput={() => (showList = true)}
		onkeydown={handleKey}
		onfocus={() => (showList = true)}
		role="combobox"
		aria-autocomplete="list"
		aria-expanded={showList}
		aria-controls="search-list"
		aria-activedescendant={focusedItemIndex !== null ? `option-${focusedItemIndex}` : undefined}
	/>

	{#if showList && filtered.length > 0}
		<ul id="search-list" role="listbox">
			{#each filtered as item, i}
				<li
					role="option"
					aria-selected={focusedItemIndex === i}
					class:selected={focusedItemIndex === i}
					onmousedown={() => choose(item)}
				>
					{@render children({ item: item })}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.combo {
		position: relative;
		width: 100%;
	}

	input {
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
	}

	ul {
		position: absolute;
		z-index: 10;
		background: white;
		border: 1px solid #ccc;
		list-style: none;
		margin: 0;
		padding: 0;
		width: 100%;
		max-height: 200px;
		overflow-y: auto;
	}

	li {
		padding: 0.5rem;
		cursor: pointer;
	}

	li.selected {
		background: #eee;
	}
</style>
