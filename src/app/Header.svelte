<script lang="ts">
	import { getContext } from 'svelte';
	import { CitySearch } from '../components/features/CitySearch';
	import { Text, IconButton, Select } from '../components/ui';
	import { API_PROVIDERS, WeatherDomainsStateStatus } from '../stores';
	import { switchProvider } from '../stores/weatherDomainsState.svelte';
	import type { WeatherDomainsState } from '../stores';
	import type { Context } from '../services/context';
	import type { TemperatureUnitContext } from '../services/context/context.types';

	const weatherDomains = getContext<Context<WeatherDomainsState>>('weather-domains');
	const tempUnit = getContext<Context<TemperatureUnitContext>>('temperature-unit');

	const today = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'short',
		day: 'numeric'
	});

	const apiOptions = Object.entries(API_PROVIDERS).map(([value, { label }]) => ({
		value,
		label
	}));

	let selectedApi = $derived(weatherDomains().status);

	function handleApiChange(value: string) {
		switchProvider(value as WeatherDomainsStateStatus);
	}
</script>

<header>
	<div class="header-left">
		<Text variant="body" weight="medium">SunnyDash</Text>
	</div>
	<div class="header-center">
		<Text variant="caption" color="muted">{today}</Text>
	</div>
	<div class="header-right">
		<Select options={apiOptions} value={selectedApi} label="API" onchange={handleApiChange} />
		<IconButton label="Toggle temperature unit" size="sm" onclick={() => tempUnit().toggleUnit()}>°{tempUnit().unit}</IconButton>
	</div>
</header>

<section class="search-hero">
	<CitySearch placeholder="Search for a city..." />
</section>

<style>
	header {
		position: relative;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80px;
		padding: 0 32px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.header-left,
	.header-right {
		flex: 1;
	}

	.header-right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 12px;
	}

	.header-center {
		flex: 1;
		text-align: center;
	}

	.search-hero {
		display: flex;
		justify-content: center;
		padding: 32px 24px 0;
	}
</style>
