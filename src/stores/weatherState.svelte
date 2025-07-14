<script module lang="ts">
	import { type WeatherState, WeatherStateStatusKind } from './weatherState.types';

	export const weatherState = $state<WeatherState>({
		status: { kind: WeatherStateStatusKind.INITIAL }
	});
</script>
