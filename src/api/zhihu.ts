import { get } from '@/utils/getData';
import { getTime } from '@/utils/getTime';
import { RouteType } from '@/types/router';
import { RouteData } from '@/types';

export const getRouteData = async (noCache: boolean) => {
	const { fromCache, updateTime, data } = await getList(noCache);
	const routeData: RouteData = {
		name: 'zhihu',
		title: '知乎',
		type: '热榜',
		link: 'https://zhihu.com/hot',
		total: data?.length || 0,
		updateTime,
		fromCache,
		data,
	};
	return routeData;
};

export const getList = async (noCache: boolean) => {
	const url = `https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true`;
	const res = await get({
		url,
		noCache,
	});
	const list = res.data;
	return {
		fromCache: res.fromCache,
		updateTime: res.updateTime,
		data: list.map((t: RouteType['zhihu']) => {
			const target = t.target;
			return {
				id: target.id,
				title: target.title,
				url: `https://www.zhihu.com/question/${target.id}`,
				desc: target.excerpt,
				cover: t.children[0].thumbnail,
				timestamp: getTime(target.created),
				hot: parseFloat(t.detail_text.split(' ')[0]) * 10000,
			};
		}),
	};
};
