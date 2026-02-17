import type { ReverseGeocodingPort, City } from '../../domain';

export const nominatimReverseGeocodingAdapter: ReverseGeocodingPort = {
	reverseGeocode: async ({ latitude, longitude }): Promise<City | null> => {
		const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`;
		console.debug('[ReverseGeocoding] fetching:', url);
		const res = await fetch(url);
		const data = await res.json();
		console.debug('[ReverseGeocoding] response:', data);
		if (!data?.address) {
			console.debug('[ReverseGeocoding] no address in response');
			return null;
		}
		const city = {
			name: data.address.city || data.address.town || data.address.village || data.name,
			latitude,
			longitude,
			country: data.address.country || '',
			country_code: (data.address.country_code || '').toUpperCase()
		};
		console.debug('[ReverseGeocoding] resolved city:', city);
		return city;
	}
};
