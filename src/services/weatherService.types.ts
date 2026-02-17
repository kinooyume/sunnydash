import type {
	City,
	Coordinates,
	GeocodingPort,
	ReverseGeocodingPort,
	WeatherForecast,
	WeatherServicePort
} from '../domain';

export type CreateWeatherAppServiceProps = {
	geo: GeocodingPort;
	reverseGeo: ReverseGeocodingPort;
	weather: WeatherServicePort;
};

export type ForecastResult = {
	location: string;
	country: string;
	forecast: WeatherForecast;
};

export type WeatherAppService = {
	getForecastForCity: (name: string) => Promise<ForecastResult | null>;
	getForecastForLocation: (city: City) => Promise<ForecastResult>;
	getForecastForCoords: (coords: Coordinates) => Promise<ForecastResult>;
};
