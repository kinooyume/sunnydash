import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'VITE_USE_MOCK=true bun run build && bun run preview',
		port: 4173,
		reuseExistingServer: true
	},
	testDir: 'e2e',
	timeout: 30000,
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				launchOptions: {
					executablePath: '/usr/bin/chromium',
					args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
				}
			}
		}
	]
});
