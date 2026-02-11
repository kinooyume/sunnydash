<script module lang="ts">
	import { type WeatherDomainsState, type AdapterRegistry, WeatherStateStatusKind } from '.';
	import { openMeteoGeocodingAdapter, openMeteoWeatherAdapter } from '../adapters/openMeteo';
	import { mockGeocodingAdapter, mockReverseGeocodingAdapter, mockWeatherAdapter } from '../adapters/mock';
	import { nominatimReverseGeocodingAdapter } from '../adapters/nominatim';
	import { createWeatherAppService } from '../services';
	import type { GeocodingPort, ReverseGeocodingPort, WeatherServicePort } from '../domain';
	import { weatherState } from './weatherState.svelte';

	export const WEATHER_ADAPTERS: AdapterRegistry<WeatherServicePort> = {
		openMeteo: { label: 'Open-Meteo', adapter: openMeteoWeatherAdapter },
		mock: { label: 'Mock', adapter: mockWeatherAdapter }
	};

	export const GEOCODING_ADAPTERS: AdapterRegistry<GeocodingPort> = {
		openMeteo: { label: 'Open-Meteo', adapter: openMeteoGeocodingAdapter },
		mock: { label: 'Mock', adapter: mockGeocodingAdapter }
	};

	export const REVERSE_GEOCODING_ADAPTERS: AdapterRegistry<ReverseGeocodingPort> = {
		nominatim: { label: 'Nominatim', adapter: nominatimReverseGeocodingAdapter },
		mock: { label: 'Mock', adapter: mockReverseGeocodingAdapter }
	};

	const useMock = import.meta.env.VITE_USE_MOCK === 'true';

	export const weatherDomains = $state<WeatherDomainsState>({
		weatherKey: useMock ? 'mock' : 'openMeteo',
		geocodingKey: useMock ? 'mock' : 'openMeteo',
		reverseGeocodingKey: useMock ? 'mock' : 'nominatim',
		weather: useMock ? mockWeatherAdapter : openMeteoWeatherAdapter,
		geocoding: useMock ? mockGeocodingAdapter : openMeteoGeocodingAdapter,
		reverseGeocoding: useMock ? mockReverseGeocodingAdapter : nominatimReverseGeocodingAdapter,
		services: createWeatherAppService({
			geo: useMock ? mockGeocodingAdapter : openMeteoGeocodingAdapter,
			weather: useMock ? mockWeatherAdapter : openMeteoWeatherAdapter
		})
	});

	function resetState() {
		weatherState.status = { kind: WeatherStateStatusKind.INITIAL };
		weatherState.city = undefined;
		weatherState.country = undefined;
		weatherState.forecast = undefined;
	}

	function rebuildServices() {
		weatherDomains.services = createWeatherAppService({
			geo: weatherDomains.geocoding,
			weather: weatherDomains.weather
		});
	}

	export function switchWeather(key: string): void {
		weatherDomains.weatherKey = key;
		weatherDomains.weather = WEATHER_ADAPTERS[key].adapter;
		rebuildServices();
		resetState();
	}

	export function switchGeocoding(key: string): void {
		weatherDomains.geocodingKey = key;
		weatherDomains.geocoding = GEOCODING_ADAPTERS[key].adapter;
		rebuildServices();
		resetState();
	}

	export function switchReverseGeocoding(key: string): void {
		weatherDomains.reverseGeocodingKey = key;
		weatherDomains.reverseGeocoding = REVERSE_GEOCODING_ADAPTERS[key].adapter;
	}
</script>
