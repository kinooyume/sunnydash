<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		variant?: 'default' | 'accent' | 'subtle';
		padding?: 'none' | 'sm' | 'md' | 'lg';
		radius?: 'sm' | 'md' | 'lg';
		hover?: boolean;
		class?: string;
	}

	let {
		children,
		variant = 'default',
		padding = 'md',
		radius = 'lg',
		hover = false,
		class: className = ''
	}: Props = $props();
</script>

<div
	class="glass-card {variant} padding-{padding} radius-{radius} {className}"
	class:hoverable={hover}
>
	{@render children()}
</div>

<style>
	.glass-card {
		background: var(--glass);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border: 1px solid var(--glass-border);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
		transition: all 0.2s ease;
	}

	/* Variants */
	.accent {
		background: rgba(248, 186, 136, 0.12);
		border-color: rgba(248, 186, 136, 0.25);
	}

	.subtle {
		background: rgba(255, 255, 255, 0.04);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow: none;
	}

	/* Padding */
	.padding-none {
		padding: 0;
	}
	.padding-sm {
		padding: 12px 16px;
	}
	.padding-md {
		padding: 24px 32px;
	}
	.padding-lg {
		padding: 40px 48px;
	}

	/* Radius */
	.radius-sm {
		border-radius: var(--radius-sm);
	}
	.radius-md {
		border-radius: var(--radius-md);
	}
	.radius-lg {
		border-radius: var(--radius-lg);
	}

	/* Hover */
	.hoverable:hover {
		background: var(--glass-hover);
		transform: translateY(-2px);
	}
</style>
