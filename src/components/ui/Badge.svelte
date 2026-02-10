<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		icon?: Snippet;
		variant?: 'default' | 'accent';
		size?: 'sm' | 'md';
	}

	let { children, icon, variant = 'default', size = 'md' }: Props = $props();
</script>

<span class="badge {variant} size-{size}">
	{#if icon}
		<span class="icon">{@render icon()}</span>
	{/if}
	<span class="content">{@render children()}</span>
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		border-radius: 14px;
		font-weight: 500;
	}

	/* Sizes */
	.size-sm {
		padding: 6px 10px;
		font-size: 12px;
	}

	.size-md {
		padding: 10px 14px;
		font-size: 13px;
	}

	/* Variants */
	.default {
		background: var(--glass);
		border: 1px solid var(--glass-border);
		color: var(--text);
	}

	.accent {
		background: rgba(248, 186, 136, 0.15);
		border: 1px solid rgba(248, 186, 136, 0.25);
		color: var(--accent);
	}

	.icon {
		display: flex;
		align-items: center;
		opacity: 0.7;
	}
</style>
