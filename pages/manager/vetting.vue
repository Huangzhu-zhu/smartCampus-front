<template>
	<view class="container">
		<!-- 在uni-card上加个for循环 -->
		<uni-card :is-shadow="true" @click="gotoDetail">
				<uni-list :border="false">
					<uni-list-item :title="listData.Applicant" :rightText="listData.content" showArrow="">
					</uni-list-item>
				</uni-list>
		</uni-card>
	</view>
</template>

<script setup>
import { reactive } from 'vue';
	const listData = reactive({
		Applicant:"张三",  //申请人
		content:"课程请假"  //申请类型
	})
	
	const gotoDetail = (e) =>{
		uni.navigateTo({
			url:"/pages/manager/leaveDetail"
		})
	}
	
	// 卡片循环加载问题未处理
</script>

<style lang="scss" >
	
</style>