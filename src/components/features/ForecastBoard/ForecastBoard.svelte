<script lang="ts">
	import { getContext } from 'svelte';
	import type { WeatherState } from '../../../stores';
	import type { Context } from '../../../services/context/context.types';

	let weatherState = getContext<Context<WeatherState>>('weather-state');
</script>

{#if weatherState().forecast}
	{#if weatherState().city}
		<h2>Forecast for {weatherState().city} · {weatherState().country}</h2>
	{/if}
	<ul>
		{#each weatherState().forecast!.time as date, i}
			<li class="card">
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
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
		padding: 1rem;
		margin: 0.5rem 0;
		border: 1px solid #ececec;
		width: 100%;
		max-width: 340px;
		min-height: 80px;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	h2 {
		color: #222;
		font-weight: 500;
		margin-bottom: 0.5rem;
		font-size: 1.05rem;
	}

	ul {
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;
		gap: 12px;
	}

	li {
		padding: 0.25rem 0;
		font-size: 0.98rem;
		color: #444;
	}
</style>
