import type { GeocodingPort, WeatherForecast, WeatherServicePort } from '../domain';

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
