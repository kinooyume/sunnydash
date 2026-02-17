import type { Coordinates } from './weather';

export interface GeolocationPort {
	getCurrentPosition(): Promise<Coordinates | null>;
}
