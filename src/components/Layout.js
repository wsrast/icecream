import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const BodyLayout = styled.section`
	background-color: ${props => props.bkgColor};
	min-height: 90vh;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;

const BodyCell = styled.section`
	background-color: ${props => props.bkgColor};
	border-radius: 8px;
	min-height: 85vh;
	min-width: 48%;
`;
BodyCell.defaultProps = { bkgColor: '#282c34' };

const Layout = memo(props => {
	const { bkgColor } = props;

	return (
		<BodyLayout bkgColor={bkgColor}>
			<BodyCell>Cell 1</BodyCell>
			<BodyCell>Cell 2</BodyCell>
		</BodyLayout>
	);
});

Layout.propTypes = {
	bkgColor: PropTypes.string,
};
Layout.defaultProps = {
	bkgColor: '#222',
};

export default Layout;
