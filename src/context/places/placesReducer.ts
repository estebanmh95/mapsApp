import { FeatureFormat } from "../../interfaces/places";
import { PlacesState } from "./PlacesProvider";

type PlacesAction =
	| {
			type: "setUserLocation";
			payload: [number, number];
	  }
	| {
			type: "assignPlaces";
			payload: FeatureFormat[];
	  }
	| {
			type: "setLoadingPlaces";
	  };

export const placesReducer = (
	state: PlacesState,
	action: PlacesAction
): PlacesState => {
	switch (action.type) {
		case "setUserLocation":
			return {
				...state,
				isLoading: false,
				userLocation: action.payload,
			};
		case "setLoadingPlaces":
			return {
				...state,
				isLoadingPlaces: true,
			};
		case "assignPlaces":
			return {
				...state,
				isLoadingPlaces: false,
				places: action.payload,
			};

		default:
			return {
				...state,
			};
	}
};
