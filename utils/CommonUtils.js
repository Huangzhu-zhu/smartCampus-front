/**
 * 返回格式化为 xx.xx 形式的字符串
 * @param {number} value
 */
export function formatMoney(value) {
	if (typeof value !== 'number') {
		return '0.00';
	}
	const str = new String(value)
	const index = str.indexOf('.')
	if (index < 0) {
		return `${str}.00`
	} else {
		const floatPart = str.substring(index, str.length)
		if (floatPart.length == 1) {
			return `${str}0`
		} else {
			return new String(Math.round(value * 100) / 100);
		}
	}
}