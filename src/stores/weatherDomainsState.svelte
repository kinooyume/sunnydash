<script module lang="ts">
	import { type WeatherDomainsState, WeatherDomainsStateStatus } from '.';
	import { openMeteoGeocodingAdapter, openMeteoWeatherAdapter } from '../adapters/openMeteo';
	import { mockGeocodingAdapter, mockWeatherAdapter } from '../adapters/mock';
	import { createWeatherAppService } from '../services/weatherService';
	import type { GeocodingPort } from '../domain/geocoding';
	import type { WeatherServicePort } from '../domain/weather';

	const adapters: Record<
		WeatherDomainsStateStatus,
		{ geocoding: GeocodingPort; weather: WeatherServicePort }
	> = {
		[WeatherDomainsStateStatus.OPEN_METEO]: {
			geocoding: openMeteoGeocodingAdapter,
			weather: openMeteoWeatherAdapter
		},
		[WeatherDomainsStateStatus.MOCK]: {
			geocoding: mockGeocodingAdapter,
			weather: mockWeatherAdapter
		}
	};

	const initialStatus =
		import.meta.env.VITE_USE_MOCK === 'true'
			? WeatherDomainsStateStatus.MOCK
			: WeatherDomainsStateStatus.OPEN_METEO;

	const initial = adapters[initialStatus];

	export const weatherDomains = $state<WeatherDomainsState>({
		status: initialStatus,
		geocoding: initial.geocoding,
		weather: initial.weather,
		services: createWeatherAppService({ geo: initial.geocoding, weather: initial.weather })
	});

	export function switchProvider(status: WeatherDomainsStateStatus): void {
		const selected = adapters[status];
		weatherDomains.status = status;
		weatherDomains.geocoding = selected.geocoding;
		weatherDomains.weather = selected.weather;
		weatherDomains.services = createWeatherAppService({
			geo: selected.geocoding,
			weather: selected.weather
		});
	}
</script>
