import { describe, it, expect } from 'vitest';
import { getWeatherIconPath, getWeatherDescription } from './weatherIcon';

describe('getWeatherIconPath', () => {
	it('returns clear sky icon for code 0', () => {
		expect(getWeatherIconPath(0)).toBe('/Icons8/icons8-smiling-sun-100.png');
	});

	it('returns fog icon for code 45', () => {
		expect(getWeatherIconPath(45)).toBe('/Icons8/icons8-fog-100.png');
	});

	it('returns rain icon for code 61', () => {
		expect(getWeatherIconPath(61)).toBe('/Icons8/icons8-rain-100.png');
	});

	it('returns storm icon for code 95', () => {
		expect(getWeatherIconPath(95)).toBe('/Icons8/icons8-storm-100.png');
	});

	it('returns snow icon for code 71', () => {
		expect(getWeatherIconPath(71)).toBe('/Icons8/icons8-snow-100.png');
	});

	it('returns default cloud icon for unknown code', () => {
		expect(getWeatherIconPath(999)).toBe('/Icons8/icons8-cloud-100.png');
	});
});

describe('getWeatherDescription', () => {
	it('returns "Clear sky" for code 0', () => {
		expect(getWeatherDescription(0)).toBe('Clear sky');
	});

	it('returns "Foggy" for code 45', () => {
		expect(getWeatherDescription(45)).toBe('Foggy');
	});

	it('returns "Rainy" for code 61', () => {
		expect(getWeatherDescription(61)).toBe('Rainy');
	});

	it('returns "Thunderstorm" for code 95', () => {
		expect(getWeatherDescription(95)).toBe('Thunderstorm');
	});

	it('returns "Cloudy" for unknown code', () => {
		expect(getWeatherDescription(999)).toBe('Cloudy');
	});
});
