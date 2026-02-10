<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'label';
		variant?: 'hero' | 'title' | 'subtitle' | 'body' | 'caption' | 'overline';
		color?: 'default' | 'light' | 'muted' | 'accent';
		weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
		class?: string;
	}

	let {
		children,
		as = 'span',
		variant = 'body',
		color = 'default',
		weight,
		class: className = ''
	}: Props = $props();

	const weightClass = weight ? `weight-${weight}` : '';
</script>

{#if as === 'h1'}
	<h1 class="text {variant} color-{color} {weightClass} {className}">{@render children()}</h1>
{:else if as === 'h2'}
	<h2 class="text {variant} color-{color} {weightClass} {className}">{@render children()}</h2>
{:else if as === 'h3'}
	<h3 class="text {variant} color-{color} {weightClass} {className}">{@render children()}</h3>
{:else if as === 'h4'}
	<h4 class="text {variant} color-{color} {weightClass} {className}">{@render children()}</h4>
{:else if as === 'p'}
	<p class="text {variant} color-{color} {weightClass} {className}">{@render children()}</p>
{:else if as === 'label'}
	<label class="text {variant} color-{color} {weightClass} {className}">{@render children()}</label>
{:else}
	<span class="text {variant} color-{color} {weightClass} {className}">{@render children()}</span>
{/if}

<style>
	.text {
		margin: 0;
		line-height: 1.4;
	}

	/* Variants */
	.hero {
		font-size: 84px;
		font-weight: 600;
		line-height: 1;
	}

	.title {
		font-size: 24px;
		font-weight: 500;
		line-height: 1.2;
	}

	.subtitle {
		font-size: 17px;
		line-height: 1.3;
	}

	.body {
		font-size: 15px;
	}

	.caption {
		font-size: 13px;
	}

	.overline {
		font-size: 12px;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	/* Colors */
	.color-default {
		color: var(--text);
	}
	.color-light {
		color: var(--text-light);
	}
	.color-muted {
		color: var(--text);
		opacity: 0.6;
	}
	.color-accent {
		color: var(--accent);
	}

	/* Weights */
	.weight-light {
		font-weight: 300;
	}
	.weight-normal {
		font-weight: 400;
	}
	.weight-medium {
		font-weight: 500;
	}
	.weight-semibold {
		font-weight: 600;
	}
	.weight-bold {
		font-weight: 700;
	}
</style>
