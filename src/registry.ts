import { Hono } from 'hono';

const app = new Hono();

app.get('/zhihu', async (c) => {
	const { getRouteData } = await import('@/api/zhihu-daily');
	const listData = await getRouteData(true);
	return c.json({
		code: 200,
		...listData,
	});
});

export default app;
