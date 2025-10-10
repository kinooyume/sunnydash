import type { City, GeocodingPort, GeocodingProps } from '../../domain/geocoding';
import { mockCities } from './mockData';

export const mockGeocodingAdapter: GeocodingPort = {
	searchCities: async ({ name, count = 10 }: GeocodingProps): Promise<City[] | null> => {
		await new Promise((resolve) => setTimeout(resolve, 100));

		const query = name.toLowerCase();
		const results: City[] = [];

		for (const [key, cities] of Object.entries(mockCities)) {
			if (key.includes(query) || query.includes(key)) {
				results.push(...cities);
			}
		}

		return results.slice(0, count);
	},

	searchCity: async ({ name }: GeocodingProps): Promise<City | null> => {
		await new Promise((resolve) => setTimeout(resolve, 100));

		const query = name.toLowerCase();

		for (const [key, cities] of Object.entries(mockCities)) {
			if (key.includes(query) || query.includes(key)) {
				return cities[0];
			}
		}

		return null;
	}
};
