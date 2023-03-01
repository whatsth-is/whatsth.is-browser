import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../api/agent";
import { IInspectionResult } from "../interfaces";
import { DisplayCMS, DisplaySecondary } from "./inspectModules";

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
			alert(`cool, btw ${response.success.toString()}`);
			setSiteDetails(response);
			setLoading(false);
		}).catch((err: any) => {
			setRError(true);
			setLoading(false);
		});
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
				<Typography variant="h1" my={2}>Failed to detect {url}...</Typography>
				<Typography my={2}>Check to make sure the site exists and is responding to public requests.</Typography>
			</Box>
		);
	}

	if (typeof siteDetails.message !== 'string') {
		return (
			<Box>
				<Typography my={1} color="darkgrey">For the URL {url} ...</Typography>
				<Box my={2}>
					<DisplayCMS details={siteDetails.message.technology.cms} />
				</Box>
				{siteDetails.message.technology.javascript.length > 0 &&
					<Box my={2}>
						<Typography variant="h2" my={2}>JavaScript</Typography>
						<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							{siteDetails.message.technology.javascript.map((jslib, i) => {
								return (
									<Grid key={i} item xs={12} md={6}>
										<DisplaySecondary details={jslib} />
									</Grid>
								);
							})}
						</Grid>
					</Box>}
				{siteDetails.message.technology.cdn.length > 0 &&
					<Box my={2}>
						<Typography variant="h2" my={2}>CDN</Typography>
						<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							{siteDetails.message.technology.cdn.map((jslib, i) => {
								return (
									<Grid key={i} item xs={12} md={6}>
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
