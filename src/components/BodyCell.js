import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

export const BodyCellStyled = styled.section`
	background-color: ${({ theme: { color3 } }) => color3};
	border-radius: 8px;
	margin: 16px 0;
	min-height: 84vh;
	min-width: 72vw;
	display: flex;
	flex-flow: column wrap;
	align-items: center;
	justify-content: flex-start;
`;

const BodyCell = ({ children }) => {
	return <BodyCellStyled>{children}</BodyCellStyled>;
};
BodyCell.propTypes = {
	children: PropTypes.node.isRequired,
};

export default BodyCell;
