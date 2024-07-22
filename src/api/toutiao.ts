import { get } from '@/utils/getData';
import { getTime } from '@/utils/getTime';
import { RouteType } from '@/types/router';
import { RouteData } from '@/types';

export const getRouteData = async (noCache: boolean) => {
	const { fromCache, updateTime, data } = await getList(noCache);
	const routeData: RouteData = {
		name: 'toutiao',
		title: '今日头条',
		type: '热榜',
		link: 'https://www.toutiao.com',
		total: data?.length || 0,
		updateTime,
		fromCache,
		data,
	};
	return routeData;
};

export const getList = async (noCache: boolean) => {
	const url = `https://www.toutiao.com/hot-event/hot-board/?origin=toutiao_pc`;
	const res = await get({
		url,
		noCache,
	});
	const list = res.data || [];
	return {
		fromCache: res.fromCache,
		updateTime: res.updateTime,
		data: list.map((t: RouteType['toutiao']) => ({
			id: t.ClusterIdStr,
			title: t.Title,
			cover: t.Image.url,
			hot: Number(t.HotValue),
			timestamp: getTime(t.ClusterIdStr),
			url: `https://www.toutiao.com/trending/${t.ClusterIdStr}/`,
		})),
	};
};
