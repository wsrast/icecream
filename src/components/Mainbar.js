import React, { memo, useContext } from 'react';
import styled from 'styled-components/macro';
import cuid from 'cuid';
import { GlobalContext } from '../contexts/global';
import { BodyCellStyled } from './BodyCell';

export const MainbarStyled = styled(BodyCellStyled)`
	user-select: none;
`;

const BodyContent = styled.div`
	border: 1px solid rgba(256, 256, 256, 0.05);
	cursor: pointer;
	min-width: 96%;
	user-select: none;
`;

const Mainbar = memo(() => {
	const { dispatch } = useContext(GlobalContext);

	const rowClick = index => dispatch({ type: 'ROWCLICK', payload: { index } });

	return (
		<MainbarStyled>
			{[...Array(8).keys()].map((v, i) => (
				<BodyContent key={`cell${cuid()}`} onClick={() => rowClick(i)}>
					Cell {i}
				</BodyContent>
			))}
		</MainbarStyled>
	);
});
export default Mainbar;
