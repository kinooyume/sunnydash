<script module lang="ts">
	import type { NotificationKind } from '../domain';
	import type { Notification } from './notificationState.types';

	export const notifications = $state<{ items: Notification[] }>({ items: [] });

	export function addNotification(message: string, kind: NotificationKind): void {
		const id = crypto.randomUUID();
		notifications.items = [...notifications.items, { id, message, kind }];
		setTimeout(() => removeNotification(id), 4000);
	}

	export function removeNotification(id: string): void {
		notifications.items = notifications.items.filter((n) => n.id !== id);
	}
</script>
