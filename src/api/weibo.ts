import { get } from '@/utils/getData';
import { getTime } from '@/utils/getTime';
import { RouteType } from '@/types/router';
import { RouteData } from '@/types';

export const getRouteData = async (_: undefined, noCache: boolean) => {
	const { fromCache, updateTime, data } = await getList(noCache);
	const routeData: RouteData = {
		name: 'weibo',
		title: '微博',
		type: '热搜榜',
		description: '实时热点，每分钟更新一次',
		link: 'https://s.weibo.com/top/summary/',
		total: data?.length || 0,
		updateTime,
		fromCache,
		data,
	};
	return routeData;
};

export const getList = async (noCache: boolean) => {
	const url = `https://weibo.com/ajax/side/hotSearch`;
	const res = await get({
		url,
		noCache,
		ttl: 60, // 每分钟更新一次
	});
	const list = res.data.data.realtime;
	return {
		fromCache: res.fromCache,
		updateTime: res.updateTime,
		data: list.map((t: RouteType['weibo']) => {
			const key = t.word_scheme ? t.word_scheme : `#${t.word}#`;
			return {
				title: t.word,
				url: `https://s.weibo.com/weibo?q=${encodeURIComponent(key)}&t=31&band_rank=1&Refer=top`,
				desc: t.note || key,
				hot: t.num,
			};
		}),
	};
};
