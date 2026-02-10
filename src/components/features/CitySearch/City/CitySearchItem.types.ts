import type { City } from '../../../../domain';
import type { BaseItem } from '../../../shared/SearchCombobox';

export interface CityItem extends BaseItem, City {}

export interface SearchComboboxCityProps {
	item: CityItem;
}
