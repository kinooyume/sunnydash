import type { StoragePort } from '../../domain';

const store = new Map<string, string>();

export const mockStorageAdapter: StoragePort = {
	get: (key) => store.get(key) ?? null,
	set: (key, value) => void store.set(key, value),
	remove: (key) => void store.delete(key)
};
