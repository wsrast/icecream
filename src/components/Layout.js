import React, { memo, useState } from 'react';
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
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
`;
BodyCell.defaultProps = { bkgColor: '#282c34' };

const BodyContent = styled.div`
	border: 1px solid rgba(256, 256, 256, 0.05);
	min-width: 96%;
`;

const Layout = memo(props => {
	const { bkgColor } = props;

	const [count, setCount] = useState(0);
	const clickCounter = () => setCount(count + 1);

	return (
		<BodyLayout bkgColor={bkgColor}>
			<BodyCell>
				<BodyContent onClick={clickCounter}>Click count: ${count}</BodyContent>
			</BodyCell>
			<BodyCell>
				{[...Array(8).keys()].map((v, i) => (
					<BodyContent key={`cell${i}`}>Cell {i}</BodyContent>
				))}
			</BodyCell>
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
