import { describe, it, expect } from 'vitest';
import { mockGeocodingAdapter } from './mockGeocodingAdapter';

describe('mockGeocodingAdapter', () => {
	describe('searchCities', () => {
		it('finds cities by partial name', async () => {
			const results = await mockGeocodingAdapter.searchCities({ name: 'lon' });
			expect(results!.length).toBeGreaterThan(0);
			expect(results![0].name).toBe('London');
		});

		it('is case insensitive', async () => {
			const results = await mockGeocodingAdapter.searchCities({ name: 'TOKYO' });
			expect(results![0].name).toBe('Tokyo');
		});

		it('returns empty array when nothing matches', async () => {
			const results = await mockGeocodingAdapter.searchCities({ name: 'zzzzz' });
			expect(results).toEqual([]);
		});

		it('respects count limit', async () => {
			const results = await mockGeocodingAdapter.searchCities({ name: 'lon', count: 1 });
			expect(results!.length).toBe(1);
		});
	});

	describe('searchCity', () => {
		it('returns first matching city', async () => {
			const city = await mockGeocodingAdapter.searchCity({ name: 'london' });
			expect(city).not.toBeNull();
			expect(city!.country_code).toBe('GB');
		});

		it('returns null for unknown city', async () => {
			const city = await mockGeocodingAdapter.searchCity({ name: 'nope' });
			expect(city).toBeNull();
		});
	});
});
