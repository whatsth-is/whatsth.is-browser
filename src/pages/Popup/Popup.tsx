import { Link, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { InspectonResult } from '../inspection';
import Layout from '../_layout';

export default function Popup() {
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

	return (
		<Layout>
			<InspectonResult url={currentTabUrl} />
			<Typography sx={{ fontSize: 14, textAlign: 'center' }} color="text.secondary">
				With love from <Link href="https://github.com/soup-bowl/whatsth.is-browser" target="_blank" rel="noopener" color="text.secondary">soup-bowl</Link>
			</Typography>
		</Layout>
	);
}
