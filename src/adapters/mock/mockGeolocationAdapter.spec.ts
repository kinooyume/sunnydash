import { describe, it, expect } from 'vitest';
import { mockGeolocationAdapter } from './mockGeolocationAdapter';

describe('mockGeolocationAdapter', () => {
	it('returns Paris coordinates', async () => {
		const coords = await mockGeolocationAdapter.getCurrentPosition();
		expect(coords).not.toBeNull();
		expect(coords!.latitude).toBe(48.8566);
		expect(coords!.longitude).toBe(2.3522);
	});

	it('returns same coordinates on repeated calls', async () => {
		const first = await mockGeolocationAdapter.getCurrentPosition();
		const second = await mockGeolocationAdapter.getCurrentPosition();
		expect(first).toEqual(second);
	});
});
