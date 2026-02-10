import { describe, it, expect } from 'vitest';
import { getWeatherIconPath, getWeatherDescription } from './weatherIcon';

describe('getWeatherIconPath', () => {
	it('returns sun icon for clear sky', () => {
		expect(getWeatherIconPath(0)).toBe('/Icons8/icons8-smiling-sun-100.png');
	});

	it('returns rain icon for WMO code 61', () => {
		expect(getWeatherIconPath(61)).toBe('/Icons8/icons8-rain-100.png');
	});

	it('returns snow icon for WMO code 71', () => {
		expect(getWeatherIconPath(71)).toBe('/Icons8/icons8-snow-100.png');
	});

	it('returns storm icon for thunderstorm', () => {
		expect(getWeatherIconPath(95)).toBe('/Icons8/icons8-storm-100.png');
	});

	it('falls back to cloud icon for unknown codes', () => {
		expect(getWeatherIconPath(999)).toBe('/Icons8/icons8-cloud-100.png');
	});
});

describe('getWeatherDescription', () => {
	it.each([
		[0, 'Clear sky'],
		[2, 'Partly cloudy'],
		[45, 'Foggy'],
		[61, 'Rainy'],
		[75, 'Snowy'],
		[95, 'Thunderstorm'],
		[99, 'Thunderstorm with hail']
	])('maps WMO code %i to "%s"', (code, expected) => {
		expect(getWeatherDescription(code)).toBe(expected);
	});

	it('defaults to "Cloudy" for unmapped codes', () => {
		expect(getWeatherDescription(-1)).toBe('Cloudy');
	});
});
