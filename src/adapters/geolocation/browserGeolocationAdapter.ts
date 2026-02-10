import type { GeolocationPort } from '../../domain';

export const browserGeolocationAdapter: GeolocationPort = {
	getCurrentPosition: () =>
		new Promise((resolve) => {
			if (!navigator.geolocation) {
				resolve(null);
				return;
			}
			navigator.geolocation.getCurrentPosition(
				(pos) =>
					resolve({
						latitude: pos.coords.latitude,
						longitude: pos.coords.longitude
					}),
				() => resolve(null)
			);
		})
};
