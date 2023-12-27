<template>
	<view class="teacher-detail">
		<!-- 请假类型 -->
		<view class="theme">
			<text class="theme-type">请假类型:</text>
			<text class="theme-detail">{{data.list.theme}}</text>
		</view>
		<!-- 请假时间 -->
		<view class="leave-time">
			<text class="time">请假时间:</text>
			<!-- 开始日期 -->
			<view class="startTime">
				<text class="beginTime">开始日期:</text>
				<text class="beginDate">{{data.startDate}}</text>
			</view>
			<!-- 结束日期 -->
			<view class="endTime">
				<text class="finishTime">结束日期:</text>
				<text class="finishDate">{{data.endDate}}</text>
			</view>
		</view>
		<!-- 请假理由 -->
		<view class="leave-content">
			<text class="content">请假理由:</text>
			<view class="content-box">
				<text class="content-detail">
				{{data.list.reason}}
				</text>
			</view>
		</view>
		
		<!-- 处理结果 -->
		<view class="leave-result">
			<uni-table class="table">
				<uni-tr>
					<uni-td>处理人</uni-td>
					<uni-td>{{data.adminApproval.handler}}</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>最新处理日期</uni-td>
					<uni-td>{{data.lastedDate}}</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>处理结果</uni-td>
					<uni-td>{{data.adminApproval.processResult==1 ? '通过':data.adminApproval.processResult==0 ? '未通过' :'审核中'}}</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>处理备注</uni-td>
					<uni-td >{{data.adminApproval.processComment}}</uni-td>
				</uni-tr>
			</uni-table>
			
		</view>
	</view>
</template>

<script setup>
import { reactive } from 'vue';
import { onLoad,onShow } from '@dcloudio/uni-app'
import { sliceDate } from '@/utils/tools.js'
import { useUserStore } from '@/store/user.js'

	const user = useUserStore();
	
	const data = reactive({
		id:0,
		status:0,
		list:[],
		adminApproval:[]  ,//审核信息
		startDate:'', //请假开始日期
		endDate:'',   //请假结束日期
		lastedDate:'' //最新处理日期
	})
	
	// 从学生请假列表接受传递过来的id
	onLoad((option) =>{
		data.id = option.id;
		data.status = option.status;
		console.log('id:',data.id,'status:',data.status);
	})
	
	onShow(() =>{
		// 管理员未处理时的查询
		if(data.status === '2'){
			uni.request({
				url:'http://120.46.222.199:80/api/student/leave/detail',
				method:'GET',
				data:{
					leaveApplyId:data.id
				},
				header:{
					token:user.token
				},
				success: (res) => {
					data.list = res.data.data;
					data.startDate = sliceDate(res.data.data.beginDate);
					data.endDate = sliceDate(res.data.data.endDate);
					console.log('开始时间:',data.startDate,'结束时间:',data.endDate);
					console.log('list:',data.list);
				}
			})
		}else{
			// 管理员已处理后的查询
			uni.request({
				url:'http://120.46.222.199:80/api/student/leave/detailWithApproval',
				method:'GET',
				data:{
					leaveApplyId:data.id
				},
				header:{
					token:user.token
				},
				success: (res) => {
					let list = res.data.data;
					data.list = list.leaveApply;
					data.adminApproval = list.adminApproval;
					data.startDate = sliceDate(data.list.beginDate);
					data.endDate = sliceDate(data.list.endDate);
					data.lastedDate = sliceDate(list.adminApproval.processDate);
					console.log('list:',data.list);
					console.log('approval:',data.adminApproval);
				}
			})
		}
		
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
			width: 580rpx;
			height: 80rpx;
			background-color: #fff;
			border: 3rpx solid #c8c8c8;
			border-radius: 10rpx;
			left: 50%;
			transform: translate(-50%,0);
			top: 20rpx;
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
			height: 280rpx;
			// background-color: #00CC86;
			position: absolute;
			top: 120rpx;
			.time{
				font-size: 35rpx;
				color: #5b5b5b;
				margin-left: 100rpx;
			}
			.startTime{
				// position: absolute;
				width: 580rpx;
				height: 80rpx;
				position: absolute;
				background-color: #fff;
				border: 3rpx solid #c8c8c8;
				border-radius: 10rpx;
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
				width: 580rpx;
				height: 80rpx;
				position: absolute;
				background-color: #fff;
				border: 3rpx solid #c8c8c8;
				border-radius: 10rpx;
				left: 50%;
				transform: translate(-50%,0);
				display: flex;
				align-items: center;
				margin-top: 110rpx;
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
			top: 400rpx;
			// background-color: #00CC86;
			.content{
				font-size: 35rpx;
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
					font-size: 33rpx;
					// background-color: #00CC86
				}
			}
		}
		// 处理信息布局
		.leave-result{
			width: 600rpx;
			height: 400rpx;
			position: absolute;
			// background-color: #e3e3e3;
			top: 880rpx;
			left: 50%;
			transform: translate(-50%,0);
			::v-deep .uni-table-td{
				font-size: 33rpx;
			}
			::v-deep .uni-table{
				border: 2rpx solid #c8c8c8;
			}
		}
	}
</style>