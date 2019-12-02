import React from 'react';
import styled from 'styled-components/macro';
import GlobalProvider from './contexts/global';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Mainbar from './components/Mainbar';

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
		<GlobalProvider>
			<AppMain>
				<AppHeader>
					<p>CRA Sandbox</p>
				</AppHeader>
				<Layout>
					<Sidebar />
					<Mainbar />
				</Layout>
			</AppMain>
		</GlobalProvider>
	);
}

export default App;
