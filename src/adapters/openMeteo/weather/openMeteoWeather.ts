import type { Coordinates, WeatherForecast, WeatherServicePort } from '../../../domain/weather';

export const createOpenMeteoWeatherAdapter = (): WeatherServicePort => {
	const getForecast = async ({ latitude, longitude }: Coordinates): Promise<WeatherForecast> => {
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max&timezone=auto`;
		const res = await fetch(url);
		const data = await res.json();

		return {
			time: data.daily.time,
			temperature_min: data.daily.temperature_2m_min,
			temperature_max: data.daily.temperature_2m_max
		};
	};

	return { getForecast };
};
