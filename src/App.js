import React from 'react';
import styled from 'styled-components/macro';
import Layout from './components/Layout';

/* theme:
 * bkg: #282c34
 * link: #09d3ac
 * text: #fff;
 */

const AppMain = styled.div`
	text-align: center;
	color: #fff;
`;

const AppHeader = styled.div`
	background-color: #282c34;
	color: white;
	font-size: calc(10px + 2vmin);
	min-height: 10vh;
	padding-left: 1%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
`;

function App() {
	return (
		<AppMain>
			<AppHeader>
				<p>CRA Sandbox</p>
			</AppHeader>
			<Layout />
		</AppMain>
	);
}

export default App;
