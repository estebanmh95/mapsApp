import { useState } from "react";
import { useContext } from "react";
import { MapContext } from "../context/map/MapContext";
import { PlacesContext } from "../context/places";
import { FeatureFormat } from "../interfaces/places";
import { LoadingPlaces } from "./";

export const SearchResults = () => {
	const { places, isLoadingPlaces } = useContext(PlacesContext);

	const { map, getRouteBetweenPoints } = useContext(MapContext);

	const [activeId, setActiveId] = useState("");

	const onPlaceClicked = (place: FeatureFormat) => {
		const [lng, lat] = place.center;
		map?.flyTo({
			zoom: 16,
			center: [lng, lat],
		});
		setActiveId(place.id);
	};

	if (isLoadingPlaces) return <LoadingPlaces />;
	if (places.length === 0) {
		return <></>;
	}

	return (
		<ul className="list-group mt-3">
			{places.map((place) => {
				const { id, place_name, text } = place;
				const [lng, ltd] = place.center;
				return (
					<li
						className={`list-group-item list=group-item-action pointer ${
							activeId === place.id && "active"
						}`}
						key={id}
						onClick={() => onPlaceClicked(place)}
					>
						<h6>{text}</h6>
						<p
							style={{
								fontSize: "12px",
							}}
						>
							{place_name}
						</p>
						<button
							className={`btn ${
								activeId === place.id
									? "btn-outline-light"
									: "btn-outline-primary"
							} btn-sm`}
							onClick={() => getRouteBetweenPoints([lng, ltd])}
						>
							Direcciones
						</button>
					</li>
				);
			})}
		</ul>
	);
};
