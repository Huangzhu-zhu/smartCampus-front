<template>
	<view class="eleRecharge">
		<view class="query">
			<uni-forms :model-value="form">
				<uni-forms-item name="dormitoryId">
					<uni-easyinput v-model="form.dormitoryId" placeholder="宿舍号"
						:styles="{ borderColor: '#444444', backgroundColor: '#fff', }" />
				</uni-forms-item>
			</uni-forms>
			<button class="btn" @click="quest">查询</button>
		</view>

		<view class="list">
			<uni-table border stripe emptyText="">
				<uni-tr>
					<uni-th width="120" align="center">日期</uni-th>
					<uni-th width="120" align="center">充值额度</uni-th>
				</uni-tr>
				<uni-tr v-for="(item,index) in data" :key="index">
					<uni-td>
						{{item.date}}
					</uni-td>
					<uni-td>{{item.eletricity}}</uni-td>
				</uni-tr>
			</uni-table>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					dormitoryId: ''
				},
				data: []
			}
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.eleRecharge {
		margin: 40rpx 40rpx;

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