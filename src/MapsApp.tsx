import React from "react";
import MapProvider from "./context/map/MapProvider";
import { PlacesProvider } from "./context/places";
import { HomeScreen } from "./screens";
import "./styles.css";
export const MapsApp = () => {
	return (
		<PlacesProvider>
			<MapProvider>
				<HomeScreen />
			</MapProvider>
		</PlacesProvider>
	);
};
