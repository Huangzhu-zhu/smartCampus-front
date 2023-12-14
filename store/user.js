import {defineStore} from 'pinia';

export const useUserStore = defineStore('user',{
	state: ()=>{
		return {
			id: 2
		};
	},
	actions: {
		setId(id) {
			this.id = id;
		}
	}
});