import type { ReverseGeocodingPort, City } from '../../domain';

export const mockReverseGeocodingAdapter: ReverseGeocodingPort = {
	reverseGeocode: async ({ latitude, longitude }): Promise<City | null> => {
		await new Promise((resolve) => setTimeout(resolve, 100));
		return {
			name: 'Paris',
			latitude,
			longitude,
			country: 'France',
			country_code: 'FR'
		};
	}
};
