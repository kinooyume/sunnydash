<script lang="ts">
	import Header from '../app/Header.svelte';
	import WeatherContext from '../services/context/WeatherContext.svelte';

	let { children } = $props();
</script>

<WeatherContext>
	<Header />
	<div class="container">
		{@render children()}
	</div>
</WeatherContext>

<style>
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

		font-family: system-ui, -apple-system, sans-serif;
		background: var(--background);
		color: var(--text);
		margin: 0;
		padding: 0;
	}

	.container {
		padding: 1.5rem;
	}
</style>
