import { AppBar, Box, Container, createTheme, CssBaseline, styled, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { ReactNode, useMemo } from 'react';

interface Props {
	children: ReactNode;
}

export default function Layout({children}:Props) {
	const theme = useMemo(() => createTheme({
		palette: {
			primary: purple,
			mode: 'dark'
		},
		typography: {
			button: {
				textTransform: 'none'
			},
			h1: {
				fontSize: '3.25rem'
			},
			h2: {
				fontSize: '2.75rem'
			},
			h3: {
				fontSize: '2rem'
			}
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
						{children}
					</Container>
				</main>
			</Box>
		</ThemeProvider>
	);
}
