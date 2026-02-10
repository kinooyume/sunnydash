<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		label: string;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'ghost' | 'glass';
		onclick?: () => void;
	}

	let { children, label, size = 'md', variant = 'glass', onclick }: Props = $props();
</script>

<button class="icon-button {variant} size-{size}" aria-label={label} {onclick}>
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	.icon-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
		color: var(--text);
		font-weight: 500;
	}

	.size-sm {
		width: 32px;
		height: 32px;
		font-size: 13px;
		border-radius: 10px;
	}

	.size-md {
		width: 40px;
		height: 40px;
		font-size: 14px;
		border-radius: var(--radius-sm);
	}

	.size-lg {
		width: 48px;
		height: 48px;
		font-size: 16px;
		border-radius: var(--radius-sm);
	}

	.ghost {
		background: transparent;
	}

	.ghost:hover {
		background: var(--glass);
	}

	.glass {
		background: var(--glass);
		border: 1px solid var(--glass-border);
	}

	.glass:hover {
		background: var(--glass-hover);
	}
</style>
