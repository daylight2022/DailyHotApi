import { Hono } from 'hono';
import Home from './views/Home.js';
import { serveStatic } from '@hono/node-server/serve-static';
import { trimTrailingSlash } from 'hono/trailing-slash';
import { compress } from 'hono/compress';
import { cors } from 'hono/cors';
import registry from './registry';
import { config } from './config.js';
import NotFound from './views/404.js';
import Error from './views/Error.js';
import logger from './utils/logger.js';

const app = new Hono();

// 压缩响应
app.use(compress());

// 尾部斜杠重定向
app.use(trimTrailingSlash());

// CORS
app.use(
	'*',
	cors({
		origin: config.ALLOWED_DOMAIN,
		allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
		allowMethods: ['GET', 'POST', 'OPTIONS'],
		credentials: true,
	})
);

// 静态资源
app.use(
	'/*',
	serveStatic({
		root: './public',
		rewriteRequestPath: (path) => (path === '/favicon.ico' ? '/favicon.png' : path),
	})
);

// 接口路由测试
app.route('/', registry);

// 首页
app.get('/', (c) => c.html(<Home />));
// 404
app.notFound((c) => c.html(<NotFound />, 404));
// error
app.onError((err, c) => {
	logger.error(`出现未知错误：${err}`);
	return c.html(<Error error={err?.message} />, 500);
});

// 页面测试
app.get('/error', (c) => c.html(<Error error="错误信息" />, 500));
app.get('/404', (c) => c.html(<NotFound />, 404));

export default app;
