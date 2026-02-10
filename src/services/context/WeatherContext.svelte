<script lang="ts">
	import { setContext } from 'svelte';
	import { weatherDomains } from '../../stores/weatherDomainsState.svelte';
	import { weatherState } from '../../stores/weatherState.svelte';
	import { temperatureUnit, toggleUnit, convertTemp } from '../../stores/temperatureUnit.svelte';

	setContext('weather-domains', () => weatherDomains);
	setContext('weather-state', () => weatherState);
	setContext('temperature-unit', () => ({
		unit: temperatureUnit.value,
		toggleUnit,
		convertTemp
	}));

	let { children } = $props();
</script>

{@render children()}
