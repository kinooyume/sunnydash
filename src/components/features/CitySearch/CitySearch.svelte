<script lang="ts">
	import { getContext } from 'svelte';
	import { WeatherStateStatusKind } from '../../../stores';
	import { SearchCombobox } from '../../shared/SearchCombobox';
	import { CitySearchItem, type CityItem } from './City';
	import type { SearchComboboxCitiesProps } from './CitySearch.types';
	import type { Context } from '../../../services/context';
	import WeatherDomainsState from '../../../stores/weatherDomainsState.svelte';
	import WeatherState from '../../../stores/weatherState.svelte';
	import type { City } from '../../../domain';

	let {
		items = $bindable([]),
		placeholder = $bindable(''),
		showList = $bindable(false),
		onSelect = $bindable(undefined)
	}: SearchComboboxCitiesProps = $props();

	let weatherDomains = getContext<Context<WeatherDomainsState>>('weather-domains');
	let weatherState = getContext<Context<WeatherState>>('weather-state');

	let inputValue = $state('');

	$effect(() => {
		const state = weatherState();
		if (state.status.kind === WeatherStateStatusKind.INITIAL) {
			inputValue = '';
			items = [];
		} else if (state.status.kind === WeatherStateStatusKind.OK && state.city) {
			inputValue = state.city;
			showList = false;
		}
	});

	const loadWeather = async (cityName: string) => {
		showList = false;
		if (cityName === '') {
			return;
		}

		weatherState().status = { kind: WeatherStateStatusKind.LOADING };

		try {
			const loc = await weatherDomains().geocoding.searchCity({ name: cityName });
			if (!loc) {
				weatherState().status = {
					kind: WeatherStateStatusKind.ERROR,
					error: 'No data found for the specified city'
				};
				return;
			}

			const city = loc.name;
			const forecast = await weatherDomains().weather.getForecast(loc);

			weatherState().city = city;
			weatherState().country = loc.country;
			weatherState().forecast = forecast;
			weatherState().status = { kind: WeatherStateStatusKind.OK };
		} catch (err) {
			weatherState().status = {
				kind: WeatherStateStatusKind.ERROR,
				error: 'Failed to load weather data'
			};
			console.error(err);
		}
	};

	onSelect = (item: CityItem) => {
		loadWeather(item.name);
	};

	const onPressEnter = (cityName: string) => {
		loadWeather(cityName);
	};

	const searchCities = async (inputValue: string): Promise<CityItem[]> => {
		try {
			const cities: City[] | null = await weatherDomains().geocoding.searchCities({
				name: inputValue,
				count: 12
			});
			return cities
				? cities.map((city, index) => ({
						id: index,
						name: city.name,
						latitude: city.latitude,
						longitude: city.longitude,
						country: city.country,
						country_code: city.country_code
					}))
				: [];
		} catch (error) {
			console.error('Error searching cities:', error);
			return [];
		}
	};

	const onKeyDown = async (inputValue: string) => {
		items = await searchCities(inputValue);
	};
</script>

<SearchCombobox bind:items bind:inputValue {placeholder} {onSelect} {onPressEnter} {onKeyDown}>
	{#snippet children(item)}
		<CitySearchItem item={item as CityItem} />
	{/snippet}
</SearchCombobox>
