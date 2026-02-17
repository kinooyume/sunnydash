import type { GeolocationPort } from '../../domain';

export const mockGeolocationAdapter: GeolocationPort = {
	getCurrentPosition: () => Promise.resolve({ latitude: 48.8566, longitude: 2.3522 })
};
