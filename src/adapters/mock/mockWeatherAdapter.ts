import type { Coordinates, WeatherForecast, WeatherServicePort } from '../../domain/weather';
import { mockForecasts, createMockForecast } from './mockData';

const coordsToCity: Record<string, string> = {
	'51.51_-0.13': 'london',
	'35.68_139.65': 'tokyo',
	'64.15_-21.94': 'reykjavik',
	'30.04_31.24': 'cairo',
	'19.08_72.88': 'mumbai',
	'59.91_10.75': 'oslo',
	'-12.05_-77.04': 'lima'
};

function getCityFromCoords(coords: Coordinates): string | null {
	const key = `${coords.latitude.toFixed(2)}_${coords.longitude.toFixed(2)}`;
	return coordsToCity[key] || null;
}

export const mockWeatherAdapter: WeatherServicePort = {
	getForecast: async ({ latitude, longitude }: Coordinates): Promise<WeatherForecast> => {
		await new Promise((resolve) => setTimeout(resolve, 150));

		const city = getCityFromCoords({ latitude, longitude });
		if (city && mockForecasts[city]) {
			return mockForecasts[city];
		}

		return createMockForecast(20);
	}
};
