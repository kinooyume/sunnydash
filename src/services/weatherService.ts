import type { CreateWeatherAppServiceProps, WeatherAppService } from './weatherService.types';

export const createWeatherAppService = ({
	geo,
	reverseGeo,
	weather
}: CreateWeatherAppServiceProps): WeatherAppService => ({
	getForecastForCity: async (name) => {
		const loc = await geo.searchCity({ name });
		if (!loc) return null;
		return {
			location: loc.name,
			country: loc.country,
			forecast: await weather.getForecast(loc)
		};
	},
	getForecastForLocation: async (city) => ({
		location: city.name,
		country: city.country,
		forecast: await weather.getForecast(city)
	}),
	getForecastForCoords: async (coords) => {
		const [city, forecast] = await Promise.all([
			reverseGeo.reverseGeocode(coords),
			weather.getForecast(coords)
		]);
		return {
			location: city?.name ?? 'Current Location',
			country: city?.country ?? '',
			forecast
		};
	}
});
