import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { GlobalContext } from '../contexts/global';

const LastClickStyled = styled.div``;

const LastClick = () => {
	const {
		state: { last },
	} = useContext(GlobalContext);

	return <LastClickStyled>Last click: {last}</LastClickStyled>;
};
export default LastClick;
