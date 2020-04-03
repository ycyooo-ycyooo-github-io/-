<template>
	<div class="total-wrap" :style="{marginTop: isMainNode?'22rpx':'6rpx'}">
		<div class="node-container">
			<div class="node-container-left">
				<div class="tag-container">
					<img v-if="isMainNode" :src="nodeIconUrl" />
					<div v-else class="node-tag-container">
						<div class="node-tag"></div>
					</div>
				</div>
				<div class="line-container" :style="{height: isMainNode?'142rpx':'88rpx', paddingTop: isMainNode?'22rpx':'8rpx'}">
					<div v-if="!isFirst" class="line" :style="{height: isMainNode?'120rpx':'80rpx'}"></div>
				</div>
			</div>
			<div class="node-container-right" :style="{paddingTop: isMainNode?'0':'8rpx'}">
				<div v-if="isMainNode" class="node-title" :style="{color: isNewest?'#222':'#999'}">{{nodeData.statusName}}</div>
				<div class="node-desc" :style="{color: isNewest?'#4b4b4b':'#999', marginTop: isMainNode?'10rpx':'0'}">{{nodeData.AcceptStation}}</div>
				<!-- <div v-if="nodeData.phone" class="node-phone">{{nodeData.phone}}</div> -->
				<div class="node-time">{{nodeData.AcceptTime}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			isNewest: {
				type: Boolean,
				default: false
			},
			isFirst: {
				type: Boolean,
				default: false
			},
			isMainNode: {
				type: Boolean,
				default: false
			},
			nodeData: {
				type: Object,
				default () {
					return {
						status: '',
						statusName: '',
						AcceptTime: '2019-01-01 00:00:00',
						AcceptStation: 'xxxxxx'
					}
				}
			}
		},
		computed: {
			nodeIconUrl() {
				if (this.nodeData.status === '0') { // 暂无物流
					return this.isNewest ? '/static/img/images/ic-order-commit.png' : '/static/img/images/ic-order-commit-G.png'
				} else if (this.nodeData.status === '1') { // 已发货
					return this.isNewest ? '/static/img/images/ic-pacakaging.png' : '/static/img/images/ic-pacakaging-G.png'
				} else if (this.nodeData.status === '2') { // 运输中
					return this.isNewest ? '/static/img/images/ic-sending.png' : '/static/img/images/ic-sending-G.png'
				} else if (this.nodeData.status === '3') { // 已完成
					return this.isNewest ? '/static/img/images/ic-delivering.png' : '/static/img/images/ic-delivering-G.png'
				}
			},
			AcceptStationFixed() {
				if (!this.nodeData.AcceptStation) return ''
				return this.nodeData.AcceptStation.replace(/(\d{3})\d{4}(\d{4})/, '')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.total-wrap {
		margin-top: 22rpx;
		width: 100%;

		.node-container {
			width: 100%;
			height: auto;
			display: flex;

			&-left {
				width: 44rpx;
				height: auto;

				.tag-container {
					width: 44rpx;
					height: 44rpx;

					img {
						width: 44rpx;
						height: 44rpx;
					}

					.node-tag-container {
						width: 44rpx;
						height: 44rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						.node-tag {
							width: 14rpx;
							height: 14rpx;
							background-color: #dcdcdc;
							border-radius: 50%;
						}
					}
				}

				.line-container {
					box-sizing: border-box;
					width: 44rpx;
					display: flex;
					align-items: center;
					justify-content: center;

					.line {
						width: 2rpx;
						background-color: #dcdcdc;
					}
				}
			}

			&-right {
				flex: 1;
				box-sizing: border-box;
				padding: 0 10rpx 0 24rpx;

				.node-title {
					width: 100%;
					height: 40rpx;
					line-height: 44rpx;
					color: #222;
					font-size: 28rpx;
					font-family: 'PingFangSC-Medium';
				}

				.node-desc {
					margin-top: 16rpx;
					width: 100%;
					min-height: 30rpx;
					line-height: 30rpx;
					color: #222;
					font-size: 24rpx;
					font-family: 'PingFangSC-Regular';
					word-wrap: break-word;
					word-break: normal;
				}

				.node-phone {
					margin-top: 8rpx;
					width: 100%;
					height: 26rpx;
					line-height: 26rpx;
					color: #FE4E2C;
					font-size: 26rpx;
					font-family: 'Avenir-Medium';
				}

				.node-time {
					margin-top: 12rpx;
					width: 100%;
					height: 34rpx;
					line-height: 34rpx;
					color: #999;
					font-size: 24rpx;
					font-family: 'Avenir-Book';
				}
			}
		}
	}
</style>
