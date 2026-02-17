import { describe, it, expect } from 'vitest';
import { mockGeocodingAdapter } from './mockGeocodingAdapter';

describe('mockGeocodingAdapter', () => {
	describe('searchCities', () => {
		it('returns matching cities for known query', async () => {
			const results = await mockGeocodingAdapter.searchCities({ name: 'paris' });
			expect(results).not.toBeNull();
			expect(results!.length).toBeGreaterThan(0);
			expect(results![0].name).toBe('Paris');
		});

		it('returns empty array for unknown query', async () => {
			const results = await mockGeocodingAdapter.searchCities({ name: 'atlantis' });
			expect(results).toEqual([]);
		});

		it('respects count limit', async () => {
			const results = await mockGeocodingAdapter.searchCities({ name: 'paris', count: 1 });
			expect(results).toHaveLength(1);
		});

		it('matches partial queries', async () => {
			const results = await mockGeocodingAdapter.searchCities({ name: 'par' });
			expect(results).not.toBeNull();
			expect(results!.length).toBeGreaterThan(0);
		});

		it('is case-insensitive', async () => {
			const results = await mockGeocodingAdapter.searchCities({ name: 'TOKYO' });
			expect(results).not.toBeNull();
			expect(results![0].name).toBe('Tokyo');
		});
	});

	describe('searchCity', () => {
		it('returns first matching city', async () => {
			const result = await mockGeocodingAdapter.searchCity({ name: 'london' });
			expect(result).not.toBeNull();
			expect(result!.name).toBe('London');
			expect(result!.country).toBe('United Kingdom');
		});

		it('returns null for unknown query', async () => {
			const result = await mockGeocodingAdapter.searchCity({ name: 'atlantis' });
			expect(result).toBeNull();
		});
	});
});
