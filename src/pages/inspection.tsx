import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../api/agent";
import { IInspectionResult } from "../interfaces";
import { DisplayCMS, DisplaySecondary } from "../components/inspectModules";

interface Props {
	url: string;
}

export function InspectonResult({url}:Props) {
	const [siteDetails, setSiteDetails] = useState<IInspectionResult>({} as IInspectionResult);
	const [loading, setLoading] = useState<boolean>(true);
	const [requestError, setRError] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		agent.Inspection.inspect(url).then(response => {
			setSiteDetails(response);
			setRError(false);
		}).catch((err: any) => {
			setRError(true);
		}).finally(() => setLoading(false));
	}, [url]);

	if (loading) {
		return (
			<Grid container spacing={0} my={2} direction="column" alignItems="center">
				<Grid item xs={3}>
					<CircularProgress />
				</Grid>
				<Grid item xs={3}>
					<Typography>Inspecting the site...</Typography>
				</Grid>
			</Grid>
		);
	}

	if (requestError || siteDetails.success === false) {
		return (
			<Box>
				<Typography variant="h1" my={2}>Detection failed</Typography>
				<Typography my={2}>Check to make sure the site exists and is responding to public requests.</Typography>
			</Box>
		);
	}

	if (typeof siteDetails.message !== 'string') {
		return (
			<Box>
				<Box my={2}>
					<DisplayCMS details={siteDetails.message.technology.cms} />
				</Box>
				{siteDetails.message.technology.javascript.length > 0 &&
					<Box my={2}>
						<Typography variant="h2" my={2}>JavaScript</Typography>
						<Grid container rowSpacing={1}>
							{siteDetails.message.technology.javascript.map((jslib, i) => {
								return (
									<Grid key={i} item xs={12}>
										<DisplaySecondary details={jslib} />
									</Grid>
								);
							})}
						</Grid>
					</Box>}
				{siteDetails.message.technology.cdn.length > 0 &&
					<Box my={2}>
						<Typography variant="h2" my={2}>CDN</Typography>
						<Grid container rowSpacing={1}>
							{siteDetails.message.technology.cdn.map((jslib, i) => {
								return (
									<Grid key={i} item xs={12}>
										<DisplaySecondary details={jslib} />
									</Grid>
								);
							})}
						</Grid>
					</Box>}
			</Box>
		);
	} else {
		return (<Box>
			<Typography>an unknown error occurred.</Typography>
		</Box>);
	}
};
