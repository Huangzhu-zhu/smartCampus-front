<template>
	<view class="container">
		<view class="center">
			<view id="dormitory" @click="navigateToDormitory">
				<text>宿舍</text>
			</view>
			<view id="card">
				<text>校园卡</text>
				<text id="balance">余额：{{ balance }}</text>
			</view>

			<view id="book_borrow">
				<text>图书借阅</text>
			</view>

			<view id="leave_application">
				<text>请假申请</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	// 余额 TODO：每次进入该页面都进行网络获取更新数据
	const _balance = 12.34
	const balance = ref(_balance)

	// 导航去宿舍详情页
	function navigateToDormitory() {
		uni.navigateTo({
			url: '/pages/student/dormitory/dormitoryMain',
		})
	}
</script>

<style lang="css">
	view {
		--item_bg_color: #BFD6EB;
		--item_shadow_color: #29312A2A;
		--text-color: #191919;
	}

	.container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		vertical-align: middle;

	}

	.center {
		height: 50%;
		width: 80%;
		display: flex;
		flex-flow: column nowrap;
		flex: 0 0 auto;
		margin: auto auto;
	}

	.center view {
		background-color: var(--item_bg_color);
		width: 100%;
		height: 20%;
		margin: auto auto;
		box-shadow: 8px 8px 5px 0 var(--item_shadow_color);
		align-items: center;
		display: flex;
		flex-flow: row nowrap;
		border-radius: 4px;
	}

	.center view:hover {
		/* 悬浮起来的效果 */
		box-shadow: 12px 12px 8px 0 var(--item_shadow_color);
		transition: 300ms;
		transform: scale(1.01);
	}

	text {
		margin: 0 0 0 5%;
		font-weight: normal;
		font-size: 20px;
		line-height: 22px;
		text-align: center;
		color: var(--text-color);
	}

	#balance {

		margin: auto auto 10px auto;
	}
</style>