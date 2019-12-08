import React, { useContext } from 'react';
import styled from 'styled-components/macro';
/* import ClickCounter from './ClickCounter';
import LastClick from './LastClick';
 */ import { BodyCellStyled } from './BodyCell';
import Button from './Button';
import TextField from './TextField';
import {
	GlobalContext,
	getGeocoords,
	updateLocation,
} from '../contexts/global';

const SideBarStyled = styled(BodyCellStyled)`
	min-width: 25vw;
	max-width: 25vw;
`;

const Sidebar = () => {
	const {
		state: { loading, geocoords, location },
		dispatch,
	} = useContext(GlobalContext);

	return (
		<SideBarStyled>
			{/* <ClickCounter />
			<LastClick />*/}
			<br />
			<TextField
				label="Enter a city, state or address:"
				location={location}
				id="location"
				placeholder="City, State"
				onChange={e => dispatch(updateLocation(e.target.value))}
			/>
			<Button type="button" onClick={() => dispatch(getGeocoords(location))}>
				Load Ice Cream Shops
			</Button>
			<br />
			<div>Longitude: {loading ? '' : geocoords.lon}</div>
			<div>Latitude: {loading ? '' : geocoords.lat}</div>
			<br />
		</SideBarStyled>
	);
};

export default Sidebar;
