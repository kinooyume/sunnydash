import type {
	GeocodingPort,
	GeolocationPort,
	NotificationPort,
	ReverseGeocodingPort,
	StoragePort,
	WeatherServicePort
} from '../domain';
import type { WeatherAppService } from '../services';

export type AdapterEntry<T> = { label: string; adapter: T };
export type AdapterRegistry<T> = Record<string, AdapterEntry<T>>;

export type WeatherDomainsState = {
	weatherKey: string;
	geocodingKey: string;
	reverseGeocodingKey: string;
	geolocationKey: string;
	notificationKey: string;
	storageKey: string;
	weather: WeatherServicePort;
	geocoding: GeocodingPort;
	reverseGeocoding: ReverseGeocodingPort;
	geolocation: GeolocationPort;
	notification: NotificationPort;
	storage: StoragePort;
	services: WeatherAppService;
};
