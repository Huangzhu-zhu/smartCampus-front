import {
	defineStore
} from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			id: 0,
			dormitoryId: 0,
			position: 1, //判断用户类型，1为学生,
			token: '',
			studentNO:'' //学号
		};
	},
	actions: {
		setId(id) {
			this.id = id;
		},
		setDormitoryId(dormitoryId) {
			this.dormitoryId = dormitoryId;
		},
		setPosition(position) {
			this.position = position;
		},
		setStudentNO(studentNO){
			this.studentNO = studentNO;
		},
		// 登出操作
		logout() {
			this.id = 0;
			this.dormitoryId = 0;
			this.position = 1;
			this.token = ''
		},
		// 登录操作
		login(token) {
			this.token = token
		}

	}
});