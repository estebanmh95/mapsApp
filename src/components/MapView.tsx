// @ts-ignore\
/* eslint import/no-webpack-loader-syntax:off */
import mapboxgl from "!mapbox-gl";
import React, { useContext, useLayoutEffect, useRef } from "react";
import { MapContext } from "../context/map/MapContext";
import { PlacesContext } from "../context/places";
import { Loading } from "./Loading";

export const MapView = () => {
	const { isLoading, userLocation } = useContext(PlacesContext);

	const { setMap } = useContext(MapContext);
	const mapDiv = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!isLoading) {
			const map = new mapboxgl.Map({
				container: mapDiv.current!, // container ID
				style: "mapbox://styles/mapbox/streets-v11", // style URL
				center: userLocation, // starting position [lng, lat]
				zoom: 14, // starting zoom
			});
			setMap(map);
		}
	}, [isLoading]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div
			ref={mapDiv}
			style={{
				backgroundColor: "red",
				height: "100vh",
				width: "100vw",
				position: "fixed",
				top: 0,
				left: 0,
			}}
		>
			{userLocation?.join(", ")}
		</div>
	);
};
