import axios from "axios";

const directionsApi = axios.create({
	baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
	params: {
		alternatives: false,
		geometries: "geojson",
		overview: "simplified",
		steps: false,
		language: "es",
		access_token:
			"pk.eyJ1IjoiZXN0ZWJhbm1oOTUiLCJhIjoiY2w2ZmVtdGd6MGpoMTNkcGg1NDUxbW5qZCJ9.JwJK_PRl48TaJBEU16YkFA",
	},
});

export default directionsApi;
