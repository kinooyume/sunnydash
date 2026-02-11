import type { ReverseGeocodingPort, City } from '../../domain';

export const nominatimReverseGeocodingAdapter: ReverseGeocodingPort = {
	reverseGeocode: async ({ latitude, longitude }): Promise<City | null> => {
		const res = await fetch(
			`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`
		);
		const data = await res.json();
		if (!data?.address) return null;
		return {
			name: data.address.city || data.address.town || data.address.village || data.name,
			latitude,
			longitude,
			country: data.address.country || '',
			country_code: (data.address.country_code || '').toUpperCase()
		};
	}
};
