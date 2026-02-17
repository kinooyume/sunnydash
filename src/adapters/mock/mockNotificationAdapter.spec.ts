import { describe, it, expect, vi } from 'vitest';
import { mockNotificationAdapter } from './mockNotificationAdapter';

describe('mockNotificationAdapter', () => {
	it('logs notification via console.log', () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
		mockNotificationAdapter.show('test message', 'info');
		expect(spy).toHaveBeenCalledWith('[info] test message');
		spy.mockRestore();
	});

	it('logs correct kind for error notifications', () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
		mockNotificationAdapter.show('something failed', 'error');
		expect(spy).toHaveBeenCalledWith('[error] something failed');
		spy.mockRestore();
	});

	it('logs correct kind for success notifications', () => {
		const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
		mockNotificationAdapter.show('done', 'success');
		expect(spy).toHaveBeenCalledWith('[success] done');
		spy.mockRestore();
	});

	it('dismiss does not throw', () => {
		expect(() => mockNotificationAdapter.dismiss('any-id')).not.toThrow();
	});
});
