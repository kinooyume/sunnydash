<script lang="ts">
	import { getContext } from 'svelte';
	import { WeatherStateStatusKind } from '../../../stores';
	import { SearchCombobox } from '../../shared/SearchCombobox';
	import { CitySearchItem, type CityItem } from './City';
	import type { SearchComboboxCitiesProps } from './CitySearch.types';
	import type { Context, NotificationContext } from '../../../services/context';
	import type { WeatherDomainsState, WeatherState } from '../../../stores';
	import type { City } from '../../../domain';
	import type { ForecastResult } from '../../../services/weatherService.types';
	import { WEATHER_ADAPTERS, GEOCODING_ADAPTERS } from '../../../stores/weatherDomainsState.svelte';

	let {
		items = $bindable([]),
		placeholder = $bindable(''),
		showList = $bindable(false),
		onSelect = $bindable(undefined)
	}: SearchComboboxCitiesProps = $props();

	let weatherDomains = getContext<Context<WeatherDomainsState>>('weather-domains');
	let weatherState = getContext<Context<WeatherState>>('weather-state');
	let notification = getContext<Context<NotificationContext>>('notification');

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

	function applyForecast(result: ForecastResult) {
		weatherState().city = result.location;
		weatherState().country = result.country;
		weatherState().forecast = result.forecast;
		weatherState().weatherAdapter = WEATHER_ADAPTERS[weatherDomains().weatherKey].label;
		weatherState().geocodingAdapter = GEOCODING_ADAPTERS[weatherDomains().geocodingKey].label;
		weatherState().status = { kind: WeatherStateStatusKind.OK };
	}

	function handleError(message: string) {
		weatherState().status = { kind: WeatherStateStatusKind.ERROR, error: message };
		notification().show(message, 'error');
	}

	onSelect = async (item: CityItem) => {
		showList = false;
		weatherState().status = { kind: WeatherStateStatusKind.LOADING };
		try {
			applyForecast(await weatherDomains().services.getForecastForLocation(item));
		} catch {
			handleError('Failed to load weather data');
		}
	};

	const onPressEnter = async (cityName: string) => {
		showList = false;
		if (cityName === '') return;
		weatherState().status = { kind: WeatherStateStatusKind.LOADING };
		try {
			const result = await weatherDomains().services.getForecastForCity(cityName);
			if (!result) {
				weatherState().status = {
					kind: WeatherStateStatusKind.ERROR,
					error: 'No data found for the specified city'
				};
				return;
			}
			applyForecast(result);
		} catch {
			handleError('Failed to load weather data');
		}
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
		} catch {
			notification().show('Error searching cities', 'error');
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
