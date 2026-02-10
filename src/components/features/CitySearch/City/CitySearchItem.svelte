<script lang="ts">
	import type { SearchComboboxCityProps } from './CitySearchItem.types';

	let { item }: SearchComboboxCityProps = $props();

	function countryCodeToFlag(code: string): string {
		return code
			.toUpperCase()
			.split('')
			.map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
			.join('');
	}
</script>

<div class="city">
	<span class="city__flag">{countryCodeToFlag(item.country_code)}</span>
	<div class="city__info">
		<span class="city__name">{item.name}</span>
		<span class="city__country">{item.country}</span>
	</div>
</div>

<style>
	.city {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 0.75rem;
		padding: 0.25rem 0;
	}

	.city__flag {
		font-size: 1.25rem;
		line-height: 1;
	}

	.city__info {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.city__name {
		font-weight: 500;
		font-size: 0.95rem;
		color: var(--text-light);
		line-height: 1.2;
	}

	.city__country {
		font-size: 0.8rem;
		color: var(--accent-secondary);
		opacity: 0.8;
		line-height: 1.2;
	}
</style>
