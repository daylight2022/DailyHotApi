import { get } from '@/utils/getData';
import { RouteType } from '@/types/router';
import { RouteData } from '@/types';

export const getRouteData = async (noCache: boolean) => {
	const { fromCache, updateTime, data } = await getList(noCache);
	const routeData: RouteData = {
		name: 'zhihu-daily',
		title: '知乎日报',
		type: '推荐榜',
		description: '每天三次，每次七分钟',
		link: 'https://daily.zhihu.com',
		total: data?.length || 0,
		updateTime,
		fromCache,
		data,
	};
	return routeData;
};

export const getList = async (noCache: boolean) => {
	const url = 'https://daily.zhihu.com/api/4/news/latest';
	const res = await get({
		url,
		noCache,
		headers: {
			Referer: url,
			Host: 'daily.zhihu.com',
		},
	});
	const list = res.data.stories.filter((item: RouteType['zhihu-daily']) => item.type === 0);
	return {
		fromCache: res.fromCache,
		updateTime: res.updateTime,
		data: list.map((t: RouteType['zhihu-daily']) => ({
			id: t.id,
			title: t.title,
			cover: t.images[0],
			hint: t.hint,
			url: t.url,
		})),
	};
};
