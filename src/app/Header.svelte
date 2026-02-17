<script lang="ts">
	import { getContext } from 'svelte';
	import { CitySearch } from '../components/features/CitySearch';
	import { Text, IconButton } from '../components/ui';
	import { WeatherStateStatusKind } from '../stores';
	import type { WeatherDomainsState, WeatherState } from '../stores';
	import type {
		Context,
		TemperatureUnitContext,
		GeolocationContext,
		NotificationContext
	} from '../services/context';
	import { WEATHER_ADAPTERS, GEOCODING_ADAPTERS } from '../stores/weatherDomainsState.svelte';

	const weatherDomains = getContext<Context<WeatherDomainsState>>('weather-domains');
	const weatherState = getContext<Context<WeatherState>>('weather-state');
	const tempUnit = getContext<Context<TemperatureUnitContext>>('temperature-unit');
	const geolocation = getContext<Context<GeolocationContext>>('geolocation');
	const notification = getContext<Context<NotificationContext>>('notification');

	const today = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'short',
		day: 'numeric'
	});

	async function handleLocate() {
		const coords = await geolocation().getCurrentPosition();
		if (!coords) {
			notification().show('Could not get your location', 'error');
			return;
		}
		weatherState().status = { kind: WeatherStateStatusKind.LOADING };
		try {
			const result = await weatherDomains().services.getForecastForCoords(coords);
			weatherState().city = result.location;
			weatherState().country = result.country;
			weatherState().forecast = result.forecast;
			weatherState().weatherAdapter = WEATHER_ADAPTERS[weatherDomains().weatherKey].label;
			weatherState().geocodingAdapter = GEOCODING_ADAPTERS[weatherDomains().geocodingKey].label;
			weatherState().status = { kind: WeatherStateStatusKind.OK };
		} catch {
			notification().show('Failed to load weather data', 'error');
			weatherState().status = { kind: WeatherStateStatusKind.INITIAL };
		}
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
		<IconButton label="Toggle temperature unit" size="sm" onclick={() => tempUnit().toggleUnit()}>°{tempUnit().unit}</IconButton>
	</div>
</header>

<section class="search-hero">
	<CitySearch placeholder="Search for a city..." />
	<IconButton label="Use my location" size="md" onclick={handleLocate}>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="12" cy="12" r="4" />
			<line x1="12" y1="2" x2="12" y2="6" />
			<line x1="12" y1="18" x2="12" y2="22" />
			<line x1="2" y1="12" x2="6" y2="12" />
			<line x1="18" y1="12" x2="22" y2="12" />
		</svg>
	</IconButton>
</section>

<style>
	header {
		position: relative;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
		height: 80px;
		padding: 0 32px;
		max-width: 1200px;
    width: 100%;
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
    width: 300px;
		text-align: center;
	}

	.search-hero {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 12px;
		padding: 32px 24px 0;
	}
</style>
