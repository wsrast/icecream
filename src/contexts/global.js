import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import { createAction, handleActions } from 'redux-actions';
import config from '../config/default';
import useAsyncReducer from '../hooks/useAsyncReducer';
import send from '../services/httpClient';
import getApiUrl from '../services/geocodeApi';
import getYelpApiUrl from '../services/yelpApi';

export const GlobalContext = createContext();

// action creators
export const receiveGeocoords = createAction('RECEIVE_GEOCOORDS');
export const getGeocoords = createAction('GET_GEOCOORDS', undefined, loc => ({
	api: {
		req: getApiUrl(loc),
		callbackAction: receiveGeocoords,
	},
}));
export const receiveIceCreamShops = createAction('RECEIVE_ICE_CREAM_SHOPS');
export const getIceCreamShops = createAction(
	'GET_ICE_CREAM_SHOPS',
	undefined,
	geocoords => ({
		api: {
			req: {
				headers: {
					Authorization: config.yelp.key,
				},
				url: getYelpApiUrl('search', geocoords),
			},
			callbackAction: receiveIceCreamShops,
		},
	})
);
export const increment = createAction('INCREMENT');
export const decrement = createAction('DECREMENT');
export const rowClick = createAction('ROWCLICK');
export const updateLocation = createAction('UPDATE_LOCATION', location => ({
	location,
}));

const initialState = {
	businesses: [],
	geocoords: {},
	location: config.defaultLocation,
	count: 0,
	last: null,
	loading: true,
};

export const reducers = handleActions(
	{
		[receiveGeocoords](state, { payload, error }) {
			const {
				features: [
					{
						geometry: {
							coordinates: [lat, lon],
						},
					},
				],
			} = payload;
			return { ...state, geocoords: { lon, lat }, loading: false, error };
		},
		// eslint-disable-next-line no-unused-vars
		[receiveIceCreamShops](state, { payload: { businesses }, error }) {
			// todo: handle the error
			/*
				// simple star sort instead of Yelp's version:
				const sorted = businesses.sort((a, b) => {
				if (a.rating > b.rating) return -1;
				if (a.rating < b.rating) return 1;
				return 0;
			});
			*/
			return { ...state, businesses };
		},
		[increment](state) {
			return { ...state, count: state.count + 1 };
		},
		[decrement](state) {
			return { ...state, count: state.count - 1 };
		},
		[rowClick](state, { payload }) {
			return { ...state, count: state.count + 1, last: payload };
		},
		[updateLocation](state, { payload: { location } }) {
			return { ...state, location };
		},
	},
	initialState
);

/**
 * @param (Function) dispatch - output of the useAsyncReducer hook
 * @param (Object) action - Flux Standard Action. Known to contain
 * 	the meta.api object, else this function wouldn't get called
 * 	by the useAsyncReducer hook.
 */
const asyncHandler = async (dispatch, action) => {
	const { req, callbackAction } = action.meta.api;
	try {
		const response = await send(req);
		dispatch(callbackAction(response));
	} catch (e) {
		dispatch(callbackAction(e));
	}
};

const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useAsyncReducer(
		reducers,
		initialState,
		asyncHandler
	);

	return (
		<GlobalContext.Provider value={{ state, dispatch }}>
			{children}
		</GlobalContext.Provider>
	);
};
GlobalProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default GlobalProvider;
