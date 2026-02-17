import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nominatimReverseGeocodingAdapter } from './nominatimReverseGeocodingAdapter';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
	mockFetch.mockReset();
});

describe('nominatimReverseGeocodingAdapter', () => {
	it('returns city from address response', async () => {
		mockFetch.mockResolvedValue({
			json: () =>
				Promise.resolve({
					address: { city: 'Paris', country: 'France', country_code: 'fr' },
					name: 'Paris'
				})
		});

		const result = await nominatimReverseGeocodingAdapter.reverseGeocode({
			latitude: 48.85,
			longitude: 2.35
		});

		expect(result).toEqual({
			name: 'Paris',
			latitude: 48.85,
			longitude: 2.35,
			country: 'France',
			country_code: 'FR'
		});
	});

	it('falls back to town when city is absent', async () => {
		mockFetch.mockResolvedValue({
			json: () =>
				Promise.resolve({
					address: { town: 'Versailles', country: 'France', country_code: 'fr' },
					name: 'Versailles'
				})
		});

		const result = await nominatimReverseGeocodingAdapter.reverseGeocode({
			latitude: 48.8,
			longitude: 2.12
		});

		expect(result!.name).toBe('Versailles');
	});

	it('falls back to village when city and town are absent', async () => {
		mockFetch.mockResolvedValue({
			json: () =>
				Promise.resolve({
					address: { village: 'Giverny', country: 'France', country_code: 'fr' },
					name: 'Giverny'
				})
		});

		const result = await nominatimReverseGeocodingAdapter.reverseGeocode({
			latitude: 49.07,
			longitude: 1.53
		});

		expect(result!.name).toBe('Giverny');
	});

	it('falls back to data.name when no city/town/village', async () => {
		mockFetch.mockResolvedValue({
			json: () =>
				Promise.resolve({
					address: { country: 'France', country_code: 'fr' },
					name: 'Some Region'
				})
		});

		const result = await nominatimReverseGeocodingAdapter.reverseGeocode({
			latitude: 46.0,
			longitude: 2.0
		});

		expect(result!.name).toBe('Some Region');
	});

	it('returns null when address is missing', async () => {
		mockFetch.mockResolvedValue({
			json: () => Promise.resolve({ error: 'Unable to geocode' })
		});

		const result = await nominatimReverseGeocodingAdapter.reverseGeocode({
			latitude: 0,
			longitude: 0
		});

		expect(result).toBeNull();
	});

	it('uppercases country_code', async () => {
		mockFetch.mockResolvedValue({
			json: () =>
				Promise.resolve({
					address: { city: 'Berlin', country: 'Germany', country_code: 'de' },
					name: 'Berlin'
				})
		});

		const result = await nominatimReverseGeocodingAdapter.reverseGeocode({
			latitude: 52.52,
			longitude: 13.4
		});

		expect(result!.country_code).toBe('DE');
	});

	it('sends correct URL with coordinates', async () => {
		mockFetch.mockResolvedValue({
			json: () =>
				Promise.resolve({
					address: { city: 'Test', country: 'Test', country_code: 'tt' },
					name: 'Test'
				})
		});

		await nominatimReverseGeocodingAdapter.reverseGeocode({
			latitude: 51.5,
			longitude: -0.12
		});

		expect(mockFetch).toHaveBeenCalledWith(
			'https://nominatim.openstreetmap.org/reverse?lat=51.5&lon=-0.12&format=json&zoom=10'
		);
	});
});
