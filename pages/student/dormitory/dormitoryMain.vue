<template>
	<view id="dormitory_id">
		<text>宿舍号 {{ dormitoryInfo.name }}</text>
	</view>
	<view id="top_up">
		<view @click="navigateToEleRecharg">
			<text class="tag">电费充值</text>
			<text class="balance">电费余额：{{ dormitoryInfo.electricity }}</text>
		</view>
		<view @click="navigateToWaterRecharg">
			<text class="tag">水费充值</text>
			<text class="balance">水费余额：{{ dormitoryInfo.water }}</text>
		</view>
	</view>

	<view id="query">
		<view @click="navigateToElectricityUsage">
			<text>用电查询</text>
		</view>
		<view @click="navigateToElectricityChargeHistory">
			<text>电费充值记录</text>
		</view>
		<view @click="navigateToRepair">
			<text>宿舍报修</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		onPullDownRefresh,
		onLoad
	} from '@dcloudio/uni-app'

	import api from '@/api/api.js';
	import {
		useUserStore
	} from '@/store/user.js';
	import toast from '@/utils/toasts.js'
	import {
		formatMoney
	} from '@/utils/CommonUtils';

	const store = useUserStore();

	const dormitoryInfo = ref({
		name: '',
		electricity: '0.00',
		water: '0.00'
	})

	onPullDownRefresh(() => {
		fetchDormitoryInfo(() => {
			uni.stopPullDownRefresh() // 加载成功后手动停止
		})
	})

	onMounted(() => {
		toast.loading('加载中')
		fetchDormitoryInfo(() => {
			uni.hideToast()
		})
	})


	onLoad(() => {
		uni.$on('data-fresh', (res) => {
			if (res.fresh === true) {
				uni.showLoading({
					title: '加载中'
				})
				fetchDormitoryInfo(() => {
					uni.hideLoading() // 加载成功后手动停止
				})
			}
		})
	})



	/* 获取数据 */
	function fetchDormitoryInfo(callback) {
		api.getDormitoryInfoById(store.$state.dormitoryId)
			.then((res) => {
				const data = res.data.data;
				console.log('fetchDormitoryInfo', data);
				dormitoryInfo.value = {
					name: data.id,
					electricity: formatMoney(data.electricity),
					water: formatMoney(data.water)
				}
				callback()
			}).catch((error) => {
				toast.error('网络错误!')
				console.log(error);
				callback()
			})
	}

	// 导航去用电查询界面
	function navigateToElectricityUsage() {
		uni.navigateTo({
			url: '/pages/query/EleQuery'
		})
	}
	// 导航去电费充值记录界面
	function navigateToElectricityChargeHistory() {
		uni.navigateTo({
			url: '/pages/query/EleRechargeQuery'
		})
	}
	// 导航去报修界面
	function navigateToRepair() {
		uni.navigateTo({
			url: '/pages/query/Repair'
		})
	}
	// 导航去电费充值界面
	function navigateToEleRecharg() {
		uni.navigateTo({
			url: '/pages/pay/eleRecharge'
		})
	}
	// 导航去水费充值界面
	function navigateToWaterRecharg() {
		uni.navigateTo({
			url: '/pages/pay/waterRecharge'
		})
	}
</script>

<style lang="css">
	#dormitory_id {
		background-color: #ADACEB;
		text-align: center;
		display: flex;
		justify-content: center;
		padding: 60rpx;
		margin: 0 40rpx;
		font-size: 48rpx;
	}

	#top_up {
		margin: 40rpx 50rpx;
	}

	#top_up view {
		border-radius: 4rpx;
		border: solid 2rpx #000;
		margin: 10rpx 0 0 0;
		padding: 20rpx;
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-template-rows: 1fr 1fr;
	}

	.tag {
		grid-row: 1;
	}

	.balance {
		grid-row: 2;
		grid-column: 2;
	}

	.value {}

	#query {
		margin: 80rpx 50rpx 0 50rpx;
	}

	#query view {
		border-radius: 8rpx;
		border: solid 2rpx #000;
		margin: 10rpx 0 0 0;
		padding: 40rpx 0;
		text-align: center;
	}
</style>