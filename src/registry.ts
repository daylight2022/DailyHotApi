import { Hono } from 'hono';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const app = new Hono();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// 路由路径
let allRoutePath: Array<string> = [];
const routersDirName: string = 'api';
// 排除的路由
const excludeRoutes: Array<string> = [''];
// 建立完整路由路径
const routersDirPath = path.join(__dirname, routersDirName);
// 遍历路由目录
const findAllRoutePath = (dir: string, allFiles: string[] = [], basePath: string = ''): string[] => {
	// 获取目录下所有文件
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const fullPath: string = path.join(dir, file);
		const relativePath: string = basePath ? path.posix.join(basePath, file) : file;
		if (fs.statSync(fullPath).isDirectory()) {
			// 如果是目录，则递归
			findAllRoutePath(fullPath, allFiles, path.posix.join(basePath, file));
		} else if (file.endsWith('.ts') || file.endsWith('.js')) {
			allFiles.push(relativePath.replace(/\.(ts|.js)$/, ''));
		}
	});
	return allFiles;
};

// 获取所有路由
if (fs.existsSync(routersDirPath) && fs.statSync(routersDirPath).isDirectory()) {
	allRoutePath = findAllRoutePath(routersDirPath);
} else {
	console.log(routersDirPath + ' is not a directory');
}

// 注册路由
for (const routePath of allRoutePath) {
	if (!excludeRoutes.includes(routePath)) {
		const baseApp = app.basePath(`/${routePath}`);
		baseApp.get('/', async (c) => {
			// 是否采用缓存
			const noCache = c.req.query('cache') === 'false';
			// 限制显示条目
			const limit = c.req.query('limit');
			// 获取路由数据
			const { getRouteData } = await import(`./api/${routePath}.ts`);
			const data = await getRouteData(c, noCache);

			if (limit && data?.data?.length > parseInt(limit)) {
				data.total = parseInt(limit);
				data.data = data.data.slice(0, parseInt(limit));
			}

			return c.json({
				code: 200,
				...data,
			});
		});
		baseApp.all('*', async (c) => {
			return c.json({ code: 405, message: 'Method Not Allowed' }, 405);
		});
	}
}

app.get('/all', (c) =>
	c.json({
		code: 200,
		count: allRoutePath.length,
		data: allRoutePath.map((path) => {
			if (excludeRoutes.includes(path))
				return {
					name: path,
					path: null,
					message: '该接口暂时下线',
				};
			return {
				path,
				name: path
					.replace(/\.(ts|.js)$/, '')
					.split('/')
					.join(' '),
			};
		}),
	})
);

export default app;
