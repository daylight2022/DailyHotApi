import { serve } from '@hono/node-server';
import logger from '@/utils/logger';
import { config } from './config';
import app from '@/app';

const DailyHotApi: (port?: number) => void = (port: number = config.PORT) => {
	try {
		const apiServer = serve({
			fetch: app.fetch,
			port,
		});
		logger.info(`🔥 DailyHot API 成功在端口 ${port} 上运行`);
		logger.info(`🔗 Local: 👉 http://localhost:${port}`);
		return apiServer;
	} catch (e) {
		logger.error(e);
	}
};

if (process.env.NODE_ENV === 'development') {
	DailyHotApi(config.PORT);
}

export default DailyHotApi;
