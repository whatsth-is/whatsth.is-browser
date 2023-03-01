import React, { useEffect, useMemo, useState } from 'react';
import agent from '../../api/agent';
import { IInspectionResult } from '../../interfaces';
import Layout from '../_layout';

export default function Popup() {
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

	return (
		<Layout>
			{!loading && <pre>
				{loading.toString()}
				{requestError.toString()}
				{JSON.stringify(siteDetails, null, 2)}
			</pre>}
		</Layout>
	);
}
