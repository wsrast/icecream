import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

export const ButtonStyled = styled.button`
	background: ${({ theme: { color1 } }) => color1};
	border: none;
	border-radius: ${({ theme: { borderRadius } }) => borderRadius};
	color: ${({ theme: { color3 } }) => color3};
	cursor: pointer;
	height: 2em;
	margin: 4px 2px;
	padding: 0 2em;
	text-decoration: none;
`;

const Button = props => {
	const { children } = props;
	return <ButtonStyled {...props}>{children}</ButtonStyled>;
};
Button.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Button;
