<template>
	<view id="dormitory_id">
		<text>宿舍号 {{ dormitory_info.id }}</text>
	</view>
	<view id="top_up">
		<view>
			<text class="tag">电费充值</text>
			<text class="balance">电费余额：{{ dormitory_info.electricity }}</text>
		</view>
		<view>
			<text class="tag">水费充值</text>
			<text class="balance">水费余额：{{ dormitory_info.water }}</text>
		</view>
	</view>

	<view id="query">
		<view>
			<text>用电查询</text>
		</view>
		<view>
			<text>电费充值记录</text>
		</view>
		<view>
			<text>宿舍报修</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onPullDownRefresh
	} from '@dcloudio/uni-app'

	const _dormitory_info = {
		"id": "A101",
		"electricity": 12.23,
		"water": 12.34
	}
	const dormitory_info = ref(_dormitory_info)

	onPullDownRefresh(() => {
		console.log('refresh')
		fetchDormitoryInfo()
		uni.stopPullDownRefresh() // 加载成功后手动停止
	})


	/* 获取数据 */
	function fetchDormitoryInfo() {

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
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
	}

	.tag {
		grid-row: 1;
	}

	.balance {
		grid-row: 2;
		grid-column: 2;
	}

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