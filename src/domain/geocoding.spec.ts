import { describe, it, expect } from 'vitest';
import { createEmptyGeocodingPort } from './geocoding';

describe('createEmptyGeocodingPort', () => {
	it('searchCities returns null', async () => {
		const port = createEmptyGeocodingPort();
		expect(await port.searchCities({ name: 'whatever' })).toBeNull();
	});

	it('searchCity returns null', async () => {
		const port = createEmptyGeocodingPort();
		expect(await port.searchCity({ name: 'test' })).toBeNull();
	});
});
