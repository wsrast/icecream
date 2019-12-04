/* eslint-disable no-console */
import axios from 'axios';

export const buildRequest = req => {
	// default to JSON if the request has a data field
	if (req.data !== undefined) {
		req.headers = req.headers || {};
		req.headers['Content-Type'] =
			req.headers['Content-Type'] || 'application/json';
	}
	return req;
};

export const makeRequest = req => axios(req);

export const getResponse = res => res.data;

export const delay = ms =>
	new Promise(res => setTimeout(() => res(`delay ${ms} ms`), ms));

/**
 * @param {Object} request - Axios style request object
 * @returns {Object|undefined} returns Axios response or undefined
 */
const send = async request => {
	const req = buildRequest(request);

	try {
		const response = await makeRequest(req);
		return getResponse(response);
	} catch (err) {
		// https://www.npmjs.com/package/axios#handling-errors
		if (err.response) {
			if (err.response.status === 504) {
				console.error(`504 Timeout`);
				// might add some retry stuff here
			}
			console.error(
				'Unretryable error response',
				err.response.data,
				err.response.status,
				err.response.headers
			);
		} else if (err.request) {
			// no response, probably CORS error
			console.error(
				`HTTP Error with no response. Is CORS configured?`,
				err.request
			);
		} else {
			console.error(`Unknown error: ${err.message}`);
		}

		// worst case, rethrow it
		throw err;
	}
};

export default send;
