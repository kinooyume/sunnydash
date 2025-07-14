import type { CreateWeatherAppServiceProps, WeatherAppService } from './weatherService.types';

export const createWeatherAppService = ({ geo, weather }: CreateWeatherAppServiceProps) : WeatherAppService => ({
	getForecastForCity: async (city: string) => {
		const loc = await geo.searchCity({ name: city });
		if (!loc) return null;
		return {
			location: loc.name,
			forecast: await weather.getForecast(loc)
		};
	}
});
