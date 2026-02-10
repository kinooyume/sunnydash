<script lang="ts">
	import { notifications, removeNotification } from '../../stores/notificationState.svelte';
</script>

{#if notifications.items.length > 0}
	<div class="toast-stack">
		{#each notifications.items as notification (notification.id)}
			<div class="toast toast-{notification.kind}">
				<span>{notification.message}</span>
				<button class="dismiss" onclick={() => removeNotification(notification.id)}>×</button>
			</div>
		{/each}
	</div>
{/if}

<style>
	.toast-stack {
		position: fixed;
		bottom: 24px;
		right: 24px;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.toast {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		border-radius: var(--radius-sm);
		background: rgba(28, 38, 56, 0.95);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid var(--glass-border);
		color: var(--text);
		font-size: 14px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
		animation: slideIn 0.25s ease-out;
		min-width: 240px;
		max-width: 380px;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(16px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.toast-error {
		border-left: 3px solid #e74c3c;
	}

	.toast-success {
		border-left: 3px solid #2ecc71;
	}

	.toast-info {
		border-left: 3px solid var(--accent);
	}

	.toast span {
		flex: 1;
	}

	.dismiss {
		background: none;
		border: none;
		color: var(--text);
		opacity: 0.5;
		cursor: pointer;
		font-size: 18px;
		padding: 0 4px;
		line-height: 1;
	}

	.dismiss:hover {
		opacity: 1;
	}
</style>
