import type { GeocodingPort, ReverseGeocodingPort, WeatherServicePort } from '../domain';
import type { WeatherAppService } from '../services';

export type AdapterEntry<T> = { label: string; adapter: T };
export type AdapterRegistry<T> = Record<string, AdapterEntry<T>>;

export type WeatherDomainsState = {
	weatherKey: string;
	geocodingKey: string;
	reverseGeocodingKey: string;
	weather: WeatherServicePort;
	geocoding: GeocodingPort;
	reverseGeocoding: ReverseGeocodingPort;
	services: WeatherAppService;
};
