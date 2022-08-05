// @ts-ignore
/* eslint import/no-webpack-loader-syntax:off */
import { Map, Marker } from "!mapbox-gl";
import { MapState } from "./MapProvider";

export type MapAction =
	| {
			type: "setMap";
			payload: Map;
	  }
	| {
			type: "setMarkers";
			payload: Marker[];
	  };

export const mapReducer = (state: MapState, action: MapAction) => {
	switch (action.type) {
		case "setMap":
			return { ...state, isMapReady: true, map: action.payload };
		case "setMarkers":
			return { ...state, markers: action.payload };

		default:
			return { ...state };
	}
};
