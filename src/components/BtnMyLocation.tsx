import React, { useContext } from "react";
import { MapContext } from "../context/map/MapContext";
import PlacesContext from "../context/places/PlacesContext";

export const BtnMyLocation = () => {
	const { map, isMapReady } = useContext(MapContext);
	const { userLocation } = useContext(PlacesContext);
	const onClick = () => {
		if (!isMapReady) throw new Error("Mapa no esta listo");
		if (!userLocation) throw new Error("No hay ubicacion de usuario");

		map?.flyTo({
			center: userLocation,
			zoom: 14,
		});
	};
	return (
		<button
			onClick={onClick}
			className="btn btn-primary"
			style={{
				position: "fixed",
				top: "20px",
				right: "20px",
				zIndex: 999,
			}}
		>
			Mi Ubicación
		</button>
	);
};
