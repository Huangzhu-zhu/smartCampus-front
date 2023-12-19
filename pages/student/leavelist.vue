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
			<scroll-view class="scrollView" scroll-y="true" :scroll-top="0">
				<view class="card" :is-full="true"
				v-for="(item ,index) in data.leaveDetail" :key="index">
					<uni-row>
						
						<!-- 根据请假id跳转至详情页 -->
						<view @click="gotoStudentDetail(item.id,item.status)">
						<!-- 状态 -->
						<uni-col :span="5" :offset="1">
							<text>{{item.status==0 ? '未通过' : item.status==1 ?'通过' : '未处理'}}</text>
						</uni-col>
						<!-- 主题 -->
						<uni-col :span="6" >
							<text>{{item.theme}}</text>
						</uni-col>
						
						<!-- !!!有问题 -->
						<!-- 时间 -->
						<!-- 后端未返回创建日期 -->
						<uni-col :span="8" >
							<text>{{data.dateList[index]}}</text>
						</uni-col>
						</view>
						
						<!-- 删除 -->
						<uni-col :span="3" >
							<text class="delete" @click="dialogToggle(item.id)">删除</text>
						</uni-col>
					</uni-row>
				
				</view>
			</scroll-view>
		
			<!-- 提示窗示例 -->
			<view>
				<uni-popup ref="deleteDialog" type="dialog">
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
import { onShow } from '@dcloudio/uni-app'
import { sliceDate } from '@/utils/tools.js'
// import uniPopup from '../../uni_modules/uni-popup/components/uni-popup/popup.js'


	const deleteDialog = ref();

	const data = reactive({
		leaveDetail:[],
		dateList:[],
		id:0
	})
	
	// 弹出对话框
	const dialogToggle = (id) =>{
		data.id = id;
		console.log('id:',data.id,'数据类型:',typeof(data.id));
		deleteDialog.value.open();
	}
	// 确定按钮
	const dialogConfirm = () =>{
		uni.request({
			url:'http://120.46.222.199:80/api/student/leave/delete?leaveApplyId='+data.id,
			method:'DELETE',
			header:{ 
				'Content-Type': 'application/json',
			},
			success: (res) => {
				if(res.data.code == 1){
					uni.showToast({
						title:'删除成功',
						icon:'success',
						duration:1000
					})
				}else{
					uni.showToast({
						title:'删除失败',
						icon:'error',
						duration:1000
					})
				}
			}
		})
		// 刷新页面
		uni.navigateTo({
			url:'../student/leavelist'
		})
	}
	// 取消按钮
	const dialogClose = () =>{
		deleteDialog.value.close();
	}
	
	// 新建请假表
	const addLeave = () =>{
		uni.navigateTo({
			url:"/pages/student/createLeave"
		})
		
	}
	// 跳转到详情页
	const gotoStudentDetail = ( id,status ) =>{
		uni.navigateTo({
			url:'/pages/student/studentDetail?id='+id+'&status='+status
		})
	}
	
	// 使用onshow
	onShow(()=>{
		uni.request({
			url:'http://120.46.222.199:80/api/student/leave/progress',
			method:'GET',
			data:{
				studentId:'6'
			},
			success:(res) =>{
				// 返回的申请列表数据
				let list = res.data.data;
				console.log("列表长度:",list.length);
				for(let i=0; i<list.length;i++){
					data.dateList.push(sliceDate(list[i].applyDate));
				}
				data.leaveDetail = res.data.data;
				// console.log('日期列表:',data.dateList);
				console.log('申请列表:',data.leaveDetail);
			},
			fail: (res) => {
				uni.showToast({
					title:'网络状态不好',
					icon:'none',
					duration:1000
				})
			}
		})
	})
	
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
			height: 90%;
			// background-color: #888888;
			position: absolute;
			top: 80rpx;
			.scrollView{
				width: 100%;
				height: 1200rpx;
			}
			.card{
				width: 740rpx;
				height: 120rpx;
				line-height: 120rpx;
				font-size: 33rpx;
				background-color: #fff;
				border-radius: 10rpx;
				margin-left: 5rpx;
				box-shadow: 0rpx 1rpx 10rpx rgba(0, 0, 0, 0.1);
				margin-bottom: 12rpx;
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