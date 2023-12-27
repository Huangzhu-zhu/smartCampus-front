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
		
		<!-- 审批按钮 -->
		<view class="btns">
			<button class="btn-agree" @click="agree">同意</button>
			<button class="btn-disagree" @click="disagree">拒绝</button>
		</view>
		
		<!-- 审核通过提示窗 -->
		<view>
			<uni-popup ref="pass" type="dialog">
				<uni-popup-dialog type="error" cancelText="取消" confirmText="确定" title="提示" content="确定通过吗？" @confirm="passConfirm"
					@close="passClose"></uni-popup-dialog>
			</uni-popup>
		</view>
		
		<!-- 审核不通过提示窗 -->
		<view>
			<uni-popup ref="fail" type="dialog">
				<uni-popup-dialog ref="inputdialog" mode="input" title="申请不通过理由" value="不通过" placeholder="请输入内容" cancelText="取消" confirmText="确定" content="确定拒绝吗？" @confirm="failConfirm"
					@close="failClose"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script setup>
import { reactive,ref } from 'vue';
import { onShow,onLoad } from '@dcloudio/uni-app'
import { sliceDate } from '@/utils/tools.js'
import { useUserStore } from '@/store/user.js'

	const user = useUserStore();

// 定义pass
	const pass = ref(null);
	const fail = ref(null);
	const inputdialog = ref(null);

	const data = reactive({
		list:[],
		id:null,
		handler:'李昊', //处理人
		result:1  ,//默认是1
		comment:''  ,//备注
		value:'', //不通过的理由
		startDate:'', //请假开始日期
		endDate:'' //请假结束日期
	})
	
	// 接受从管理员审核列表传递的参数
	onLoad((option) =>{
		data.id = option.id;
		console.log('id:',data.id);
	})
	
	onShow(() =>{
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
				data.startDate = sliceDate(data.list.beginDate);
				data.endDate = sliceDate(data.list.endDate);
				console.log('查询成功');
				console.log('list:',data.list);
			}
		})
	})
	
	// 审批
	const agree = () =>{
		pass.value.open();
	}
	
	const disagree = () =>{
		fail.value.open();
	}
	
	// 对话框取消
	const passClose = () =>{
		pass.value.close();
	}
	const failClose = () =>{
		fail.value.close();
	}
	
	// 通过对话框
	const passConfirm = () =>{
		data.result = 1;
		data.comment = '通过';
		uni.request({
			url:'http://120.46.222.199:80/api/admin/approval/process',
			method:'POST',
			data:{
				applyId:parseInt(data.id) ,
				handler:data.handler,
				processResult:parseInt(data.result) ,
				processComment:data.comment
			},
			header:{
				token:user.token
			},
			success: (res) => {
				console.log(res.data.msg);
				// 返回上级页面
				uni.navigateBack();
			},
			fail: (res) => {
				console.log('失败');
			}
		})
	}
	
	// 不通过对话框
	const failConfirm = (val) =>{
		data.result = 0;
		data.comment = val;
		console.log('理由:',val);
		uni.request({
			url:'http://120.46.222.199:80/api/admin/approval/process',
			method:'POST',
			data:{
				applyId:parseInt(data.id) ,
				handler:data.handler,
				processResult:parseInt(data.result) ,
				processComment:data.comment
			},
			header:{
				token:user.token
			},
			success: (res) => {
				console.log(res.data.msg);
				// 返回上级页面
				uni.navigateBack();
			},
			fail: (res) => {
				console.log('失败');
			}
		})
	}
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
			height: 90rpx;
			background-color: #fff;
			border: 3rpx solid #c8c8c8;
			border-radius: 10rpx;
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
				width: 580rpx;
				height: 90rpx;
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
				height: 90rpx;
				position: absolute;
				background-color: #fff;
				border: 3rpx solid #c8c8c8;
				border-radius: 10rpx;
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