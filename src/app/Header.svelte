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
		background: linear-gradient(90deg, #3f51b5 0%, #5c6bc0 100%);
		box-shadow: 0 2px 8px rgba(63,81,181,0.10);
		border-bottom-left-radius: 18px;
		border-bottom-right-radius: 18px;
	}
</style>
