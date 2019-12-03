import React from 'react';
import styled from 'styled-components/macro';
import ClickCounter from './ClickCounter';
import LastClick from './LastClick';
import { BodyCellStyled } from './BodyCell';

const SideBarStyled = styled(BodyCellStyled)`
	min-width: 25%;
`;

const Sidebar = () => {
	return (
		<SideBarStyled>
			<ClickCounter />
			<LastClick />
		</SideBarStyled>
	);
};

export default Sidebar;
