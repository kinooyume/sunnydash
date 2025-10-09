import type { Coordinates, WeatherForecast, WeatherServicePort } from '../../../domain/weather';

export const openMeteoWeatherAdapter: WeatherServicePort = {
	getForecast: async ({ latitude, longitude }: Coordinates): Promise<WeatherForecast> => {
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max,weather_code&timezone=auto`;
		const res = await fetch(url);
		const data = await res.json();

		return {
			time: data.daily.time,
			temperature_min: data.daily.temperature_2m_min,
			temperature_max: data.daily.temperature_2m_max,
			weather_code: data.daily.weather_code
		};
	}
};
