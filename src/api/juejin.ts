import { get } from '@/utils/getData';
import { getTime } from '@/utils/getTime';
import { RouteType } from '@/types/router';
import { RouteData } from '@/types';

export const getRouteData = async (_: undefined, noCache: boolean) => {
	const { fromCache, updateTime, data } = await getList(noCache);
	const routeData: RouteData = {
		name: 'juejin',
		title: '稀土掘金',
		type: '文章榜',
		link: 'https://juejin.cn/hot/articles',
		total: data?.length || 0,
		updateTime,
		fromCache,
		data,
	};
	return routeData;
};

export const getList = async (noCache: boolean) => {
	const url = 'https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot';
	const res = await get({
		url,
		noCache,
	});
	const list = res.data.data || [];
	return {
		fromCache: res.fromCache,
		updateTime: res.updateTime,
		data: list.map((t: RouteType['juejin']) => ({
			id: t.content.content_id,
			title: t.content.title,
			author: t.author.name,
			hot: t.content_counter.hot_rank,
			url: `https://juejin.cn/post/${t.content.content_id}`,
		})),
	};
};
