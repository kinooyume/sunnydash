import { describe, it, expect, vi } from 'vitest';
import { createWeatherAppService } from './weatherService';
import type { GeocodingPort, ReverseGeocodingPort, WeatherServicePort, City, WeatherForecast } from '../domain';

const parisCity: City = {
	name: 'Paris',
	latitude: 48.8566,
	longitude: 2.3522,
	country: 'France',
	country_code: 'FR'
};

const fakeForecast: WeatherForecast = {
	time: ['2025-01-01'],
	temperature_min: [5],
	temperature_max: [12],
	weather_code: [0]
};

function createMocks() {
	const geo: GeocodingPort = {
		searchCities: vi.fn(),
		searchCity: vi.fn()
	};
	const reverseGeo: ReverseGeocodingPort = {
		reverseGeocode: vi.fn()
	};
	const weather: WeatherServicePort = {
		getForecast: vi.fn()
	};
	return { geo, reverseGeo, weather };
}

describe('createWeatherAppService', () => {
	describe('getForecastForCity', () => {
		it('returns forecast when city is found', async () => {
			const { geo, reverseGeo, weather } = createMocks();
			vi.mocked(geo.searchCity).mockResolvedValue(parisCity);
			vi.mocked(weather.getForecast).mockResolvedValue(fakeForecast);

			const service = createWeatherAppService({ geo, reverseGeo, weather });
			const result = await service.getForecastForCity('Paris');

			expect(result).toEqual({
				location: 'Paris',
				country: 'France',
				forecast: fakeForecast
			});
			expect(geo.searchCity).toHaveBeenCalledWith({ name: 'Paris' });
			expect(weather.getForecast).toHaveBeenCalledWith(parisCity);
		});

		it('returns null when city is not found', async () => {
			const { geo, reverseGeo, weather } = createMocks();
			vi.mocked(geo.searchCity).mockResolvedValue(null);

			const service = createWeatherAppService({ geo, reverseGeo, weather });
			const result = await service.getForecastForCity('Atlantis');

			expect(result).toBeNull();
			expect(weather.getForecast).not.toHaveBeenCalled();
		});
	});

	describe('getForecastForLocation', () => {
		it('returns forecast for a given city', async () => {
			const { geo, reverseGeo, weather } = createMocks();
			vi.mocked(weather.getForecast).mockResolvedValue(fakeForecast);

			const service = createWeatherAppService({ geo, reverseGeo, weather });
			const result = await service.getForecastForLocation(parisCity);

			expect(result).toEqual({
				location: 'Paris',
				country: 'France',
				forecast: fakeForecast
			});
			expect(weather.getForecast).toHaveBeenCalledWith(parisCity);
		});
	});

	describe('getForecastForCoords', () => {
		it('returns forecast with city name from reverse geocoding', async () => {
			const { geo, reverseGeo, weather } = createMocks();
			vi.mocked(reverseGeo.reverseGeocode).mockResolvedValue(parisCity);
			vi.mocked(weather.getForecast).mockResolvedValue(fakeForecast);

			const service = createWeatherAppService({ geo, reverseGeo, weather });
			const coords = { latitude: 48.8566, longitude: 2.3522 };
			const result = await service.getForecastForCoords(coords);

			expect(result).toEqual({
				location: 'Paris',
				country: 'France',
				forecast: fakeForecast
			});
			expect(reverseGeo.reverseGeocode).toHaveBeenCalledWith(coords);
			expect(weather.getForecast).toHaveBeenCalledWith(coords);
		});

		it('falls back to "Current Location" when reverse geocoding returns null', async () => {
			const { geo, reverseGeo, weather } = createMocks();
			vi.mocked(reverseGeo.reverseGeocode).mockResolvedValue(null);
			vi.mocked(weather.getForecast).mockResolvedValue(fakeForecast);

			const service = createWeatherAppService({ geo, reverseGeo, weather });
			const result = await service.getForecastForCoords({ latitude: 0, longitude: 0 });

			expect(result).toEqual({
				location: 'Current Location',
				country: '',
				forecast: fakeForecast
			});
		});
	});
});
