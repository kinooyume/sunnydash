import type { WeatherForecast } from '../domain';

export enum WeatherStateStatusKind {
	INITIAL = 'initial',
	OK = 'ok',
	LOADING = 'pending',
	ERROR = 'error'
}

export type WeatherStateStatus =
	| {
			kind: WeatherStateStatusKind.INITIAL;
	  }
	| {
			kind: WeatherStateStatusKind.OK;
	  }
	| { kind: WeatherStateStatusKind.LOADING }
	| { kind: WeatherStateStatusKind.ERROR; error: string };

export type WeatherState = {
	status: WeatherStateStatus;
	city?: string;
	country?: string;
	forecast?: WeatherForecast;
	weatherAdapter?: string;
	geocodingAdapter?: string;
};
