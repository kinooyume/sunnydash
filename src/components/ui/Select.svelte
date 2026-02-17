<script lang="ts">
	interface Option {
		value: string;
		label: string;
	}

	interface Props {
		options: Option[];
		value: string;
		label?: string;
		onchange?: (value: string) => void;
	}

	let { options, value = $bindable(), label, onchange }: Props = $props();

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		value = target.value;
		onchange?.(value);
	}
</script>

<div class="select-wrapper">
	<label class="select-container">
		{#if label}
			<span class="select-label">{label}</span>
		{/if}
		<select class="select" {value} onchange={handleChange}>
			{#each options as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	</label>
</div>

<style>
	.select-wrapper {
		display: flex;
	}

	.select-container {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
	}

	.select-label {
		font-size: 12px;
		color: var(--text);
		opacity: 0.6;
	}

	.select {
		appearance: none;
		background: var(--glass);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-sm);
		padding: 8px 32px 8px 12px;
		font-size: 13px;
		font-weight: 500;
		color: var(--text);
		cursor: pointer;
		transition: all 0.2s ease;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23e0e0e0' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 10px center;
	}

	.select:hover {
		background-color: var(--glass-hover);
	}

	.select:focus {
		outline: none;
		border-color: var(--accent);
	}

	.select option {
		background: var(--surface);
		color: var(--text);
	}
</style>
