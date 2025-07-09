export interface City {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
}

// add props name + count
export interface GeocodingProps {
  name: string;
  count?: number;
}

export interface GeocodingPort {
  searchCities(props: GeocodingProps): Promise<City[] | null>;
  searchCity(props: GeocodingProps): Promise<City | null>;
}
