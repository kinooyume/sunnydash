<script lang="ts">
	import { setContext } from 'svelte';
	import { weatherDomains } from '../../stores/weatherDomainsState.svelte';
	import { weatherState } from '../../stores/weatherState.svelte';
	import { temperatureUnit, toggleUnit, convertTemp } from '../../stores/temperatureUnit.svelte';

	const stored = weatherDomains.storage.get('temperature-unit');
	if (stored === 'F') temperatureUnit.value = 'F';

	setContext('weather-domains', () => weatherDomains);
	setContext('weather-state', () => weatherState);
	setContext('temperature-unit', () => ({
		unit: temperatureUnit.value,
		toggleUnit: () => {
			toggleUnit();
			weatherDomains.storage.set('temperature-unit', temperatureUnit.value);
		},
		convertTemp
	}));
	setContext('storage', () => weatherDomains.storage);
	setContext('geolocation', () => weatherDomains.geolocation);
	setContext('notification', () => weatherDomains.notification);

	let { children } = $props();
</script>

{@render children()}
