import { describe, it, expect } from 'vitest';
import { mockReverseGeocodingAdapter } from './mockReverseGeocodingAdapter';

describe('mockReverseGeocodingAdapter', () => {
	it('returns Paris with provided coordinates', async () => {
		const city = await mockReverseGeocodingAdapter.reverseGeocode({
			latitude: 51.5,
			longitude: -0.12
		});
		expect(city).not.toBeNull();
		expect(city!.name).toBe('Paris');
		expect(city!.country).toBe('France');
		expect(city!.country_code).toBe('FR');
	});

	it('passes through the input coordinates', async () => {
		const city = await mockReverseGeocodingAdapter.reverseGeocode({
			latitude: 35.6762,
			longitude: 139.6503
		});
		expect(city!.latitude).toBe(35.6762);
		expect(city!.longitude).toBe(139.6503);
	});
});
