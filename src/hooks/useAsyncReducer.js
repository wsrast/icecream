import { useCallback, useReducer } from 'react';

/**
 * @callback asyncCallback
 * @param {Function} dispatch - useReducer's sync dispatch function
 * @param {Function} asyncHandler - Function that does the actual
 *  async operation. Should use passed 'dispatch' to dispatch another
 *  action on completion or error.
 */

/**
 * Will scrape action for meta.api data, firing an async handler
 * callback if present.
 * @param {Object} reducers - output of the handleActions() call
 *  from redux-actions.
 * @param {Object} [initialValue={}] - value to populate the reducer
 * @param {asyncCallback} asyncHandler - Async function
 * @returns {*[]}
 */
const useAsyncReducer = (reducers, initialValue = {}, asyncHandler) => {
	const [state, dispatch] = useReducer(reducers, initialValue);

	/**
	 * Given a Flux Standard Action, check it for a meta.api
	 * property, and if it's present, send the dispatch and action to
	 * the given asyncHandler function.
	 * @type {Function}
	 */
	const asyncDispatch = useCallback(async action => {
		if (action.meta && action.meta.api) {
			asyncHandler(dispatch, action);
		} else {
			dispatch(action);
		}
	}, []);

	return [state, asyncDispatch];
};

export default useAsyncReducer;
