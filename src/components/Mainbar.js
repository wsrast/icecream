import React, { memo, useContext, useEffect } from 'react';
import styled from 'styled-components/macro';
import cuid from 'cuid';
import { GlobalContext, getIceCreamShops } from '../contexts/global';
import { BodyCellStyled } from './BodyCell';

export const MainbarStyled = styled(BodyCellStyled)`
	user-select: none;
`;

const BodyContent = styled.div`
	border: ${({ theme: { bodyBorder } }) => bodyBorder};
	cursor: pointer;
	min-width: 96%;
	user-select: none;
`;

const Mainbar = memo(() => {
	const {
		state: { geocoords },
		dispatch,
	} = useContext(GlobalContext);

	useEffect(() => {
		if (geocoords.lon && geocoords.lat) dispatch(getIceCreamShops(geocoords));
	}, [dispatch, geocoords]);

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
