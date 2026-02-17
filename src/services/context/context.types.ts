import type { TemperatureUnit } from '../../stores/temperatureUnit.types';
import type { StoragePort, GeolocationPort, NotificationPort } from '../../domain';

export type Context<T> = () => T;

export interface TemperatureUnitContext {
	unit: TemperatureUnit;
	toggleUnit: () => void;
	convertTemp: (celsius: number) => number;
}

export type StorageContext = StoragePort;
export type GeolocationContext = GeolocationPort;
export type NotificationContext = NotificationPort;
