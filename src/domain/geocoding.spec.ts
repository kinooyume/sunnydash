import { describe, it, expect } from 'vitest';
import { createEmptyGeocodingPort } from './geocoding';

describe('createEmptyGeocodingPort', () => {
	const port = createEmptyGeocodingPort();

	it('searchCities returns null', async () => {
		expect(await port.searchCities({ name: 'paris' })).toBeNull();
	});

	it('searchCity returns null', async () => {
		expect(await port.searchCity({ name: 'paris' })).toBeNull();
	});
});
