<script lang="ts">
	import { getContext } from 'svelte';
	import type { WeatherState } from '../../../stores';
	import type { Context } from '../../../services/context/context.types';
	import { getWeatherIconPath } from '../../../domain/weatherIcon';

	let weatherState = getContext<Context<WeatherState>>('weather-state');
</script>

{#if weatherState().forecast}
	{#if weatherState().city}
		<h2>Forecast for {weatherState().city} · {weatherState().country}</h2>
	{/if}
	<ul>
		{#each weatherState().forecast!.time as date, i}
			<li class="card">
				<img
					src={getWeatherIconPath(weatherState().forecast!.weather_code[i])}
					alt="weather icon"
					class="weather-icon"
				/>
				{weatherState().forecast!.temperature_min[i]}°C - {weatherState().forecast!.temperature_max[
					i
				]}°C

				<strong>{date}</strong>
			</li>
		{/each}
	</ul>
{:else}
	<p>No forecast available</p>
{/if}

<style>
	.card {
		background: var(--surface);
		border-radius: 16px;
		padding: 1.25rem;
		border: 1px solid var(--border);
		width: 100%;
		max-width: 160px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		transition: background 0.2s ease;
	}

	.card:hover {
		background: var(--surface-hover);
		border-color: var(--border-hover);
	}

	.weather-icon {
		width: 48px;
		height: 48px;
	}

	h2 {
		color: var(--accent);
		font-weight: 300;
		margin-bottom: 1rem;
		font-size: 1.25rem;
	}

	ul {
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	li {
		font-size: 0.9rem;
		color: var(--text-light);
	}

	li strong {
		color: var(--accent-secondary);
		font-weight: 400;
	}

	p {
		color: var(--text);
	}
</style>
