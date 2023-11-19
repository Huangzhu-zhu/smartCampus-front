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
				<uni-forms :modelValue="data"> 
					<view class="sAccount">
						<uni-easyinput  v-model="data.sAccount" placeholder="学号" />
					</view>
					
					<view class="sPassword">
						<uni-easyinput type="password" v-model="data.sPassword" placeholder="密码" />
					</view>
					
				</uni-forms>
			</view>
			
			<!-- 教师登录 -->
			<view class="teacher" v-if="data.current === 1">
				<!-- 表格输入工号，密码 -->
				<uni-forms :modelValue="data" > 
					<view class="tAccount">
						<uni-easyinput  v-model="data.tAccount" placeholder="工号" />
					</view>
					
					<view class="tPassword">
						<uni-easyinput type="password" v-model="data.tPassword" placeholder="密码"/>
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
	import { reactive } from 'vue';
	
	// 还没有做表单校验
	
	
	const data = reactive({
		items:['学生登录','管理员登录'],
		current:0,  //当前选中的tab索引值，从0计数
		styleType:'text',
		activeColor:'#3B8CD7',
		sAccount:"",
		sPassword:"",
		tAccount:"",
		tPassword:""
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
	const intoMainpage = (e) =>{
		console.log("学号:" + data.sAccount,"密码:"+data.sPassword);
		// 关闭当前页跳转到 主界面，非tabbar页面
		uni.navigateTo({
			url:"/pages/index/mainPage"
		})
	}
</script>

<style lang="scss">
	.container{
		position: relative;  //父元素使用相对定位（相对于原来的位置变化），子元素使用绝对定位
		width: 100%;
		height: 100%;
		// 顶部图片布局
		image{
			width: 300px;
			height: 300px;
			justify-content: center;
			position: absolute;
			left: 50%;
			transform: translate(-50%,0);
			border-radius: 50%;
			margin-top: 10px;
		}
		
		// 选项卡布局
		.segment{
			position: absolute;
			width: 350px;
			left: 50%;
			transform: translate(-50%,0);
			top: 45%;
		}
		// 选项卡具体内容布局
		.content{
			position: absolute;
			width: 300px;
			height: 140px;
			left: 50%;
			transform: translate(-50%,0);
			top: 55%;
			.sAccount,.tAccount{
				margin-bottom: 20px;
			}
		}
		// 登录按钮
		.btn{
			display: flex;
			justify-content: center;
			position: absolute;
			left: 50%;  //距左边50%
			top: 80%;   //距顶部80%
			transform: translate(-50%,0);  //x轴移动-50%
			button{
				width: 150px;
				height: 50px;
				background-color: #2DBE73;
				color: #fff;
				letter-spacing: 5px;  //字间距
				border: none;
			}
		}
	}
</style>