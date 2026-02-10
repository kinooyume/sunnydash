import type { GeocodingPort, GeocodingProps, City } from '../../../domain/geocoding';

const searchCities = async ({ name, count = 1 }: GeocodingProps): Promise<City[] | null> => {
	const res = await fetch(
		`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=${count}`
	);

	const data = await res.json();
	// TODO: add zod validation
	if (data && Array.isArray(data.results)) {
		return data.results;
	}

	return null;
};

export const openMeteoGeocodingAdapter: GeocodingPort = {
	searchCities,
	searchCity: async ({ name }: GeocodingProps): Promise<City | null> => {
		const results = await searchCities({ name, count: 1 });
		return results ? results[0] : null;
	}
};
