import type { City } from '../../domain/geocoding';
import type { WeatherForecast } from '../../domain/weather';

export const mockCities: Record<string, City[]> = {
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
	reykjavik: [
		{
			name: 'Reykjavik',
			latitude: 64.1466,
			longitude: -21.9426,
			country: 'Iceland',
			country_code: 'IS'
		}
	],
	cairo: [
		{ name: 'Cairo', latitude: 30.0444, longitude: 31.2357, country: 'Egypt', country_code: 'EG' }
	],
	mumbai: [
		{ name: 'Mumbai', latitude: 19.076, longitude: 72.8777, country: 'India', country_code: 'IN' }
	],
	oslo: [
		{ name: 'Oslo', latitude: 59.9139, longitude: 10.7522, country: 'Norway', country_code: 'NO' }
	],
	lima: [
		{ name: 'Lima', latitude: -12.0464, longitude: -77.0428, country: 'Peru', country_code: 'PE' }
	]
};

export function createMockForecast(
	baseTemp: number = 20,
	conditions: number[] = [0, 1, 2, 3, 61, 80, 95]
): WeatherForecast {
	const today = new Date();
	const times: string[] = [];
	const tempMin: number[] = [];
	const tempMax: number[] = [];
	const weatherCodes: number[] = [];

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
	london: createMockForecast(14, [3, 61, 63, 2, 80, 61, 3]),
	tokyo: createMockForecast(22, [0, 1, 2, 61, 0, 1, 95]),
	reykjavik: createMockForecast(-2, [75, 71, 45, 3, 73, 85, 77]),
	cairo: createMockForecast(35, [0, 0, 1, 0, 0, 1, 0]),
	mumbai: createMockForecast(30, [61, 63, 95, 80, 65, 96, 61]),
	oslo: createMockForecast(1, [71, 73, 3, 2, 75, 45, 71]),
	lima: createMockForecast(18, [2, 45, 48, 2, 3, 1, 45])
};
