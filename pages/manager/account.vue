<template>
	<view class="container">
		
		<view class="center">
			<view id="name">
				<text class="tag">姓名</text>
				<text class="value" user-select>{{userInfo.name}}</text>
			</view>
			<view id="sex">
				<text class="tag">性别</text>
				<text class="value" user-select>{{userInfo.sex}}</text>
			</view>
			<view id="phone" @click="showPhoneDialog">
				<text class="tag">电话</text>
				<text class="value" user-select>{{userInfo.phone}}</text>
			</view>
			<view id="student_id">
				<text class="tag">学/工号</text>
				<text class="value" user-select>{{userInfo.username}}</text>
			</view>
		</view>
		<view id="logout_button" @click="confirm_logout">
			<text>退出登录</text>
		</view>
		
		<!-- 底部导航栏 -->
		<my-tabBar :currPath="'/pages/manager/account'" />
	</view>
</template>

<script setup>
	import { reactive } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	import { useUserStore } from '@/store/user';
	import api from '@/api/api.js'
	import toasts from '../../utils/toasts';

	const user = useUserStore();

	const userInfo = reactive({
		name:'管理员',
		sex:'男',
		phone:'13549785698',
		username:'admin',
	})
	
	onShow(()=>{
		console.log('token:',user.token);
	})
	
	// 退出登录
	function logout() {
		user.logout()
		uni.redirectTo({
			url: '/pages/login'
		})
		toasts.info('你已退出登录')
	}

	/* 确认登出 */
	function confirm_logout() {
		uni.showModal({
			title: '是否退出登录?',
			content: '退出登录后需要重新登录',
			success: function(res) {
				if (res.confirm) {
					logout()
				}
			},
			fail: () => { // 调接口失败时直接退出登录
				logout()
			}
		})

	}
	
</script>

<style scoped>
	page {
		height: 100%;
	}
	
	.container {
		/* 计算剩余位置 */
		height: 100%;
		width: 100%;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
	}
	
	/* 中间部分 */
	.center {
		display: flex;
		width: 80%;
		height: 70%;
		margin: 200rpx auto;
		flex-flow: column nowrap;
		justify-content: center;
	}
	
	/* 中间部分的每个子项 */
	.center view {
		height: 10%;
		width: 100%;
		display: flex;
		flex-flow: row;
		flex: 0 0 auto;
		border-bottom: #d0d0d0 solid 1rpx;
		vertical-align: middle;
		margin: 8px 0;
		overflow: hidden;
	}
	
	/* 每个文本 */
	text {
		height: 100%;
		/* text-align: center; */
		display: flex;
		justify-content: center;
		flex-flow: column;
	}
	
	.tag {
		width: 30%;
		font-weight: bold;
		font-size: 16px;
	}
	
	.value {
		width: 70%;
		text-align: right;
		font-size: 16px;
	}
	
	#logout_button {
		width: 70%;
		height: fit-content;
		border-radius: 8px;
		color: red;
		background-color: white;
		text-align: center;
		padding: 6px;
		box-sizing: content-box;
		border-radius: 12px;
		border: #d0d0d0 1px solid;
		margin: 8rpx auto;
	
	}
	
	#logout_button text {
		letter-spacing: 4px;
	}
	
	#logout_button:hover {
		background-color: #f0f0f0;
	}
	
	
	#logoutDialog {
		background-color: #fff;
		padding: 10px;
	}
	
	#phoneDialog {
		width: fit-content;
		height: fit-content;
		padding: 20px 0;
	}
	
	/* 底部弹窗 */
	#bottom_dialog {
		display: flex;
		flex-flow: column;
		background-color: #fff;
		margin: 10px 0 0 0;
		border-radius: 8px 8px 0 0;
	}
	
	/* 弹窗的样式 */
	#bottom_dialog view {
		text-align: center;
		padding: 16px 0;
	}
	
	#bottom_dialog view:hover {
		border-radius: 8px 8px 0 0;
		/* 保持上面圆角 */
		background-color: #f0f0f0;
	
	}
	
	#from_photo {
		border-bottom: #f0f0f0 1px solid;
	}
</style>