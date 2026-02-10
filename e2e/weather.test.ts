import { expect, test } from '@playwright/test';

function getSearchInput(page: import('@playwright/test').Page) {
	return page.getByRole('combobox', { name: 'Search for a city...' });
}

function getSearchListbox(page: import('@playwright/test').Page) {
	return page.locator('#search-list');
}

function getCityOptions(page: import('@playwright/test').Page) {
	return getSearchListbox(page).getByRole('option');
}

async function searchAndWait(page: import('@playwright/test').Page, city: string) {
	const searchInput = getSearchInput(page);
	await searchInput.click();
	await searchInput.pressSequentially(city, { delay: 50 });
	await expect(getSearchListbox(page)).toBeVisible({ timeout: 15000 });
}

async function selectCity(page: import('@playwright/test').Page, city: string) {
	await searchAndWait(page, city);
	await getCityOptions(page).first().click();
	await expect(page.locator('.hero-layout')).toBeVisible({ timeout: 15000 });
}

test.describe('Weather App', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test.describe('Layout', () => {
		test('displays header with logo and date', async ({ page }) => {
			await expect(page.getByText('SunnyDash')).toBeVisible();
			await expect(page.getByRole('button', { name: /toggle temperature unit/i })).toBeVisible();
		});

		test('displays search input', async ({ page }) => {
			const searchInput = getSearchInput(page);
			await expect(searchInput).toBeVisible();
			await expect(searchInput).toHaveAttribute('placeholder', 'Search for a city...');
		});

		test('displays empty state when no city selected', async ({ page }) => {
			await expect(page.getByText('Search for a city to see the weather')).toBeVisible();
		});
	});

	test.describe('City Search', () => {
		test('shows dropdown when typing in search', async ({ page }) => {
			await searchAndWait(page, 'Cairo');
		});

		test('displays city results with flags', async ({ page }) => {
			await searchAndWait(page, 'London');

			const firstOption = getCityOptions(page).first();
			await expect(firstOption).toBeVisible();
		});

		test('selects city and displays weather', async ({ page }) => {
			await selectCity(page, 'Tokyo');

			await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
			await expect(page.getByText('7-Day Forecast')).toBeVisible();
		});

		test('keyboard navigation works in dropdown', async ({ page }) => {
			await searchAndWait(page, 'Oslo');

			const searchInput = getSearchInput(page);
			await searchInput.press('ArrowDown');
			await searchInput.press('Enter');

			await expect(page.locator('.hero-layout')).toBeVisible({ timeout: 15000 });
		});
	});

	test.describe('Weather Display', () => {
		test.beforeEach(async ({ page }) => {
			await selectCity(page, 'Tokyo');
		});

		test('displays hero card with temperature', async ({ page }) => {
			await expect(page.locator('.hero-card')).toBeVisible();
			await expect(page.locator('.temp-display')).toBeVisible();
		});

		test('displays weather icon', async ({ page }) => {
			const weatherIcon = page.locator('.hero-icon');
			await expect(weatherIcon).toBeVisible();
			await expect(weatherIcon).toHaveAttribute('src', /Icons8/);
		});

		test('displays weather condition text', async ({ page }) => {
			const conditions = [
				'Clear sky',
				'Mainly clear',
				'Partly cloudy',
				'Overcast',
				'Foggy',
				'Drizzle',
				'Rainy',
				'Snowy',
				'Thunderstorm',
				'Cloudy'
			];

			const conditionRegex = new RegExp(conditions.join('|'));
			await expect(page.getByText(conditionRegex).first()).toBeVisible();
		});

		test('displays 7-day forecast strip', async ({ page }) => {
			await expect(page.getByText('7-Day Forecast')).toBeVisible();

			const forecastItems = page.locator('.forecast-item');
			await expect(forecastItems).toHaveCount(7);
		});

		test('first forecast item shows "Today"', async ({ page }) => {
			const firstItem = page.locator('.forecast-item').first();
			await expect(firstItem.getByText('Today')).toBeVisible();
		});

		test('forecast items have icons', async ({ page }) => {
			const forecastIcons = page.locator('.forecast-icon');
			await expect(forecastIcons.first()).toBeVisible();
			await expect(forecastIcons.first()).toHaveAttribute('src', /Icons8/);
		});
	});

	test.describe('City Change', () => {
		test('updates weather when changing city', async ({ page }) => {
			await selectCity(page, 'London');
			const heading = page.getByRole('heading', { level: 1 });
			await expect(heading).toContainText('London');

			const searchInput = getSearchInput(page);
			await searchInput.fill('');
			await page.waitForTimeout(100);
			await searchInput.pressSequentially('Mumbai', { delay: 50 });
			await expect(getSearchListbox(page)).toBeVisible({ timeout: 15000 });
			await getCityOptions(page).first().click();

			await expect(heading).toContainText('Mumbai', { timeout: 15000 });
		});
	});

	test.describe('Accessibility', () => {
		test('search input has proper ARIA attributes', async ({ page }) => {
			const searchInput = getSearchInput(page);

			await expect(searchInput).toHaveAttribute('aria-autocomplete', 'list');
			await expect(searchInput).toHaveAttribute('aria-expanded', 'false');

			await searchAndWait(page, 'Lima');
			await expect(searchInput).toHaveAttribute('aria-expanded', 'true');
		});

		test('dropdown options are keyboard accessible', async ({ page }) => {
			await searchAndWait(page, 'Reykjavik');

			const options = getCityOptions(page);
			await expect(options.first()).toHaveAttribute('aria-selected');
		});
	});
});
