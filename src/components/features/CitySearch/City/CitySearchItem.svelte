<script lang="ts">
	import type { SearchComboboxCityProps } from './CitySearchItem.types';

	let { item }: SearchComboboxCityProps = $props();
</script>

<div class="city">
	<div class="city__name">{item.name}</div>
	<div class="city__country">{item.country}</div>
	<div class="city__state">{item.state}</div>
</div>

<style>
	.city {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 0.5rem;
	}

	.city__name {
		font-weight: 500;
		font-size: 1rem;
		color: var(--text-light);
	}

	.city__country,
	.city__state {
		color: var(--accent-secondary);
		font-size: 0.9rem;
	}
</style>
