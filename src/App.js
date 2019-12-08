import React from 'react';
import styled from 'styled-components/macro';
import { ThemeProvider } from 'styled-components';
import GlobalProvider from './contexts/global';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Mainbar from './components/Mainbar/Mainbar';
import defaultTheme from './theme/theme';

const AppMain = styled.div`
	text-align: center;
	color: ${({ theme: { text } }) => text};
`;

const AppHeader = styled.div`
	background-color: ${({ theme: { color2 } }) => color2};
	color: ${({ theme: { textLight } }) => textLight};
	padding-left: 2em;
	line-height: 10vh;
	min-height: 10vh;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
`;

const H1 = styled.h1`
	margin: 0;
`;

function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<GlobalProvider>
				<AppMain>
					<AppHeader>
						<H1>I Love Ice Cream</H1>
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
