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
		gap: 8px;
		padding: 1rem;
		border-radius: 8px;
		background: #fff;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
		border: 1px solid #ececec;
		gap: 0.25rem;
	}

	.city__name {
		font-weight: 600;
		font-size: 1.05rem;
		color: #222;
		margin-bottom: 0.25rem;
	}

	.city__country,
	.city__state {
		color: #666;
		font-size: 0.98rem;
		margin-bottom: 0.1rem;
	}
</style>
