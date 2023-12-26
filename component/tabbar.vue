<template>
	<view class="uni-tabbar">
		<view class="uni-tabbar__item" v-for="(item,index) in list.tabbarList" :key="index"
			@tap="changeTab(item.pagePath)">
			<!-- 图片图标 -->
			<!-- <view v-if="false" class="uni-tabbar__bd"> -->
			<view class="uni-tabbar__icon">
				<!-- 当前路径 -->
				<image v-if="item.pagePath === props.currPath" class="uni-w-42" mode="aspectFit"
					:src="item.selectedIconPath"></image>
				<!-- 其他路径 -->
				<image v-else class="uni-w-42" mode="aspectFit" :src="item.iconPath"></image>
			</view>
			<!-- </view> -->

			<view class="uni-tabbar__label" :class="{ 'active': item.pagePath === props.currPath }">
				{{item.text}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive
	} from 'vue'
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		useUserStore
	} from '@/store/user.js'

	// 子组件接收父组件传值
	const props = defineProps({
		currPath: String //当前路径
	})

	const user = useUserStore();

	const list = reactive({
		tabbarList: [],

	})

	onMounted(() => {
		// 身份为学生
		if (user.position === 1) {
			list.tabbarList = [{ // 1.主页
					"pagePath": "/pages/index/mainPage",
					"iconPath": "/static/pictures/home-Outline.png",
					"selectedIconPath": "/static/pictures/home-Outline-copy.png",
					"text": "主页",
				},
				{ // 2.课程表
					"pagePath": "/pages/index/curriculum",
					"iconPath": "/static/pictures/riqi.png",
					"selectedIconPath": "/static/pictures/riqi-copy.png",
					"text": "课程表",
				},
				{
					// 3我的路径
					"pagePath": "/pages/index/personalCenter",
					"iconPath": "/static/pictures/gerenzhongxin2.png",
					"selectedIconPath": "/static/pictures/gerenzhongxin2-copy.png",
					"text": "我的",
				}
			]
		} else if (user.position === 0) {
			list.tabbarList = [
				// 1.“管理”路径
				{
					"pagePath": "/pages/manager/management",
					"iconPath": "/static/pictures/fuzhi.png",
					"selectedIconPath": "/static/pictures/fuzhi-copy.png",
					"text": "管理",
				},

				{ //2.“审批”路径
					"pagePath": "/pages/manager/vetting",
					"iconPath": "/static/pictures/fuzhi.png",
					"selectedIconPath": "/static/pictures/fuzhi-copy.png",
					"text": "审批",
				},
				// 3.“账号”路径
				{
					"pagePath": "/pages/manager/account",
					"iconPath": "/static/pictures/fuzhi.png",
					"selectedIconPath": "/static/pictures/fuzhi-copy.png",
					"text": "账号",
				}
			]
		}
	})

	// 点击底部导航栏触发
	const changeTab = (path) => {
		// list.page = path;
		uni.reLaunch({
			// 跳转到该页面
			url: path
		})

	}
</script>

<style lang="scss" scoped>
	.uni-tabbar {
		position: fixed;
		bottom: 0;
		z-index: 999;
		width: 100%;
		display: flex;
		justify-content: space-around;
		height: 130rpx;
		padding: 16rpx 0;
		box-sizing: border-box;
		border-top: solid 1rpx #ccc;
		background-color: #fff;
		box-shadow: 0px 0px 17rpx 1rpx rgba(206, 206, 206, 0.32);

		.uni-tabbar__item {
			display: block;
			line-height: 30rpx;
			text-align: center;

			.uni-tabbar__icon {
				height: 50rpx;
				line-height: 50rpx;
				text-align: center;

				.uni-w-42 {
					width: 45rpx;
					height: 45rpx;
				}
			}
		}

		.uni-tabbar__label {
			font-size: 26rpx;
			color: #999;

		}

		.active {
			font-size: 26rpx;
			color: #3D5CFF;
		}
	}
</style>