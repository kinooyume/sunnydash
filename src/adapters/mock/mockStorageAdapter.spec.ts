import { describe, it, expect } from 'vitest';
import { mockStorageAdapter } from './mockStorageAdapter';

describe('mockStorageAdapter', () => {
	it('returns null for missing key', () => {
		expect(mockStorageAdapter.get('nonexistent')).toBeNull();
	});

	it('stores and retrieves a value', () => {
		mockStorageAdapter.set('key1', 'value1');
		expect(mockStorageAdapter.get('key1')).toBe('value1');
	});

	it('overwrites existing value', () => {
		mockStorageAdapter.set('key2', 'old');
		mockStorageAdapter.set('key2', 'new');
		expect(mockStorageAdapter.get('key2')).toBe('new');
	});

	it('removes a stored key', () => {
		mockStorageAdapter.set('key3', 'value3');
		mockStorageAdapter.remove('key3');
		expect(mockStorageAdapter.get('key3')).toBeNull();
	});
});
