<template>
	<view class="container">
		<uni-forms :model="formData" :rules="rules" validateTrigger="blur" borderColor="transparent">
			<view class="form-item">
				<uni-forms-item name="classNumber">
					<uni-easyinput v-model="formData.classNumber" placeholder="班级号" confirmType="next" />
				</uni-forms-item>
			</view>

			<view class="form-item">
				<uni-forms-item name="peopleCount">
					<uni-easyinput type="text" v-model="formData.peopleCount" placeholder="人数" confirmType="next" />
				</uni-forms-item>
			</view>

			<view class="form-item">
				<uni-forms-item name="moniterUsername">
					<uni-easyinput type="text" v-model="formData.moniterUsername" placeholder="班长学号"
						confirmType="done" />
				</uni-forms-item>
			</view>
		</uni-forms>
		<view class="btn-container">
			<text class="btn" @click="addClassInfo" v-if="isAdd">确定</text>
			<text class="btn" @click="updateClassInfo" v-else>确定修改</text>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';

	import {
		onLoad
	} from '@dcloudio/uni-app'
	import api from '@/api/api.js'
	import toasts from '../../utils/toasts';

	const formData = reactive({
		classNumber: '',
		peopleCount: '',
		moniterUsername: ''
	})
	const isAdd = ref(true)
	const marjorId = ref(null)

	onLoad((options) => {
		console.log('options', options)
		isAdd.value = (options.add === 1 || options.add === "1")
		marjorId.value = options.marjorId
		formData.classNumber = options.classNumber ? options.classNumber : ''
		formData.peopleCount = options.peopleCount ? options.peopleCount : ''
		formData.moniterUsername = options.moniterUsername ? options.moniterUsername : ''
	})

	const rules = reactive({
		classNumber: {
			rules: [{
				required: true,
				errorMessage: '请输入班级号',
			}, ]
		},
		peopleCount: {
			rules: [{
					required: true,
					errorMessage: '请输入人数'
				},
				{
					required: true,
					maxinum: 150,
					mininum: 1,
					errorMessage: '人数只能在1到150人之间'
				},
			]
		},
		moniterUsername: {
			rules: [{
				required: true,
				errorMessage: '请输入班长学号',
			}]
		}
	})

	function addClassInfo() {
		isStudentExist(formData.moniterUsername)
			.then((res) => {
				api.addClass(formData.classNumber, formData.peopleCount, res, marjorId.value)
					.then((res) => {
						uni.navigateBack()
						toasts.success('添加班级成功！')
					}).catch(err => {
						console.log('add-class-info-update', err)
						toasts.error(err)
					})
			}).catch(err => {
				console.log('add-class-info', err);
				toasts.error(err)
			})
	}


	function updateClassInfo() {
		isStudentExist(formData.moniterUsername)
			.then((res) => {
				api.updateClass(formData.classNumber, formData.peopleCount, res, marjorId.value)
					.then((res) => {
						uni.navigateBack()
						toasts.success('修改班级成功！')
					}).catch(err => {
						console.log('update-class-info-update', err)
						toasts.error(err)
					})
			}).catch(err => {
				console.log('update-class-info', err);
				toasts.error(err.message)
			})
	}

	function isStudentExist(username) {
		console.log('isStudentExist', username);
		return new Promise((resolve, reject) => {
			api.getUserInfoByName(username)
				.then(res => {
					if (res.data.data) resolve(res.data.data.id)
					else reject(new Error('该学生不存在！'))
				})
		})
	}
</script>

<style lang="css">
	page {
		height: 80%;
	}

	.container {
		height: 100%;
		padding: 48rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.form-item {
		margin: 32rpx 0;
	}

	:deep(input) {
		background-color: #eeeeee;

	}

	.btn-container {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 90rpx;
	}

	.btn {
		width: 40%;
		line-height: 90rpx;
		height: 90rpx;
		padding: 8rpx;
		background-color: #07C160;
		color: #fff;
		letter-spacing: 5rpx;
		border-radius: 16rpx;
		text-align: center;
		margin: 0 auto;
	}
</style>