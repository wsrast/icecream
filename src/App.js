import React from 'react';
import styled from 'styled-components/macro';
import { ThemeProvider } from 'styled-components';
import GlobalProvider from './contexts/global';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Mainbar from './components/Mainbar';
import defaultTheme from './theme/theme';

const AppMain = styled.div`
	text-align: center;
	color: ${({ theme: { text } }) => text};
`;

const AppHeader = styled.div`
	background-color: ${({ theme }) => theme['background-color']};
	color: ${({ theme: { text } }) => text};
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
		<ThemeProvider theme={defaultTheme}>
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
		</ThemeProvider>
	);
}

export default App;
