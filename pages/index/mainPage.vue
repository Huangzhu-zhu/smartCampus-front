<template>
	<view class="container">
		<view class="center">
			<view id="dormitory" @click="navigateToDormitory">
				<text>宿舍</text>
			</view>
			<view id="card" @click="navigateToCard">
				<text>校园卡</text>
				<text id="balance">余额：{{ balance }}</text>
			</view>

			<view id="book_borrow" @click="navigateToBookBorrow">
				<text>图书借阅</text>
			</view>

			<view id="leave_application" @click="navigateToLeave">
				<text>请假申请</text>
			</view>
		</view>
	</view>
	<my-tabBar :currPath="'/pages/index/mainPage'" />
</template>

<script setup>
	import {
		ref,
		computed,
		onMounted,
		watch
	} from 'vue';
	import api from '@/api/api.js';
	import {
		useUserStore
	} from '@/store/user.js';
	import {
		formatMoney
	} from '@/utils/CommonUtils';
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app'


	const balance = computed(() => {
		console.log('balance', store.$state.cardBalance);
		return store.$state.cardBalance;
	})
	const store = useUserStore()

	watch(() => store.$state.id, (cur, pre) => {
		console.log(cur, pre);
		api.getCardBalanceById(cur)
			.then((res) => {
				// balance.value = formatMoney(res.data.data)
				store.setCardBalance(res.data.data)
			}).catch((err) => {
				uni.showToast({
					title: '网络错误!'
				})
			})
	})

	onMounted(() => {
		// api.getCardBalanceById(store.$state.id)
		// 	.then((res) => {
		// 		// balance.value = formatMoney(res.data.data)
		// 		store.setCardBalance(formatMoney(res.data.data))
		// 	}).catch((err) => {
		// 		uni.showToast({
		// 			title: '网络错误!'
		// 		})
		// 	})
	})


	// 导航去宿舍详情页
	function navigateToDormitory() {
		uni.navigateTo({
			url: '/pages/student/dormitory/dormitoryMain',
		})
	}
	// 导航去请假界面
	function navigateToLeave() {
		uni.navigateTo({
			url: '/pages/student/leavelist',
		})
	}
	// 导航去校园卡界面
	function navigateToCard() {
		uni.navigateTo({
			url: '/pages/query/SchoolCardDeal',
		})
	}
	// 导航去借书界面
	function navigateToBookBorrow() {
		uni.navigateTo({
			url: '/pages/query/BookBorrowingRecords',
		})
	}
</script>

<style lang="css">
	view {
		--item_bg_color: #BFD6EB;
		--item_shadow_color: #29312A2A;
		--text-color: #191919;
	}

	:deep(page) {
		height: 100%;
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
		margin: auto auto;
		flex-flow: column;
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