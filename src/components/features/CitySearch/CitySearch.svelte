<script lang="ts">
	import SearchCombobox from '../../shared/SearchCombobox/SearchCombobox.svelte';
	import CitySearchItem from './City/CitySearchItem.svelte';
	import type { CityItem } from './City/CitySearchItem.types';
	import type { SearchComboboxCitiesProps } from './CitySearch.types';

	let {
		items = $bindable([]),
		placeholder = $bindable(''),
		showList = $bindable(false),
		onSelect = $bindable(undefined)
	}: SearchComboboxCitiesProps = $props();
</script>

<SearchCombobox {items} {placeholder} {showList} {onSelect}>
	{#snippet children(item)}
		<CitySearchItem item={item as CityItem} />
	{/snippet}
</SearchCombobox>
