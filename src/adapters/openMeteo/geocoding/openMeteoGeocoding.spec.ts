import { describe, it, expect, vi, beforeEach } from 'vitest';
import { openMeteoGeocodingAdapter } from './openMeteoGeocoding';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
	mockFetch.mockReset();
});

describe('openMeteoGeocodingAdapter', () => {
	describe('searchCities', () => {
		it('returns cities from API response', async () => {
			const cities = [
				{ name: 'Paris', latitude: 48.85, longitude: 2.35, country: 'France', country_code: 'FR' }
			];
			mockFetch.mockResolvedValue({ json: () => Promise.resolve({ results: cities }) });

			const result = await openMeteoGeocodingAdapter.searchCities({ name: 'Paris', count: 1 });
			expect(result).toEqual(cities);
			expect(mockFetch).toHaveBeenCalledWith(
				'https://geocoding-api.open-meteo.com/v1/search?name=Paris&count=1'
			);
		});

		it('returns null when API returns no results', async () => {
			mockFetch.mockResolvedValue({ json: () => Promise.resolve({}) });

			const result = await openMeteoGeocodingAdapter.searchCities({ name: 'xyznoplace' });
			expect(result).toBeNull();
		});

		it('defaults count to 1 in the URL', async () => {
			mockFetch.mockResolvedValue({
				json: () => Promise.resolve({ results: [{ name: 'Tokyo' }] })
			});

			await openMeteoGeocodingAdapter.searchCities({ name: 'Tokyo' });
			expect(mockFetch).toHaveBeenCalledWith(
				'https://geocoding-api.open-meteo.com/v1/search?name=Tokyo&count=1'
			);
		});
	});

	describe('searchCity', () => {
		it('returns first city from results', async () => {
			const city = {
				name: 'London',
				latitude: 51.5,
				longitude: -0.12,
				country: 'United Kingdom',
				country_code: 'GB'
			};
			mockFetch.mockResolvedValue({ json: () => Promise.resolve({ results: [city] }) });

			const result = await openMeteoGeocodingAdapter.searchCity({ name: 'London' });
			expect(result).toEqual(city);
		});

		it('returns null when no results', async () => {
			mockFetch.mockResolvedValue({ json: () => Promise.resolve({}) });

			const result = await openMeteoGeocodingAdapter.searchCity({ name: 'xyznoplace' });
			expect(result).toBeNull();
		});
	});
});
