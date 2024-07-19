import { get } from '@/utils/getData';
import { RouterType } from '@/types/router';

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
	console.log('res', res);
	const list = res.data.stories.filter((item: RouterType['zhihu-daily']) => item.type === 0);
	return {
		fromCache: res.fromCache,
		updateTime: res.updateTime,
		data: list.map((t: RouterType['zhihu-daily']) => ({
			id: t.id,
			title: t.title,
			cover: t.images[0],
			hint: t.hint,
			url: t.url,
		})),
	};
};
