export interface IOpenAPI {
	info: IOpenAPIInfo;
}

export interface IOpenAPIInfo {
	title: string;
	description: string;
	version: string;
}

export interface IInspectionResult {
	success: boolean;
	message: IInspectionSiteDetails | string;
	url: string;
}

export interface IInspectionSiteDetails {
	title: string;
	technology: IInspectionTechnology;
	additional?: IInspectionWordPress;
}

export interface IInspectionTechnology {
	cms?: IInspectionDetails;
	frontend?: IInspectionDetails;
	javascript: IInspectionDetails[];
	cdn: IInspectionDetails[];
}

export interface IInspectionDetails {
	name: string;
	description: string;
	url: string;
	match_available: number;
	match_on: string[];
}

export interface IInspectionWordPress {
	success: boolean;
	name: string;
	tagline: string;
	timezone: string;
	post_count: number;
	page_count: number;
	cat_count: number;
	latest_post?: IInspectionWordPressPost;
	latest_page?: IInspectionWordPressPost;
}

export interface IInspectionWordPressPost {
	title: string;
	date: string;
	url: string;
}
