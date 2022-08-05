import axios from "axios";

const searchApi = axios.create({
	baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
	params: {
		limit: 5,
		language: "es",
		access_token:
			"pk.eyJ1IjoiZXN0ZWJhbm1oOTUiLCJhIjoiY2w2ZmVtdGd6MGpoMTNkcGg1NDUxbW5qZCJ9.JwJK_PRl48TaJBEU16YkFA",
		country: "co",
	},
});

export default searchApi;
