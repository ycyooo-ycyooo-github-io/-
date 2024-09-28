<template>
	<view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list">
				<view class="product" v-for="(goods,index) in goodsList" :key="index" v-if="goodsList.length>0">
					<image mode="widthFix" :src="goods.pro_sn" @tap="toGoods(goods)"></image>
					<view class="name" @tap="toGoods(goods)">{{goods.pro_name}}</view>
					<view class="info">
						<view class="price" v-if="goods.dis_price" @tap="toGoods(goods)">
							<text style="font-size: 24rpx;">¥</text>{{ goods.dis_price }}
							<text class="dis_price" v-if="goods.dis_price!==undefined" style="color: #B2B2B2;font-size: 26rpx;font-weight: 400;padding-left: 10rpx;text-decoration: line-through;">{{ goods.pro_price }}</text>
						</view>
						<view class="price" v-else @tap=" toGoods(goods)">
							<text style="font-size: 24rpx;">¥</text>{{ goods.pro_price }}
						</view>
						<image src="../../../../static/img/tabBar/cart-on.png" mode="" class="cart" @tap="joinCart(goods)" v-if="goods.num!='0'"></image>
						<image src="../../../../static/img/over.png" mode="" style="width: 100rpx;height: 100rpx;" v-else></image>
					</view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view>
		<tarbar :selected="selectIndex" v-if="showTabbar"></tarbar>
		<tui-scroll-top :scrollTop="scrollTop"></tui-scroll-top>
	</view>
</template>

<script>
	import tarbar from "@/components/tarbar/tarbar"
	export default {
		onShareAppMessage(res) {
			return {
				title: this.key,
				path: 'pages/goods/goods-list/product/product?key=' + this.key,
				success: (res) => {
					console.log(res);
				},
				fail: (res) => {
					console.log(res);
				}
			}
		},
		components: {
			tarbar
		},
		data() {
			return {
				scrollTop: 0,
				key: '',
				type: '',
				goodsList: [],
				loadingText: "正在加载中...",
				pageCount: 1,
				pageid: 1,
				selectIndex: '2',
				showTabbar:false
			};
		},
		onLoad: function(option) {
			this.type = option.key
			if (this.type == 1) {
				this.key = '爆款推荐',
					this.selectIndex = 2
			} else if (this.type == 2) {
				this.key = '10元专区'
				this.selectIndex = 3
			} else if (this.type == 3) {
				this.key = '清仓特卖'
				this.selectIndex = 4;
				this.showTabbar=true;
			}
			uni.setNavigationBarTitle({
				title: this.key
			});
			this.reload();
			//兼容H5下排序栏位置
			// #ifdef H5
			//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
			let Timer = setInterval(() => {
				let uniHead = document.getElementsByTagName('uni-page-head');
				if (uniHead.length > 0) {
					this.headerTop = uniHead[0].offsetHeight + 'px';
					clearInterval(Timer); //清除定时器
				}
			}, 1);
			// #endif
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			this.goodsList = []
			setTimeout(() => {
				this.reload();
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			this.pageid++;
			if (this.pageid > this.pageCount) {
				this.loadingText = "到底了";
				return false;
			} else {
				this.reload();
				this.loadingText = "正在加载...";
			}
		},
		methods: {
			reload() {

				let data = {
					type: this.type,
					p: this.pageid
				}
				this.$xm.post('/Product/goodslist', data, (res) => {
					console.log(res);
					if (res) {
						res.data.map(ele => {
							ele.pro_sn = 'http://img.xmvogue.com/thumb/' + ele.pro_sn + '.jpg?x-oss-process=style/300';
							ele.pro_name = ele.pro_name.slice(0, 15) + '...'
						})


						this.goodsList = this.goodsList.concat(res.data);
						this.pageCount = res.count;
						if (this.pageCount == 1) {
							this.loadingText = '到底了'
						}

					} else {
						this.loadingText = "暂无商品！";
					}

				})
			},

			//商品跳转
			toGoods(e) {
				uni.navigateTo({
					url: '../../goods?gid=' + e.id
				});
			},
			// 加入购物车
			joinCart(e) {
				let data = {
					proid: e.id,
					pronum: 1
				}
				this.$xm.post('/Cart/add', data, (res) => {
					let result = res.msg;
					uni.showToast({
						title: result
					});
				})
			},

		}

	}
</script>

<style lang="scss">
	.icon {
		font-size: 26upx;
	}

	.header {
		width: 92%;
		padding: 0 4%;
		height: 79upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;

		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
			margin-right: 20upx;

			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}

			input {
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}

		.btn {
			width: 140upx;

			// height: 60upx;
			button {
				font-size: 28upx;
				border: 0;
				border-radius: 50upx !important;
			}
		}

		.active {
			button {
				background-color: red;
				color: white;
			}

		}

		.target {
			width: 20%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			margin-bottom: -2upx;
			color: #aaa;

			&.on {
				color: #555;
				border-bottom: 4upx solid #f06c7a;
				font-weight: 600;
				font-size: 30upx;
			}


		}
	}

	.place {

		background-color: #ffffff;
		height: 100upx;

	}

	.goods-list {
		margin-top: 30rpx;

		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 92%;
			padding: 0 4% 3vw 4%;
			padding-bottom: 60rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 20rpx 0;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);

				image {
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}

				.name {
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 30upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.cart {
						width: 50upx;
						height: 50upx;
					}
				}
			}

		}
	}
</style>
