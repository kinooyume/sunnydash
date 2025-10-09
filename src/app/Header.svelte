<script lang="ts">
	import CitySearch from "../components/features/CitySearch/CitySearch.svelte";

</script>

<header>
<CitySearch  placeholder="Search for a city" />
</header>

<style>
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1.5rem;
		background: var(--surface);
		border-bottom: 1px solid var(--border);
	}
</style>
