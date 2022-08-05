import React from "react";
import ReactDOM from "react-dom/client";
import { MapsApp } from "./MapsApp";
// @ts-ignore
/* eslint import/no-webpack-loader-syntax:off */

import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken =
	"pk.eyJ1IjoiZXN0ZWJhbm1oOTUiLCJhIjoiY2w2ZmVtdGd6MGpoMTNkcGg1NDUxbW5qZCJ9.JwJK_PRl48TaJBEU16YkFA";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

if (!navigator.geolocation) {
	alert("tu navegador no tiene geolocaziacion");
	throw new Error("tu navegador no tiene geolocaziacion");
}
root.render(
	<React.StrictMode>
		<MapsApp />
	</React.StrictMode>
);

