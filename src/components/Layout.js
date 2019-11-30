import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import styled from 'styled-components/macro';

const BodyLayout = styled.section`
	background-color: ${props => props.bkgColor};
	min-height: 90vh;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;

const BodyCell = styled.section`
	background-color: ${props => props.bkgColor};
	border-radius: 8px;
	min-height: 85vh;
	min-width: 48%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;
BodyCell.defaultProps = { bkgColor: '#282c34' };

const BodyContent = styled.div`
	border: 1px solid rgba(256, 256, 256, 0.05);
	min-width: 96%;
`;

const Layout = memo(props => {
	const { bkgColor } = props;

	const [count, setCount] = useState(0);
	const clickCounter = () => setCount(count + 1);

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

	return (
		<BodyLayout bkgColor={bkgColor}>
			<BodyCell>
				<BodyContent onClick={clickCounter}>Click count: ${count}</BodyContent>
			</BodyCell>
			<BodyCell>
				{[...Array(8).keys()].map((v, i) => (
					<BodyContent key={`cell${cuid()}`}>Cell {i}</BodyContent>
				))}
			</BodyCell>
		</BodyLayout>
	);
});

Layout.propTypes = {
	bkgColor: PropTypes.string,
};
Layout.defaultProps = {
	bkgColor: '#222',
};

export default Layout;
