import { ChangeEvent, useContext, useRef } from "react";
import { PlacesContext } from "../context/places";
import { SearchResults } from "./";

export const SearchBar = () => {
	const debounceRef = useRef<NodeJS.Timeout>();

	const { searchPlacesByTerm } = useContext(PlacesContext);

	const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
		}

		debounceRef.current = setTimeout(() => {
			searchPlacesByTerm(event.target.value);
			console.log("debounces value", event.target.value);
		}, 350);
	};
	return (
		<div className="search-container">
			<input
				type="text"
				className="form-control"
				placeholder="Buscar Lugar..."
				onChange={onQueryChanged}
			/>
			<SearchResults />
		</div>
	);
};
