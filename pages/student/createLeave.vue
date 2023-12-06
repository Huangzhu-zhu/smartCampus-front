<template>
	<view class="createLeave">
		<!-- 表单内容 ！！！但是还没有进行校验 :rules -->
		<uni-forms :model="formData" :rules="rules" validate-trigger="blur">
			<!-- 请假主题下拉框 -->
			<view class="leave-theme">
				<text class="theme">请假主题:</text>
				<view class="theme-select">
					
					<uni-forms-item name="theme">
						<uni-data-select
							style="width: 600rpx;"
						     v-model="formData.value"
						     :localdata="formData.range"
						     @change="changeTheme"
							 placeholder="请选择"
						   ></uni-data-select>
					</uni-forms-item>
					
				</view>
			</view>
							
			<view class="leave-time">
				<text class="time">请假时间:</text>
				<!-- 开始日期 -->
				<view class="startTime">
					<text class="startDate">开始日期:</text>
					<view class="startTimePicker">
						
						<uni-forms-item name="startDate">
						<uni-datetime-picker
							type="date"
							:value="formData.startTime"
							:start="formData.beginStartTime"
							:end="formData.beginEndTimw"
							:clear-icon="false"
							@change="changeStartTime"
							></uni-datetime-picker>
						</uni-forms-item>
						
					</view>	
				</view>
				
				<view class="endTime">
					<text class="endDate">结束日期:</text>
					<view class="endTimePicker">
						
						<uni-forms-item name="endDate">
						<uni-datetime-picker
							type="date"
							:value="formData.endTime"
							:start="formData.finishStartTime"
							:end="formData.finishEndTime"
							:clear-icon="false"
							@change="changeEndTime"
							></uni-datetime-picker>
						</uni-forms-item>
						
					</view>
				</view>
				
			</view>
			
			<view class="leave-content">
				<text class="content">请假理由:</text>
				<view class="input-content">
					
					<uni-forms-item name="content">
					<uni-easyinput
						:styles="formData.styles"
						:placeholderStyle="formData.placeholderStyle"
						type="textarea"
						v-model="formData.textValue" 
						maxlength="250"
						placeholder="请输入请假内容"
						@input="inputTextArea">
					</uni-easyinput>
					</uni-forms-item>
					
				</view>
			</view>
		</uni-forms>
		<view class="btn">
			<button class="comfirm" @click="commit" 
				:plain="false" hover-class="change-color">
				确定
			</button>
		</view>
	</view>
</template>

<script setup>
import { reactive } from 'vue';
import loginVue from '../login.vue';
	const formData = reactive({
		value:null,
		range:[
			{ value:0 , text:"课程请假" },
			{ value:1 , text:"外出请假" },
			{ value:2 , text:"离校申请"}
		],
		textValue:"",
		startTime:"",
		endTime:"",
		beginStartTime:"",
		beginEndTime:"",
		finishStartTime:"",
		finishEndTime:"",
		placeholderStyle:"color:#888888;font-size:30rpx;",
		styles:{
			color:'#000',
			borderColor:'none',
			backgroundColor:'#e3e3e3',
		}
	})
	
	// 表单校验规则
	const rules = reactive({
		
		content:{
			rules:[{
				required:true,
				errorMessage:'请输入请假理由'
			}]
		}
	})
	// 改变主题
	const changeTheme = (e) =>{
		console.log("e:",e);
	}
	// 改变开始日期
	const changeStartTime = (e) =>{
		formData.startTime = e;
		console.log("开始日期:",formData.startTime);
	}
	// 改变结束日期
	const changeEndTime = (e) =>{
		formData.endTime = e;
		console.log("结束日期:",formData.endTime);
	}
	
	// 输入的理由
	const inputTextArea = (e) =>{
		formData.textValue = e
		console.log("输入的内容:",formData.textValue);
	}
	
	// 提交创建
	const commit = () =>{
		console.log("提交");
	}
</script>

<style lang="scss" scoped>
	.createLeave{
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		.leave-theme{
			width: 100%;
			height: 150rpx;
			position: absolute;
			top: 60rpx;
			.theme{
				// font-family: "楷体";
				// font-weight: 600;
				font-size: 35rpx;
				color: #888888;
				// letter-spacing: 1rpx;
				margin-left: 60rpx;
			}
			.theme-select{
				width: 650rpx;
				margin-left: 50rpx;
				::v-deep .uni-select{
					background-color: #fff;
				}
			}
		}
		.leave-time{
			width: 700rpx;
			height: 300rpx;
			position: absolute;
			// background-color: #00CC86;
			top: 250rpx;
			left: 4%;
			.time{
				// font-family: "楷体";
				font-size: 35rpx;
				color: #888888;
				// letter-spacing: 3rpx;
				margin-left: 30rpx;
			}
			.startTime{
				margin-top: 10rpx;
				// margin-bottom: 10rpx;
				display: flex;
				// align-items: center;
				justify-content: center;
				// background-color: #00CC86;
				.startDate{
					margin-top: 10rpx;
					font-size: 33rpx;
					letter-spacing: 3rpx;
				}
				.startTimePicker{
					width: 450rpx;
					margin-left: 20rpx;
				}
			}
			.endTime{
				display: flex;
				justify-content: center;
				// background-color: #4FB86A;
				// align-items: center;
				.endDate{
					margin-top: 10rpx;
					font-size: 33rpx;
					letter-spacing: 3rpx;
				}
				.endTimePicker{
					width: 450rpx;
					margin-left: 20rpx;
				}
			}
		}
		.leave-content{
			width: 100%;
			height: 500rpx;
			position: absolute;
			// background-color: #00CC86;
			top: 590rpx;
			.content{
				// font-family: "楷体";
				font-size: 35rpx;
				color: #888888;
				// letter-spacing: 3rpx;
				margin-left: 60rpx;
			}
			.input-content{
				width: 650rpx;
				position: absolute;
				margin-top: 10rpx;
				left: 50%;
				transform: translate(-50%,0);
				::v-deep .uni-easyinput__content{
					height: 380rpx !important;
					// background-color: #00CC86;
					border-radius: 30rpx;
				}
				::v-deep .uni-easyinput__content-textarea{
					height: 360rpx !important;
					font-size: 35rpx !important;
					left: 1%;
					letter-spacing: 3rpx;
					// background-color: #00CC86;
				}
			}
		}
		.btn{
			width: 100%;
			position: absolute;
			top: 1050rpx;
			.comfirm{
				width: 300rpx;
				height: 100rpx;
				background-color: #00CC86;
				text-align: center;
				color: #fff;
				letter-spacing: 5rpx;
				font-size: 38rpx;
				line-height: 100rpx;
				box-shadow: 0 2rpx 15rpx rgba(0, 0, 0, 0.3);	
			}
			.change-color{
				background-color: #4FB86A;
			}
		}
	}
	
	
</style>