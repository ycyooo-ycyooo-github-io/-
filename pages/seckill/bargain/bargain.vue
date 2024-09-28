<template>
	<view>
		<view class="group" style="padding-bottom: 50upx;" v-if="tabIndex==0">
			<view class="header">
				<image src="../../../static/img/banner.jpg" mode=""></image>
			</view>
			<view class="goods">
				<view v-for="(item, index) in goodsList" :key="index" class="goods-item" @tap="toCut(item)">
					<view class="left">
						<image :src="item.pro_img" mode=""></image>
					</view>
					<view class="right">
						<view class="info" style="height: 50%;">{{item.pro_name}}</view>
						<view class="tip">
							<view class="content">
								<!-- <text>{{item.bargain_num}}人砍</text> -->
								<text>包邮</text>
							</view>							
							<view class="" style="display: flex;justify-content: left;align-items: center;padding-right: 10rpx;" v-if="item.bargain_num<=3">
								<image src="../../../static/img/seckill/kj-on.png" mode=""></image>
								<text style="font-size: 26rpx;color: #E23438;" >超容易砍</text>
							</view>
						</view>
						<view class="bottom">							
							<view class="price">
								￥{{item.pro_price}}
							</view>
							<view class="bottomRight">								
								<view class="btn">
									砍至{{item.dis_price}}元拿
								</view>
							</view>

						</view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{ loadingText }}</view>
		</view>
		<view class="goods" v-else>
			<view v-for="(item, index) in bartainlist" :key="index" class="goods-item" v-if="bartainlist.length>0">
				<view class="left" @tap="toCut(item)">
					<image :src="item.pro_img" mode=""></image>
				</view>
				<view class="right">
					<view class="info" @tap="toCut(item)">{{item.pro_name}}</view>
					<view class="progress" v-if="item.etime>0 && item.pro_price-item.price_totle!=item.dis_price">
						<progress :percent="item.progress" activeColor="red" active stroke-width="15" border-radius="30" duration="10" />
					</view>

					<view class="bottom">
						<view class="" v-if="item.etime<=0">
							<view class="success" v-if="item.pro_price-item.price_totle==item.dis_price">
								<tui-icon name="circle-selected" color="#00E83A" size="20"></tui-icon>成功
							</view>
							<view class="error" v-else>
								<tui-icon name="about" color="#b2b2b2" size="20"></tui-icon>砍价失败
							</view>
						</view>
						<view class="etime" v-else>
							<view class="success" v-if="item.pro_price-item.price_totle==item.dis_price">
								<tui-icon name="circle-selected" color="#00E83A" size="20"></tui-icon>成功
							</view>
							<view v-else class="" style="display: flex;justify-content: left;align-items: center;">
								<tui-icon name="clock" color="#b2b2b2" size="16"></tui-icon>
								<tui-countdown :time="item.etime" bcolor="#fff" color='#b2b2b2'></tui-countdown>
								<text style="font-size: 22rpx;">后结束</text>
							</view>
						</view>

						<view class="bottomRight">
							<view class="btn" @tap="toUse(item)" v-if="item.pro_price-item.price_totle==item.dis_price">
								去使用
							</view>
							<view class="btn" @tap="toCut(item)" v-else>
								去看看
							</view>
						</view>

					</view>
				</view>
			</view>
			<view class="loading-text">暂无参与砍价的商品</view>
		</view>
		<view class="tabBar">
			<view class="tabBar-list">
				<view v-for="(item, index) in tabBar" :key="index" class="tabBar-item" @tap="tabChange(item.id)">
					<view class="icon">
						<image :src="tabIndex==item.id ? item.iconPath : item.icon" mode=""></image>
					</view>
					<view class="name" :class="tabIndex==item.id?'active':''">
						{{item.text}}
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import tuiCountdown from "@/components/countdown/countdown"
	import tuiIcon from "@/components/icon/icon"
	export default {
		components: {
			tuiIcon,
			tuiCountdown
		},
		data() {
			return {
				goodsList: [],
				loadingText: '正在加载中...',
				tabIndex: '0',
				tabBar: [{
						icon: '../../../static/img/seckill/cut.png',
						iconPath: "../../../static/img/seckill/cut-on.png",
						text: "砍价商品",
						id: '0'
					},
					{
						icon: '../../../static/img/seckill/my.png',
						iconPath: "../../../static/img/seckill/my-on.png",
						text: "我的砍价",
						id: '1'
					}
				],
				isSuccess: true,
				cutTime: '',
				bartainlist: []
			}
		},
		onLoad() {

		},
		onShow() {
			this.loadData()
			this.getbartainlist();
		},
		methods: {
			// 获取砍价商品
			loadData() {
				this.$xm.post('/bargain/getlist', "", res => {
					let list = res.list
					if (list) {
						list.forEach((ele) => {
							ele.pro_img = 'http://img.xmvogue.com/thumb/' + ele.pro_sn + '.jpg?x-oss-process=style/300';
							ele.dis_price = parseInt(ele.dis_price);
						})
					}
					this.goodsList = list;
					if(this.goodsList.length>0){
						this.loadingText = '到底了'
					}else{
						this.loadingText='暂无砍价商品！'
					}
					
				})
			},
			// 获取参与过砍价的商品
			getbartainlist() {
				this.$xm.post('/bargain/get_bartain_list', "", res => {
					if (res) {
						res.forEach((ele) => {
							ele.pro_img = 'http://img.xmvogue.com/thumb/' + ele.pro_sn + '.jpg?x-oss-process=style/300';

							ele.etime = parseInt(ele.etime) - Math.round(new Date() / 1000);
							ele.progress = ele.price_totle / ele.pro_price * 100

						})
					}
					this.bartainlist = res;
				})
			},
			tabChange(e) {
				this.tabIndex = e;
				if (this.tabIndex == 0) {
					this.loadData()
				} else if (this.tabIndex == 1) {
					this.getbartainlist()
				}
			},
			// 去使用
			toUse(goods) {
				// 参团
				let store;
				if (uni.getStorageSync('store').store_code) {
					store = uni.getStorageSync('store').store_code;
				} else {
					store = 10001
				}
				uni.navigateTo({
					url: '../../order/confirmation?mid=' + goods.mid + '&store=' + store + '&type=isBargain' + '&proid=' + goods.proid +
						'&pronum=1'
				})
			},
			toCut(e) {
				if (e.xopenid && !e.order_sn) {
					uni.showToast({
						title: '你已经发起该商品的砍价，砍砍别的商品吧',
						icon: 'none'
					})
				} else if (e.order_sn) {
					uni.showModal({
						title: '该商品已经购买，是否跳转到订单',
						content: '',
						confirmText: '取  消',
						cancelColor: '#b2b2b2',
						confirmText: '确  定',
						confirmColor: '#2c2c2c',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '../../user/order_list/order_list?tbIndex=s'
								})
							} else {
								console.log('取消')
							}
						}
					})
				} else {
					uni.navigateTo({
						url: './cut?bid=' + e.id + '&mid=' + e.mid
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}

	.tabBar {
		position: fixed;
		bottom: 0;
		width: 100%;

		.tabBar-list {
			height: 100rpx;
			width: 100%;
			background: #FFFFFF;
			display: flex;
			border-top: 1px solid #EEEEEE;
			justify-content: space-around;
			align-items: center;

			.tabBar-item:first-child {
				border-right: 2rpx solid #EEEEEE;
			}

			.tabBar-item {
				display: flex;
				justify-content: center;
				font-size: 30upx;
				align-items: center;
				height: 100%;
				width: 50%;

				.active {
					color: #d81e06;
				}

				.icon {
					image {
						width: 45rpx;
						height: 45rpx;
					}
				}
			}

		}
	}



	.header {
		width: 100%;

		image {
			width: 100%;
			height: 210rpx;
		}
	}

	.goods {
		padding: 30rpx;
		background-color: #FFFFFF;
		padding-bottom: 120rpx;
		padding-top: 0;

		.goods-item {
			padding: 30rpx 0;
			border-bottom: 2rpx solid #E0E0E0;
			display: flex;

			.left {
				height: 220rpx;
				width: 240rpx;
			}

			.right {
				width: 70%;
				padding-left: 30upx;

				.info {
					height: 55%;
					font-size: 30rpx;
					font-family: '微软雅黑';
				}
				.tip {
					display: flex;
					align-items: center;
					justify-content: space-between;
					image {
						width: 30rpx;
						height: 30rpx;
						margin-right: 10rpx;
					}
					.content{
						text {
							background: #fbf2f0;
							color: #c03d38;
							margin-right: 10upx;
							text-align: center;
							font-size: 26upx;
							padding: 5upx 8upx;
						}
					}
					
				}
				.progress {
					width: 50%;
				}

				.etime {
					font-size: 26rpx;
					display: flex;
					justify-content: left;
					align-items: center;
					color: #B2B2B2;
					padding-top: 10rpx;
				}

				.bottom {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;

					.tui-countdown-item {
						width: 30rpx !important;
					}

					.price {
						color: #FD5856;
						font-size: 36rpx;
						font-weight: bold;

					}

					.success {
						font-size: 24rpx;
						color: #00E83A;
					}

					.error {
						font-size: 24rpx;
						color: #B2B2B2;
					}

					.bottomRight {
						

						.btn {
							background: linear-gradient(to right, #FC781D, #F32824);
							color: #FFFFFF;
							width: 170upx;
							height: 60upx;
							line-height: 60upx;
							text-align: center;
							font-size: 28rpx;
							margin-top: 12rpx;
							border-radius: 8rpx;
						}
					}

				}
			}

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
