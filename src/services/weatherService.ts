import type { GeocodingPort } from '../domain/geocoding';
import type { WeatherServicePort } from '../domain/weather';

export const createWeatherAppService = (
  geo: GeocodingPort,
  weather: WeatherServicePort
) => {
  const getForecastForCity = async (city: string) => {
    const loc = await geo.searchCity({ name: city });
    if (!loc) return null;
    return {
      location: loc.name,
      forecast: await weather.getForecast(loc)
    };
  };

  return { getForecastForCity };
};
