<template>
	<view class="classTime">
		<!-- 头部第几周和星期几 -->
		<view class="flex-row head">
			<!-- 显示第几周 -->
			<view class="head-left flex-column j_c">
				<text class="head-left-text one">第</text>
				<text class="head-curr-week">{{data.currentWeek}}</text>
				<text class="head-left-text two">周</text>
			</view>
			
			<!-- 显示星期几和对应的日期 -->
			<view class="head-right flex-row j_b">
				<view class="flex-column" v-for="(item,index) in data.weekList" :key="index">
					<!-- 显示星期几 -->
					<text class="head-week" :style="fontColor(item.isCurr)">{{item.week}}</text>
					<text :style="fontColor(item.isCurr)">{{item.isCurr ? '今天' : item.day}}</text>
				</view>
			</view>
		</view>
		
		<!-- 中间第一个区域 -->
		<view class="flex-row container mb20">
			<!-- 显示左侧上课时间 -->
			<view class="container-left flex-column j_b">
				<!-- 时间 8:25-12:00 -->
				<block v-for="(item,index) in time.one" :key="index"> 
					<view class="center-column j_c">
						<text class="con-title">{{item.index}}</text>
						<text>{{item.startTime}}</text>
						<text>{{item.endTime}}</text>
					</view>
				</block>
			</view>
			
			<!-- 显示右侧课表安排 -->
			<view class="container-right j_c">
				<!-- 第一大节 -->
				<view class="flex-row mb10">
					<view class="con-item flex-column j_c" v-for="(item,index) in schedule.one" :key="index" 
						:style="getColor(item.color)">
						<text class="con-item-subj">{{item.sub}}</text>
						<text>{{item.tec}}</text>
						<text>{{item.add}}</text>
					</view>
				</view>
				
				<!-- 第二大节 -->
				<view class="flex-row">
					 <view class="con-item flex-column j_c" v-for="(item,index) in schedule.two" :key="index" 
						:style="getColor(item.color)">
					    <text class="con-item-subj">{{item.sub}}</text>
					    <text>{{item.tec}}</text>
					    <text>{{item.add}}</text>
					</view>
				</view>			
			</view>
		</view>
		
		<!-- 中间第二个区域 -->
		<view class="container flex-row mb20">
		  <view class="container-left">
			  <!-- 时间 14:30-18:05 -->
		    <block v-for="(item,index) in time.two" :key="index">
		      <view class="center-column j_c">
		        <text class="con-title">{{item.index}}</text>
		        <text>{{item.startTime}}</text>
		        <text>{{item.endTime}}</text>
		      </view>
		    </block>
		  </view>
		  
		  <!-- 第三大节 -->
		  <view class="container-right j_c">
		  <view class="flex-row mb10">
		  	<view class="con-item flex-column j_c" v-for="(item,index) in schedule.three" :key="index" 
		  		:style="getColor(item.color)">
		  		<text class="con-item-subj">{{item.sub}}</text>
		  		<text>{{item.tec}}</text>
		  		<text>{{item.add}}</text>
		  	</view>
		  </view>
		  
		  <!-- 第四大节 -->
		  <view class="flex-row">
		  	 <view class="con-item flex-column j_c" v-for="(item,index) in schedule.four" :key="index" 
		  		:style="getColor(item.color)">
		  	    <text class="con-item-subj">{{item.sub}}</text>
		  	    <text>{{item.tec}}</text>
		  	    <text>{{item.add}}</text>
		  	</view>
		  </view>	
		  </view>
		</view>
		
		<!-- 中间第三个区域 -->
		<view class="container flex-row">
		  <view class="container-left left1">
			  <!-- 时间 19:30-20:15 -->
		    <block v-for="(item,index) in time.three" :key="index">
		      <view class="center-column j_c">
		        <text class="con-title">{{item.index}}</text>
		        <text>{{item.startTime}}</text>
		        <text>{{item.endTime}}</text>
		      </view>
		    </block>
		  </view>
		  <!-- 第五大节 -->
		  <view class="container-right right1 flex col j_c">
		    <view class="flex-row">
		      <view class="con-item1 flex-column j_c" v-for="(item,index) in schedule.five" :key="index" 
		  		:style="getColor(item.color)">
		        <text class="con-item-subj">{{item.sub}}</text>
		        <text>{{item.tec}}</text>
		        <text>{{item.add}}</text>
		      </view>
		    </view>
		  </view>
		</view>
		
		<!-- 详情弹框 -->
		<!-- <view class="mask" hidden="{{!isShow}}" catchtap="close"></view>
		<view class="modal flex-column j_c {{isShow ? 'show':'noShow'}}" style="background: {{current.color}};">
		  <view>{{current.sub}}</view>
		  <view>{{current.add}}</view>
		  <view>{{current.tec}}</view>
		</view> -->
		<view class="uni-p-b-98"></view>
		<my-tabBar :currPath="'/pages/index/curriculum'"/>
	</view>
</template>

<script setup>
import { reactive } from 'vue';
import { getCurrWeekList ,formateDate} from '@/utils/tools.js'
import { onShow } from "@dcloudio/uni-app"
	
	const data = reactive({
		currentWeek:10,
		weekList:[],
		
	})
	
	// 定义课表时间
	const time = reactive({
			one:[{
					index:1,
					startTime:'08:25',
					endTime:'10:00'
				},
				{
					index:2,
					startTime:'10:25',
					endTime:'12:00'
				}],
			two:[{
					index:3,
					startTime:'14:30',
					endTime:'16:05'
				},
				{
					index:4,
					startTime:'16:30',
					endTime:'18:05'
				}],
			three:[{
					index:5,
					startTime:'19:30',
					endTime:'20:15'
				}]
		})
		
	// 定义课程表
	const schedule = reactive({
		one: [{
		      sub: '编译原理',
		      add: 'B202',
		      tec: "@a老师",
		      color: '#80CBC4',
		      type: 1, //0-无  1-有
		    },
		    {
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    }, {
		      sub: '操作系统',
		      add: 'N502',
		      tec: "@a老师",
		      color: '#FF8A80',
		      type: 1,
		    },
		    {
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    },
		    {
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    },
		  ],
		two: [{
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    },
		    {
		      sub: '大学物理',
		      add: 'B202',
		      tec: "@abc",
		      color: '#fda085',
		      type: 1, //0-无  1-有
		    },
		    {
		      sub: '概率',
		      add: 'B202',
		      tec: "@c老师",
		      color: '#ACC2B8',
		      type: 1, //0-无  1-有
		    }, {
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    },
		    {
		      sub: '线性代数',
		      add: 'B202',
		      tec: "@a老师",
		      color: '#80CBC4',
		      type: 1, //0-无  1-有
		    },
		  ],
		three: [{
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    },
		    {
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    },
		    {
		      sub: '软件工程',
		      add: 'B202',
		      tec: "@a老师",
		      color: '#a7a6cb',
		      type: 1, //0-无  1-有
		    },
		    {
		      sub: '安卓',
		      add: 'B202',
		      tec: "@a老师",
		      color: '#6282BC',
		      type: 1, //0-无  1-有
		    },
		    {
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    },
		  ],
		four: [{
		      sub: '软件测试',
		      add: 'B202',
		      tec: "@a老师",
		      color: '#6F7887',
		      type: 1, //0-无  1-有
		    }, {
		      sub: '数据库系统概述',
		      add: 'B202',
		      tec: "@a老师",
		      color: '#6282BC',
		      type: 1, //0-无  1-有
		    }, {
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    },
		    {
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    },
		    {
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    }],
		five: [{
		      sub: '软件测试',
		      add: 'B202',
		      tec: "@a老师",
		      color: '#6F7887',
		      type: 1, //0-无  1-有
		    }, {
		      sub: '数据库系统概述',
		      add: 'B202',
		      tec: "@a老师",
		      color: '#FF8A80',
		      type: 1, //0-无  1-有
		    }, {
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    },
		    {
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    },
		    {
		      sub: '',
		      add: '',
		      tec: "",
		      color: '',
		      type: 0,
		    }]
	})
	
	// 获取循环中的颜色
	const getColor = (color) =>{
		return 'background-color:' + color
	};
	
	// 显示今天的日期变色
	const fontColor = (color) =>{
		if(color){
			return 'color:#6282BC;' 
		}
	}
	
	onShow(() => {
		let time = new Date();
		let list = getCurrWeekList(time);
		// console.log('list:',list);
		list.forEach(item => {
			data.weekList.push({
				day:[item.split('-')[1], item.split('-')[2]].join(('-')),
				week: "日一二三四五六".charAt((new Date(item)).getDay()),
				isCurr:formateDate(time) == item
			})
		});
	})
	
</script>

<style lang="scss" scoped>
	.classTime{
		width: 100%;
		padding: 30rpx 20rpx;
		position: relative;
		// 头部样式
		.head{
			margin-bottom: 20rpx;
			// background-color: antiquewhite;
			display: flex;
			.head-left{
				display: flex;
				border-radius: 10rpx;
				height: 125rpx;
				background: #fff;
				width: 90rpx;
				margin-right: 10rpx;
				position: relative;
				// 分行
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 25rpx;
			}
			.head-right{
				display: flex;
				border-radius: 10rpx;
				height: 125rpx;
				background: #fff;
				width: 610rpx;
				font-size: 25rpx;
				box-sizing: border-box;
				// background-color: antiquewhite;
				padding: 0 10rpx;
				color: #7e7a7a;
				.flex-column{
					display: flex;
					flex-direction: column;
					// background-color: bisque;
					width: 80rpx;
					margin-right: 10rpx;
					justify-content: center;
					align-items: center;
					.head-week {
					   font-weight: bold;
					   margin-bottom: 10rpx;
					   color: #333;
					}
					.head-right-curr{
						color: #6282BC;
						
					}
				}
				
			}
		}
		// 所有container盒子右侧公共样式
		.container{
			width: 100%;
			// background-color: antiquewhite;
			display: flex;
			margin-top: 10rpx;
			.container-right{
				// width: 100%;
				// background-color: beige;
				margin-left: 5rpx;
				.flex-row{
					display: flex;
					.con-item {
						// background-color: beige;
						width: 80rpx;
						height: 210rpx;
						border-radius: 10rpx;
						margin-right: 7rpx;
						// flex-shrink: 0;
						font-size: 27rpx;
						color: #fff;
						box-sizing: border-box;
						padding: 10rpx;
						display: flex;
						flex-direction: column;
						line-height: 28rpx;
						// animation: show 1.5s ease-in-out;
					}
				}
			}
		}
		// 第三个盒子样式
		.container-left.left1{
			height: 240rpx;
		}
		.con-item1{
			height: 240rpx;
			// background-color: beige;
			width: 90rpx;
			border-radius: 10rpx;
			margin-right: 7rpx;
			// flex-shrink: 0;
			font-size: 27rpx;
			color: #fff;
			box-sizing: border-box;
			padding: 10rpx;
			line-height: 28rpx;
		}
		
		// 左侧时间公共布局
		.container-left{
			// background-color: #888888;
			border-radius: 10rpx;
			height: 420rpx;
			background-color: #fff;
			width: 90rpx;
			margin-right: 10rpx;
			box-sizing: border-box;
			padding: 20rpx 0;
			font-size: 24rpx;
			color: #7e7a7a;
			.center-column{
				margin-top: 40rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			.con-title{
				font-weight: bold;
				margin-bottom: 6rpx;
				color: #333;
				font-size: 27rpx;
			}
		}
		.uni-p-b-98{
			height: 130rpx;
		}
	}
</style>