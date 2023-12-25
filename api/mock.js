/**
 * 用于模拟异步请求数据
 * @param data 返回的数据
 * @param wait_time 等待时间，单位为s，默认为[1, 6] 随机一个数
 * @param success 该请求是否成功，默认为成功
 */
export function mock_fetch_data(data, wait_time = parseInt(Math.random() * 5 + 1, 10), success = true) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (success) {
				resolve(data)
			} else {
				reject(new Error("some error happend"))
			}
		}, wait_time * 1000)
	})
}