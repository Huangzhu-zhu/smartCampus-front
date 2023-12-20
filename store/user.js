import {defineStore} from 'pinia';

export const useUserStore = defineStore('user',{
	state: ()=>{
		return {
			id: 0,
			dormitoryId:0
		};
	},
	actions: {
		setId(id) {
			this.id = id;
		},
		setDormitoryId(dormitoryId){
			this.dormitoryId = dormitoryId;
		}
	}
});