<script module lang="ts">
	import { type WeatherDomainsState, WeatherDomainsStateStatus } from '.';
	import { openMeteoGeocodingAdapter, openMeteoWeatherAdapter } from '../adapters/openMeteo';
	import { createWeatherAppService } from '../services/weatherService';

	export const weatherDomains = $state<WeatherDomainsState>({
		status: WeatherDomainsStateStatus.OPEN_METEO,
		geocoding: openMeteoGeocodingAdapter,
		weather: openMeteoWeatherAdapter,
		services: createWeatherAppService({
			geo: openMeteoGeocodingAdapter,
			weather: openMeteoWeatherAdapter
		})
	});
</script>
