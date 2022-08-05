import React from "react";
import { BtnMyLocation, MapView, ReactLogo } from "../components";
import { SearchBar } from "../components/SearchBar";

export const HomeScreen = () => {
	return (
		<div>
			<MapView />
			<BtnMyLocation />
			<ReactLogo />
			<SearchBar />
		</div>
	);
};
