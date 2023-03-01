import { useEffect, useState } from 'react';
import { InspectonResult } from '../../components/inspection';
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
		</Layout>
	);
}
