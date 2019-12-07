import React, { memo, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { GlobalContext } from '../contexts/global';

const BodyLayout = styled.section`
	background-color: ${({ theme: { hsbColor3 } }) => hsbColor3};
	min-height: 90vh;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	align-items: flex-start;
`;

const Layout = memo(props => {
	const { children } = props;

	const {
		state: { count },
	} = useContext(GlobalContext);

	/**
	 * Notes for useEffect()
	 * 1. Use multiple useEffect hooks for separating concerns
	 * 2. Clean up by returning a function
	 * 3. useEffect hooks run *after* render
	 * 4. useLayoutEffect runs synchronously, with same API
	 * 5. useEffect's second parameter checks the passed value for
	 * 	differences, and skips the effect if it hasn't changed. Make
	 * 	sure to include *all* changing values the effect uses, or
	 * 	you'll get stale values.
	 * 6. Give an empty array [] as the second param to run the
	 * 	effect only once.
	 */
	useEffect(() => {
		document.title = `Sandbox - clicked (${count})`;
		// any cleanup? return cleanup function:
		// return () => {};
	}, [count]);

	return <BodyLayout>{children}</BodyLayout>;
});

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
