<template>
	<view class="container">
		<!-- 信息表单 -->
		<view class="form">
			<uni-forms :model="studentInfo"  validateTrigger="blur">
				<!-- 学号 -->
				<view class="form-item">
					<uni-forms-item name="username">
						<uni-easyinput :inputBorder="false" :clearable="false" v-model="studentInfo.username" placeholder="学号"/>
					</uni-forms-item>
				</view>
			
				<!-- 密码 -->
				<view class="form-item">
					<uni-forms-item name="password">
						<uni-easyinput :inputBorder="false" :clearable="false" v-model="studentInfo.password" placeholder="密码"/>
					</uni-forms-item>
				</view>
				
				<!-- 姓名 -->
				<view class="form-item">
					<uni-forms-item name="name">
						<uni-easyinput :inputBorder="false" :clearable="false" v-model="studentInfo.name" placeholder="姓名"/>
					</uni-forms-item>
				</view>
				
				<!-- 性别 -->
				<view class="form-item">
					<uni-forms-item name="sex">
						<uni-easyinput :inputBorder="false" :clearable="false" v-model="studentInfo.stringSex" placeholder="性别"/>
					</uni-forms-item>
				</view>
				
				<!-- 宿舍id -->
				<view class="form-item">
					<uni-forms-item name="dormitoyId">
						<uni-easyinput :inputBorder="false" :clearable="false" v-model="studentInfo.dormitoyId" placeholder="宿舍"/>
					</uni-forms-item>
				</view>
			</uni-forms>
		</view>
		
		<!-- 提交按钮 -->
		<view class="btn">
			<button class="submit" hover-class="is-hover" @click="confirm">确定</button>
		</view>
	</view>
</template>

<script setup>
	import { reactive } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import api from '@/api/api.js';
	import toasts from '@/utils/toasts.js'
	
	const studentInfo = reactive({
		username:'',
		password:'',
		name:'',
		sex:null,
		majorId:null,
		classId:null,
		dormitoyId:null,
		
		stringSex:'',
	})
	
	// 确定按钮
	const confirm = () =>{
		if(studentInfo.stringSex == '男'){
			studentInfo.sex = 1;
		}else{
			studentInfo.sex = 0;
		}
	
		
		api.addStudent(studentInfo.username,studentInfo.password,studentInfo.name,studentInfo.sex,
		studentInfo.majorId,studentInfo.classId,studentInfo.dormitoyId)
			.then(res =>{
				const data = res.data;
				console.log('res:',data.data);
				if(data.code === 1){
					uni.showToast({
						title:"添加成功",
						icon:'success',
						duration:1000
					})
					
					// 跳转回班级界面
					uni.navigateBack()
				}else{
					uni.showToast({
						title:"添加失败",
						icon:'fail',
						duration:1000
					})
				}
			}).catch(err =>{
				console.log(err);
				toasts.error('网络错误')
			})
			
	}
	
	onLoad((option)=>{
		studentInfo.classId = option.classId;
		studentInfo.majorId = option.majorId;
		console.log('classId:',studentInfo.classId,'majorId:',studentInfo.majorId);
	})
</script>

<style lang="scss" scoped>
	.container{
		width: 100%;
		height: 100%;
		position: relative;
		.form{
			// background-color: antiquewhite;
			position: absolute;
			top: 80rpx;
			display: flex;
			justify-content: center;
			width: 100%;
			.form-item{
				width: 600rpx;	
				::v-deep .uni-easyinput__content-input{
					background-color: #eeeeee;
					height: 90rpx !important;
					border-radius: 10rpx;
				}
			}
		}
		.btn{
			position: absolute;
			width: 100%;
			top: 1100rpx;
			.submit{
				width: 300rpx;
				color: #fff;
				background-color: #07C160;
			}
		}
		// 点击样式
		.is-hover{
			color: #fff;
			background-color: #06aa52;
		}
	}
</style>