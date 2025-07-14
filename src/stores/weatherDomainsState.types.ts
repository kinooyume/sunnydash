import type { GeocodingPort } from "../domain/geocoding";
import type { WeatherServicePort } from "../domain/weather";
import type { WeatherAppService } from "../services/weatherService.types";

export enum WeatherDomainsStateStatus {
	OPEN_METEO = 'openMeteo'
}

export type WeatherDomainsState = {
	status: WeatherDomainsStateStatus;
	geocoding: GeocodingPort;
	weather: WeatherServicePort;
	services: WeatherAppService;
};
