import { config } from '@/config';
import axios from 'axios';
import { GET } from '@/types';
import { getCache, setCache, delCache } from './cache';

// 创建axios实例
const request = axios.create({
	timeout: config.timeout,
});

// 请求拦截器
request.interceptors.request.use(
	(req) => {
		return req;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

// 响应拦截器
request.interceptors.response.use(
	(res) => {
		return res.data;
	},
	(error) => {
		console.log(error);
	}
);

// GET
export const get = async (options: GET) => {
	const { url, headers, params, noCache, ttl = config.cache_ttl } = options;
	try {
		if (noCache) delCache(url);
		else {
			const cacheData = getCache(url);
			if (cacheData) {
				console.log('缓存命中', { url });
				return { fromCache: true, data: cacheData, updateTime: cacheData.updateTime };
			}
		}
		// 缓存不存在时请求接口
		const response = await request.get(url, { headers, params });
		const resData = response?.data || response;
		// 缓存数据
		const updateTime = new Date().toISOString();
		setCache(url, { resData, updateTime }, ttl);
		// 返回数据
		console.log('请求成功', { status: response?.status });
		return { fromCache: false, data: resData, updateTime };
	} catch (error) {
		console.log('GET 请求出错', error);
		throw error;
	}
};
