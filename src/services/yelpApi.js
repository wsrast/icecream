import config from '../config/default';

const search = ({ lon, lat }) => {
	const {
		defaultLimit,
		defaultSortBy,
		yelp: { serviceUrl, searchRoute },
	} = config;
	return `${serviceUrl}${searchRoute}?term=ice%20cream&limit=${defaultLimit}&sort_by=${defaultSortBy}&latitude=${lon}&longitude=${lat}`;
};

const reviews = id => {
	const { serviceUrl, businessesRoute, reviewsRoute } = config.yelp;
	return `${serviceUrl}${businessesRoute}/${id}${reviewsRoute}`;
};

const api = { search, reviews };

const getYelpApiUrl = (type = 'search', params) => {
	return api[type](params);
};

export default getYelpApiUrl;
