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
		--primary: #6750a4;
		--on-primary: #fff;
		--primary-container: #eaddff;
		--on-primary-container: #21005d;
		--surface: #f6f6f6;
		--surface-container-high: #fff;
		--on-surface: #222;
		font-family: 'Roboto', 'Google Sans', Arial, sans-serif;
		background: var(--surface);
		margin: 0;
		padding: 0;
	}

	.container {
		padding: 1rem;
	}
</style>
