<script lang="ts">
	import type { Snippet } from 'svelte';
	import GlassCard from './GlassCard.svelte';
	import Text from './Text.svelte';

	interface Props {
		children: Snippet;
		title?: string;
		class?: string;
	}

	let { children, title, class: className = '' }: Props = $props();
</script>

<GlassCard variant="subtle" padding="sm" radius="sm" class={className}>
	{#if title}
		<div class="title">
			<Text variant="overline" color="muted">{title}</Text>
		</div>
	{/if}
	<div class="section-content">
		{@render children()}
	</div>
</GlassCard>

<style>
	.title {
		margin-bottom: 8px;
	}

	.section-content {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}
</style>
