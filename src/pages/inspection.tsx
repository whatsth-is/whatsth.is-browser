import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../api/agent";
import { IInspectionDetails } from "../interfaces";
import DetailCard from "../components/inspectModules";

interface Props {
	url: string;
}

export function InspectonResult({url}:Props) {
	const [siteDetails, setSiteDetails] = useState<IInspectionDetails[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [requestError, setRError] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);

		const addSoftwareToList = (inspection: IInspectionDetails, type: string) => {
			let list = siteDetails;
			let newItem = inspection;
			newItem.type = type;
			list.push(newItem);
			setSiteDetails(list);
		}

		agent.Inspection.inspect(url)
			.then(response => {
				if (typeof response.message !== 'string') {
					if (response.message.technology.cms !== null) { addSoftwareToList(response.message.technology.cms, 'CMS') };
					if (response.message.technology.frontend !== null) { addSoftwareToList(response.message.technology.frontend, 'Frontend') };
					response.message.technology.javascript.forEach((res) => addSoftwareToList(res, 'JavaScript'));
					response.message.technology.cdn.forEach((res) => addSoftwareToList(res, 'CDN'));
					response.message.technology.seo.forEach((res) => addSoftwareToList(res, 'SEO'));
					response.message.technology.language.forEach((res) => addSoftwareToList(res, 'Language'));
					response.message.technology.server.forEach((res) => addSoftwareToList(res, 'Server'));
				}
			})
			.catch(() => setRError(true))
			.finally(() => setLoading(false));
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

	return (
		<Box my={2}>
			{!requestError ?
				<>
					{siteDetails.length > 0 ?
						<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
							{siteDetails.map((jslib, i) => {
								return (
									<Grid key={i} item xs={12} md={6}>
										<DetailCard details={jslib} />
									</Grid>
								);
							})}
						</Grid>
						:
						<Box>
							<Typography variant="h1" my={2}>Nothing detected!</Typography>
							<Typography my={1} color="darkgrey">
								We can see the site, but nothing was detected against our algorithms
							</Typography>
							<Typography>
								This can happen when the site uses technology not known by the system, or when the website is using
								methods to customise libraries and functions, which may not be understood by the algorithm.
							</Typography>
						</Box>
					}
				</>
				:
				<Box>
					<Typography variant="h1" my={2}>Access failed</Typography>
					<Typography my={1} color="darkgrey">For some reason, our API cannot access the specified URL</Typography>
					<Typography>
						Check to make sure the website you specified is a correct, valid address. This can also happen if the
						website has blocked us from scanning it.
					</Typography>
				</Box>}
		</Box>
	);

};
