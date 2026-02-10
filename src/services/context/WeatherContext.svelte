<script lang="ts">
	import { setContext } from 'svelte';
	import { weatherDomains } from '../../stores/weatherDomainsState.svelte';
	import { weatherState } from '../../stores/weatherState.svelte';
	import { temperatureUnit, toggleUnit, convertTemp } from '../../stores/temperatureUnit.svelte';
	import { localStorageAdapter } from '../../adapters/storage';
	import { browserGeolocationAdapter } from '../../adapters/geolocation';
	import { storeNotificationAdapter } from '../../adapters/notification';

	const stored = localStorageAdapter.get('temperature-unit');
	if (stored === 'F') temperatureUnit.value = 'F';

	setContext('weather-domains', () => weatherDomains);
	setContext('weather-state', () => weatherState);
	setContext('temperature-unit', () => ({
		unit: temperatureUnit.value,
		toggleUnit: () => {
			toggleUnit();
			localStorageAdapter.set('temperature-unit', temperatureUnit.value);
		},
		convertTemp
	}));
	setContext('storage', () => localStorageAdapter);
	setContext('geolocation', () => browserGeolocationAdapter);
	setContext('notification', () => storeNotificationAdapter);

	let { children } = $props();
</script>

{@render children()}
