<!-- 报修界面 -->
<template>
	<view class="repair">

		<view class="a">
			<uni-forms :modelValue="form">
				<uni-forms-item label="报修类型" labelWidth=50>
					<uni-easyinput :styles="{backgroundColor: '#EEEEEE'}" :clearable="false"
						v-model="form.type"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="报修器物" labelWidth="70">
					<uni-easyinput :styles="{backgroundColor: '#EEEEEE'}" :clearable="false"
						v-model="form.object"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="手机号" labelWidth="70">
					<uni-easyinput :styles="{backgroundColor: '#EEEEEE'}" :clearable="false"
						v-model="form.phone"></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
		</view>

		<view class="b">
			<uni-forms :modelValue="form">
				<uni-forms-item label="报修描述" labelWidth="70">
					<uni-easyinput type="textarea" :styles="{backgroundColor: '#EEEEEE'}" :clearable="false"
						:maxlength="-1" v-model="form.describe" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<button class="payBtn" @click="check">提交</button>

		<uni-popup ref="popup" type="message">
			<uni-popup-message :type="popType" :message="popMessage" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getIp
	} from '@/store/ip.js'
	import {
		useUserStore
	} from '@/store/user.js'
	import {
		mapStores,
		mapState
	} from 'pinia'
	const ip = getIp()
	export default {
		data() {
			return {
				form: {
					type: '',
					object: '',
					phone: '',
					describe: ''
				},
				popMessage: "",
				popType: '',

			}
		},
		computed: {
			...mapStores(useUserStore),
			...mapState(useUserStore, ['id', 'dormitoryId','token'])
		},
		methods: {
			check() {
				const phoneRegex = /^\d{11}$/;
				if (this.form.type === '' || this.form.object === '' || this.form.phone === '' || this.form.describe ===
					'') {
					this.open("error", "请补充报修信息")
				} else if (!phoneRegex.test(this.form.phone)) {
					this.open("error", "电话号码不正确，请重新填写 ")
				} else {
					this.request()
				}
			},
			open(type, message) {
				this.popType = type
				this.popMessage = message
				this.$refs.popup.open()
			},
			request() {
				const data = {
					studentId: this.id,
					dormitoryId: this.dormitoryId,
					repairType: 1,
					phone: parseInt(this.form.phone),
					description: this.form.describe
					// studentId: 2,
					// dormitoryId: 212,
					// repairType: 1,
					// phone: 14749392558,
					// description: "description"
				};
				uni.request({
					url: ip + '/api/student/dormitoryRepair',
					data: data,
					method: 'POST',
					header:{
						token:this.token
					},
					success: (res) => {
						if(res.data.code === 1) {
							this.open("success","提交成功")
							uni.redirectTo({
								// url: '/pages/index/curriculum'
							})
						}
					}
				});
			}
		},

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

			::v-deep uni-easyinput__content {}

			::v-deep .uni-easyinput {}

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