import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/macro';
import {
	GlobalContext,
	getGeocoords,
	getIceCreamShops,
	rowClick,
} from '../../contexts/global';
import { BodyCellStyled } from '../BodyCell';
import Result, { CellImg, CellRating, CellName, ResultStyled } from './Result';

export const MainbarStyled = styled(BodyCellStyled)`
	max-width: 72vw;
	user-select: none;
`;

const Title = styled.h2``;

const Header = styled(ResultStyled)``;

const ResultContainer = styled.section`
	margin: 1em 0;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
`;

const Mainbar = () => {
	const {
		state: { location, geocoords, businesses },
		dispatch,
	} = useContext(GlobalContext);

	useEffect(() => {
		if (geocoords.lon && geocoords.lat) {
			// console.log(`Mainbar::useEffect - gettingIceCreamShops`);
			dispatch(getIceCreamShops(geocoords));
		} else {
			// console.log(`Mainbar::useEffect - getting Geocoords for ${location}`);
			dispatch(getGeocoords(location));
		}
		// disable eslint below. Don't want the effect running on every keystroke
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, geocoords]);

	return (
		<MainbarStyled>
			<Title>Top 5 Ice Cream Shops in {location}</Title>
			{businesses.length > 0 && (
				<ResultContainer>
					<Header>
						<CellImg> </CellImg>
						<CellRating>Rating</CellRating>
						<CellRating># Reviews</CellRating>
						<CellName>Shop Name</CellName>
					</Header>
					{businesses.map(v => (
						<Result key={v.id} shop={v} onClick={() => dispatch(rowClick(v))} />
					))}
				</ResultContainer>
			)}
			{businesses.length === 0 && (
				<ResultContainer>No location loaded</ResultContainer>
			)}
		</MainbarStyled>
	);
};
export default Mainbar;
