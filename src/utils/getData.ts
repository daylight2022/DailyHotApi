import { config } from '@/config';
import axios from 'axios';
import { GET } from '@/types';
import { getCache, setCache, delCache } from './cache';
import logger from './logger';

// 创建axios实例
const request = axios.create({
	timeout: config.TIMEOUT,
});

// 请求拦截器
request.interceptors.request.use(
	(req) => {
		return req;
	},
	(error) => {
		logger.error('请求失败，请稍后重试');
		return Promise.reject(error);
	}
);

// 响应拦截器
request.interceptors.response.use(
	(res) => {
		return res;
	},
	(error) => {
		logger.info('响应失败，请稍后重试');
	}
);

// GET
export const get = async (options: GET) => {
	const { url, headers, params, noCache, ttl = config.CACHE_TTL, originData = false } = options;
	logger.info('发起 GET 请求', options);
	try {
		if (noCache) delCache(url);
		else {
			const cacheData = getCache(url);
			if (cacheData) {
				logger.info('缓存命中', { url });				
				return { fromCache: true, data: cacheData.data, updateTime: cacheData.updateTime };
			}
		}
		// 缓存不存在时请求接口
		logger.info('请求接口', { url });
		const response = await request.get(url, { headers, params });
		const resData = response?.data || response;
		// 缓存数据
		const updateTime = new Date().toISOString();
		const data = originData ? response : resData;
		setCache(url, { data, updateTime }, ttl);
		// 返回数据
		logger.info('接口调用成功', { status: response?.status });
		return { fromCache: false, data, updateTime };
	} catch (error) {
		logger.info('GET 请求出错', error);
		throw error;
	}
};
