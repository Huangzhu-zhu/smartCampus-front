<template>
	<my-tabBar v-show="!isBottomDialogShowing" :currPath="'/pages/index/personalCenter'" />

	<view class="container">
		<view class="center">
			<view id="avatar" @click="showBottomDialog">
				<text class="tag">头像</text>
				<image ref="avatarRef" id="avatar_img" :src="userInfo.avatarUrl" mode="aspectFill"
					@error="handleAvatarError" />
			</view>
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
			<view id="major">
				<text class="tag">专业</text>
				<text class="value" user-select>{{userInfo.major}}</text>
			</view>
		</view>
		<view id="logout_button" @click="confirm_logout">
			<text>退出登录</text>
		</view>
		<root-portal>
			<uni-popup ref="bottomDialog" type="bottom" style="z-index: 100;" @change="handleDialogClosed">
				<view id="bottom_dialog">
					<view id="from_photo" @click="selectAvatarImage('album')">
						<text>从相册中获取</text>
					</view>
					<view id="from_camera" @click="selectAvatarImage('camera')">
						<text>从相机中拍摄</text>
					</view>
				</view>
			</uni-popup>
		</root-portal>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
	} from 'vue';
	import {
		useUserStore
	} from '@/store/user';
	import {
		onPullDownRefresh
	} from '@dcloudio/uni-app'
	import api from '@/api/api.js'
	import toasts from '@/utils/toasts';

	const store = useUserStore()
	const avatarRef = ref()

	const isBottomDialogShowing = ref(false)
	onPullDownRefresh(() => {
		fetchUserInfo()
	})

	onMounted(() => {
		fetchUserInfo()
	})

	const userInfo = ref({
		username: '',
		phone: '',
		id: '',
		avatarUrl: '',
		name: '',
		major: '',
		sex: '',
		dormitoryId: ''
	})


	// 底部对话框，用于选择头像
	const bottomDialog = ref()

	// 加载用户信息
	function fetchUserInfo() {
		uni.showLoading({
			title: '加载中'
		})

		api.getUserInfoById(store.$state.id)
			.then(res => {
				const data = res.data.data;
				userInfo.value = {
					username: data.username,
					name: data.name,
					major: data.major,
					phone: data.phone,
					sex: data.sex === 0 ? '女' : '男',
					avatarUrl: data.avatar,
					dormitoryId: data.dormitoryId,
				}
				uni.hideLoading()
			}).catch((err) => {
				console.log(err);
				uni.hideLoading()
				toasts.error('网络错误')
			})
	}

	function logout() {
		store.logout()
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
	/* 修改电话号码 */
	function showPhoneDialog() {
		uni.showModal({
			title: '更新电话号码',
			editable: true,
			placeholderText: '输入新的电话号码',
			value: userInfo.value.phone,
			success: (res) => {
				if (res.confirm) {
					updatePhoneNumber(res.content)
				}
			}
		})
	}

	// 打开底部栏
	function showBottomDialog() {
		isBottomDialogShowing.value = true
		bottomDialog.value.open()
	}

	function handleDialogClosed(res) {
		if (res.show === false) {
			isBottomDialogShowing.value = false
			bottomDialog.value.close()

		}
	}

	// 选取图片
	function selectAvatarImage(type) {
		uni.chooseImage({
			count: 1,
			sourceType: [type],
			success: (res) => {
				updateAvatar(res)
			}
		})
	}

	// 更新头像
	function updateAvatar(file) {
		uni.showLoading({
			title: '更新中'
		})

		api.upload(file)
			.then(res => {
				res = JSON.parse(res.data)
				if (res.code === 1) {
					userInfo.value.avatarUrl = res.data
					api.updateUserInfo(userInfo.value.username, userInfo.value.phone, res.data)
						.then(res => {
							uni.hideLoading()
							toasts.success('更新成功')
						}).catch(err => {
							uni.hideLoading()
							toasts.error(err.message ? err.message : '网络错误')
						})
				} else {
					uni.hideLoading()
					toasts.error('网络错误')
				}

			}).catch(err => {
				uni.hideLoading()
				console.log(err)
				toasts.error(err.message ? err.message : '网络错误')
			})
	}

	// 更新电话号码
	function updatePhoneNumber(phone) {
		console.log('xxxxxx', phone, phone.length, (/^\+d+$/.test(phone)));
		if (!phone || phone.length !== 11 || (/^\+d+$/.test(phone))) {
			toasts.error('请输入正确的手机号码!')
			return
		}

		uni.showLoading({
			title: '更新中'
		})
		api.updateUserInfo(userInfo.value.username, phone, userInfo.value.avatarUrl)
			.then(res => {
				uni.hideLoading()
				userInfo.value.phone = phone
				toasts.success('更新成功')
			}).catch(err => {
				uni.hideLoading()
				toasts.error(err.message ? err.message : '网络错误')
			})
	}

	function handleAvatarError() {
		console.log('avater-error');
		avatarRef.value.src = '@/static/pictures/user.png';
	}
</script>

<style>
	page {
		height: 100%;
	}

	.container {
		/* 计算剩余位置 */
		height: 100%;
		width: 100%;
		display: flex;
		flex-flow: column;
		justify-content: space-around;
	}

	/* 中间部分 */
	.center {
		display: flex;
		width: 80%;
		height: 70%;
		margin: 0 auto;
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

	/* 头像栏 */
	#avatar {
		height: 15%;
	}

	/* 头像 */
	#avatar_img {
		height: 90%;
		width: auto;
		aspect-ratio: 1 / 1;
		margin: 0 0 0 auto;
		border-radius: 50%;
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