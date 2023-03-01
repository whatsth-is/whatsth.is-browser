import axios, { AxiosResponse } from "axios";
import { IInspectionResult, IOpenAPI } from "../interfaces";


axios.defaults.baseURL = "https://api.whatsth.is/";

const responseBody = <T> ( response: AxiosResponse<T> ) => response.data;

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
};

const Details = {
	openapi: () => requests.get<IOpenAPI>('/openapi.json'),
}

const Inspection = {
	inspect: (url: string) => requests.get<IInspectionResult>('/inspect/' + encodeURIComponent(url)),
};

const agent = {
	Details,
	Inspection
};

export default agent;
