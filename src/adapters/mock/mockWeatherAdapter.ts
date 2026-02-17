import type { Coordinates, WeatherForecast, WeatherServicePort } from '../../domain';
import { mockForecasts, createMockForecast } from './mockData';

const coordsToCity: Record<string, string> = {
	'48.86_2.35': 'paris',
	'51.51_-0.13': 'london',
	'35.68_139.65': 'tokyo',
	'-33.87_151.21': 'sydney',
	'52.52_13.41': 'berlin',
	'40.42_-3.70': 'madrid',
	'41.90_12.50': 'rome'
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
