import { browser } from '$app/environment';
import type { StoragePort } from '../../domain';

export const localStorageAdapter: StoragePort = {
	get: (key) => (browser ? localStorage.getItem(key) : null),
	set: (key, value) => browser && localStorage.setItem(key, value),
	remove: (key) => browser && localStorage.removeItem(key)
};
