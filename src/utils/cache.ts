import NodeCache from 'node-cache';
import { config } from '@/config';
import logger from '@/utils/logger';

const cache = new NodeCache({
	// 缓存过期时间（秒）
	stdTTL: config.CACHE_TTL,
	// 定期检查过期缓存（秒）
	checkperiod: 3600,
	// 克隆变量
	useClones: false,
	// 最大缓存数
	maxKeys: 100,
});

interface GetCache<T> {
	updateTime: string;
	data: T;
}

// 缓存中获取数据
export const getCache = <T>(key: string): GetCache<T> | undefined => {
	return cache.get(key);
};

// 数据写入缓存
export const setCache = <T>(key: string, data: T, ttl: number = config.CACHE_TTL): boolean => {
	const result = cache.set(key, data, ttl);
	logger.info('缓存写入成功', { url: key });
	return result;
};

// 删除缓存
export const delCache = (key: string) => {
	cache.del(key);
	logger.info('缓存删除成功', { url: key });
};
