<script module lang="ts">
	import { type WeatherDomainsState, WeatherDomainsStateStatus, WeatherStateStatusKind } from '.';
	import { openMeteoGeocodingAdapter, openMeteoWeatherAdapter } from '../adapters/openMeteo';
	import { mockGeocodingAdapter, mockReverseGeocodingAdapter, mockWeatherAdapter } from '../adapters/mock';
	import { nominatimReverseGeocodingAdapter } from '../adapters/nominatim';
	import { createWeatherAppService } from '../services';
	import type { GeocodingPort, ReverseGeocodingPort, WeatherServicePort } from '../domain';
	import { weatherState } from './weatherState.svelte';

	const adapters: Record<
		WeatherDomainsStateStatus,
		{ geocoding: GeocodingPort; reverseGeocoding: ReverseGeocodingPort; weather: WeatherServicePort }
	> = {
		[WeatherDomainsStateStatus.OPEN_METEO]: {
			geocoding: openMeteoGeocodingAdapter,
			reverseGeocoding: nominatimReverseGeocodingAdapter,
			weather: openMeteoWeatherAdapter
		},
		[WeatherDomainsStateStatus.MOCK]: {
			geocoding: mockGeocodingAdapter,
			reverseGeocoding: mockReverseGeocodingAdapter,
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
		reverseGeocoding: initial.reverseGeocoding,
		weather: initial.weather,
		services: createWeatherAppService({ geo: initial.geocoding, weather: initial.weather })
	});

	export function switchProvider(status: WeatherDomainsStateStatus): void {
		const selected = adapters[status];
		weatherDomains.status = status;
		weatherDomains.geocoding = selected.geocoding;
		weatherDomains.reverseGeocoding = selected.reverseGeocoding;
		weatherDomains.weather = selected.weather;
		weatherDomains.services = createWeatherAppService({
			geo: selected.geocoding,
			weather: selected.weather
		});
		weatherState.status = { kind: WeatherStateStatusKind.INITIAL };
		weatherState.city = undefined;
		weatherState.country = undefined;
		weatherState.forecast = undefined;
	}
</script>
