import { Hono } from 'hono';

const app = new Hono();

app.get('/zhihu-daily', async (c) => {
	const { getRouteData } = await import('@/api/zhihu-daily');
	const listData = await getRouteData(true);
	return c.json({
		code: 200,
		...listData,
	});
});
app.get('/zhihu', async (c) => {
	const { getRouteData } = await import('@/api/zhihu');
	const listData = await getRouteData(true);
	return c.json({
		code: 200,
		...listData,
	});
});
app.get('/toutiao', async (c) => {
	const { getRouteData } = await import('@/api/toutiao');
	const listData = await getRouteData(true);
	return c.json({
		code: 200,
		...listData,
	});
});

export default app;
