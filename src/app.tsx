import { Hono } from 'hono';
import Home from './views/Home.js';
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from 'hono/cors';
import registry from '@/registry';

const app = new Hono();


// 静态资源
app.use(
	'/*',
	serveStatic({
		root: './public',
    rewriteRequestPath: (path) => (path === "/favicon.ico" ? "/favicon.png" : path),
	})
);

// 接口路由测试
app.route("/", registry)

// 首页
app.get('/', (c) => c.html(<Home />));

export default app;
