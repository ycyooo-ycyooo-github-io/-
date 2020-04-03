<template>
	<view class="total-wrap">
		<view class="header">
			<view class="logistics-title">{{ShipperCode}}:{{LogisticCode}}</view>
		</view>
		<view class="place">

		</view>
		<view class="list" v-if="tracesData.length>0">
			<block v-for="(item, index) in tracesData" :key="index">
				<trackNode :is-first="index===tracesData.length-1" :is-newest="index===0" :is-main-node="item.isMainNode"
				 :node-data="item"></trackNode>
			</block>
		</view>
		<view class="" v-else style="text-align: center;">
			暂无物流信息！
		</view>
	</view>
</template>

<script>
	import trackNode from '../../components/trackNode.vue'
	export default {
		components: {
			trackNode
		},
		data() {
			return {
				ShipperCode: '',
				LogisticCode: '',
				tracesData: [],
			}
		},
		onLoad(option) {
			this.getlogistic(option)
		},
		onShow() {

		},
		methods: {
			getlogistic(option) {
				console.log(option);
				let data = {
					id: option.id
				};
				this.$xm.post('/Index/getordership', data, (res) => {
					this.LogisticCode = res.LogisticCode;
					this.ShipperCode = res.order_ship;
					res.Traces.forEach(ele => {
						ele.status = res.State;
						switch (ele.status) {
							case '0':
								ele.statusName = '暂无物流信息'
								ele.isMainNode = false;
								break;
							case '1':
								ele.statusName = '已发货'
								ele.isMainNode = true;
								break;
							case '2':
								ele.statusName = '运输中'
								ele.isMainNode = true;
								break;
							case '3':
								ele.statusName = '已签收'
								ele.isMainNode = true;
								break;
							case '4':
								ele.statusName = '问题件'
								ele.isMainNode = false;
								break;
							default:
						}
					})
					this.tracesData = res.Traces.reverse();
					console.log(this.tracesData)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.total-wrap {
		width: 100%;
		margin: auto;

		.header {
			// height: 80rpx;
			// line-height: 80rpx;
			background-image: linear-gradient(135deg, #f795a2 10%, #FD6585 100%);
			color: white;
			width: 100%;
			font-size: 30rpx;
			text-align: left;
			margin-bottom: 30rpx;
			position: fixed;

			.logistics-title {
				padding: 30rpx;
			}
		}

		.place {
			width: 100%;
			height: 130rpx;
		}

		.list {
			border: 1px solid #EEEEEE;
			border-radius: 20rpx;
			width: 88%;
			margin: auto;
			padding: 20rpx;
			margin-bottom: 60rpx;
		}

	}
</style>
