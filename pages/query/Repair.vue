<!-- 报修界面 -->
<template>
	<view class="repair">

		<view class="a">
			<uni-forms :modelValue="form">
				<uni-forms-item label="报修类型" labelWidth=50>
					<uni-easyinput :styles="{backgroundColor: '#EEEEEE'}" :clearable="false" v-model="form.type"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="报修器物" labelWidth="70">
					<uni-easyinput :styles="{backgroundColor: '#EEEEEE'}" :clearable="false" v-model="form.object"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="手机号" labelWidth="70">
					<uni-easyinput :styles="{backgroundColor: '#EEEEEE'}" :clearable="false" v-model="form.phone"></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
		</view>

		<view class="b">
			<uni-forms :modelValue="form">
				<uni-forms-item label="报修描述" labelWidth="70">
					<uni-easyinput type="textarea" :styles="{backgroundColor: '#EEEEEE'}" :clearable="false" :maxlength="-1" 
									v-model="form.describe"/>
				</uni-forms-item>
			</uni-forms>
		</view>
		<button class="payBtn">提交</button>

	</view>
</template>	

<script>
	export default {
		data() {
			return {
				form: {
					type: '',
					object: '',
					phone: '',
					describe: ''
				}
			}
		},
		methods: {

		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
<style lang="scss" scoped>
	.repair {
		margin: 100rpx 35rpx 0rpx 35rpx;
		height: 750rpx;

		.a {
			margin-right: 40rpx;

			::v-deep .uni-forms-item {
				display: flex;
				align-items: center;
				background-color: #EEEEEE;
				border-radius: 15px;
				height: 120rpx;
				// width: 500rpx;
			}

			::v-deep .uni-forms-item__label {
				font-family: Abhaya Libre ExtraBold;
				padding-left: 24rpx;
				font-weight: bold;
				color: #888888;
				// width: 50%;
			}

			::v-deep uni-easyinput__content {
				// width: 500rpx;
				// height: 550rpx;
			}

			::v-deep .uni-easyinput {
				// width: 50%;
			}

			::v-deep .uni-easyinput__content-input {
				// width: 500rpx;
			}

			::v-deep .is-input-border {
				border: none;
			}


		}

		.b {
			margin-right: 40rpx;
			
			::v-deep .uni-forms-item {
				display: flex;
				flex-direction: column;
				// align-items: center;
				background-color: #EEEEEE;
				border-radius: 15px;
				height: 25vh;
			}

			::v-deep .uni-forms-item__label {
				margin-top: 0rpx;
				font-family: Abhaya Libre ExtraBold;
				padding-left: 24rpx;
				font-weight: bold;
				color: #888888;
				// width: 50%;
			}

			::v-deep uni-easyinput__content {
			}

			::v-deep .uni-easyinput {
			}

			::v-deep .uni-easyinput__content-input {
				height: auto;
			}

			::v-deep .is-input-border {
				border: none;
			}
		}
		.payBtn {
			width: 240rpx;
			margin-top: 90rpx;
			color: white;
			background-color: #07C160;
		}
	}
</style>