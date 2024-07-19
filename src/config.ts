import dotenv from 'dotenv';

dotenv.config();

// 获取环境变量
const getEnvValue = (key: string): string | null => {
	const value = process.env[key];
	if (value === undefined) {
		return null;
	}
	return value;
};
// 环境变量转数值
const getNumericEnvValue = (key: string, defaultValue: number): number => {
	const value = getEnvValue(key) ?? String(defaultValue);
	const parsedValue = parseInt(value, 10);
	if (isNaN(parsedValue)) {
		return defaultValue;
	}
	return parsedValue;
};

export const config = {
	port: getNumericEnvValue('PORT', 9001),
	timeout: getNumericEnvValue("TIMEOUT", 5000),
	cache_ttl: getNumericEnvValue("CACHE_TTL", 3600)
};
