import React from 'react';
import styled from 'styled-components/macro';
import ClickCounter from './ClickCounter';
import { BodyCellStyled } from './BodyCell';

const SideBarStyled = styled(BodyCellStyled)`
	min-width: 25%;
`;

const Sidebar = () => {
	return (
		<SideBarStyled>
			<ClickCounter />
		</SideBarStyled>
	);
};

export default Sidebar;
