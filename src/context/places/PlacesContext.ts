import { createContext } from "react";
import { FeatureFormat } from "../../interfaces/places";

export interface PlacesContextProps {
	isLoading: boolean;
	userLocation?: [number, number];
	places: FeatureFormat[];
	isLoadingPlaces: boolean;
	searchPlacesByTerm: (query: string) => Promise<FeatureFormat[]>;
}
const PlacesContext = createContext({} as PlacesContextProps);

export default PlacesContext;
