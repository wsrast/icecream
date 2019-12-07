const config = {
	serviceUrl:
		'https://api.opencagedata.com/geocode/v1/geojson?q=Alpharetta,%20GA&key=73fa539148264cfd918045cf9d105e36',
	serviceRoute: 'https://api.opencagedata.com/geocode/v1/geojson',
	defaultLocation: 'Alpharetta, GA',
	defaultLimit: 5, // default 20, max 50
	defaultSortBy: 'rating', // best_match|rating|review_count|distance
	geocodeAPIKey: '73fa539148264cfd918045cf9d105e36',
	yelp: {
		serviceUrl: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/',
		searchRoute: '/businesses/search',
		businessesRoute: '/businesses',
		reviewsRoute: '/reviews',
		key:
			'Bearer yv4GtmOaK8HXvupUCNj0SbaVcEPXFsFnRo39_Vk8PkBjzSc8N0t7vq9B78u-BIztI1Id0eVotBtUueIX7eucMkPkUlBD-WfCytfCctaXbOTYzw87e8gqyUwI7AnnXXYx',
	},
};

export default config;
