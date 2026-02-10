import { describe, it, expect, vi } from 'vitest';
import { createWeatherAppService } from './weatherService';
import type { GeocodingPort } from '../domain/geocoding';
import type { WeatherServicePort } from '../domain/weather';

function stubGeo(overrides: Partial<GeocodingPort> = {}): GeocodingPort {
	return {
		searchCities: vi.fn(async () => null),
		searchCity: vi.fn(async () => null),
		...overrides
	};
}

function stubWeather(overrides: Partial<WeatherServicePort> = {}): WeatherServicePort {
	return {
		getForecast: vi.fn(async () => ({
			time: ['2025-01-01'],
			temperature_min: [5],
			temperature_max: [12],
			weather_code: [3]
		})),
		...overrides
	};
}

describe('createWeatherAppService', () => {
	it('returns forecast when city is found', async () => {
		const geo = stubGeo({
			searchCity: vi.fn(async () => ({
				name: 'Oslo',
				latitude: 59.91,
				longitude: 10.75,
				country: 'Norway',
				country_code: 'NO'
			}))
		});
		const weather = stubWeather();
		const svc = createWeatherAppService({ geo, weather });

		const result = await svc.getForecastForCity('Oslo');

		expect(result).not.toBeNull();
		expect(result!.location).toBe('Oslo');
		expect(result!.forecast.weather_code).toEqual([3]);
	});

	it('returns null when city is not found', async () => {
		const svc = createWeatherAppService({ geo: stubGeo(), weather: stubWeather() });
		const result = await svc.getForecastForCity('Atlantis');
		expect(result).toBeNull();
	});

	it('does not call weather API if geocoding fails', async () => {
		const weather = stubWeather();
		const svc = createWeatherAppService({ geo: stubGeo(), weather });

		await svc.getForecastForCity('Nowhere');

		expect(weather.getForecast).not.toHaveBeenCalled();
	});

	it('passes geocoded coordinates to weather port', async () => {
		const geo = stubGeo({
			searchCity: vi.fn(async () => ({
				name: 'Cairo',
				latitude: 30.04,
				longitude: 31.24,
				country: 'Egypt',
				country_code: 'EG'
			}))
		});
		const weather = stubWeather();
		const svc = createWeatherAppService({ geo, weather });

		await svc.getForecastForCity('Cairo');

		expect(weather.getForecast).toHaveBeenCalledWith(
			expect.objectContaining({ latitude: 30.04, longitude: 31.24 })
		);
	});
});
