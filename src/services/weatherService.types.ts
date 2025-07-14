import type { GeocodingPort } from '../domain/geocoding';
import type { WeatherForecast, WeatherServicePort } from '../domain/weather';

export type CreateWeatherAppServiceProps = {
	geo: GeocodingPort;
	weather: WeatherServicePort;
};

export type WeatherAppService = {
	getForecastForCity: (city: string) => Promise<{
		location: string;
		forecast: WeatherForecast;
	} | null>;
};
