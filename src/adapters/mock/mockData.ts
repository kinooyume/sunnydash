import type { City, WeatherForecast } from '../../domain';

export const mockCities: Record<string, City[]> = {
	paris: [
		{ name: 'Paris', latitude: 48.8566, longitude: 2.3522, country: 'France', country_code: 'FR' },
		{
			name: 'Paris',
			latitude: 33.6609,
			longitude: -95.5555,
			country: 'United States',
			country_code: 'US'
		}
	],
	london: [
		{
			name: 'London',
			latitude: 51.5074,
			longitude: -0.1278,
			country: 'United Kingdom',
			country_code: 'GB'
		},
		{ name: 'London', latitude: 42.9834, longitude: -81.233, country: 'Canada', country_code: 'CA' }
	],
	tokyo: [
		{ name: 'Tokyo', latitude: 35.6762, longitude: 139.6503, country: 'Japan', country_code: 'JP' }
	],
	sydney: [
		{
			name: 'Sydney',
			latitude: -33.8688,
			longitude: 151.2093,
			country: 'Australia',
			country_code: 'AU'
		}
	],
	berlin: [
		{ name: 'Berlin', latitude: 52.52, longitude: 13.405, country: 'Germany', country_code: 'DE' }
	],
	madrid: [
		{ name: 'Madrid', latitude: 40.4168, longitude: -3.7038, country: 'Spain', country_code: 'ES' }
	],
	rome: [
		{ name: 'Rome', latitude: 41.9028, longitude: 12.4964, country: 'Italy', country_code: 'IT' }
	]
};

export function createMockForecast(baseTemp: number = 20): WeatherForecast {
	const today = new Date();
	const times: string[] = [];
	const tempMin: number[] = [];
	const tempMax: number[] = [];
	const weatherCodes: number[] = [];

	const conditions = [0, 1, 2, 3, 61, 80, 95]; // Various weather codes

	for (let i = 0; i < 7; i++) {
		const date = new Date(today);
		date.setDate(today.getDate() + i);
		times.push(date.toISOString().split('T')[0]);

		const variation = Math.floor(Math.random() * 6) - 3;
		tempMin.push(baseTemp + variation - 5);
		tempMax.push(baseTemp + variation + 5);
		weatherCodes.push(conditions[i % conditions.length]);
	}

	return {
		time: times,
		temperature_min: tempMin,
		temperature_max: tempMax,
		weather_code: weatherCodes
	};
}

export const mockForecasts: Record<string, WeatherForecast> = {
	paris: createMockForecast(18),
	london: createMockForecast(14),
	tokyo: createMockForecast(22),
	sydney: createMockForecast(25),
	berlin: createMockForecast(12),
	madrid: createMockForecast(28),
	rome: createMockForecast(24)
};
