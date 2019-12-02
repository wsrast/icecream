import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { GlobalContext } from '../contexts/global';

export const BodyContentStyled = styled.div`
	border: 1px solid rgba(256, 256, 256, 0.05);
	cursor: pointer;
	min-width: 96%;
	user-select: none;
`;

const BodyContent = () => {
	const {
		state: { count },
		dispatch,
	} = useContext(GlobalContext);

	const clickCounter = () => dispatch({ type: 'INCREMENT' });

	return (
		<BodyContentStyled onClick={clickCounter}>
			Click count: {count}
		</BodyContentStyled>
	);
};

export default BodyContent;
