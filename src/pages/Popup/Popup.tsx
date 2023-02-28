import { AppBar, Box, Container, createTheme, CssBaseline, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import React, { useMemo } from 'react';

const Popup: React.FC = () => {

	const theme = useMemo(() => createTheme({
		palette: {
			primary: purple,
		}
	}), []);

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
					<Container maxWidth="md">
						<p>Cool</p>
					</Container>
				</main>
			</Box>
		</ThemeProvider>
	);
};

export default Popup;
