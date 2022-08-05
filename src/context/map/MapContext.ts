// @ts-ignore
/* eslint import/no-webpack-loader-syntax:off */

import { Map } from "!mapbox-gl";
import { createContext } from "react";

interface MapContextProps {
	isMapReady: boolean;
	map?: Map;

	setMap: (map: Map) => void;
	getRouteBetweenPoints: (coordinates: [number, number]) => void;
}

export const MapContext = createContext({} as MapContextProps);
