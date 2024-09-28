<template>
	<view>
		<view class="pageInfo">
			<!-- <view class="rule">
				活动规则
			</view> -->
			<view class="product">
				<view class="" style="margin-top: -100rpx;">
					<image :src="goods.avatar" mode="" class="logo" v-if="goods.avatar"></image>
					<image src="../../../static/img/avator.png" class="logo" mode="" v-else></image>
					<view class="username" v-if="goods.nickname">
						{{goods.nickname}}
					</view>
					<view class="path">
						邀请好友>砍价至{{goods.dis_price}}元>免费领取
					</view>
					<view class="good">
						<image :src="goods.pro_img" mode=""></image>
						<view class="info">
							<view class="name">
								{{goods.pro_name || '加载中'}}
							</view>
							<view class="price">
								￥{{goods.pro_price || '加载中'}}
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 砍价按钮 -->
			<view class="btns">
				<view class="tips" v-if="status==1 || status==2">
					砍价成功
				</view>
				<view class="tips" v-if="status==6">
					你已帮忙砍了{{b_price}}元
				</view>
				<view class="tips" v-if="status==3 || status==4">
					砍价失败，还差{{sur_price}}!
					<view class="">
						很遗憾，砍价未能成功，去看看其他商品吧
					</view>
				</view>
				<view class="progress" v-if="status==5 || status==6 || status==7">
					<progress :percent="goods.progress" activeColor="#F5C152" backgroundColor="#8F1F31" active stroke-width="20"
					 border-radius="30" duration="10" />
					<view class="money">
						<view class="dis_price" :style="{ width:goods.progress+'%'}">
							已砍{{priceTotle}}
						</view>
						<view class="">
							还差{{sur_price}}
						</view>
					</view>
				</view>
				<button type="primary" class="btn" v-if="status==5" open-type="share">邀请好友砍砍砍</button>
				<button type="primary" class="btn" v-if="status==3" @tap="toBargainPage">更多商品等你拿</button>
				<view class="" v-if="status==7">
					<button type="primary" class="btn" v-if="userInfo" @tap="toBargain">帮他砍一砍</button>
					<button v-else type="primary" class="btn" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">帮他砍一砍</button>
				</view>
				<button type="primary" class="btn" v-if="status==2 || status==4 || status==6" @tap="toBargainPage">我也要去{{goods.dis_price}}拿</button>
				<button type="primary" class="btn" v-if="status==1" @tap="toUse(goods)">去{{goods.dis_price}}元购买</button>
				<view class="time" v-if="status==5">
					<text>还剩</text>
					<tui-countdown :time="goods.etime" bcolor="#fff" color='#fff'></tui-countdown>
					<text>后结束，抓紧时间砍价吧</text>
				</view>
			</view>
			<!-- 砍价商品列表 -->
			<view class="goods">

			</view>
			<!-- 砍价小分队 -->
			<view class="peoples">
				<image src="../../../static/img/cut.png" mode="" class="img"></image>
				<view class="list" v-for="(item,index) in peopleList" :key="index">
					<image :src="item.avatar" mode="" class="avatar"></image>
					<view class="info">
						<view class="name">{{item.nickname}}</view>
						<view class="time">{{item.time}}</view>
					</view>
					<view class="cutPrice">砍掉{{item.b_price}}</view>
				</view>
			</view>
		</view>
		<!-- :maskClosable="false" -->
		<modal :show="cutShow" :maskClosable="false" :custom="true" class="cutpop">
			<view class="pop" v-if="status==7">
				<Ahh5Animated :delay="0" name="heartBeat" :duration="1" timing="ease" count="1">
					<button v-if="userInfo" type="primary" class="cut" @tap="toBargain">帮他砍一砍！</button>
					<button v-else type="primary" class="cut" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">帮他砍一砍！</button>
				</Ahh5Animated>
			</view>
			<view class="pop" v-else>
				<image src="http://web.xmcpcn.com/img/banner/pop.png" mode=""></image>
				<view class="" style="margin: -200rpx auto 0;width: 90%;">
					<Ahh5Animated :delay="0" name="heartBeat" :duration="1" timing="ease" count="1">
						<button v-if="userInfo" type="primary" class="cut" @tap="toBargain">砍！砍！砍！</button>
						<button v-else type="primary" class="cut" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">砍！砍！砍！</button>

					</Ahh5Animated>
				</view>

			</view>
		</modal>
		<modal :show="priceShow" @cancel="priceShow=false" :custom="true">
			<view class="pop">
				<view class="title">
					你已经砍了{{b_price}}元
				</view>
				<Ahh5Animated :delay="0" name="heartBeat" :duration="1" timing="ease" count="1">
					<button type="primary" class="cut" open-type="share" :data-bid="goods.bid" :data-mid="goods.mid">分享好友帮忙砍</button>
				</Ahh5Animated>
			</view>

		</modal>
	</view>
</template>

<script>
	import tuiCountdown from "@/components/countdown/countdown"
	import Ahh5Animated from "@/components/ahh5-animated/ahh5-animated"
	export default {
		components: {
			tuiCountdown,
			Ahh5Animated
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按
				console.log(this.bid, this.mid)
				return {
					title: '有人@你，帮我点一下好吗？全场商品你也可以免费拿哦~',
					path: 'pages/seckill/bargain/cut?bid=' + this.bid + '&mid=' + this.mid,
					success: (res) => {
						// 转发成功
						console.log('转发成功')
						this.priceShow=false;

					},
					fail: (res) => {
						// 转发失败
						console.log('转发失败')
					}
				}
			}
			return {
				title: '有人@你，帮我点一下好吗？全场商品你也可以免费拿哦~',
				path: 'pages/seckill/bargain/cut?bid=' + this.bid + '&mid=' + this.mid // 路径，传递参数到指定页面。

			}

		},
		data() {
			return {
				userInfo: null,
				bid: '',
				mid: '',
				goods: {},
				peopleList: [],
				// 砍价状态
				status: '',
				cutShow: false,
				priceShow: false,
				b_price: '',
				priceTotle: '',
				sur_price: ''
			};
		},
		onLoad(option) {
			console.log(option)
			this.bid = option.bid;
			this.mid = option.mid;
			if (this.mid === 'undefined') {
				this.mid = ''
				this.cutShow = true;

			} else {
				this.cutShow = false;
			}
			
		},
		onShow() {
			this.getinfo();
			this.userInfo = uni.getStorageSync('userInfo');
			console.log(this.userInfo);
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			this.getinfo();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			getuserinfo() {
				// wx登录
				uni.login({
					success: (res) => {
						if (res.code) {
							var code = res.code
							uni.getUserInfo({
								success: (res) => {
									this.userInfo = res.userInfo;
									this.showModal = false;
									let data = {
										encryptedData: res.encryptedData,
										iv: res.iv
									}
									this.$xm.post('/Index/getUnionid', data, (res) => {
										const user = uni.getStorageSync('user');
										user.unionid = res.unionid;
										uni.setStorage({
											key: 'user',
											data: user,
											success: (res) => {
												console.log(res);
											}
										});
									})
									uni.setStorage({
										key: 'userInfo',
										data: res.userInfo,
										success: (res) => {
											console.log(res);
										}
									});
									this.toBargain();

								},
								fail: res => {
									// 获取失败的去引导用户授权 
								}
							})

						} else {}
					}
				})
			},
			// 自己砍一砍
			toBargain() {
				let data = {
					bid: this.bid,
					mid: this.mid
				}
				this.$xm.post('/bargain/Bargain', data, (res) => {
					if(res.s==0){
						uni.showToast({
							title:res.msg
						})
					}else{
						this.mid = res.mid;
						this.b_price = res.b_price
						this.cutShow = false;
						this.priceShow = true
						this.getinfo()
												
					}
					
				})
			},
			// 获取砍价详情
			getinfo() {
				let data = {
					mid: this.mid,
					bid: this.bid
				};
				this.$xm.post('/bargain/getinfo', data, (res) => {
					this.goods = res.bargain;
					this.goods.pro_img = 'http://img.xmvogue.com/thumb/' + this.goods.pro_sn + '.jpg?x-oss-process=style/300';
					this.goods.etime = res.etime - Math.round(new Date() / 1000);
					this.goods.progress = res.price_totle / this.goods.pro_price * 100
					this.peopleList = res.bargain_user;
					this.status = res.status;
					this.priceTotle = res.price_totle;
					this.sur_price = this.goods.pro_price - this.priceTotle - this.goods.dis_price;
					this.sur_price = this.sur_price.toFixed(2)
					if (this.status == 2 || this.status == 6) {
						this.priceShow = false
					}

				})
			},

			// 更多商品
			toBargainPage() {
				uni.navigateTo({
					url: './bargain'
				})
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
					url: '../../order/confirmation?mid=' + this.mid + '&store=' + store + '&type=isBargain' + '&proid=' + goods.proid +
						'&pronum=1'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #DB2A29;
		background-image: url('http://web.xmcpcn.com/img/banner/bg.png');
		background-repeat: no-repeat;
	}
	.cutpop {
		.tui-modal-box {
			padding: 0 !important;
			background: none !important;

		}

		.pop {
			image {
				width: 100%;
				height: 670rpx;
			}
		}
	}

	.pageInfo {
		
		padding: 3%;
		// position: absolute;
		
		.rule {
			display: flex;
			justify-content: right;
			align-items: center;
			padding-left: 30rpx;
			color: #fff;
			font-size: 28rpx;
			width: 145rpx;
			height: 50rpx;
			border: 1px solid #FFFFFF;
			border-radius: 50rpx;
			margin-bottom: 40rpx;
			margin-left: 75%;
		}

		.product {
			margin-top: 100rpx;
			background-color: #FFFFFF;
			padding: 30rpx;
			border-radius: 10rpx;
			text-align: center;

			.logo {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}

			.path {
				color: #C72C50;
				padding-bottom: 40rpx;
				font-size: 30rpx;
				padding-top: 20rpx;
			}

			.good {
				display: flex;
				justify-content: left;
				align-items: flex-start;

				image {
					width: 220rpx;
					height: 200rpx;
				}

				.info {
					text-align: left;
					margin-left: 40rpx;

					.name {
						font-size: 30rpx;
						font-family: '微软雅黑';

					}

					.price {
						color: #FD5856;
						font-weight: bold;
						font-size: 36rpx;
						font-family: '微软雅黑';
						margin-top: 50rpx;
					}
				}
			}
		}

		.btns {
			padding: 40rpx 0;
			text-align: center;

			.money {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 24rpx;
				color: #fff;
				padding-top: 10rpx;
				margin-bottom: 40rpx;

				.dis_price {
					text-align: right;
				}
			}

			.tips {
				color: #FFFFFF;
				font-size: 28rpx;
				padding-bottom: 20rpx;
				letter-spacing: 2rpx;
			}

			.btn {
				background: linear-gradient(to right, #F7DE77, #EFC848);
				color: #8A172F;
				font-weight: bold;
				font-size: 36rpx;
				letter-spacing: 2rpx;
				margin-bottom: 40rpx;

			}

			.time {
				font-size: 26rpx;
				color: #fff;
				opacity: 0.8;
				letter-spacing: 2rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 20rpx;

				.tui-countdown-item {
					width: 32rpx !important;
					background: none !important;
					border: none !important;
				}

				.tui-countdown-colon {
					color: #fff !important;
				}
			}
		}

		.peoples {
			background-color: #FFFFFF;
			padding: 30rpx;
			padding-top: 0;
			border-radius: 10rpx;
			text-align: center;

			.img {
				width: 350rpx;
				height: 90rpx;
				margin-top: -12rpx;
			}

			.list {
				display: flex;
				justify-content: left;
				align-items: center;
				padding-bottom: 30rpx;

				.avatar {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
				}

				.info {
					margin-left: 30rpx;
					width: 62%;
					text-align: left;

					.name {
						font-size: 28rpx;
					}

					.time {
						font-size: 24rpx;
						color: #B2B2B2;
						padding-top: 10rpx;
					}
				}

				.cutPrice {
					color: red;
					font-size: 28rpx;
					letter-spacing: 2rpx;
					font-weight: bold;
				}
			}
		}
	}

	.pop {
		text-align: center;

		.title {
			color: #E65B34;
			font-size: 38rpx;
			font-weight: bold;
			margin-bottom: 50rpx;
		}

		.cut {
			width: 70%;
			background: linear-gradient(to bottom, #F7E496, #F3C24A);
			color: #C13C0F;
			font-size: 36rpx;
			letter-spacing: 2rpx;
			border-radius: 60rpx;
			height: 80rpx;
			line-height: 80rpx;

		}
	}
</style>
