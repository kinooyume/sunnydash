import { describe, it, expect, vi, beforeEach } from 'vitest';
import { openMeteoWeatherAdapter } from './openMeteoWeather';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
	mockFetch.mockReset();
});

describe('openMeteoWeatherAdapter', () => {
	it('returns mapped forecast data', async () => {
		const apiResponse = {
			daily: {
				time: ['2025-01-01', '2025-01-02'],
				temperature_2m_min: [2, 3],
				temperature_2m_max: [8, 9],
				weather_code: [0, 1]
			}
		};
		mockFetch.mockResolvedValue({ json: () => Promise.resolve(apiResponse) });

		const result = await openMeteoWeatherAdapter.getForecast({
			latitude: 48.85,
			longitude: 2.35
		});

		expect(result).toEqual({
			time: ['2025-01-01', '2025-01-02'],
			temperature_min: [2, 3],
			temperature_max: [8, 9],
			weather_code: [0, 1]
		});
	});

	it('sends correct URL with coordinates', async () => {
		mockFetch.mockResolvedValue({
			json: () =>
				Promise.resolve({
					daily: {
						time: [],
						temperature_2m_min: [],
						temperature_2m_max: [],
						weather_code: []
					}
				})
		});

		await openMeteoWeatherAdapter.getForecast({ latitude: 35.67, longitude: 139.65 });

		expect(mockFetch).toHaveBeenCalledWith(
			'https://api.open-meteo.com/v1/forecast?latitude=35.67&longitude=139.65&daily=temperature_2m_min,temperature_2m_max,weather_code&timezone=auto'
		);
	});
});
