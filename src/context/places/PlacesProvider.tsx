import { useEffect, useReducer } from "react";
import PlacesContext from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers/getUserLocation";
import { searchApi } from "../../apis";
import { FeatureFormat } from "../../interfaces/places";

export interface PlacesState {
	isLoading: boolean;
	userLocation?: [number, number];
	places: FeatureFormat[];
	isLoadingPlaces: boolean;
}

interface Props {
	children: JSX.Element | JSX.Element[];
}
const initialValue: PlacesState = {
	isLoading: true,
	isLoadingPlaces: false,
	userLocation: undefined,
	places: [],
};

export const PlacesProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(placesReducer, initialValue);

	useEffect(() => {
		getUserLocation().then((coordinates) =>
			dispatch({
				type: "setUserLocation",
				payload: coordinates,
			})
		);
	}, []);

	const searchPlacesByTerm = async (
		query: string
	): Promise<FeatureFormat[]> => {
		if (query.length === 0) {
			dispatch({ type: "assignPlaces", payload: [] });
			return [];
		}
		if (!state.userLocation) throw new Error("No se pudo");

		dispatch({ type: "setLoadingPlaces" });

		const resp = await searchApi.get(`/${query}.json`, {
			params: {
				proximity: state.userLocation.join(","),
			},
		});

		console.log("resp", resp.data);
		dispatch({ type: "assignPlaces", payload: resp.data?.features });
		return resp.data;
	};
	return (
		<PlacesContext.Provider
			value={{
				...state,
				searchPlacesByTerm,
			}}
		>
			{children}
		</PlacesContext.Provider>
	);
};
