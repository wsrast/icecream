import React, { memo, useContext, useEffect } from 'react';
import styled from 'styled-components/macro';
import {
	GlobalContext,
	getGeocoords,
	getIceCreamShops,
} from '../contexts/global';
import { BodyCellStyled } from './BodyCell';

export const MainbarStyled = styled(BodyCellStyled)`
	max-width: 72vw;
	user-select: none;
`;

const Title = styled.h2``;

const ResultContainer = styled.section`
	margin: 1em 0;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
`;

const Result = styled.div`
	/* border: 1px solid gray; */
	min-width: 70vw;
	margin-bottom: 8px;
	cursor: pointer;
	user-select: none;
	display: flex;
	flex-flow: row wrap;
`;

const ResultImg = styled.img`
	max-height: 32px;
`;

const Cell = styled.div`
	line-height: 32px;
	min-height: 48px;
	text-align: left;
`;

const CellImg = styled(Cell)`
	width: 10%;
`;

const CellName = styled(Cell)`
	width: 25%;
`;

const CellRating = styled(Cell)`
	width: 10%;
`;

const CellInfo = styled(Cell)`
	line-height: 1em;
	width: 35%;
`;

/* const Comments = styled.div`
	text-align: left;
	background-color: ${({ theme: { color5 } }) => color5};
	padding: 0.5em 1em;
`; */

const Mainbar = memo(() => {
	const {
		state: { location, geocoords, businesses },
		dispatch,
	} = useContext(GlobalContext);

	useEffect(() => {
		if (geocoords.lon && geocoords.lat) dispatch(getIceCreamShops(geocoords));
		else dispatch(getGeocoords(location));
		// disable eslint below. Don't want the effect running on every keystroke
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, geocoords]);

	const rowClick = shop => dispatch({ type: 'ROWCLICK', payload: shop.name });

	return (
		<MainbarStyled>
			<Title>Top 5 Ice Cream Shops in {location}</Title>
			{businesses.length > 0 && (
				<ResultContainer>
					<Result>
						<CellImg> </CellImg>
						<CellRating>Rating</CellRating>
						<CellRating># Reviews</CellRating>
						<CellName>Shop Name</CellName>
					</Result>
					{businesses.map(v => (
						<Result key={v.id} onClick={() => rowClick(v)}>
							<CellImg>
								<ResultImg src={v.image_url} alt={v.name} />
							</CellImg>
							<CellRating>{v.rating}</CellRating>
							<CellRating>{v.review_count}</CellRating>
							<CellName>
								<a href={v.url}>{v.name}</a>
							</CellName>
							<CellInfo>
								{v.location.display_address[0]}
								<br />
								{v.location.display_address[1]}
								<br />
								<div>[Review author] - [Sample Review]</div>
							</CellInfo>
						</Result>
					))}
				</ResultContainer>
			)}
			{businesses.length === 0 && (
				<ResultContainer>No location loaded</ResultContainer>
			)}
		</MainbarStyled>
	);
});
export default Mainbar;
