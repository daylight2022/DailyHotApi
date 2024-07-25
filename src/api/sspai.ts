import { get } from '@/utils/getData';
import { getTime } from '@/utils/getTime';
import { RouteType } from '@/types/router';
import { RouteData, ListContext, Options } from '@/types';

export const getRouteData = async (_: ListContext, noCache: boolean) => {
	const type = _.req.query('type') || '热门文章';
	const { fromCache, updateTime, data } = await getList({ type }, noCache);
	const routeData: RouteData = {
		name: 'sspai',
		title: '少数派',
		type: '热榜',
		params: {
			type: {
				name: '分类',
				type: ['热门文章', '应用推荐', '生活方式', '效率技巧', '少数派播客'],
			},
		},
		link: 'https://sspai.com',
		total: data?.length || 0,
		updateTime,
		fromCache,
		data,
	};
	return routeData;
};

export const getList = async (options: Options, noCache: boolean) => {
	const { type } = options;
	const url = `https://sspai.com/api/v1/article/tag/page/get?limit=40&tag=${type}`;
	const res = await get({
		url,
		noCache,
	});
	const list = res.data.data || [];
	return {
		fromCache: res.fromCache,
		updateTime: res.updateTime,
		data: list.map((t: RouteType['sspai']) => ({
			id: t.id,
			title: t.title,
			cover: t.banner,
			desc: t.summary,
			author: t.author.nickname,
			hot: t.like_count,
			timestamp: getTime(t.released_time),
			url: `https://sspai.com/post/${t.id}/`,
		})),
	};
};
