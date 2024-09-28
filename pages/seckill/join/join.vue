<template>
	<view v-if="goods">
		<view class="goods">
			<view class="goods-item" @tap="toGoods(item)">
				<view class="left">
					<image :src="goods.pro_src" mode=""></image>
				</view>
				<view class="right">
					<view class="info">
						<view class="name">
							{{goods.pro_name}}
						</view>
						<view class="dis">
							{{info.discount}}折
						</view>
						<view class="tip">
							<text>{{info.group_num}}人团</text>
							<text>包邮</text>
						</view>
					</view>
					<view class="bottom">
						<view class="price">
							拼团价<text class="num">{{info.dis_price}}</text>元
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="card">
			<view class="user">
				<view class="img" v-for="(item, index) in user" :key="index">
					<image :src="item.avatar?item.avatar:'../../../static/img/user.png'" mode=""></image>
				</view>
			</view>
			<view v-if="status">
				<view class="time">
					剩余
					<tui-countdown :time="seckillTime" bcolor="#fff" style="margin-left: 10rpx;margin-top: 6rpx;"></tui-countdown>
					结束
				</view>
				<view class="">
					<view class="" v-if="showBtn">
						<button class="invite" open-type="share" v-if="!type" >
							邀请微信好友参团
						</button>
						<button class="invite" v-else @click="jojn">
							去参团
						</button>
					</view>					
					<button v-if="!userInfo" type="warn" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true" style="height: 70rpx;line-height: 70rpx;font-size: 30rpx;border-radius: 50rpx;
					">微信登录</button>
				</view>
				
				
			</view>
			<view v-else>
				<button class="invite">
					拼团成功
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiCountdown from "@/components/countdown/countdown"
	export default {
		components: {
			tuiCountdown
		},
		data() {
			return {
				type: null,
				user: [],
				goods: '',
				info: '',
				group: '',
				seckillTime:'',
				status:false,
				userInfo: null,
				showBtn:false
			}
		},
		onLoad(option) {
			if (option) {
				if (option.type) {
					this.type = option.type
				}
			}
			this.group = option
			this.loadData(option)
		},
		onShow() {			
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					console.log(res);
					this.userInfo = res.data;
					if(this.userInfo){
						this.showBtn=true
					}else{
						this.showBtn=false
					}
				}
			});
		
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
									let params = {
										encryptedData: res.encryptedData,
										iv: res.iv,
									}
									this.$xm.post('/Index/getUnionid', params, (res) => {
										this.showBtn=true;
										const user = uni.getStorageSync('user');										
										user.unionid=res.unionid;
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
									
								},
								fail: res => {
									// 获取失败的去引导用户授权 
								}
							})
			
						} else {}
					}
				})
			},
			loadData(row) {
				let data = {
					groupid: row.groupid
				}
				this.$xm.post('/groupbuy/get_group_info', data, (res) => {
					var p1=res.group.length;
					var p2=res.groupinfo.group_num;
					if(p1==p2){
						this.status=false
					}else{
						this.status=true
					}
					this.user = res.group
					this.user.length = res.groupinfo.group_num
					res.pro.pro_src = 'http://img.xmvogue.com/thumb/' + res.pro.pro_sn + '.jpg?x-oss-process=style/300'
					this.goods = res.pro;
					res.groupinfo.amt = res.order_amt;
					this.info = res.groupinfo;
					this.seckillTime = parseInt(res.groupinfo.etime) - Math.round(new Date() / 1000);
				})
			},
			//商品跳转
			
			jojn() {
				uni.navigateTo({
					url: '../../goods/goods?gid=' + this.goods.id + "&type=join" + '&groupid=' + this.group.groupid + '&sid=' +
						this.info.gid
				});
			}
		},
		onShareAppMessage(res) {
			let num = Number(this.info.group_num) - 1
			if (res.from === 'button') {}
			return {
				title: '【还差' + num + '人,拼团】我买了"' + this.goods.pro_name + '"',
				path: 'pages/seckill/join/join?type=group' + '&sn=' + this.group.sn + '&groupid=' + this.group.groupid,
				success: function(res) {}
			}
		}

	}
</script>

<style lang="scss">
	.goods {
		padding: 20upx;

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
						font-size: 35upx;
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
					}
				}
			}

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.card {
		padding: 20upx;

		.user {
			display: flex;
			justify-content: center;
			margin-bottom: 30upx;

			.img {
				margin-left: 5upx;
				width: 68upx;
				height: 68upx;
				border-radius: 50%;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
		}

		.time {
			display: flex;
			justify-content: center;
			margin-bottom: 30upx;
		}

		.invite {
			margin: 0 auto;
			background-color: #c03d38;
			color: #FFFFFF;
			border-radius: 10upx;
			height: 80upx;
			line-height: 80upx;
			text-align: center;
			width: 90%;
		}
	}
</style>
