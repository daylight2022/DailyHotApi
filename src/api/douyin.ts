import { get } from '@/utils/getData';
import { getTime } from '@/utils/getTime';
import { RouteType } from '@/types/router';
import { RouteData } from '@/types';

export const getRouteData = async (_: undefined, noCache: boolean) => {
	const { fromCache, updateTime, data } = await getList(noCache);
	const routeData: RouteData = {
		name: 'douyin',
		title: '抖音',
		type: '热榜',
		description: '实时上升热点',
		link: 'https://www.douyin.com',
		total: data?.length || 0,
		updateTime,
		fromCache,
		data,
	};
	return routeData;
};

// 获取抖音临时 Cookis
const getDyCookies = async () => {
	try {
		const cookisUrl = 'https://www.douyin.com/passport/general/login_guiding_strategy/?aid=6383';
		const { data } = (await get({ url: cookisUrl, originData: true })) as any;
		const pattern = /passport_csrf_token=(.*); Path/s;
		const matchResult = data.headers['set-cookie'][0].match(pattern);
		const cookieData = matchResult[1];
		return cookieData;
	} catch (error) {
		console.error('获取抖音 Cookie 出错' + error);
		return null;
	}
};

export const getList = async (noCache: boolean) => {
	const url = `https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1`;
	const cookie = await getDyCookies();
	const res = await get({
		url,
		noCache,
		headers: {
			Cookie: `passport_csrf_token=${cookie};`,
		},
	});
	const list = res.data.data.word_list;
	return {
		fromCache: res.fromCache,
		updateTime: res.updateTime,
		data: list.map((t: RouteType['douyin']) => {
			return {
				id: t.sentence_id,
				title: t.word,
				timestamp: getTime(t.event_time),
				hot: t.hot_value,
				url: `https://www.douyin.com/hot/${t.sentence_id}`,
			};
		}),
	};
};
