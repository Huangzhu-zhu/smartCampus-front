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
		
		<view >
			<view>
				<uni-table border stripe >
					<uni-tr>
						<uni-th width="50" align="center" class="t">ISBN</uni-th>
						<uni-th width="100" align="center">借入/还书</uni-th>
						<uni-th width="140" align="center">日期</uni-th>
					</uni-tr>
					<uni-tr v-for="(item,index) in data" :key="index">
						<uni-td>{{item.money}}</uni-td>
						<uni-td>{{item.type}}</uni-td>
						<uni-td>{{item.date}}</uni-td>
					</uni-tr>
					
				</uni-table>
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
					money: 114514,
					type: '借入',
					date: '2023-04-23'
				}, {
					money: 46584,
					type: '还书',
					date: '2023-04-23'
				}, {
					money: 5772,
					type: '借入',
					date: '2023-04-23'
				}, {
					money: 4757672,
					type: '借入',
					date: '2023-04-23'
				}, {
					money: 70576786,
					type: '充值',
					date: '2023-04-23'
				}, ]
			}
		}
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
		.thead {
			display: flex;
			align-items: center;
			// border: 1px solid #CCCCCC;
			// border-radius: 10px;
			height: 100rpx;
			width: 100%;
			background-color: #ffffff;
			.la {
				border: 1px solid #CCCCCC;
				background-color: #fff;
				flex: 1;
			}
			.lb {
				border: 1px solid #CCCCCC;
				background-color: #fff;
				flex: 1;
			}
			.lc {
				flex: 2;
				border: 1px solid #CCCCCC;
				background-color: #fff;
			}
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
	}
</style>