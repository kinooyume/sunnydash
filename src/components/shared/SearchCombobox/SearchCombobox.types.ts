import type { Snippet } from 'svelte';

export type KeyPressedActions = Map<string, () => void>;

export type BaseItem = Record<string, any> & {
	id: number;
	name: string;
};

export type SearchComboboxSnippetProps<Item extends BaseItem> = {
	item: Item;
};

export interface BaseSearchComboboxProps<Item extends BaseItem> {
	items: Item[];
	showList: boolean;
	placeholder?: string;
	onSelect?: (item: Item) => void;
}

export interface SearchComboboxProps<Item extends BaseItem> extends BaseSearchComboboxProps<Item> {
	children: Snippet<[Item]>;
}
