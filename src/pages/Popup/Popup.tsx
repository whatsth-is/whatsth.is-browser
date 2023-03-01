import { AppBar, Box, Container, createTheme, CssBaseline, styled, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import React, { useEffect, useMemo, useState } from 'react';
import agent from '../../api/agent';
import { IInspectionResult } from '../../interfaces';

const Popup: React.FC = () => {
	const [siteDetails, setSiteDetails] = useState<IInspectionResult>({} as IInspectionResult);
	const [loading, setLoading] = useState<boolean>(true);
	const [requestError, setRError] = useState<boolean>(false);
	const [currentTabUrl, setCurrentTabUrl] = useState('');

	useEffect(() => {
		function getCurrentTabUrl(callback: (url: string) => void) {
			chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				const url = tabs[0].url;
				callback(url ?? '');
			});
		}

		getCurrentTabUrl((url) => setCurrentTabUrl(url));
	}, []);

	useEffect(() => {
		agent.Inspection.inspect(currentTabUrl).then(response => {
			setSiteDetails(response);
			setLoading(false);
		}).catch((err: any) => {
			setRError(true);
			setLoading(false);
		});
	}, [currentTabUrl]);


	const theme = useMemo(() => createTheme({
		palette: {
			primary: purple,
			mode: 'dark'
		}
	}), []);

	const DrawerHeader = styled('div')(({ theme }) => ({
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	}));

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline enableColorScheme />
				<AppBar
					sx={{
						backgroundColor: theme.palette.primary.main,
					}}
				>
					<Toolbar>
						<Typography variant="h6" noWrap component="div">What's this?</Typography>
					</Toolbar>
				</AppBar>
				<main>
					<DrawerHeader />
					<Container maxWidth="md">
						{!loading && <pre>
							{loading.toString()}
							{requestError.toString()}
							{JSON.stringify(siteDetails, null, 2)}
						</pre>}
					</Container>
				</main>
			</Box>
		</ThemeProvider>
	);
};

export default Popup;
