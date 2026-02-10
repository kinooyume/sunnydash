<script module lang="ts">
	import type { TemperatureUnit } from './temperatureUnit.types';

	export const temperatureUnit = $state<{ value: TemperatureUnit }>({ value: 'C' });

	export function toggleUnit(): void {
		temperatureUnit.value = temperatureUnit.value === 'C' ? 'F' : 'C';
	}

	export function convertTemp(celsius: number): number {
		if (temperatureUnit.value === 'F') {
			return Math.round(celsius * 9 / 5 + 32);
		}
		return celsius;
	}
</script>
