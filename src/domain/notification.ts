export type NotificationKind = 'success' | 'error' | 'info';

export interface NotificationPort {
	show(message: string, kind: NotificationKind): void;
	dismiss(id: string): void;
}
