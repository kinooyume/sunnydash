<script lang="ts">
	import { getContext } from 'svelte';
	import type { WeatherState } from '../../../stores';
	import type { Context, TemperatureUnitContext } from '../../../services/context';
	import { getWeatherIconPath, getWeatherDescription } from '../../../domain';
	import { GlassCard, Text } from '../../ui';

	let weatherState = getContext<Context<WeatherState>>('weather-state');
	let tempUnit = getContext<Context<TemperatureUnitContext>>('temperature-unit');

	let forecast = $derived(weatherState().forecast);
	let todayCode = $derived(forecast?.weather_code[0] ?? 0);
	let todayMin = $derived(forecast?.temperature_min[0] ?? 0);
	let todayMax = $derived(forecast?.temperature_max[0] ?? 0);

	function formatDay(dateStr: string, index: number): string {
		if (index === 0) return 'Today';
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { weekday: 'short' });
	}

	function avgTemp(min: number, max: number): number {
		return tempUnit().convertTemp(Math.round((min + max) / 2));
	}
</script>

{#if forecast}
	{#key weatherState().city}
		<div class="weather-content">
			<GlassCard padding="lg" class="hero-card">
				<div class="hero-layout">
					<div class="hero-left">
						<Text as="h1" variant="title" color="light">{weatherState().city}</Text>
						<Text as="p" variant="caption" color="muted" class="country"
							>{weatherState().country}</Text
						>
						<div class="temp-display">
							<Text as="span" variant="hero" color="light">{avgTemp(todayMin, todayMax)}</Text>
							<Text as="span" variant="title" color="muted" weight="light" class="temp-unit">°</Text
							>
						</div>
						<Text as="p" variant="subtitle" color="muted">{getWeatherDescription(todayCode)}</Text>
						<Text as="p" variant="caption" color="muted"
							>H:{tempUnit().convertTemp(Math.round(todayMax))}° L:{tempUnit().convertTemp(Math.round(todayMin))}°</Text
						>
					</div>
					<div class="hero-right">
						<img
							src={getWeatherIconPath(todayCode)}
							alt={getWeatherDescription(todayCode)}
							class="hero-icon"
						/>
					</div>
				</div>
			</GlassCard>

			<section class="forecast-strip">
				<Text as="h3" variant="overline" color="muted" class="section-title">7-Day Forecast</Text>
				<div class="forecast-scroll">
					{#each forecast.time as date, i (date)}
						<GlassCard
							padding="sm"
							radius="md"
							variant={i === 0 ? 'accent' : 'default'}
							hover
							class="forecast-item"
						>
							<Text variant="caption" color="muted" class="forecast-day">{formatDay(date, i)}</Text>
							<img
								src={getWeatherIconPath(forecast.weather_code[i])}
								alt="weather"
								class="forecast-icon"
							/>
							<Text variant="body" color="light" weight="medium"
								>{avgTemp(forecast.temperature_min[i], forecast.temperature_max[i])}°</Text
							>
						</GlassCard>
					{/each}
				</div>
			</section>
		</div>
	{/key}
{:else}
	<div class="empty-state">
		<Text variant="body" color="muted">Search for a city to see the weather</Text>
	</div>
{/if}

<style>
	.weather-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 40px;
		padding-top: 48px;
		animation: fadeIn 0.4s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	:global(.hero-card) {
		width: 100%;
		max-width: 800px;
	}

	.hero-layout {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.hero-left {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	:global(.country) {
		margin-bottom: 8px;
	}

	.temp-display {
		display: flex;
		align-items: flex-start;
		margin: 8px 0;
	}

	:global(.temp-unit) {
		margin-top: 8px;
	}

	.hero-right {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hero-icon {
		width: 140px;
		height: 140px;
		filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3));
		animation: float 4s ease-in-out infinite;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-8px);
		}
	}

	.forecast-strip {
		width: 100%;
		max-width: 800px;
	}

	:global(.section-title) {
		margin: 0 0 16px 8px;
	}

	.forecast-scroll {
		display: flex;
		gap: 8px;
		overflow-x: auto;
		padding: 4px;
		scrollbar-width: none;
	}

	.forecast-scroll::-webkit-scrollbar {
		display: none;
	}

	:global(.forecast-item) {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		width: 72px;
	}

	.forecast-icon {
		width: 32px;
		height: 32px;
	}

	.empty-state {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 300px;
	}

	@media (max-width: 640px) {
		.hero-layout {
			flex-direction: column;
			text-align: center;
		}

		.hero-left {
			align-items: center;
		}

		.hero-right {
			margin-top: 24px;
		}

		.hero-icon {
			width: 100px;
			height: 100px;
		}
	}
</style>
