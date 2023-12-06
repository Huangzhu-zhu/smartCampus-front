<template>
	<view class="container">
		<!-- 图片 -->
		<image mode="aspectFit" src="@/static/pictures/login.png"
		    @error="imageError"></image>
		
		<!-- tab选项卡  用户选择学生/教师登录 -->
		<view class="segment">
			<uni-segmented-control :current="data.current" :values="data.items" :style-type="data.styleType"
				:active-color="data.activeColor" @clickItem="onClickItem" />
		</view>
		
		<view class="content">
			<!-- 学生登录 -->
			<view class="student" v-if="data.current === 0">
				<!-- 表格输入学号，密码 -->
				<uni-forms :model="data" :rules="rules" validateTrigger="blur"> 
					<view class="sAccount">
						<uni-forms-item name="sAccount" >
						<uni-easyinput  v-model="data.sAccount" placeholder="学号" />
						</uni-forms-item>
					</view>
					
					<view class="sPassword">
						<uni-forms-item name="sPassword">
						<uni-easyinput type="password" v-model="data.sPassword" placeholder="密码" />
						</uni-forms-item>
					</view>
					
				</uni-forms>
			</view>
			
			<!-- 教师登录 -->
			<view class="teacher" v-if="data.current === 1">
				<!-- 表格输入工号，密码 -->
				<uni-forms :modelValue="data"  :rules="rules" validateTrigger="blur"> 
					<view class="tAccount">
						<uni-forms-item name="tAccount">
						<uni-easyinput  v-model="data.tAccount" placeholder="工号" />
						</uni-forms-item>
					</view>
					
					<view class="tPassword">
						<uni-forms-item name="tPassword">
						<uni-easyinput type="password" v-model="data.tPassword" placeholder="密码"/>
						</uni-forms-item>
					</view>
			
				</uni-forms>
			</view>
		</view>
		
		<!-- 登录按钮 -->
		<view class="btn">
			<button plain="true" @click="intoMainpage">登录</button>
		</view>
	</view>
</template>

<script setup>
	import { reactive,ref } from 'vue';
	import store from "@/store/index.js"
	
	// 还没有做表单校验
	
	const form1 = ref(null);
	const data = reactive({
		items:['学生登录','管理员登录'],
		current:0,  //当前选中的tab索引值，从0计数
		styleType:'text',
		activeColor:'#3B8CD7',
		sAccount:"",
		sPassword:"",
		tAccount:"",
		tPassword:"",
	})
	
	const rules = reactive({
		sAccount:{
			rules:[{
				required:true,
				errorMessage:'请输入学号',
			},
			{
				pattern:'/[0-9]+/',
				errorMessage:'请输入数字'
			}]
		},
		sPassword:{
			rules:[{
				required:true,
				errorMessage:'请输入密码'
			}]
		},
		tAccount:{
			rules:[{
				required:true,
				errorMessage:'请输入工号',
			},
			{
				pattern:'/[0-9]+/',
				errorMessage:'请输入数字'
			}]
		},
		tPassword:{
			rules:[{
				required:true,
				errorMessage:'请输入密码'
			}]
		}
	})
	
	//切换tab选项卡
	const onClickItem = (e) => {
		if (data.current !== e.currentIndex) {
			data.current = e.currentIndex
		}
	}
	// 图片出错
	const imageError = (e) => {
	        console.error('image发生error事件，携带值为' + e.detail.errMsg)
	    }
	// 点击按钮跳转
	const intoMainpage = (res) =>{
		// 如果是学生账号关闭当前页跳转到 主界面，非tabbar页面
		if(data.current === 0)
		{
			console.log("学号:" + data.sAccount,"密码:"+data.sPassword);
			uni.redirectTo({
				url:"/pages/index/mainPage"
			})
		}else{
			console.log("工号:" + data.tAccount,"密码:"+data.tPassword);
			// 是管理员账号则跳转到审核界面
			uni.redirectTo({
				url:"/pages/manager/vetting"
			})
		}
		
	}
</script>

<style lang="scss" scoped>
	.container{
		position: relative;  //父元素使用相对定位（相对于原来的位置变化），子元素使用绝对定位
		width: 100%;
		height: 100%;
		// 顶部图片布局
		image{
			width: 550rpx;
			height: 550rpx;
			justify-content: center;
			position: absolute;
			left: 50%;
			transform: translate(-50%,0);
			border-radius: 50%;
			margin-top: 20rpx;
		}
		
		// 选项卡布局
		.segment{
			position: absolute;
			width: 650rpx;
			left: 50%;
			transform: translate(-50%,0);
			top: 600rpx;
		}
		// 选项卡具体内容布局
		.content{
			// background-color: #2DBE73;
			position: absolute;
			width: 550rpx;
			height: 240rpx;
			left: 50%;
			transform: translate(-50%,0);
			top: 760rpx;
			.sAccount,.tAccount{
				margin-bottom: 40rpx;
			}
		}
		// 登录按钮
		.btn{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			position: absolute;
			left: 50%;  //距左边50%
			top: 1050rpx;   //距顶部80%
			transform: translate(-50%,0);  //x轴移动-50%
			button{
				width: 300rpx;
				height: 100rpx;
				background-color: #2DBE73;
				color: #fff;
				letter-spacing: 5rpx;  //字间距
				border: none;
			}
		}
	}
</style>