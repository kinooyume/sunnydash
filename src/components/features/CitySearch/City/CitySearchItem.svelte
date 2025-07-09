<script lang="ts">
	import type { SearchComboboxCityProps } from './CitySearchItem.types';

	let { item }: SearchComboboxCityProps = $props();
</script>

<div class="city">
	<div class="city__name">{item.name}</div>
	<div class="city__country">{item.country}</div>
	<div class="city__state">{item.state}</div>
	<div class="city__population">Population: {item.population.toLocaleString()}</div>
</div>

<style>
	.city {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 0.25rem;
		background-color: var(--color-background);
	}

	.city__name {
		font-weight: bold;
	}

	.city__country,
	.city__state,
	.city__population {
		color: var(--color-text-secondary);
	}
</style>
