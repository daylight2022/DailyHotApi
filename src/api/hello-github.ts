import { get } from '@/utils/getData';
import { getTime } from '@/utils/getTime';
import { RouteType } from '@/types/router';
import { RouteData, ListContext, Options } from '@/types';

export const getRouteData = async (_: ListContext, noCache: boolean) => {
	const sort = _.req.query('sort') || 'featured';
	const { fromCache, updateTime, data } = await getList({ sort }, noCache);
	const routeData: RouteData = {
		name: 'hellogithub',
		title: 'Hello Github',
		type: '热门仓库',
		params: {
			sort: {
				name: '综合',
				type: {
					all: '全部',
					featured: '精选',
				},
			},
		},
		link: 'https://hellogithub.com/',
		total: data?.length || 0,
		updateTime,
		fromCache,
		data,
	};
	return routeData;
};

export const getList = async (options: Options, noCache: boolean) => {
	const { sort } = options;
	const url = `https://api.hellogithub.com/v1/?sort_by=${sort}&tid=&page=1`;
	const res = await get({
		url,
		noCache,
	});
	const list = res.data.data || [];
	return {
		fromCache: res.fromCache,
		updateTime: res.updateTime,
		data: list.map((t: RouteType['hellogithub']) => ({
			id: t.item_id,
			title: t.title,
			author: t.author,
			desc: t.summary,
			hot: t.clicks_total,
			timestamp: getTime(t.updated_at),
			url: `https://hellogithub.com/repository/${t.item_id}`,
		})),
	};
};
