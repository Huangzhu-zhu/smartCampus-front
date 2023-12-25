<template>
	<view class="container">
		<view class="center">
			<view id="avatar" @click="showBottomDialog">
				<text class="tag">头像</text>
				<image id="avatar_img" :src="user_info.avatar" mode="aspectFill" />
			</view>
			<view id="name">
				<text class="tag">姓名</text>
				<text class="value" user-select>{{user_info.username}}</text>
			</view>
			<view id="phone" @click="showPhoneDialog">
				<text class="tag">电话</text>
				<text class="value" user-select>{{user_info.phone}}</text>
			</view>
			<view id="student_id">
				<text class="tag">学/工号</text>
				<text class="value" user-select>{{user_info.id}}</text>
			</view>
			<view id="major" v-if="is_student">
				<text class="tag">专业</text>
				<text class="value" user-select>{{user_info.major}}</text>
			</view>
			<view id="identity">
				<text class="tag">身份</text>
				<text class="value" user-select>{{user_info.identity}}</text>
			</view>
		</view>
		<view id="logout_button" @click="confirm_logout">
			<text>退出登录</text>
		</view>
		<uni-popup ref="bottomDialog" type="bottom">
			<view id="bottom_dialog">
				<view id="from_photo" @click="selectAvatarImage('album')">
					<text>从相册中获取</text>
				</view>
				<view id="from_camera" @click="selectAvatarImage('camera')">
					<text>从相机中拍摄</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		computed,
		onBeforeMount,
		onMounted,
		ref,
		watch,
		watchEffect
	} from 'vue';

	import {
		mock_fetch_data
	} from '../../api/mock.js'

	let default_user_info = {
		"username": '',
		"phone": '',
		"id": '',
		"identity": '',
		"is_admin": false,
		"avatar": '',
	}

	let __user_info = {
		"username": '张三',
		"phone": "13333333333",
		"id": "2100320101",
		"major": "软件工程",
		"identity": "本科生",
		"is_admin": false,
		"avatar": "../../static/uni.png"
	}

	let user_info = ref(default_user_info)

	onMounted(() => {
		refreshUserInfo()
	})


	// 是否为学生，用于控制显示专业项	
	const is_student = computed(() => !user_info.value.is_admin)


	watchEffect(() => user_info.value.avatar, (cur, pre) => {
		console.log(cur, pre);
	})

	// const avatar_url = computed(() => user_info.value.avatar)

	// 底部对话框，用于选择头像
	const bottomDialog = ref()

	function refreshUserInfo() {
		uni.showLoading({
			title: '加载中'
		})
		// 模拟数据
		mock_fetch_data(__user_info, 3).then(
			(data) => {
				user_info.value = data
				uni.hideLoading()
			},
			(erorr) => {
				uni.hideLoading()
			}
		).catch((error) => {
			uni.hideLoading()
		})
	}

	function logout() {
		// TODO：登出实现
		console.log("logout");
	}

	/* 确认登出 */
	function confirm_logout() {

		uni.showModal({
			title: '是否退出登录?',
			content: '退出登录后需要重新登录',
			success: function(res) {
				console.log(res)
				if (res.confirm) {
					console.log("confirm logout")
					logout()
				} else {
					console.log("cancel logout")
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
			value: user_info.value.phone,
			success: (res) => {
				console.log(res);
				if (res.confirm) {
					// 更新电话号码
					uni.showLoading({
						title: '更新中'
					})
				}
			}
		})
	}

	function showBottomDialog() {
		console.log("show bottom dialog")
		bottomDialog.value.open()
	}

	function selectAvatarImage(type) {
		uni.chooseImage({
			count: 1,
			sourceType: [type],
			success: (res) => {
				console.dir(res)
				updateAvatar(res.tempFilePaths)
			}
		})

	}

	function updateAvatar(file) {
		// 更新头像
		console.log("update avatar")

	}

	function updatePhoneNumber() {
		// 更新电话号码
		console.log("update phone number")
	}
</script>

<style>
	.container {
		/* 计算剩余位置 */
		height: calc(100% - var(--window-top) - var(--window-bottom));
		width: 100%;
		font-size: 1rem;
		display: flex;
		flex-flow: column;
		justify-content: center;
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