import config from '../config/default';

const search = ({ lon, lat }) => {
	const { serviceUrl, searchRoute } = config.yelp;
	return `${serviceUrl}${searchRoute}?term=ice%20cream&latitude=${lon}&longitude=${lat}`;
};

const reviews = alias => {
	const { serviceUrl, businessesRoute, reviewsRoute } = config.yelp;
	return `${serviceUrl}${businessesRoute}/${alias}${reviewsRoute}`;
};

const api = { search, reviews };

const getYelpApiUrl = (type = 'search', params) => {
	return api[type](params);
};

export default getYelpApiUrl;
