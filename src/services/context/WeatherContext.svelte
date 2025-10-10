<script lang="ts">
	import { setContext } from 'svelte';
	import { weatherDomains } from '../../stores/weatherDomainsState.svelte';
	import { weatherState } from '../../stores/weatherState.svelte';

	setContext('weather-domains', () => weatherDomains);
	setContext('weather-state', () => weatherState);

	let { children } = $props();
</script>

{@render children()}
