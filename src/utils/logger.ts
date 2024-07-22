import { config } from '@/config';
import { createLogger, format, transports } from 'winston';
import path from 'path';
import chalk from 'chalk';

let pathOption: (typeof transports.File)[] = [];
// 日志输出目录
if (config.USE_LOG_FILE) {
	try {
		pathOption = [
			new transports.File({
				filename: path.join(config.LOG_PATH, 'error.log'),
				level: 'error',
				maxsize: 1024 * 1024,
				maxFiles: 1,
			}),
			new transports.File({
				filename: path.join(config.LOG_PATH, 'logger.log'),
				maxsize: 1024 * 1024,
				maxFiles: 1,
			}),
		];
	} catch (e) {
		console.error('Failed to initialize log files. Logging to a file will be skipped.', e);
		pathOption = [];
	}
}

// 定义日志级别色块
const levelColors: { [key: string]: string } = {
	error: chalk.bgRed(' ERROR '),
	warn: chalk.bgYellow(' WARN '),
	info: chalk.bgGreen(' INFO '),
	debug: chalk.bgBlue(' DEBUG '),
	default: chalk.bgWhite(' LOG '),
};

// 定义日志格式
const consoleFormat = format.printf(({ level, message, timestamp, stack }) => {
	const oriLevel = Object.keys(levelColors).find((lvl) => level.includes(lvl)) || 'default';
	const levelColor = levelColors[oriLevel] || levelColors.default;

	return `${levelColor} [${timestamp}] ${message}${stack ? `\n${stack}` : ''}`;
});

//logger
const logger = createLogger({
	// 最低日志级别
	level: 'info',
	// 格式
	format: format.combine(
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.errors({ stack: true }),
		format.json()
	),
	transports: pathOption,
});

// 控制台输出
if (process.env.NODE_ENV !== 'production') {
	try {
		logger.add(
			new transports.Console({
				format: format.combine(format.colorize(), consoleFormat),
			})
		);
	} catch (error) {
		console.error('Failed to add console transport. Console logging will be skipped.', error);
	}
}

export default logger;
