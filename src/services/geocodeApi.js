import config from '../config/default';

const getApiUrl = (
	location = config.defaultLocation,
	key = config.geocodeAPIKey
) => {
	return `${config.serviceRoute}?q=${location}&key=${key}`;
};

export default getApiUrl;
