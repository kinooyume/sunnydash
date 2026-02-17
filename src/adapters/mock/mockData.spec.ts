import { describe, it, expect } from 'vitest';
import { createMockForecast } from './mockData';

describe('createMockForecast', () => {
	it('returns 7 time entries', () => {
		const forecast = createMockForecast();
		expect(forecast.time).toHaveLength(7);
		expect(forecast.temperature_min).toHaveLength(7);
		expect(forecast.temperature_max).toHaveLength(7);
		expect(forecast.weather_code).toHaveLength(7);
	});

	it('starts with today', () => {
		const forecast = createMockForecast();
		const today = new Date().toISOString().split('T')[0];
		expect(forecast.time[0]).toBe(today);
	});

	it('generates consecutive days', () => {
		const forecast = createMockForecast();
		for (let i = 1; i < forecast.time.length; i++) {
			const prev = new Date(forecast.time[i - 1]);
			const curr = new Date(forecast.time[i]);
			const diffMs = curr.getTime() - prev.getTime();
			expect(diffMs).toBe(86400000);
		}
	});

	it('respects baseTemp — temperatures cluster around it', () => {
		const baseTemp = 30;
		const forecast = createMockForecast(baseTemp);
		for (const temp of forecast.temperature_min) {
			expect(temp).toBeGreaterThanOrEqual(baseTemp - 10);
			expect(temp).toBeLessThanOrEqual(baseTemp + 5);
		}
		for (const temp of forecast.temperature_max) {
			expect(temp).toBeGreaterThanOrEqual(baseTemp);
			expect(temp).toBeLessThanOrEqual(baseTemp + 15);
		}
	});

	it('cycles weather codes through conditions array', () => {
		const forecast = createMockForecast();
		const conditions = [0, 1, 2, 3, 61, 80, 95];
		for (let i = 0; i < 7; i++) {
			expect(forecast.weather_code[i]).toBe(conditions[i % conditions.length]);
		}
	});
});
