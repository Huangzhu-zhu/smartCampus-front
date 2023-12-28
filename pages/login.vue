<template>
	<view class="container">
		<!-- 图片 -->
		<image mode="aspectFit" src="@/static/pictures/login.png" @error="imageError"></image>

		<!-- tab选项卡  用户选择学生/教师登录 -->
		<view class="segment">
			<uni-segmented-control :current="data.current" :values="data.items" :style-type="data.styleType"
				:active-color="data.activeColor" @clickItem="onClickItem" />
		</view>

		<view class="content">
			<!-- 学生登录 -->
			<view class="student" v-if="data.current === 0">
				<!-- 表格输入学号，密码 -->
				<uni-forms :model="data" :rules="rules" validateTrigger="blur">
					<view class="sAccount">
						<uni-forms-item name="sAccount">
							<uni-easyinput v-model="data.sAccount" placeholder="学号" :styles="data.styles"/>
						</uni-forms-item>
					</view>

					<view class="sPassword">
						<uni-forms-item name="sPassword">
							<uni-easyinput type="password" v-model="data.sPassword" placeholder="密码" :styles="data.styles"/>
						</uni-forms-item>
					</view>

				</uni-forms>
			</view>

			<!-- 教师登录 -->
			<view class="teacher" v-if="data.current === 1">
				<!-- 表格输入工号，密码 -->
				<uni-forms :modelValue="data" :rules="rules" validateTrigger="blur">
					<view class="tAccount">
						<uni-forms-item name="tAccount">
							<uni-easyinput v-model="data.tAccount" placeholder="工号" :styles="data.styles"/>
						</uni-forms-item>
					</view>

					<view class="tPassword">
						<uni-forms-item name="tPassword">
							<uni-easyinput type="password" v-model="data.tPassword" placeholder="密码" :styles="data.styles"/>
						</uni-forms-item>
					</view>

				</uni-forms>
			</view>
		</view>

		<!-- 登录按钮 -->
		<view class="btn">
			<button plain="true" @click="login">登录</button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import {
		useUserStore
	} from '@/store/user.js'

	import api from '@/api/api.js';

	// 创建store
	const user = useUserStore();

	const data = reactive({
		items: ['学生登录', '管理员登录'],
		current: 0, //当前选中的tab索引值，从0计数
		styleType: 'text',
		activeColor: '#3B8CD7',
		sAccount: "",
		sPassword: "",
		tAccount: "",
		tPassword: "",
		position: 1,
		styles:{
			borderColor:'#c0c0c0'
		}
	})

	const rules = reactive({
		sAccount: {
			rules: [{
					required: true,
					errorMessage: '请输入学号',
				},
				// {
				// 	pattern:'/[^0-9]+/',
				// 	errorMessage:'请输入数字'
				// },
			]
		},
		sPassword: {
			rules: [{
				required: true,
				errorMessage: '请输入密码'
			}]
		},
		tAccount: {
			rules: [{
					required: true,
					errorMessage: '请输入工号',
				},
				// {
				// 	pattern:'/[^0-9]+/',
				// 	errorMessage:'请输入数字'
				// },
			]
		},
		tPassword: {
			rules: [{
				required: true,
				errorMessage: '请输入密码'
			}]
		}
	})

	//切换tab选项卡
	const onClickItem = (e) => {
		if (data.current !== e.currentIndex) {
			data.current = e.currentIndex
		}
	}
	// 图片出错
	const imageError = (e) => {
		console.error('image发生error事件，携带值为' + e.detail.errMsg)
	}
	// 点击按钮跳转
	const login = () => {
		// 学生登录
		if (data.current === 0) {
			data.position = 1
			// console.log('学号:',data.sAccount,'密码:',data.sPassword);
			uni.request({
				url: 'http://120.46.222.199:80/login',
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				data: {
					username: data.sAccount,
					password: data.sPassword,
					position: data.position
				},
				success: (res) => {
					console.log("学号:" + data.sAccount, "密码:" + data.sPassword);
					console.log(res.data);
					// 返回code是1
					if (res.data.code === 1) {
						// 提示登录成功
						uni.showToast({
							title: '登录成功',
							icon: 'none',
							duration: 1000
						})
						// 保存 token
						user.login(res.data.data)
						console.log('login', res.data.data);
						// 保存用户id和宿舍id
						api.getUserInfoByName(data.sAccount)
							.then(res => {
								let list = res.data.data;
								console.log('login', list);
								// 保存学生id
								user.setId(list.id);
								// 保存宿舍id
								user.setDormitoryId(list.dormitoryId);
								// 保存学生身份
								user.setPosition(data.position);
								// 保存学号
								user.setStudentNO(list.username);

								console.log(list.id, list.dormitoryId, list.position,list.username);
							}).catch(err => {

							})
						// 改用全局token
						// uni.request({
						// 	url: 'http://120.46.222.199:80/api/student/info',
						// 	method: 'GET',
						// 	data: {
						// 		username: data.sAccount
						// 	},
						// 	success: (res) => {
						// 		let list = res.data;
						// 		console.log('login', list);
						// 		// 保存学生id
						// 		user.setId(list.id);
						// 		// 保存宿舍id
						// 		user.setDormitoryId(list.dormitoryId);
						// 		// 保存学生身份
						// 		user.setPosition(data.position);

						// 		console.log(list.id, list.dormitoryId, list.position);
						// 	}
						// })

						// 跳转界面至请假列表（因为底部导航栏未完成）
						uni.redirectTo({
							url: "/pages/index/mainPage"
						})

					} else {
						// 提示登录失败
						uni.showToast({
							title: res.data.msg ? res.data.msg : '网络错误',
							icon: 'none',
							duration: 1000
						})
					}
				}
			})

		} else {
			data.position = 0;
			// 管理员登录
			uni.request({
				url: 'http://120.46.222.199:80/login',
				method: 'POST',
				header: {
					'content-type': 'application/json'
				},
				data: {
					username: data.tAccount,
					password: data.tPassword,
					position: data.position
				},
				success: (res) => {
					console.log("工号:" + data.tAccount, "密码:" + data.tPassword);
					console.log(res.data);
					// 返回code是1
					if (res.data.code === 1) {
						// 提示登录成功
						uni.showToast({
							title: '登录成功',
							icon: 'none',
							duration: 1000
						})
						user.login(res.data.data)
						// 保存管理员身份
						user.setPosition(data.position);
						console.log('管理员:', user.position);
						// 跳转管理员审核界面（因为底部导航栏未完成）
						uni.redirectTo({
							url: "/pages/manager/management"
						})
					} else {
						// 提示登录失败
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1000
						})
					}
				}
			})

		}

	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative; //父元素使用相对定位（相对于原来的位置变化），子元素使用绝对定位
		width: 100%;
		height: 100%;

		// 顶部图片布局
		image {
			width: 550rpx;
			height: 550rpx;
			justify-content: center;
			position: absolute;
			left: 50%;
			transform: translate(-50%, 0);
			border-radius: 50%;
			margin-top: 20rpx;
		}

		// 选项卡布局
		.segment {
			position: absolute;
			width: 650rpx;
			left: 50%;
			transform: translate(-50%, 0);
			top: 600rpx;
		}

		// 选项卡具体内容布局
		.content {
			// background-color: #2DBE73;
			position: absolute;
			width: 550rpx;
			height: 240rpx;
			left: 50%;
			transform: translate(-50%, 0);
			top: 760rpx;

			.sAccount,
			.tAccount {
				margin-bottom: 40rpx;
			}
		}

		// 登录按钮
		.btn {
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			position: absolute;
			left: 50%; //距左边50%
			top: 1050rpx; //距顶部80%
			transform: translate(-50%, 0); //x轴移动-50%

			button {
				width: 300rpx;
				height: 100rpx;
				background-color: #2DBE73;
				color: #fff;
				letter-spacing: 5rpx; //字间距
				border: none;
			}
		}
	}
</style>