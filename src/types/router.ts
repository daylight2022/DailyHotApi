export type RouteType = {
	'zhihu-daily': {
		id: number;
		title: string;
		hint: string;
		url: string;
		images: [string];
		type: number;
	};
	zhihu: {
		target: {
			id: string;
			title: string;
			url: string;
			created: number;
			excerpt: string;
		};
		children: [
			{
				thumbnail: string;
			}
		];
		detail_text: string;
	};
};
