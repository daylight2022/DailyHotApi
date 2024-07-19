import { Hono } from 'hono';

const app = new Hono();

app.get('/zhihu', async (c) => {
	const { getList } = await import('@/api/zhihu-daily');
	const listData = await getList(true);
	return c.json({
		code: 200,
		...listData,
	});
});

export default app;
