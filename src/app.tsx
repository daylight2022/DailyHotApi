import { Hono } from 'hono';
import Home from './views/Home.js';
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from 'hono/cors';

const app = new Hono();


// 静态资源
app.use(
	'/*',
	serveStatic({
		root: './public',
    rewriteRequestPath: (path) => (path === "/favicon.ico" ? "/favicon.png" : path),
	})
);


// 首页
app.get('/', (c) => c.html(<Home />));

export default app;
