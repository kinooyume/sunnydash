<script lang="ts">
	import { getContext } from 'svelte';
	import { Section, Select, Text } from '../components/ui';
	import {
		WEATHER_ADAPTERS,
		GEOCODING_ADAPTERS,
		REVERSE_GEOCODING_ADAPTERS,
		GEOLOCATION_ADAPTERS,
		NOTIFICATION_ADAPTERS,
		STORAGE_ADAPTERS,
		switchWeather,
		switchGeocoding,
		switchReverseGeocoding,
		switchGeolocation,
		switchNotification,
		switchStorage
	} from '../stores/weatherDomainsState.svelte';
	import type { WeatherDomainsState } from '../stores';
	import type { Context } from '../services/context';

	const weatherDomains = getContext<Context<WeatherDomainsState>>('weather-domains');

	function toOptions(registry: Record<string, { label: string }>) {
		return Object.entries(registry).map(([value, { label }]) => ({ value, label }));
	}

	const weatherOptions = toOptions(WEATHER_ADAPTERS);
	const geocodingOptions = toOptions(GEOCODING_ADAPTERS);
	const reverseGeocodingOptions = toOptions(REVERSE_GEOCODING_ADAPTERS);
	const geolocationOptions = toOptions(GEOLOCATION_ADAPTERS);
	const notificationOptions = toOptions(NOTIFICATION_ADAPTERS);
	const storageOptions = toOptions(STORAGE_ADAPTERS);
</script>

<footer>
	<Text variant="caption" color="muted" as="p">A Svelte 5 project demonstrating hexagonal architecture with swappable adapters.</Text>
	<div class="groups">
		<Section title="Forecast">
			<Select options={weatherOptions} value={weatherDomains().weatherKey} label="Weather" onchange={switchWeather} />
			<Select options={geocodingOptions} value={weatherDomains().geocodingKey} label="Geocoding" onchange={switchGeocoding} />
		</Section>
		<Section title="Location">
			<Select options={geolocationOptions} value={weatherDomains().geolocationKey} label="Geolocation" onchange={switchGeolocation} />
			<Select options={reverseGeocodingOptions} value={weatherDomains().reverseGeocodingKey} label="Reverse Geocoding" onchange={switchReverseGeocoding} />
		</Section>
		<Section title="Infrastructure">
			<Select options={notificationOptions} value={weatherDomains().notificationKey} label="Notifications" onchange={switchNotification} />
			<Select options={storageOptions} value={weatherDomains().storageKey} label="Storage" onchange={switchStorage} />
		</Section>
	</div>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		padding: 24px 32px;
		width: 100%;
	}

	.groups {
		display: flex;
		justify-content: center;
		gap: 12px;
		flex-wrap: wrap;
		width: 100%;
	}
</style>
