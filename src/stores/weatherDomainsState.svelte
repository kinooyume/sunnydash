<script module lang="ts">
	import { type WeatherDomainsState, type AdapterRegistry, WeatherStateStatusKind } from '.';
	import { openMeteoGeocodingAdapter, openMeteoWeatherAdapter } from '../adapters/openMeteo';
	import {
		mockGeocodingAdapter,
		mockGeolocationAdapter,
		mockNotificationAdapter,
		mockReverseGeocodingAdapter,
		mockStorageAdapter,
		mockWeatherAdapter
	} from '../adapters/mock';
	import { nominatimReverseGeocodingAdapter } from '../adapters/nominatim';
	import { browserGeolocationAdapter } from '../adapters/geolocation';
	import { storeNotificationAdapter } from '../adapters/notification';
	import { localStorageAdapter } from '../adapters/storage';
	import { createWeatherAppService } from '../services';
	import type {
		GeocodingPort,
		GeolocationPort,
		NotificationPort,
		ReverseGeocodingPort,
		StoragePort,
		WeatherServicePort
	} from '../domain';
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

	export const GEOLOCATION_ADAPTERS: AdapterRegistry<GeolocationPort> = {
		browser: { label: 'Browser', adapter: browserGeolocationAdapter },
		mock: { label: 'Mock', adapter: mockGeolocationAdapter }
	};

	export const NOTIFICATION_ADAPTERS: AdapterRegistry<NotificationPort> = {
		store: { label: 'Toast', adapter: storeNotificationAdapter },
		mock: { label: 'Mock (console)', adapter: mockNotificationAdapter }
	};

	export const STORAGE_ADAPTERS: AdapterRegistry<StoragePort> = {
		localStorage: { label: 'LocalStorage', adapter: localStorageAdapter },
		mock: { label: 'Mock (memory)', adapter: mockStorageAdapter }
	};

	const useMock = import.meta.env.VITE_USE_MOCK === 'true';

	export const weatherDomains = $state<WeatherDomainsState>({
		weatherKey: useMock ? 'mock' : 'openMeteo',
		geocodingKey: useMock ? 'mock' : 'openMeteo',
		reverseGeocodingKey: useMock ? 'mock' : 'nominatim',
		geolocationKey: useMock ? 'mock' : 'browser',
		notificationKey: useMock ? 'mock' : 'store',
		storageKey: useMock ? 'mock' : 'localStorage',
		weather: useMock ? mockWeatherAdapter : openMeteoWeatherAdapter,
		geocoding: useMock ? mockGeocodingAdapter : openMeteoGeocodingAdapter,
		reverseGeocoding: useMock ? mockReverseGeocodingAdapter : nominatimReverseGeocodingAdapter,
		geolocation: useMock ? mockGeolocationAdapter : browserGeolocationAdapter,
		notification: useMock ? mockNotificationAdapter : storeNotificationAdapter,
		storage: useMock ? mockStorageAdapter : localStorageAdapter,
		services: createWeatherAppService({
			geo: useMock ? mockGeocodingAdapter : openMeteoGeocodingAdapter,
			reverseGeo: useMock ? mockReverseGeocodingAdapter : nominatimReverseGeocodingAdapter,
			weather: useMock ? mockWeatherAdapter : openMeteoWeatherAdapter
		})
	});

	function rebuildServices() {
		weatherDomains.services = createWeatherAppService({
			geo: weatherDomains.geocoding,
			reverseGeo: weatherDomains.reverseGeocoding,
			weather: weatherDomains.weather
		});
	}

	function refetchForecast() {
		const city = weatherState.city;
		if (!city) return;
		weatherState.status = { kind: WeatherStateStatusKind.LOADING };
		weatherDomains.services
			.getForecastForCity(city)
			.then((result) => {
				if (result) {
					weatherState.city = result.location;
					weatherState.country = result.country;
					weatherState.forecast = result.forecast;
					weatherState.weatherAdapter = WEATHER_ADAPTERS[weatherDomains.weatherKey].label;
					weatherState.status = { kind: WeatherStateStatusKind.OK };
				}
			})
			.catch(() => {
				weatherState.status = { kind: WeatherStateStatusKind.ERROR, error: 'Failed to refetch forecast' };
			});
	}

	export function switchWeather(key: string): void {
		weatherDomains.weatherKey = key;
		weatherDomains.weather = WEATHER_ADAPTERS[key].adapter;
		rebuildServices();
		refetchForecast();
	}

	export function switchGeocoding(key: string): void {
		weatherDomains.geocodingKey = key;
		weatherDomains.geocoding = GEOCODING_ADAPTERS[key].adapter;
		rebuildServices();
		refetchForecast();
	}

	export function switchReverseGeocoding(key: string): void {
		weatherDomains.reverseGeocodingKey = key;
		weatherDomains.reverseGeocoding = REVERSE_GEOCODING_ADAPTERS[key].adapter;
		rebuildServices();
		refetchForecast();
	}

	export function switchGeolocation(key: string): void {
		weatherDomains.geolocationKey = key;
		weatherDomains.geolocation = GEOLOCATION_ADAPTERS[key].adapter;
	}

	export function switchNotification(key: string): void {
		weatherDomains.notificationKey = key;
		weatherDomains.notification = NOTIFICATION_ADAPTERS[key].adapter;
	}

	export function switchStorage(key: string): void {
		weatherDomains.storageKey = key;
		weatherDomains.storage = STORAGE_ADAPTERS[key].adapter;
	}
</script>
