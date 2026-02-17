<script lang="ts">
	import Header from '../app/Header.svelte';
	import Footer from '../app/Footer.svelte';
	import { Toast } from '../components/ui';
	import WeatherContext from '../services/context/WeatherContext.svelte';

	let { children } = $props();

	const title = 'SunnyDash - Modern Weather App';
	const description =
		'A beautiful, modern weather dashboard. Check forecasts for any city with a clean, minimalist interface.';
	const themeColor = '#181927';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content={themeColor} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="SunnyDash" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />

	<link rel="icon" type="image/png" href="/Icons8/icons8-smiling-sun-50.png" />
	<link rel="apple-touch-icon" href="/Icons8/icons8-smiling-sun-100.png" />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<WeatherContext>
	<div class="app">
		<div class="noise"></div>
		<Header />
		<main class="container">
			{@render children()}
		</main>
		<Footer />
		<Toast />
	</div>
</WeatherContext>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		--background: #181927;
		--surface: #1c2638;
		--surface-hover: #313d50;
		--text: #e0e0e0;
		--text-light: #f6f5f7;
		--accent: #f8ba88;
		--accent-secondary: #c9a88d;
		--border: rgba(255, 255, 255, 0.1);
		--border-hover: rgba(255, 255, 255, 0.2);

		--glass: rgba(255, 255, 255, 0.08);
		--glass-border: rgba(255, 255, 255, 0.12);
		--glass-hover: rgba(255, 255, 255, 0.12);

		--radius-sm: 12px;
		--radius-md: 20px;
		--radius-lg: 28px;
		--radius-full: 9999px;

		font-family:
			'Inter',
			system-ui,
			-apple-system,
			sans-serif;
		background: linear-gradient(145deg, #1a1f3c 0%, #0f1628 50%, #0a1520 100%);
		color: var(--text);
		margin: 0;
		padding: 0;
		min-height: 100vh;
	}

	.app {
		position: relative;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.noise {
		position: fixed;
		inset: 0;
		pointer-events: none;
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
		z-index: 1;
	}

	.container {
		position: relative;
		z-index: 2;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 24px 48px;
		flex: 1;
	}
</style>
