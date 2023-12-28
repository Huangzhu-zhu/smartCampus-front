<!-- 电费充值 -->
<template>
	<view class="content">
		<!-- <view > -->
		<view class="input">
			<uni-forms :model-value="eleFrom">
				<uni-forms-item name="num" label="宿舍号" labelWidth=50>
					<uni-easyinput type="text" v-model="eleFrom.num" :styles="{ backgroundColor: '#fff',  }" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="money">
			<button v-for="(item,index) in buttons" class="btn" :key="index" @click="selectButton(index,item)"
				:class="{ 'btn-selected': selectedIndex === index }">
				{{item}}
			</button>
			<view class="define">
				<uni-forms :model-value="eleFrom" ref="f" :rules="rules" validate-trigger="bind">
					<uni-forms-item prop="defValue" name="money">
						<uni-easyinput :placeholder="placeholderText" :styles="{ backgroundColor: '#EFE4E44F' }"
							@focus="handleFocus" @blur="handleBlur" :value="defValue" :clearable="false"
							:primaryColor="'#07C160'" @input="handleInput"></uni-easyinput>
					</uni-forms-item>
				</uni-forms>
			</view>
		</view>
		<view>
			<button class="payBtn" @click="pay">支付</button>
		</view>




		<uni-popup ref="popup" type="message">
			<uni-popup-message :type="popType" :message="popMessage" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref='payPop'>
			<uni-card title="" :is-full="true" class="payPop">
				<view class="top">
					<image :src="cancelSrc" style="width:40rpx; height:40rpx" @click="closePayPop"></image>
				</view>
				<view class="msg">电费充值</view>
				<view class="money"><text style="color: black;">￥{{eleFrom.money}}</text></view>
				<view class="method"><text>付款方式</text><text>零钱</text></view>
				<view class="bottom"><button class="payBtn" @click="payPop">支付</button></view>
			</uni-card>
		</uni-popup>
	</view>
	<!-- </view> -->
</template>

<script>
	import {
		useUserStore
	} from '@/store/user.js'
	import {
		getIp
	} from '@/store/ip.js'
	import {
		mapState,
		mapStores
	} from 'pinia';
	import api from '@/api/api.js'
	import {
		formatMoney
	} from '../../utils/CommonUtils';
	const ip = getIp()
	export default {
		data() {
			return {
				// ip: 'http://120.46.222.199',
				eleFrom: {
					num: '',
					money: ''
				},
				buttons: [
					'10元',
					'20元',
					'50元',
					'100元'
				],
				selectedIndex: -1,
				placeholderText: '自定义',
				defValue: '',
				rules: {
					money: {
						rules: [{
							minimum: 0.01,
							maximum: 1001,
							errorMessage: '最小金额为0.01元'
						}]
					}
				},
				validRes: false,
				popMessage: "",
				popType: '',
				cancelSrc: "../../static/ljc/cancel.png"
			}
		},
		computed: {
			...mapStores(useUserStore),
			...mapState(useUserStore, ['id', 'token'])
		},
		methods: {
			selectButton(index, item) {
				this.selectedIndex = index;
				const price = parseFloat(item.match(/\d+/)[0], 10);
				this.eleFrom.money = price;
			},
			handleFocus() {
				// 输入框获得焦点时,清空 placeholder 文本
				this.placeholderText = '';
				this.selectedIndex = -1;
				this.eleFrom.money = parseFloat(this.defValue) || 0;
				console.log(parseFloat('fs'))
			},
			handleBlur() {
				// 输入框失去焦点时
				if (this.defValue === '') {
					// 如果输入内容为空,恢复初始 placeholder 文本
					this.placeholderText = '自定义';
					this.$refs.f.clearValidate('money');
					console.log('为空清空clear')
				} else if (isNaN(parseFloat(this.defValue))) {
					this.defValue = ''
					this.placeholderText = '自定义';
					console.log('字符串清空clear')
					this.$refs.f.clearValidate('money');
				}
			},
			handleInput(value) {
				// 输入框输入时触发,更新输入框的值
				this.defValue = value;
				this.eleFrom.money = parseFloat(value) || 0;
				// this.check(value)
			},
			pay() {
				if (this.eleFrom.num === '') {
					this.open("error", "请补充宿舍信息")
				} else if (this.eleFrom.money === 0 || this.eleFrom.money === '') {
					this.open("error", "请给出充值金额")
				} else {
					this.check()
				}
				console.log(this.eleFrom);
			},
			payPop() {
				const data = {
					studentId: this.id,
					dormitoryId: parseInt(this.eleFrom.num),
					amount: parseFloat(this.eleFrom.money).toFixed(2)
				}
				console.log("数据为：", data)
				uni.request({
					url: ip + '/api/student/electricity/recharge',
					data: data,
					method: 'POST',
					header: {
						token: this.token
					},
				}).then(res => {
					console.log('res', res)
					this.open("success", "充值成功")
					this.closePayPop()
					setTimeout(() => {
						uni.$emit('data-fresh', {
							fresh: true
						})
					}, 1000)
				}).catch(err => {
					console.log(err.data)
				})
			},
			open(type, message) {
				this.popType = type
				this.popMessage = message
				this.$refs.popup.open()
			},
			closePayPop() {
				this.$refs.payPop.close()
			},
			check() {
				if (parseInt(this.eleFrom.num)) { //检验宿舍号是否为数字
					uni.request({ //查询该宿舍是否存在
						url: ip + '/api/student/getDormitory',
						data: {
							dormitoryId: parseInt(this.eleFrom.num)
						},
						method: 'GET',
						header: {
							token: this.token
						},
						success: (res) => {
							// console.log(res.data)
							if (res.data.code === 0) { //宿舍不存在
								this.open("error", "请给出正确的宿舍号")
							} else { //宿舍存在，校验输入的金额
								this.$refs.f.validate().then((res) => {
									// 成功返回，res 为对应表单数据
									this.$refs.payPop.open('bottom')
									console.log('表单数据信息：', res);

								}).catch((err) => {
									// 表单校验验失败，err 为具体错误信息
									this.open("error", "最小金额为0.001元，请重新给出金额")
									console.log('数据： ', this.eleFrom, '\n表单错误信息：', err);
								})
							}
						},
						fail: (res) => {
							console.log(res.data)
						}
					})
				} else {
					this.open("error", "请给出正确的宿舍号")
				}
			}
		}


	}
</script>

<style lang="scss" scoped>
	.content {
		margin: 250rpx 40rpx;

		.input {
			::v-deep .uni-forms-item {
				display: flex;
				align-items: center;
				height: 120rpx;
				border-radius: 10px;
				background-color: #fff;
				border: #000000 1px solid;
			}

			::v-deep .uni-forms-item__label {
				padding-left: 24rpx;
				font-weight: 550;
				color: #000000;
			}

			::v-deep .uni-forms-item__content {
				margin-right: 20rpx;
			}

			::v-deep .uni-easyinput__content-input {
				height: 120rpx;
			}

			::v-deep .is-input-border {
				border: none;
			}
		}

		.money {
			margin-top: 200rpx;

			.define {
				display: inline-block;
				vertical-align: top;
				width: 200rpx;
				height: 120rpx;
				background-color: #EFE4E44F;
				margin: 10rpx;
				padding: 0;

				::v-deep .uni-easyinput {
					width: 200rpx;
					background-color: #EFE4E44F;
				}

				::v-deep .uni-easyinput__content {
					// display: inline-block;
					background-color: #EFE4E44F;
					height: 120rpx;
					padding: 0;
					/* 可能有默认的内边距 */
					margin: 0;
					/* 可能有默认的外边距 */
				}

				::v-deep .uni-easyinput__placeholder-class {
					color: #000000; //字体颜色
					font-size: 18px;
					text-align: center;
					justify-content: center;
				}

				.uni-easyinput__container {
					padding: 0;
					/* 可能有默认的内边距 */
					margin: 0;
					/* 可能有默认的外边距 */
				}
			}
		}

		.btn {
			display: inline-block;
			width: 200rpx;
			height: 120rpx;
			background-color: #EFE4E44F;
			margin: 10rpx;
			// border: 1rpx solid #07C160;
			padding: 0;
			justify-content: center;
		}

		.btn::after {
			border: none;
		}

		.btn-selected {
			border: 1rpx solid #07C160;
		}

		.payBtn {
			width: 240rpx;
			margin-top: 90rpx;
			color: white;
			background-color: #07C160;
		}

		.payPop {
			.top {
				margin-top: 10rpx;
				margin-bottom: 15rpx;
			}

			.msg {
				text-align: center;
			}

			.money {
				display: flex;
				height: 80rpx;
				margin: 0;
				align-items: center;
				justify-content: center;
				font-size: 60rpx;
			}

			.method {
				display: flex;
				height: 80rpx;
				align-items: center;
				justify-content: space-between;
				// background-color: #07C160;
				margin-top: 10rpx;
				border-top: #f1f1f1 1px solid;
			}

			.bottom {
				// height: 220rpx;
				// background-color: #EFE4E44F;
			}

			::v-deep .uni-card {
				height: 550rpx;
			}

			::v-deep .uni-card--full {
				border-radius: 20rpx 20rpx 0 0;
			}
		}
	}
</style>