import type { NotificationKind } from '../domain';

export interface Notification {
	id: string;
	message: string;
	kind: NotificationKind;
}
