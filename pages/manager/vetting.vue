<template>
	<view class="container">
		<scroll-view class="scrollView" scroll-y="true" :scroll-top="0">
			<!-- <view> -->
				<!-- 在uni-card上加个for循环 -->
				<uni-card :is-shadow="true"  v-for="(item,index) in data.list" :key="index" @click="gotoDetail(item.id)">
					<uni-list :border="false">
						<uni-list-item :title="item.studentName" :rightText="item.theme" showArrow>
						</uni-list-item>
					</uni-list>
				</uni-card>
			<!-- </view> -->
		</scroll-view>
		<view class="uni-p-b-98"></view>
		<my-tabBar :currPath = "'/pages/manager/vetting'"/>
	</view>
	
</template>

<script setup>
import { reactive } from 'vue';
import { onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user.js'

	const user = useUserStore();

	const data = reactive({
		list:[]  ,//未审核列表
		id:null
	})

	// onShow获取数据
	onShow(() =>{
		uni.request({
			url:'http://120.46.222.199:80/api/admin/approval/applyList',
			method:'GET',
			header:{
				token:user.token
			},
			success: (res) => {
				data.list = res.data.data;
				console.log('list:',data.list);
			}
		})
	})
	
	const gotoDetail = (id) =>{
		console.log('id:',id);
		uni.navigateTo({
			url:"/pages/manager/leaveDetail?id="+id
		})
	}
	

</script>

<style lang="scss" scoped>
	.uni-p-b-98{
		height: 130rpx;
	}
</style>