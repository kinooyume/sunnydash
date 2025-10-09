export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherForecast {
  time: string[];
  temperature_min: number[];
  temperature_max: number[];
  weather_code: number[];
}

export interface WeatherServicePort {
  getForecast(coords: Coordinates): Promise<WeatherForecast>;
}
