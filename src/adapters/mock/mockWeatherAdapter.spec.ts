import { describe, it, expect } from 'vitest';
import { mockWeatherAdapter } from './mockWeatherAdapter';

describe('mockWeatherAdapter', () => {
	it('returns known forecast for Paris coords', async () => {
		const forecast = await mockWeatherAdapter.getForecast({
			latitude: 48.8566,
			longitude: 2.3522
		});
		expect(forecast.time).toHaveLength(7);
		expect(forecast.temperature_min).toHaveLength(7);
		expect(forecast.temperature_max).toHaveLength(7);
		expect(forecast.weather_code).toHaveLength(7);
	});

	it('returns generated forecast for unknown coords', async () => {
		const forecast = await mockWeatherAdapter.getForecast({
			latitude: 0,
			longitude: 0
		});
		expect(forecast.time).toHaveLength(7);
	});

	it('returns 7 days of data', async () => {
		const forecast = await mockWeatherAdapter.getForecast({
			latitude: 51.5074,
			longitude: -0.1278
		});
		expect(forecast.time).toHaveLength(7);
		expect(forecast.temperature_min).toHaveLength(7);
		expect(forecast.temperature_max).toHaveLength(7);
		expect(forecast.weather_code).toHaveLength(7);
	});
});
