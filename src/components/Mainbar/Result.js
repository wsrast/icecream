import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { GlobalContext, getShopReviews } from '../../contexts/global';

export const ResultStyled = styled.div`
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
export const Cell = styled.div`
	line-height: 32px;
	min-height: 48px;
	text-align: left;
`;

export const CellImg = styled(Cell)`
	width: 10%;
`;

export const CellName = styled(Cell)`
	width: 25%;
`;

export const CellRating = styled(Cell)`
	width: 10%;
`;

export const CellInfo = styled(Cell)`
	line-height: 1em;
	width: 35%;
`;

export const SmallText = styled.span`
	font-size: 0.8em;
	font-weight: bold;
`;

export const Address = styled(SmallText)`
	color: ${({ theme: { color2 } }) => color2};
`;

export const Reviewer = styled.span`
	font-weight: bold;
	color: ${({ theme: { color5 } }) => color5};
`;

export const Stars = styled(Reviewer)`
	color: ${({ theme: { color4 } }) => color4};
`;

export const Review = styled(SmallText)`
	font-weight: normal;
`;

const Result = props => {
	const { shop } = props;
	const {
		state: { reviews },
		dispatch,
	} = useContext(GlobalContext);

	useEffect(() => {
		if (!reviews[shop.id]) dispatch(getShopReviews(shop.id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, shop]);

	return (
		<ResultStyled {...props}>
			<CellImg>
				<ResultImg src={shop.image_url} alt={shop.name} />
			</CellImg>
			<CellRating>{shop.rating}</CellRating>
			<CellRating>{shop.review_count}</CellRating>
			<CellName>
				<a href={shop.url}>{shop.name}</a>
			</CellName>
			<CellInfo>
				<Address>
					{shop.location.display_address[0]}, {shop.location.display_address[1]}
				</Address>
				<br />
				<SmallText>Sample Review: </SmallText>
				{reviews[shop.id] !== undefined ? (
					<div>
						<Reviewer>{reviews[shop.id].user.name}</Reviewer> -{' '}
						<Stars>{reviews[shop.id].rating} stars</Stars> -{' '}
						<Review>{reviews[shop.id].text}</Review>
					</div>
				) : (
					<div>Loading...</div>
				)}
			</CellInfo>
		</ResultStyled>
	);
};
Result.propTypes = {
	onClick: PropTypes.func.isRequired,
	shop: PropTypes.shape({
		id: PropTypes.string,
		image_url: PropTypes.string,
		name: PropTypes.string,
		rating: PropTypes.number,
		review_count: PropTypes.number,
		url: PropTypes.string,
		location: PropTypes.shape({
			display_address: PropTypes.arrayOf(PropTypes.string),
		}),
	}).isRequired,
};

export default Result;
