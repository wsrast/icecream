import PropTypes from 'prop-types';
import React, { createContext, useReducer } from 'react';

export const GlobalContext = createContext();

const reducer = (state, { type }) => {
	switch (type) {
		case 'INCREMENT':
			return { ...state, count: state.count + 1 };
		case 'DECREMENT':
			return { ...state, count: state.count - 1 };
		default:
			return state;
	}
};

const initialState = {
	count: 0,
	theme: {
		'background-color': '#282c34',
		link: '#09d3ac',
		text: '#fff',
	},
};

const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

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
