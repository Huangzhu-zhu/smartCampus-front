<template>
	<view class="container">
		<!-- 班级号 -->
		<view class="classNumber">
			<text>{{ classData.className }}</text>
		</view>
		<!-- 标题栏 -->
		<view class="list-head">
			<uni-row >
				<!-- 学号栏 -->
				<uni-col :span="7" :offset="2">
					<text>学号</text>
				</uni-col>
				<!-- 姓名栏 -->
				<uni-col :span="6" >
					<text>姓名</text>
				</uni-col>
				<!-- 性别栏 -->
				<uni-col :span="5" >
					<text >性别</text>
				</uni-col>
				<!-- 操作栏 -->
				<uni-col :span="4" >
					<text>操作</text>
				</uni-col>
			</uni-row>	
		</view>
		<!-- 学生信息 -->
		<view class="list-content">
			<scroll-view class="scrollView" scroll-y="true" :scroll-top="0">
				<view class="card" :is-full="true"
				v-for="(item ,index) in classData.studentList" :key="index">
					<uni-row>
						<!-- 学号 -->
						<uni-col :span="7" :offset="1">
							<text>{{item.username}}</text>
						</uni-col>
						<!-- 姓名 -->
						<uni-col :span="5" :offset="1">
							<text>{{item.name}}</text>
						</uni-col>
						<!-- 性别 -->
						<uni-col :span="4" :offset="1">
							<text class="studentSex">{{item.sex === 1 ? '男' : '女'}}</text>
						</uni-col>
						<!-- 删除 -->
						<uni-col :span="4" :offset="1">
							<text @click="dialogToggle(item.id)">删除</text>
						</uni-col>
					</uni-row>
				
				</view>
			</scroll-view>
			
			<!-- 删除提示框窗 -->
			<view>
				<uni-popup ref="deleteDialog" type="dialog">
					<uni-popup-dialog type="error" cancelText="取消" confirmText="确定" title="提示" content="确定删除吗？" @confirm="dialogConfirm"
						@close="dialogClose"></uni-popup-dialog>
				</uni-popup>
			</view>	
		</view>
		
		<!-- 下方两个按钮 -->
		<view class="btns">
			<!-- 重置按钮 没有写事件-->
			<button class="reset" >重置</button>
			
			<!-- 添加学生按钮 -->
			<button class="addStudent" @click="addStudent">添加学生</button>
		</view>
	</view>
</template>

<script setup>
	import { reactive,ref } from 'vue'
	import { onLoad,onShow } from '@dcloudio/uni-app'
	import api from '@/api/api.js';
	import toasts from '@/utils/toasts.js'
	
	const deleteDialog = ref();
	
	const classData = reactive({
		classId:0,  //班级id
		className:'', //班级号
		studentList:[],
		studentId:0, //被删除学生id
		majorId:0 //专业号
	})
	
	// 需要添加学生的信息
	const studentInfo = reactive({
		username:'',
		password:'',
		name:'',
		sex:0,
		majorId:0,
		classId:0,
		dormitoyId:0
	})
	
	// 弹出删除对话框
	const dialogToggle = (id) =>{
		classData.studentId = id;
		console.log('被删除学生id:',classData.studentId);
		deleteDialog.value.open();
	}
	
	// 确定删除
	const dialogConfirm = () =>{
		api.delStudent(parseInt(classData.studentId))
			.then(res =>{
				console.log('res:',res.data);
				// 刷新页面
				uni.navigateTo({
					url:'../manager/classDetail'
				})
			}).catch(err =>{
				console.log(err);
				toasts.error('网络错误')
			})
		
	}
	
	// 取消删除
	const dialogClose = () =>{
		deleteDialog.value.close();
	}
	
	// 添加学生
	const addStudent = () =>{
		// 跳转至添加界面
		uni.navigateTo({
			url:'/pages/manager/addStudent?classId='+classData.classId + '&majorId='+classData.majorId
		})
	}
	
	function getStudentInfo(){
		uni.showLoading({
			title: '加载中'
		})
		
		api.getClassStudentInfo(classData.classId)
			.then(res =>{
				classData.studentList = res.data.data;
				console.log("student:",classData.studentList);
				
				uni.hideLoading();
			}).catch(err =>{
				console.log(err);
				uni.hideLoading()
				toasts.error('网络错误')
			})
	}
	
	// 从管理员管理列表接受传递过来的班级id
	onLoad((option) =>{
		classData.classId = option.classId;
		classData.className = option.className;
		classData.majorId = option.majorId;
		console.log('classId:',classData.classId,'className:',classData.className,'majorId:',classData.majorId);
	})
	
	onShow(() =>{
		getStudentInfo();
	})

</script>

<style lang="scss" scoped>
	.container{
		position: relative;
		width: 100%;
		height: 100%;
		.classNumber{
			position: absolute;
			height: 80rpx;
			// background-color: cadetblue;
			display: flex;
			align-items: center;
			transform: translate(-50%,0);
			left: 50%;
		}
		.list-head{
			position: absolute;
			height: 100rpx;
			width: 98%;
			left: 50%;
			transform: translate(-50%,0);
			line-height: 100rpx;
			top: 90rpx;
			background-color: #f4f4f4;
			font-size: 34rpx;
			border: 1rpx solid #c8c8c8;
		}
		.list-content{
			position: absolute;
			// background-color: antiquewhite;
			height: 1000rpx;
			top: 205rpx;
			width: 98%;
			left: 50%;
			transform: translate(-50%,0);
			.card{
				height: 100rpx;
				line-height: 100rpx;
				background-color: #f4f4f4;
				border: 1rpx solid #c8c8c8;
				margin-bottom: 10rpx;
				.studentSex{
					margin-left: 20rpx;
				}
			}
		}
		.btns{
			position: absolute;
			width: 100%;
			top: 1250rpx;
			// background-color: cadetblue;
			display: flex;
			.addStudent,.reset{
				width: 250rpx;
				background-color: #CEE2E9;
			}
		}
	}
</style>