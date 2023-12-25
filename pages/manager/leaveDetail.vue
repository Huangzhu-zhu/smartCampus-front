<template>
	<view class="teacher-detail">
		<!-- 请假类型 -->
		<view class="theme">
			<text class="theme-type">请假类型:</text>
			<text class="theme-detail">{{data.themeType}}</text>
		</view>
		<!-- 请假时间 -->
		<view class="leave-time">
			<text class="time">请假时间:</text>
			<!-- 开始日期 -->
			<view class="startTime">
				<text class="beginTime">开始日期:</text>
				<text class="beginDate">{{data.beginDate}}</text>
			</view>
			<!-- 结束日期 -->
			<view class="endTime">
				<text class="finishTime">结束日期:</text>
				<text class="finishDate">{{data.finishDate}}</text>
			</view>
		</view>
		<!-- 请假理由 -->
		<view class="leave-content">
			<text class="content">请假理由:</text>
			<view class="content-box">
				<text class="content-detail">
				{{data.content}}
				</text>
			</view>
		</view>
		
		<!-- 审批按钮 -->
		<view class="btns">
			<button class="btn-agree">同意</button>
			<button class="btn-disagree">拒绝</button>
		</view>
	</view>
</template>

<script setup>
import { reactive } from 'vue';
	const data = reactive({
		themeType:"课程请假",
		beginDate:"2023-12-03",
		finishDate:"2023-12-10",
		content:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
	})
</script>

<style lang="scss" scoped>
	.teacher-detail{
		width: 100%;
		height: 100%;
		// display: flex;
		position: relative;
		// 请假主题布局
		.theme{
			position: absolute;
			width: 550rpx;
			height: 90rpx;
			// background-color: #00CC86;
			border: 3rpx solid #aeaeae;
			border-radius: 20rpx;
			left: 50%;
			transform: translate(-50%,0);
			top: 80rpx;
			font-size:35rpx;
			display: flex;
			align-items: center;
			// justify-content: center;
			.theme-type{
				color: #5b5b5b;
				// font-weight: 600;
				margin-left: 20rpx;
			}
			.theme-detail{
				margin-left: 50rpx;
			}
		}
		// 请假时间布局
		.leave-time{
			width: 100%;
			height: 310rpx;
			// background-color: #00CC86;
			position: absolute;
			top: 240rpx;
			.time{
				font-size: 38rpx;
				color: #5b5b5b;
				margin-left: 100rpx;
			}
			.startTime{
				// position: absolute;
				width: 550rpx;
				height: 90rpx;
				position: absolute;
				// background-color: #00CC86;
				border: 3rpx solid #aeaeae;
				border-radius: 20rpx;
				left: 50%;
				transform: translate(-50%,0);
				display: flex;
				align-items: center;
				margin-top: 10rpx;
				font-size: 35rpx;
				.beginTime{
					margin-left: 20rpx;
					color: #5b5b5b;
				}
				.beginDate{
					margin-left: 50rpx;
				}
			}
			.endTime{
				width: 550rpx;
				height: 90rpx;
				position: absolute;
				// background-color: #00CC86;
				border: 3rpx solid #aeaeae;
				border-radius: 20rpx;
				left: 50%;
				transform: translate(-50%,0);
				display: flex;
				align-items: center;
				margin-top: 140rpx;
				font-size: 35rpx;
				.finishTime{
					margin-left: 20rpx;
					color: #5b5b5b;
				}
				.finishDate{
					margin-left: 50rpx;
				}
			}
		}
		// 请假理由布局
		.leave-content{
			width: 100%;
			position: absolute;
			top: 580rpx;
			// background-color: #00CC86;
			.content{
				font-size: 38rpx;
				color: #5b5b5b;
				margin-left: 100rpx;
			}
			.content-box{
				margin-top: 10rpx;
				background-color: #e3e3e3;
				border-radius: 20rpx;
				width: 600rpx;
				height: 380rpx;
				position: absolute;
				left: 50%;
				transform: translate(-50%,0);
				
				.content-detail{
					display: flex;
					flex-direction: column;
					word-break: break-all;
					width: 580rpx;
					height: 340rpx;
					margin: 20rpx;
					font-size: 35rpx;
					// background-color: #00CC86
				}
			}
		}
		
		// 按钮布局
		.btns{
			width: 100%;
			display: flex;
			position: absolute;
			top: 1050rpx;
			align-items: center;
			// background-color: darkseagreen;
			.btn-agree{
				width: 200rpx;
				height: 90rpx;
				background-color: #00CC86;
				color: #fff;
				font-size: 38rpx;
				line-height: 90rpx;
			}
			.btn-disagree{
				width: 200rpx;
				height: 90rpx;
				background-color: #F55958;
				color: #fff;
				font-size: 38rpx;
				line-height: 90rpx;
			}
		}
	}
</style>