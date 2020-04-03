<template>
	<view>
		<!-- 温馨提示 -->
		<view class="word" v-if="word.length>0">
			<view class="main-header" v-for="(item,index) in word" :key="index">
				{{item}}
			</view>

		</view>
		<!-- 收货地址 -->
		<view class="addr" @tap="selectAddress">
			<view class="icon">
				<image src="../../static/img/addricon.png" mode=""></image>
			</view>
			<view class="right" v-if="recinfo.name">
				<view class="tel-name">
					<view class="name">
						{{recinfo.name}}
					</view>
					<view class="tel">
						{{recinfo.phone}}
					</view>
				</view>
				<view class="addres">
					{{recinfo.province+recinfo.city+recinfo.town}}
					{{recinfo.address}}
				</view>
			</view>
			<view class="choose" v-else>
				请选择收货地址
			</view>
		</view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row" v-for="(row,index) in buylist" :key="index">
				<view class="goods-info" @tap="togoods(row)">
					<view class="img">
						<image :src="row.pro_img"></image>
					</view>
					<view class="info">
						<view class="title">{{row.pro_name}}</view>
						<view class="spec">数量:{{row.pronum}}
							<!-- <text v-if="row.dis_price" style="margin-left: 10rpx;">单价:{{row.dis_price}}</text>
							<text v-else-if="row.sec_price" style="margin-left: 10rpx;">秒杀价:{{row.sec_price}}</text>
							<text v-else-if="row.group_price" style="margin-left: 10rpx;">拼团价:{{row.group_price}}</text> -->
							<text style="margin-left: 10rpx;">单价:{{row.pro_price}}</text>
						</view>
						<view class="price-number">
							<view class="price" v-if="row.dis_price">￥{{row.dis_price*row.pronum}}
								<text style="text-decoration: line-through;font-size: 24rpx;color: #B2B2B2;margin-left: 10rpx;">{{row.pro_price*row.pronum}}</text>
							</view>
							<view class="price" v-else-if="row.sec_price">￥{{row.sec_price*row.pronum}}
								<text style="text-decoration: line-through;font-size: 24rpx;color: #B2B2B2;margin-left: 10rpx;">{{row.pro_price*row.pronum}}</text>
							</view>
							<view class="price" v-else>￥{{row.pro_price*row.pronum}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提示-备注 -->
		<view class="order">
			<!-- <view class="row">
				<view class="left">
					积分 :
				</view>
				<view class="right">
					已扣除{{int}}积分抵扣{{deduction|toFixed}}元
				</view>
			</view> -->
			<view class="row">
				<view class="left">
					快递方式 :
				</view>
				<view class="right">
					<view>
						<radio-group class="radio-group" @change="shipChange" v-if="items.length>0">
							<radio class="radio" v-for="(item,index) in items" :key="index" :value="item.name" :checked="item.checked">
								<text>{{item.name}}</text>
							</radio>
						</radio-group>
						<text v-else>{{ship_name}}</text>
					</view>
					<!-- <view >
						{{tips}}
					</view> -->
				</view>
			</view>
			<view class="row">
				<view class="left">
					备注 :
				</view>
				<view class="right">
					<input placeholder="选填,备注内容" v-model="note" />
				</view>
			</view>
		</view>
		<!-- 明细 -->
		<view class="detail">
			<view class="row">
				<view class="nominal">
					商品金额
				</view>
				<view class="content">
					￥{{payPrice}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					运费
				</view>
				<view class="content">
					￥+{{freight}}
				</view>
			</view>
			<view class="row" v-if="sumPrice!==goodsPrice">
				<view class="nominal">
					{{disType==1?'满减优惠':"优惠券"}}
				</view>
				<view class="content" v-if="disPrice">
					￥-{{disPrice}}
				</view>
				<view class="content" v-else>
					暂无优惠
				</view>
			</view>
			<!-- <view class="row">
				<view class="nominal">
					积分抵扣
				</view>
				<view class="content">
					￥-{{deduction|toFixed}}
				</view>
			</view> -->
		</view>
		<view class="blck">

		</view>
		<view class="footer">
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{sumPrice}}</view>
					<view class="payLing" style="text-decoration: line-through;padding-left: 10rpx;">{{goodsPrice}}</view>
				</view>
				<view class="btn" @tap="toPay">支付</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {

			return {
				userProvider: '',
				word: [],
				id: '',
				secret: {},
				buylist: [], //订单列表
				goodsPrice: 0, //商品合计价格
				payPrice: 0, //商品合计原价
				payLing: 0, //优惠原价
				sumPrice: 0, //用户付款价格
				freight: 5, //运费
				note: '', //备注
				int: 1200, //抵扣积分
				deduction: 0, //抵扣价格
				disType: null, //优惠类型
				disPrice: null, //优惠金额
				tips: '',
				minprice: 0, //最小金额
				recinfo: {},
				// 快递方式
				items: [],
				// 选择的快递
				ship_name: '',
				// 快递费用
				shipmoney: '',
				choose: false,
				store: '',
				ordersn: '',
				goods: [],
				goodsIdList: [],
				couponid: '',
				group: ''
			};
		},
		onLoad(option) {
			this.userProvider = this.$xm.userProvider();
			this.store = option.store;
			this.ordersn = option.ordersn;
			if (option.proid) {
				this.goods = [option.proid, option.pronum];
			}
			this.goodsIdList = [option.goods_list];
			if (option) {
				if (option.type) {
					this.group = option
					this.freight = 0;
				}
			}
			console.log(this.group);
			this.getAddress();
		},
		onShow() {
			this.loadData();
			uni.getStorage({
				key: 'selectAddress',
				success: (res) => {
					console.log(res);
					this.recinfo = res.data;
				}
			});
		},
		filters: {
			toFixed: function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		methods: {
			// 获取地址
			getAddress() {
				this.$xm.post('/Order/getDefAdr/', '', (res) => {
					console.log(res);
					this.recinfo = res;

				})
			},
			//加载购物车信息
			loadData() {
				let data = {
					store: this.store,
				};
				if (this.ordersn) {
					data.order_sn = this.ordersn
				} else if (this.goods.length > 0) {
					data.goods = this.goods;
				} else if (this.goodsIdList) {
					data.goods_list = this.goodsIdList
				}
				// 参团
				if (this.group.type == "group" || this.group.type == "join") {
					data.isgroup = 1
				}
				// 砍价
				if (this.group.type == "isBargain") {
					data.isBargain = 1;
				}
				this.$xm.post('/cart/order', data, res => {
					if (res.s == 0) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					} else {
						this.word = res.word;
						this.buylist = res.prolist;
						this.$xm.requestImg(this.buylist);
						this.minprice = Number(res.minprice)
						this.goodsPrice = res.allprice;
						this.tips = res.tips;
						this.payPrice = Number(res.allprice);
						if (this.minprice > this.payPrice) {
							this.goodsPrice = this.payPrice + this.freight;
						}
						let goodsList = [];
						goodsList = this.buylist.map(ele => {
							return ele.proid + '/' + ele.pronum
						})
						this.discounts(goodsList);
					}

				})
			},
			//获取优惠
			discounts(goodsList) {
				let data = {
					store: this.store,
					goods_list: goodsList
				}
				// 开团
				if (this.group.type == "group" || this.group.type == "join") {
					data.isgroup = 1
				}
				// 砍价
				if (this.group.type == "isBargain") {
					data.isBargain = 1
				}
				this.$xm.post('/Coupon/match_optimalss', data, res => {
					if (res.data) {
						if (res.data.type == 2) {
							this.couponid = res.data.id
						}
						this.sumPrice = res.data.money;
						var payLing = res.data.money;
						this.payLing = Number(payLing);
						if (this.minprice > this.payLing) {
							this.sumPrice = this.payLing + this.freight;
						}
						this.tips = res.data.msg;

						this.disPrice = res.data.cut;
						this.disType = res.data.type;
						this.getship()
					}

				})
			},
			// 获取快递方式
			getship() {
				if (this.recinfo) {
					let data = {
						shipid: this.recinfo.id,
						allprice: this.payLing,
						store: this.store
					}
					// 开团
					if (this.group.type == "group" || this.group.type == "join") {
						data.isgroup = 1
					} else if (this.group.type == "isBargain") {
						data.isBargain = 1
					}
					this.$xm.post('/Order/getShipMoney', data, (res) => {
						console.log(res);
						if (res.data !== undefined) {
							if (res.data.constructor == Array) {
								this.items = res.data;
								this.items.forEach(ele => {
									ele.checked = ''
								})
								this.items[0].checked = true;
								this.ship_name = this.items[0].name;
								this.shipmoney = this.items[0].price;
								this.freight = this.items[0].price;
							} else {
								this.items = [];
								this.freight = res.data.price;
								this.shipmoney = res.data.price;
								this.ship_name = res.data.name;
							}

						}

					})
				} else {
					uni.showToast({
						title: '请选择收件地址！',
						icon: 'none'
					})
				}

			},
			//邮费切换
			shipChange: function(e) {
				this.ship_name = e.detail.value;
				let index;
				if (e.detail.value == '普通快递') {
					index = 0;
					this.shipmoney = 5;
				} else if (e.detail.value == '顺丰快递') {
					index = 1;
					this.shipmoney = 15;
				} else if (e.detail.value.includes('包邮')) {
					index = 0;
					this.shipmoney = 0;

				}

				this.freight = this.items[index].price;
				// 原价
				this.goodsPrice = this.payPrice + this.freight;
				// 优惠价
				this.sumPrice = this.payLing + this.freight;

			},
			toPay() {
				let scene;
				if (uni.getStorageSync('scene')) {
					scene = uni.getStorageSync('scene');
				} else {
					scene = ''
				}
				if (this.recinfo) {
					let data = {
						shipid: this.recinfo.id, //地址id
						shipmoney: this.shipmoney, //运费
						ship_name: this.ship_name, //物流方式名称
						memo: this.note, //备注
						couponid: this.couponid,
						store: this.store,
						scene: scene,
					}
					if (this.ordersn) {
						data.order = this.ordersn
					} else if (this.goods.length > 0) {
						data.goods = this.goods;
					} else if (this.goodsIdList) {
						data.goods_list = this.goodsIdList
					}
					// 开团
					if (this.group.type == "group") {
						data.isgroup = 1;
						data.gid = this.group.sid;
					}
					// 参团
					if (this.group.type == "join") {
						data.isgroup = 1;
						data.gid = this.group.sid;
						data.groupid = this.group.groupid;
					}
					// 砍价
					if (this.group.type == "isBargain") {
						data.isBargain = 1;
						data.mid = this.group.mid;
					}
					console.log(this.userProvider);
					if (this.userProvider == 'weixin') {
						wx.requestSubscribeMessage({
							tmplIds: ['Tq1zoW5_X4aokfmiG1OWVjq6AHuM9PDYAmociqqkIIE', 'LQ-y5nQFBJwpT-UcwVogzumUoxHJRVsQF5RUFDGlqR8',
								'R3UHttvPZqGuAt97I4bFezelaT9ZJuKQi32cuWLc3bg', 'R3UHttvPZqGuAt97I4bFezelaT9ZJuKQi32cuWLc3bg'
							],
							success: (res) => {
								console.log(res);
								this.$xm.post('/Order/saveOrder', data, (res) => {
									let result = res.data;
									if (res.s == 1) {
										uni.requestPayment({
											timeStamp: result.timeStamp,
											nonceStr: result.nonceStr,
											package: result.package,
											signType: result.signType,
											paySign: result.paySign,
											success: (res) => {
												console.log(res)
											},
											fail: (res) => {
												console.log(res)
											},
											complete: (res) => {
												if (res.errMsg == 'requestPayment:ok') {
													uni.showModal({
														title: '支付成功！',
														content: '',
														showCancel: false,
														confirmText: '确  定',
														confirmColor: '#2c2c2c',
														success: (res) => {
															uni.redirectTo({
																url: '../user/order_list/order_list?tbIndex=1'
															})
														}
													})
												} else {
													uni.showModal({
														title: '支付失败！',
														content: '',
														showCancel: false,
														confirmText: '确  定',
														confirmColor: '#2c2c2c',
														success: (res) => {
															if (res.confirm) {
																if (data.isgroup) {
																	let params = {
																		order_sn: result.out_trade_no
																	}
																	this.$xm.post("/groupbuy/del_group_order", params, (res) => {
																		if (res == 'ok') {
																			uni.switchTab({
																				url: '../index/index'
																			})
																		}
																	})
																} else {
																	wx.redirectTo({
																		url: '../user/order_list/order_list?tbIndex=0'
																	})
																}
															}
														}
													})
												}

											}
										});
									} else {
										uni.showToast({
											title: res.msg,
											icon: 'none'
										});
									}
								})

							},

							fail: (err) => {
								console.error(err);
							}

						})
					} else {
						console.log('支付')
						this.$xm.post('/Order/saveOrder', data, (res) => {
							console.log(res)
							let result = res.data;
							if (res.s == 1) {

							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								});
							}
						})
					}


				}
			},
			//选择收货地址
			selectAddress() {
				uni.navigateTo({
					url: '../user/address/address?type=select'
				})
			},
			togoods(e) {
				console.log(e.proid);
				uni.navigateTo({
					url: '../goods/goods?gid=' + e.proid
				});
			},
		}
	}
</script>

<style lang="scss">
	.word {
		background-color: #FEFCED;
		padding: 25rpx;
		font-size: 26rpx;
		color: #b2b2b2;
		letter-spacing: 3rpx;
		line-height: 35rpx;

	}

	.addr {
		width: 86%;
		padding: 20upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
		display: flex;
		align-items: center;

		.icon {
			width: 80upx;
			height: 80upx;
			display: flex;
			align-items: center;

			image {
				width: 60upx;
				height: 60upx;
			}
		}

		.tel-name {
			width: 100%;
			display: flex;
			font-size: 32upx;

			.tel {
				margin-left: 40upx;
			}
		}

		.addres {
			width: 100%;
			font-size: 26upx;
			color: #999;
		}
	}

	.buy-list {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			margin: 30upx 0;

			.goods-info {
				width: 100%;
				display: flex;

				.img {
					width: 22vw;
					height: 22vw;
					border-radius: 10upx;
					overflow: hidden;
					flex-shrink: 0;
					margin-right: 10upx;

					image {
						width: 22vw;
						height: 22vw;
					}
				}

				.info {
					width: 100%;
					height: 22vw;
					overflow: hidden;
					display: flex;
					flex-wrap: wrap;
					position: relative;
					margin-left: 20rpx;

					.title {
						width: 100%;
						font-size: 28upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						// text-align: justify;
						overflow: hidden;
					}

					.spec {
						font-size: 22upx;
						background-color: #f3f3f3;
						color: #a7a7a7;
						height: 40upx;
						display: flex;
						align-items: center;
						padding: 0 10upx;
						border-radius: 20upx;
						margin-bottom: 20vw;
					}

					.price-number {
						position: absolute;
						width: 100%;
						bottom: 0upx;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						font-size: 35rpx;
						height: 40upx;

						.price {
							color: #f06c7a;

							.dis_price {
								font-size: 30rpx;
								color: #b2b2b2;
								margin-left: 10rpx;
							}
						}

						.number {
							display: flex;
							justify-content: center;
							align-items: center;

						}
					}
				}
			}
		}
	}

	.order {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			margin: 30upx 0;
			height: 40upx;
			display: flex;

			.left {
				font-size: 28upx;
			}

			.right {
				margin-left: 40upx;
				font-size: 26upx;
				color: #999;

				input {
					font-size: 26upx;
					color: #999;
				}
			}
		}
	}

	.blck {
		width: 100%;
		height: 100upx;
	}

	.footer {
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;

		.settlement {
			width: 80%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.sum {

				font-size: 32upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;

				.money {
					font-weight: 600;
					color: #e41f19;
				}
			}

			.btn {
				padding: 0 40upx;
				height: 75upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 34upx;
				border-radius: 40upx;
			}
		}
	}

	.detail {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			height: 60upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.nominal {
				font-size: 32upx;
			}

			.content {
				font-size: 30upx;
				color: #f06c7a;
			}
		}
	}

	.radio {
		margin: 0 10upx;
	}
</style>
