<template>
	<view class="container">
		<uni-collapse>
			<template v-for="item in classData">
				<uni-collapse-item show-animation>
					<template v-slot:title>
						<view class="marjor-item">
							<text style="font-size: 48rpx;">
								{{ item.name}}
							</text>
						</view>
					</template>
					<uni-list class="class-item">
						<template v-for="classItem in item.data">
							<uni-list-item @click="navigateToModifyClass(classItem,classItem.id, classItem.className,classItem.majorId)" clickable="true">
								<template v-slot:header>
									<text> {{ classItem.className }}</text>
								</template>
								<template v-slot:footer>
									<text> {{ classItem.people }} 人</text>
								</template>
							</uni-list-item>
						</template>

					</uni-list>
					<view class=plus-icon @click="navigateToAddClass(item.id)">
						<uni-icons type="plus" style="display: block;">
						</uni-icons>
					</view>
				</uni-collapse-item>

			</template>
		</uni-collapse>

	</view>

	<my-tabBar :currPath="'/pages/manager/management'" />
</template>

<script setup>
	import {
		ref,
		computed,
		onMounted
	} from 'vue';
	import toast from '@/utils/toasts.js'
	import api from '@/api/api.js';

	import {
		onPullDownRefresh
	} from '@dcloudio/uni-app'


	const marjorData = [{
			id: 1,
			name: '计算机科学与技术'
		},
		{
			id: 2,
			name: '软件工程'
		},
		{
			id: 3,
			name: '信息安全'
		},
		{
			id: 4,
			name: '网络安全'
		},
		{
			id: 5,
			name: '智能科学与技术'
		}
	]

	const classData = ref([])

	function fetchInfo(callback) {
		const _data = []
		let count = 0
		let max = marjorData.length
		for (let i = 0; i < marjorData.length; i++) {
			const item = {
				id: marjorData[i].id,
				name: marjorData[i].name,
			}
			api.getClassInfoByMajorId(item.id)
				.then((res) => {
					item.data = res.data.data
					_data.push(item)
					count += 1
					if (count === max) {
						callback()
						classData.value = _data
						console.table(_data);
					}
				}).catch((err) => {
					console.log('fetchInfo', err);
					count += 1
					if (count === max) {
						callback()
					}
				})
		}
	}

	function navigateToAddClass(marjorId) {
		uni.navigateTo({
			url: `/pages/manager/addClass?add=1&marjorId=${marjorId}`
		})
	}

	// 进入班级具体页面
	function navigateToModifyClass(item,classId, className,majorId) {
		console.log('navigate', item);
		// const classNumber = item.className;
		// const peopleCount = item.people;
		uni.showLoading({
			title: '加载中'
		})
		
		// 跳转
		uni.navigateTo({
			url:'/pages/manager/classDetail?classId='+classId+'&className='+className+'&majorId='+majorId
		})

		// api.getUserInfoById(item.monitorId)
		// 	.then(res => {
		// 		const moniterUsername = res.data.data.username;
		// 		uni.navigateTo({
		// 			url: `/pages/manager/addClass?add=2&marjorId=${marjorId}&classNumber=${classNumber}&peopleCount=${peopleCount}&moniterUsername=${monitorName}`
		// 		})
		// 		uni.hideLoading()
		// 	}).catch(err => {
		// 		console.log('modify-class', err);
		// 		uni.hideLoading()
		// 	})

	}


	onMounted(() => {
		uni.showLoading({
			title: '加载数据中'
		})
		fetchInfo(() => {
			uni.hideLoading()
		})
	})

	onPullDownRefresh(() => {
		fetchInfo(() => {
			uni.stopPullDownRefresh()
		})
	})
</script>

<style lang="css" scoped>
	.container {
		padding: 32rpx;
	}

	:deep(.uni-collapse-item__title) {
		border-radius: 8rpx;
		margin: 8rpx;
		padding: 32rpx;
		background-color: #ECEAE8;
	}

	.uni-collapse-item {
		margin-bottom: 16rpx;
	}

	.class-item {
		background-color: #cccccc;
	}

	.plus-icon {
		display: flex;
		justify-content: center;
		margin-top: 8rpx;
		margin-bottom: 16rpx;
	}
</style>