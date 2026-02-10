import type { GeocodingPort } from '../domain/geocoding';
import type { WeatherServicePort } from '../domain/weather';
import type { WeatherAppService } from '../services/weatherService.types';

export enum WeatherDomainsStateStatus {
	OPEN_METEO = 'openMeteo',
	MOCK = 'mock'
}

export const API_PROVIDERS = {
	[WeatherDomainsStateStatus.OPEN_METEO]: {
		label: 'Open-Meteo',
		description: 'Free weather API'
	},
	[WeatherDomainsStateStatus.MOCK]: {
		label: 'Mock API',
		description: 'Local mock data'
	}
} as const;

export type WeatherDomainsState = {
	status: WeatherDomainsStateStatus;
	geocoding: GeocodingPort;
	weather: WeatherServicePort;
	services: WeatherAppService;
};
