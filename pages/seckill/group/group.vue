<template>
	<view>
		<view class="group" style="margin-bottom: 130upx;">
			<view class="header">
				<view class="left">
					<view class="title">
						超级品牌日
					</view>
					<view class="time">
						<text>
							距离结束
						</text>
						<!-- <text class="num">24:24:12</text> -->
						<tui-countdown :time="seckillTime" bcolor="#fff" color='#c03d38' ></tui-countdown>
					</view>
				</view>

				<view class="right">
					<view class="num">
						<view style="padding-right: 30upx;font-size: 26rpx;">
							{{num}}人正在拼
						</view>
						<view class="user">
							<view class="img" v-for="(item, index) in user" :key="index">
								<image :src="item.avatar?item.avatar:'../../../static/img/user.png'" mode=""></image>
							</view>
						</view>
					</view>

				</view>
			</view>
			<view class="goods">
				<view v-for="(item, index) in goodsList" :key="index" class="goods-item" @click="goJoin(item)">
					<view class="left">
						<image :src="item.pro_img" mode=""></image>
					</view>
					<view class="right">
						<view class="info">
							<view class="name">
								{{item.pro_name}}
							</view>
							<view class="dis">
								{{item.discount}}折
							</view>
							<view class="tip">
								<text>{{item.group_num}}人团</text>
								<text>包邮</text>
							</view>
						</view>
						<view class="bottom">
							<view class="price">
								拼团价<text class="num">{{item.dis_price}}</text>元
							</view>
							<view class="btn">
								去拼团
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="tabBar">
			<view class="tabBar-list">
				<view v-for="(item, index) in tabBar" :key="index" class="tabBar-item">
					<view class="icon">
						<image :src="item.iconPath" mode=""></image>
					</view>
					<view class="name">
						{{item.text}}
					</view>
				</view>
			</view>
		</view> -->
		<tarbar :selected="1"></tarbar>
	</view>
</template>

<script>
	import tarbar from "@/components/tarbar/tarbar"
	import tuiCountdown from "@/components/countdown/countdown"
	export default {
		components: {
			tarbar,
			tuiCountdown
		},
		data() {
			return {
				goodsList: [],
				seckillTime: '',
				user: [],
				num: 0
			}
		},
		mounted() {
			// wx.setNavigationBarTitle({
			// 	title: '拼图'
			// })
			this.num = this.RandomNumBoth(50, 200)
			this.loadData()
		},
		methods: {
			loadData() {
				this.$xm.post('/groupbuy/getlist', "", res => {
					// console.log(res)
					let list = res.list
					if (list) {
						list.forEach((ele) => {
							ele.pro_img = 'http://img.xmvogue.com/thumb/' + ele.pro_sn + '.jpg?x-oss-process=style/300';

						})
					}
					this.goodsList = list;
					this.seckillTime = parseInt(res.time) - Math.round(new Date() / 1000);
					var arr = [{
						avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJzqW9FgnJSgf2KB6ozAkcOuV39CicRib65ZTib4LESqbkiceicxTMZ82pZDXP7a8ZTm8DwJH7cSOfOpgw/132'
					}, {
						avatar: 'https://wx.qlogo.cn/mmopen/vi_32/3GGeAqmMxmllG49ozsr4o3gjfaytphBDKUkTklaDLzlN2wtPreVUOsicYxSpRE0cLrRmY6mIez27UicSC8oYSDYQ/132'
					}, {
						avatar: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKmRZWNsg7pibnfRlmqLAPMMelG9a1GxpkK4edMLp4Vu40c8Dic7Hibicc6D873OfszKlp6sloDvVR4Nw/132'
					}, {
						avatar: 'http://img1.imgtn.bdimg.com/it/u=3015897202,919054029&fm=26&gp=0.jpg'
					}, {
						avatar: 'https://tva2.sinaimg.cn/crop.0.2.1242.1242.180/c090cdf4jw8fcxd9h87xkj20yi0yngo1.jpg?KID=imgbed,tva&Expires=1585303449&ssig=31LKHHu31p'
					}, {
						avatar: 'https://tvax1.sinaimg.cn/crop.0.0.996.996.180/006m2UFgly8g5u0rmtgo9j30ro0rojrz.jpg?KID=imgbed,tva&Expires=1585303449&ssig=h9Vj%2BIyLYM'
					}, {
						avatar: 'https://tvax4.sinaimg.cn/crop.0.0.1080.1080.180/86b36fb5ly8gbdscp2ak3j20u00u0ace.jpg?KID=imgbed,tva&Expires=1585303449&ssig=1QXh5Cd2yr'
					}, {
						avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2151447830,1807870251&fm=11&gp=0.jpg'
					}, {
						avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=943737565,604373982&fm=11&gp=0.jpg'
					},];
					//输出数组    
					var out = [];
					//输出个数    
					var num = 3;
					while (out.length < num) {
						var temp = (Math.random() * arr.length) >> 0;
						var row=arr.splice(temp, 1)
						out.push(row[0]);
					}
					this.user=out
				})
			},
			goJoin(e) {
				uni.navigateTo({
					url: '../../goods/goods?gid=' + e.proid + "&type=group"
				});
			},
			RandomNumBoth(Min, Max) {
				var Range = Max - Min;
				var Rand = Math.random();
				var num = Min + Math.round(Rand * Range); //四舍五入
				return num;
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;

	}

	.tabBar {
		position: fixed;
		bottom: 0;
		width: 100%;

		.tabBar-list {

			width: 100%;
			background: #FFFFFF;
			display: flex;
			border-top: 1px solid #EEEEEE;
			justify-content: space-around;
			align-items: center;

			.tabBar-item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 25upx;

				image {
					width: 100%;
					height: 100%;
				}

				.icon {
					width: 45upx;
					height: 45upx;
					margin-bottom: 10upx;
				}
			}

		}
	}

	.group {
		padding: 30upx;
		margin: 27upx;
		background: #FFFFFF;
		border: 1px solid #EEEEEE;
		border-radius: 20upx;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				.title {
					font-size: 38upx;
				}

				.time {
					margin-top: 15upx;
					font-size: 24upx;
					display: flex;
					justify-content: left;
					align-items: center;
					.tui-countdown-time{
						font-size: 24rpx !important;
					}
					.num {
						color: #c03d38;

					}
				}
			}

			.right {
				display: flex;
				align-items: center;
				height: 72upx;
				background: #fbf2f0;
				color: #c03d38;
				border-radius: 50upx;
				padding: 5upx 0upx 0upx 30upx;

				.num {
					display: flex;
					align-items: center;

					.user {
						display: flex;
						justify-content: center;
						align-items: center;

						.img {
							margin-left: 5upx;
							width: 58upx;
							height: 58upx;
							border-radius: 50%;
							margin-left: -10px;


							image {
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
					}
				}


			}
		}

		.goods {
			.goods-item {
				height: 320upx;
				margin: 30upx 0;
				display: flex;

				.left {
					height: 280upx;
					width: 40%;
				}

				.right {
					width: 55%;
					padding-left: 20upx;

					.info {
						height: 70%;

						.name {
							font-size: 30upx;
						}

						.dis {
							color: #999999;
							margin: 10upx 0;
						}

						.tip {
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

					.bottom {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.price {
							color: #c03d38;
							font-size: 28upx;

							.num {
								font-size: 45upx;
							}

						}

						.btn {
							background-color: #c03d38;
							color: #FFFFFF;
							width: 120upx;
							height: 60upx;
							line-height: 60upx;
							text-align: center;
							font-size: 30upx;
						}
					}
				}

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
