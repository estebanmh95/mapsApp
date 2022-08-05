import { useEffect } from "react";
import { MapContext } from "./MapContext";
import { useReducer, useContext } from "react";
import { mapReducer } from "./mapReducer";
// @ts-ignore
/* eslint import/no-webpack-loader-syntax:off */
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";
import { PlacesContext } from "../places";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
	isMapReady: boolean;
	map?: Map;
	markers: Marker[];
}
interface Props {
	children: JSX.Element | JSX.Element[];
}
const INITIAL_STATE: MapState = {
	isMapReady: false,
	map: undefined,
	markers: [],
};

const MapProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

	const { places, userLocation } = useContext(PlacesContext);

	useEffect(() => {
		state.markers.forEach((marker) => marker.remove());

		const newMarkers: Marker[] = [];

		for (const place of places) {
			const [lng, lat] = place.center;
			const popup = new Popup().setHTML(`
                            <h6>${place.text_es}</h6>
                            <p>${place.place_name_es}</p>
                            `);
			const newMarker = new Marker()
				.setPopup(popup)
				.setLngLat([lng, lat])
				.addTo(state.map!);
			newMarkers.push(newMarker);
		}

		dispatch({ type: "setMarkers", payload: newMarkers });
	}, [places]);

	const MyLocationPopup = new Popup().setHTML(`
    <h4>Ahi me encuentro</h4>
    <p> En algun lugar de medellin</p>
    `);
	const setMap = (map: Map) => {
		new Marker({
			color: "#61DAFB",
		})
			.setLngLat(map.getCenter())
			.setPopup(MyLocationPopup)
			.addTo(map);
		dispatch({ type: "setMap", payload: map });
	};

	const getRouteBetweenPoints = async (coordinates: [number, number]) => {
		const resp = await directionsApi.get<DirectionsResponse>(
			`${userLocation?.join(",")};${coordinates.join(",")}`
		);
		const { distance, duration, geometry } = resp.data.routes[0];
		const { coordinates: coords } = geometry;
		let kms = distance / 1000;
		kms = Math.round(kms * 100);
		kms /= 100;

		const minutes = Math.floor(duration / 60);

		const bounds = new LngLatBounds(userLocation!, userLocation!);

		for (const coord of coords) {
			const newCoord: [number, number] = [coord[0], coord[1]];
			bounds.extend(newCoord);

			state.map?.fitBounds(bounds, { padding: 200 });
		}

		//  Polyline

		const sourceData: AnySourceData = {
			type: "geojson",
			data: {
				type: "FeatureCollection",
				features: [
					{
						type: "Feature",
						properties: {},
						geometry: {
							type: "LineString",
							coordinates: coords,
						},
					},
				],
			},
		};

		if (state.map?.getLayer("RouteString")) {
			state.map.removeLayer("RouteString");
			state.map.removeSource("RouteString");
		}
		state.map?.addSource("RouteString", sourceData);

		state.map?.addLayer({
			id: "RouteString",
			type: "line",
			source: "RouteString",
			layout: {
				"line-cap": "round",
				"line-join": "round",
			},
			paint: {
				"line-color": "black",
				"line-width": 3,
			},
		});
		console.log({ kms, minutes });
	};
	return (
		<MapContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>
			{children}
		</MapContext.Provider>
	);
};

export default MapProvider;
