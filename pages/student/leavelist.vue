<template>
	<view class="list">
		<view class="list-head">
			<uni-row >
				<!-- 复选框 -->
				<!-- <uni-col :span="2" :offset="1">
					<checkbox></checkbox>
				</uni-col> -->
				<!-- 状态栏 -->
				<uni-col :span="5" :offset="1">
					<text  class="head-state">状态</text>
				</uni-col>
				<!-- 主题栏 -->
				<uni-col :span="6" >
					<text class="head-theme">主题</text>
				</uni-col>
				<!-- 时间栏 -->
				<uni-col :span="6" :offset="1">
					<text class="head-time">时间</text>
				</uni-col>
				<!-- 删除操作 -->
				<uni-col :span="3" :offset="1">
					<text>操作</text>
				</uni-col>
			</uni-row>	
		</view>
		
		<!-- <view class="block"></view> -->
		
		<view class="list-middle">
			<view class="card" :is-full="true"  
			v-for="(item ,index) in data.leaveDetail" :key="index">
				<uni-row  >
					<!-- 复选框 -->
					<!-- <uni-col :span="2" :offset="1">
						<checkbox></checkbox>
					</uni-col> -->
					<view @click="gotoDetail">
					<!-- 状态 -->
					<uni-col :span="5" :offset="1">
						<text>{{item.state}}</text>
					</uni-col>
					<!-- 主题 -->
					<uni-col :span="6" >
						<text>{{item.theme}}</text>
					</uni-col>
					<!-- 时间 -->
					<uni-col :span="8" >
						<text>{{item.time}}</text>
					</uni-col>
					</view>
					<!-- 删除 -->
					<uni-col :span="3" >
						<text class="delete" @click="dialogToggle">删除</text>
					</uni-col>
				</uni-row>
			</view>
			<view>
			<!-- 提示窗示例 -->
				<uni-popup ref="alertDialog" type="dialog">
					<uni-popup-dialog type="error" cancelText="取消" confirmText="确定" title="提示" content="确定删除吗？" @confirm="dialogConfirm"
						@close="dialogClose"></uni-popup-dialog>
				</uni-popup>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="list-foot">
			<view class="add" @click="addLeave">
				<uni-icons type="plusempty" size="50" color="#fff"></uni-icons>
			</view>
			
		</view>
	</view>
</template>

<script setup>
import { reactive,ref } from 'vue';

	const data = reactive({
		leaveDetail:[{
			state:"审核中",
			theme:"课程请假",
			time:"2023-10-10",
			},
			{
				state:"审核中",
				theme:"课程请假",
				time:"2023-10-10",
			},
			{
				state:"审核中",
				theme:"课程请假",
				time:"2023-10-10",
			}
		]
		
	})
	
	
	const alertDialog = ref()
	// 弹出对话框
	const dialogToggle = () =>{
		alertDialog.value.open();
	}
	// 确定按钮
	const dialogConfirm = () =>{
		console.log("确定");  //具体还要修改后端数据
	}
	// 取消按钮
	const dialogClose = () =>{
		alertDialog.value.close();
	}
	
	// 新建请假表
	const addLeave = () =>{
		uni.navigateTo({
			url:"/pages/student/createLeave"
		})
		
	}
	// 跳转到详情页
	const gotoDetail = () =>{
		uni.navigateTo({
			url:'/pages/student/studentDetail'
		})
	}
</script>

<style lang="scss" scoped>
	.list{
		width: 100%;
		height: 100%;
		position: relative;
		.list-head{
			position: absolute;
			width: 100%;
			height: 70rpx;
			line-height: 70rpx;
			background-color: #fff;
			font-size: 34rpx;
			.head-state{
				margin-left: 12rpx;
			}
			.head-theme{
				margin-left: 27rpx;
			}
			.head-time{
				margin-left: 20rpx;
			}
		}
		// .block{
		// 	width: 100%;
		// 	height: 8rpx;
		// 	position: absolute;
		// 	top: 20rpx;
		// 	background-color: #f1f1f1;
		// }
		.list-middle{
			// padding-right: 10rpx;
			width: 100%;
			height: 1100rpx;
			// background-color: #fff;
			position: absolute;
			top: 80rpx;
			.card{
				width: 740rpx;
				height: 90rpx;
				line-height: 90rpx;
				font-size: 33rpx;
				background-color: #fff;
				border-radius: 10rpx;
				margin-left: 5rpx;
				box-shadow: 0rpx 1rpx 10rpx rgba(0, 0, 0, 0.1);
				margin-bottom: 8rpx;
				// background-color: brown;
				.delete{
					margin-left: 6rpx;
				}
			}
		}
		.list-foot{
			width: 100%;
			height: 150rpx;
			position: absolute;
			display: flex;
			justify-content: center;  //水平居中
			top: 85%;
			
			.add{
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #00CC86;
				box-shadow: -1rpx 10rpx 20rpx rgba(0, 0, 0, 0.3);
			}
		}
	}
</style>