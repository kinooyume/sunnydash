import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';
import { WeatherStateStatusKind } from '../stores';
import type { WeatherState } from '../stores';

const mockWeatherState: WeatherState = {
	status: { kind: WeatherStateStatusKind.INITIAL }
};

describe('/+page.svelte', () => {
	test('should render empty state when no city selected', () => {
		render(Page, {
			context: new Map([['weather-state', () => mockWeatherState]])
		});
		expect(screen.getByText('Search for a city to see the weather')).toBeInTheDocument();
	});
});
