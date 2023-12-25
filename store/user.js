import {defineStore} from 'pinia';

export const useUserStore = defineStore('user',{
	state: ()=>{
		return {
			id: 0,
			dormitoryId:0,
			position:1   //判断用户类型，1为学生
		};
	},
	actions: {
		setId(id) {
			this.id = id;
		},
		setDormitoryId(dormitoryId){
			this.dormitoryId = dormitoryId;
		},
		setPosition(position){
			this.position = position;
		}
	}
});