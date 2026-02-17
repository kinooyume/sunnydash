import type { NotificationPort } from '../../domain';

export const mockNotificationAdapter: NotificationPort = {
	show: (message, kind) => console.log(`[${kind}] ${message}`),
	dismiss: () => {}
};
