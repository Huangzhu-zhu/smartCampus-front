import {
	useUserStore
} from "@/store/user";
import toast from '@/utils/toasts.js';
import {
	computed
} from "vue";

const store = useUserStore()

const headers = computed(() => {
	return {
		'content-type': 'application/json',
		token: store.$state.token ? store.$state.token : ''
	}
})

const baseUrl = 'http://120.46.222.199:80';

// 登出
const logout = () => {
	store.logout()
	toast.error('登录信息失效!请重新登陆!')
	uni.redirectTo({
		url: '/pages/login'
	})
}

// 请求
const request = (url, data, method = 'GET') => {
	return new Promise((resolve, reject) => {
		console.log(url, method, data)
		return uni.request({
			url: `${baseUrl}${url}`,
			data: data,
			method: method,
			header: headers.value
		}).then((res) => {
			console.log(url, res.data);
			if (res.data && res.data.code === -1) {
				logout();
				reject(new Error('登录信息失效'));
			} else if (!res.data || res.data.code === 0) {
				reject(new Error(res.data.msg ? res.data.msg : '未知错误'))
			} else {
				resolve(res)
			}
		})
	})
}

export default {
	/**
	 * 根据用户名（学号）获取学生信息
	 * @param {number} studentId
	 */
	getCardBalanceById(studentId) {
		return request('/api/student/card/balance', {
			studentId
		})
	},
	/**
	 * 根据用户名（学号）获取学生信息
	 * @param {number} studentId
	 */
	getUserInfoById(id) {
		return request('/api/student/info', {
			id
		})
	},
	/**
	 * 根据用户名（学号）获取学生信息
	 * @param {number} username
	 */
	getUserInfoByName(username) {
		return request('/api/student/info', {
			username
		})
	},
	/**
	 * 根据宿舍id获取电费
	 * @param {number} dormitoryId
	 */
	getDormitoryInfoById(dormitoryId) {
		return request('/api/student/getDormitory', {
			dormitoryId
		})
	},
	/**
	 * 根据专业编号获取专业班级
	 * @param {number} id
	 */
	getClassInfoByMajorId(id) {
		return request('/class', {
			id
		})
	},
	/**
	 * 添加班级信息
	 * @param {Object} className
	 * @param {Object} people
	 * @param {Object} monitorId
	 * @param {Object} majorId
	 */
	addClass(className, people, monitorId, majorId) {
		return request('/class', {
			className,
			people,
			monitorId,
			majorId
		}, 'POST')
	},

	/**
	 * 修改班级信息
	 * @param {Object} className
	 * @param {Object} people
	 * @param {Object} monitorId
	 * @param {Object} majorId
	 */
	updateClass(className, people, monitorId, majorId) {
		return request('/class', {
			className,
			people,
			monitorId,
			majorId
		}, 'PUT')
	},


	/**
	 * 修改头像、电话
	 * @param {Object} username
	 * @param {Object} avatarUrl
	 * @param {Object} phone
	 */
	updateUserInfo(username, phone, avatarUrl) {
		return request(`/api/student/update?phone=${phone}&avatar=${avatarUrl}&username=${username}`, undefined, 'PUT')
	},

	/**
	 * 上传文件
	 * @param {Object} filePath
	 */
	upload(file) {
		return uni.uploadFile({
			url: `${baseUrl}/upload`,
			filePath: file.tempFilePaths[0],
			name: 'avatar',
			header: headers.value,
		})
	},

	/**
	 * 根据班级编号获取班级人员具体名单
	 * @param {number} id 
	 */
	getClassStudentInfo(id) {
		return request('/api/student/getStudentByClassId', {
			id
		})
	},

	/**
	 * 班级管理:删除单个学生
	 * @param {number} id 
	 */
	delStudent(id) {
		return request('/api/student/delete', {
			id
		}, 'DELETE')
	},

	/**
	 * 班级管理:添加单个学生
	 * @param {string} username 
	 * @param {string} password 
	 * @param {string} name 
	 * @param {number} sex 
	 * @param {number} majorId 
	 * @param {number} classId 
	 * @param {number} dormitoyId 
	 */
	addStudent(username, password, name, sex, majorId, classId, dormitoyId) {
		return request('/api/student/add', {
			username,
			password,
			name,
			sex,
			majorId,
			classId,
			dormitoyId
		}, 'POST')
	},
}