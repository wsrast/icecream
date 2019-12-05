import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import ClickCounter from './ClickCounter';
import LastClick from './LastClick';
import { BodyCellStyled } from './BodyCell';
import { GlobalContext, getGeocoords } from '../contexts/global';

const SideBarStyled = styled(BodyCellStyled)`
	min-width: 25%;
`;

const Sidebar = () => {
	const {
		state: { loading, geocoords },
		dispatch,
	} = useContext(GlobalContext);

	return (
		<SideBarStyled>
			<ClickCounter />
			<LastClick />
			<div>Longitude: {loading ? '' : geocoords.lon}</div>
			<div>Latitude: {loading ? '' : geocoords.lat}</div>
			<button type="button" onClick={() => dispatch(getGeocoords())}>
				Load Geocoords
			</button>
		</SideBarStyled>
	);
};

export default Sidebar;
