import React, { memo, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import cuid from 'cuid';
import styled from 'styled-components/macro';
import { GlobalContext } from '../contexts/global';

const BodyLayout = styled.section`
	background-color: ${props => props.bkgColor};
	min-height: 90vh;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	align-items: center;
`;

const BodyCell = styled.section`
	background-color: ${props => props.bkgColor};
	border-radius: 8px;
	min-height: 85vh;
	min-width: 72%;
	display: flex;
	flex-flow: column wrap;
	align-items: center;
	justify-content: flex-start;
`;
BodyCell.defaultProps = { bkgColor: '#282c34' };

const NavCell = styled(BodyCell)`
	min-width: 25%;
`;

const BodyContent = styled.div`
	border: 1px solid rgba(256, 256, 256, 0.05);
	cursor: pointer;
	min-width: 96%;
	user-select: none;
`;

const Layout = memo(props => {
	const { bkgColor } = props;

	const {
		state: { count },
		dispatch,
	} = useContext(GlobalContext);
	// const [count, setCount] = useState(0);
	const clickCounter = () => dispatch({ type: 'INCREMENT' });

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
			<NavCell>
				<BodyContent onClick={clickCounter}>Click count: {count}</BodyContent>
			</NavCell>
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
