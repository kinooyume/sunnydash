import type { TemperatureUnit } from '../../stores/temperatureUnit.types';

export type Context<T> = () => T;

export interface TemperatureUnitContext {
	unit: TemperatureUnit;
	toggleUnit: () => void;
	convertTemp: (celsius: number) => number;
}
