<template>
	<view class="eleRecharge">
		<view class="query">
			<uni-forms :model-value="form">
				<uni-forms-item name="dormitoryId">
					<uni-easyinput v-model="form.dormitoryId" placeholder="宿舍号"
						:styles="{ borderColor: '#444444', backgroundColor: '#fff', }" />
				</uni-forms-item>
			</uni-forms>
			<button class="btn" @click="query">查询</button>
		</view>

		<view class="list">
			<uni-table border stripe emptyText="">
				<uni-tr>
					<uni-th width="120" align="center">日期</uni-th>
					<uni-th width="120" align="center">充值额度</uni-th>
				</uni-tr>
				<uni-tr v-for="(item,index) in data" :key="index">
					<uni-td>
						{{formatDateString(item.date)}}
					</uni-td>
					<uni-td>{{item.amount}}</uni-td>
				</uni-tr>
			</uni-table>

		</view>


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
		mapState,
		mapStores
	} from 'pinia'
	const ip = getIp();
	export default {
		data() {
			return {
				form: {
					dormitoryId: ''
				},
				data: [],
				popMessage: "",
				popType: '',
			}
		},
		computed: {
			...mapStores(useUserStore),
			...mapState(useUserStore,['token'])
		},
		methods: {
			quest() {
				this.data = [{
						date: '2023-11-21',
						eletricity: 407.84
					},
					{
						date: '2023-11-22',
						eletricity: 401.28
					},
					{
						date: '2023-11-23',
						eletricity: 395.65
					},
					{
						date: '2023-11-23',
						eletricity: 395.65
					},
					{
						date: '2023-11-23',
						eletricity: 395.65
					},
					{
						date: '2023-11-23',
						eletricity: 395.65
					},
					{
						date: '2023-11-23',
						eletricity: 395.65
					},
					{
						date: '2023-11-23',
						eletricity: 395.65
					},
					{
						date: '2023-11-23',
						eletricity: 395.65
					},
					{
						date: '2023-11-23',
						eletricity: 395.65
					},
					{
						date: '2023-11-23',
						eletricity: 395.65
					},
					{
						date: '2023-11-23',
						eletricity: 395.65
					},
					{
						date: '2023-11-23',
						eletricity: 395.65
					}
				]
			},
			query() {
				if (parseInt(this.form.dormitoryId)) {
					this.checkDno().then((res) => {
						if (res === 1) {
							this.eleRequest();
						} else {
							this.open("error", "请输入正确的宿舍号");
						}
					})

				} else {
					this.open("error", "请输入正确的宿舍号");
				}
			},
			eleRequest() {
				uni.request({
					url: ip + '/api/student/electricity/recharge/history',
					data: {
						dormitoryId: parseInt(this.form.dormitoryId)
					},
					header:{
						token:this.token
					},
					success: (res) => {
						console.log(res.data)
						// this.data = res.data
						if (res.data.code === 1) {
							// this.quest()
							this.data = res.data.data
							console.log("data is ", this.data.data)
						}
					}
				})
			},
			open(type, message) {
				this.popType = type
				this.popMessage = message
				this.$refs.popup.open()
			},
			formatDateString(dateString) {
				const date = new Date(dateString);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');

				return `${year}-${month}-${day}`
			},
			checkDno() {
				return new Promise((resolve, reject) => {
					uni.request({
						url: ip + '/api/student/getDormitory',
						data: {
							dormitoryId: parseInt(this.form.dormitoryId)
						},
						header:{
							token:this.token
						},
						success: (res) => {
							// if (res.data.data === 0) {
							// 	resolve(0);
							// } else {	
							// 	resolve(0);
							// }
							resolve(res.data.code);
						},
						fail: (res) => {
							console.log(res.data);
							reject(-1);
						}
					});
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.eleRecharge {
		margin: 80rpx 40rpx;

		.query {


			display: flex;

			::v-deep .uni-easyinput__content-input {
				height: 120rpx;
			}

			::v-deep .uni-easyinput {
				width: 400rpx;
			}

			::v-deep .is-input-border {
				border-radius: 10px;
			}

			.btn {
				margin-top: 20rpx;
				display: inline-block;
				height: 100rpx;
				width: 220rpx;
				background-color: #F1EEEE;
				border: none;
			}

			.btn::after {
				border: none;
			}
		}

		.list {
			margin-right: 140rpx;
			padding-bottom: 50rpx;

			::v-deep .uni-table-loading {
				display: none;
			}

			::v-deep .uni-table-th {
				font-weight: normal;
				color: #000000;
			}
		}
	}
</style>