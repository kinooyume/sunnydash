import type { NotificationPort } from '../../domain';
import { addNotification, removeNotification } from '../../stores/notificationState.svelte';

export const storeNotificationAdapter: NotificationPort = {
	show: (message, kind) => addNotification(message, kind),
	dismiss: (id) => removeNotification(id)
};
