<template>
	<view class="schoolCardDeal">
		<view class="date">
			<text class="a">开始日期</text>
			<view class="b">{{date.startDate}}</view>
			<uni-datetime-picker class="c" type="timestamp" v-model="date.startDate" placeholder="开始时间"
				:clearable="false">
				<template>
					<image :src="src" style="width: 40rpx; height: 40rpx;padding-left: 40rpx;"></image>
				</template>
			</uni-datetime-picker>
		</view>
		<view class="date" style="margin-top: 5rpx;">
			<text class="a">结束日期</text>
			<view class="b">{{date.startDate}}</view>
			<uni-datetime-picker class="c" type="timestamp" v-model="date.startDate" placeholder="开始时间"
				:clearable="false">
				<template>
					<image :src="src" style="width: 40rpx; height: 40rpx;padding-left: 40rpx;"></image>
				</template>
			</uni-datetime-picker>
		</view>
		<view class="search">
			<text style="flex: 1;"></text>
			<image :src="searchSrc" style="width: 50rpx; height: 50rpx; margin-right: 40rpx;" @click="getData"></image>
		</view>


		<view class="container">
			<view class="list">
				<uni-table border stripe ref="myTable">
					<uni-tr>
						<uni-th width="50" align="center" class="t">金额</uni-th>
						<uni-th width="100" align="center">交易类型</uni-th>
						<uni-th width="140" align="center">交易日期</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td>{{item.money}}</uni-td>
						<uni-td>{{item.type}}</uni-td>
						<uni-td>{{item.date}}</uni-td>
					</uni-tr>

				</uni-table>
			</view>
			<uv-qrcode value="23" size="300rpx"></uv-qrcode>
			<view class="bottom" ref="bottomText">
				<text>充值</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: {
					startDate: '',
					endDate: ''
				},
				src: '../../static/ljc/calendar.png',
				searchSrc: '../../static/ljc/search.png',
				data: []
			}
		},

		methods: {
			getData() {
				this.data = [{
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, {
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, {
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, {
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, {
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, {
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, {
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, {
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, {
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, {
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, {
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, {
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, {
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, {
					money: 23,
					type: '充值',
					date: '2023-04-23'
				}, ]
				this.$nextTick(this.adjustBottomTextPosition);
			},


		},
	}
</script>

<style lang="scss" scoped>
	.schoolCardDeal {
		margin: 50rpx 40rpx;

		.date {
			display: flex;
			align-items: center;
			border: 1px solid #CCCCCC;
			border-radius: 10px;
			height: 90rpx;
			width: 100%;
			background-color: #ffffff;
			// padding-left: 25rpx;

			.a {
				flex: 1;
				text-align: center;
			}

			.b {
				flex: 2;
			}

			.c {
				flex: 1;
			}

			::v-deep .uni-date {
				width: 10%;
			}

			::v-deep .uni-date__icon-clear {
				display: none;
			}

			::v-deep .uni-date-x--border {
				border: 0;
			}

			::v-deep .uni-date__x-input {
				display: none;
			}
		}

		.search {
			height: 100rpx;
			width: 100%;
			align-items: center;
			display: flex;
		}

		::v-deep .uni-table {
			border: 1px solid #CCCCCC;
			border-radius: 10px;
		}

		::v-deep .uni-table-scroll {
			border: 0;
		}

		::v-deep .uni-table-loading {
			display: none;
		}

		::v-deep .uni-table-th {
			font-weight: normal;
			color: #000000;
		}

		.container {
			display: flex;
			flex-direction: column;
			// height: 50vh;

			/* Ensure the container takes full height of the viewport */
			::v-deep .uni-table-scroll {
				flex: 1;
			}

			.bottom {
				// display: block;
				margin: 10rpx 60rpx 0 10rpx;
				height: 50rpx;
				padding: 10px;	
				/* Adjust padding as needed */
				position: fixed;
				bottom: 0;
				right: 0;
				margin: 20px;
				flex: 1;
				color: #1D1717;
				text-decoration: underline;
				text-decoration-thickness: 1px;
			}

			.list {
				display: block;
				height: 700rpx;
				// background-color: aquamarine;

				flex: 1;
			}
		}

	}
</style>