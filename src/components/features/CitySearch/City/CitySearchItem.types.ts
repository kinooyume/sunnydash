import type { City } from "../../../../domain/geocoding";
import type { BaseItem } from "../../../shared/SearchCombobox/SearchCombobox.types";

export interface CityItem extends BaseItem, City {}

export interface SearchComboboxCityProps {
	item: CityItem;
}
