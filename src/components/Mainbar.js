import React, { memo, useContext } from 'react';
import styled from 'styled-components/macro';
import cuid from 'cuid';
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
	return (
		<MainbarStyled>
			{[...Array(8).keys()].map((v, i) => (
				<BodyContent key={`cell${cuid()}`}>Cell {i}</BodyContent>
			))}
		</MainbarStyled>
	);
});
export default Mainbar;
