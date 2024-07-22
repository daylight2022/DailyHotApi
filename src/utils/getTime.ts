import dayjs from 'dayjs';

export const getTime = (timeInput: string | number): number | null => {
	try {
		let num: number;

		if (typeof timeInput === 'string') {
			num = Number(timeInput);
			if (isNaN(num)) {
				// 将各种分隔符替换为标准格式
				let standardizedInput = timeInput
					.replace(/(\d{4})-(\d{2})-(\d{2})-(\d{2})/, '$1-$2-$3 $4') // "YYYY-MM-DD-HH" -> "YYYY-MM-DD HH"
					.replace(/(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):?(\d{2})?:?(\d{2})?/, '$1-$2-$3 $4:$5:$6') // "YYYY-MM-DDTHH:mm:ss" -> "YYYY-MM-DD HH:mm:ss"
					.replace(/(\d{4})[-/](\d{2})[-/](\d{2})/, '$1-$2-$3'); // "YYYY/MM/DD" or "YYYY-MM-DD" -> "YYYY-MM-DD"

				// 减少解析过程中可能的多余空格
				standardizedInput = standardizedInput.replace(/\s+/, ' ').trim();

				// 处理标准化后的日期时间字符串
				const formatPatterns = ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH', 'YYYY-MM-DD'];

				let parsedDate: dayjs.Dayjs | null = null;
				for (const pattern of formatPatterns) {
					parsedDate = dayjs(standardizedInput, pattern, true);
					if (parsedDate.isValid()) {
						return parsedDate.valueOf();
					}
				}
				return null;
			}
		} else {
			num = timeInput;
		}

		// 判断是否为毫秒级时间戳
		if (num > 946684800000) {
			// 以2000年作为毫秒时间戳参考点
			return num;
		} else {
			return num * 1000;
		}
	} catch (error) {
		return null;
	}
};
