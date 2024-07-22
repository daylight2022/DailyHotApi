// 请求类型
export type GET = {
	url: string;
	headers?: Record<string, string | string[]>;
	params?: Record<string, string | number>;
	timeout?: number;
	noCache?: boolean;
	ttl?: number;
};

// 榜单数据类型
export type ListItem = {
	id: number;
	title: string;
	cover?: string;
	author?: string;
	description: string;
  hot: number | null;
  timestamp: number | string | null;
  url: string
};

// 路由数据类型
export type RouteData = {
	name: string;
	title: string;
	type: string;
	description?: string;
	params?: Record<string, string | object>;
	total: number;
	link?: string;
	updateTime: string;
	fromCache: boolean;
	data: ListItem[];
};
