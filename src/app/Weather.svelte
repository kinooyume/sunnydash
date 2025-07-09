<script lang="ts">
	import { writable } from 'svelte/store';

	import type { WeatherForecast } from '../domain/weather';
	import { createWeatherAppService } from '../services/weatherService';
	import { createOpenMeteoGeocodingAdapter } from '../adapters/openMeteo/geocoding/openMeteoGeocoding';
	import { createOpenMeteoWeatherAdapter } from '../adapters/openMeteo/weather/openMeteoWeather';
	import SearchCombobox from '../components/shared/SearchCombobox/SearchCombobox.svelte';
	import CitySearch from '../components/features/CitySearch/CitySearch.svelte';

	const geoAdapter = createOpenMeteoGeocodingAdapter();
	const weatherAdapter = createOpenMeteoWeatherAdapter();
	const weatherService = createWeatherAppService(geoAdapter, weatherAdapter);

	let city = $state<string>('');
	let currentLocation = writable<string | null>(null);
	let forecast = $state<WeatherForecast | null>(null);
	let error = $state<string | null>(null);
	let loading = $state<boolean>(false);

	const loadWeather = async () => {
		error = null;
		loading = true;

		try {
			const data = await weatherService.getForecastForCity(city);
			if (!data) {
				error = 'No data found for the specified city';
				return;
			}
			currentLocation.set(data.location);
			({ forecast } = data);
		} catch (err) {
			error = 'Failed to load weather data';
			console.error(err);
		} finally {
			loading = false;
		}
	};
</script>

<input bind:value={city} />
<button onclick={loadWeather} disabled={loading}>
	{#if loading}
		Loading...
	{:else}
		Get Weather
	{/if}
</button>

{#if forecast}
	<h2>Forecast for {$currentLocation}</h2>
	<ul>
		{#each forecast.time as date, i}
			<li>
				<strong>{date}</strong>:
				{forecast.temperature_min[i]}°C - {forecast.temperature_max[i]}°C
			</li>
		{/each}
	</ul>
{:else}
	<p>No forecast available</p>
{/if}
