<template>
	<view style="background-color: #f8f8f8;">
		<view class="goods-info" @tap="togoods(goods.proid)">
			<view class="img">
				<image :src="goods.pro_sn"></image>
			</view>
			<view class="info">
				<view class="title">{{goods.pro_name}}</view>
				<view class="spec">单价{{goods.pro_price}} 数量:{{goods.pro_num}}</view>
				<view class="price-number">
					<view class="price">￥{{goods.subtotal}}</view>
				</view>
			</view>
		</view>
		<view class="methods">
			<view class="row">
				<tui-icon name="wealth" color="#e84341" size="30"></tui-icon>
				<view class="info">
					<view class="title">
						我要退款
					</view>
					<view class="desc">
						没收到货，或与卖家协商同意不用退货只退款
					</view>
				</view>
				<tui-icon name="arrowright" size="30" @tap="toType(1)"></tui-icon>
			</view>
			<view class="row">
				<image src="../../../../static/img/refund.png" mode="" style="width: 60rpx;height: 60rpx;"></image>
				<view class="info">
					<view class="title">
						我要退货退款
					</view>
					<view class="desc">
						已收到货，需要退还收到的货物
					</view>
				</view>
				<tui-icon name="arrowright" size="30" @tap="toType(2)"></tui-icon>
			</view>
			<view class="row">
				<image src="../../../../static/img/huan.png" mode="" style="width: 60rpx;height: 60rpx;"></image>
				<view class="info">
					<view class="title">
						我要换货
					</view>
					<view class="desc">
						已收到货，需要更换已收到的货物
					</view>
				</view>
				<tui-icon name="arrowright" size="30" @tap="toType(3)"></tui-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	export default {
		components: {
			tuiIcon
		},
		data() {
			return {
				ordersn: '', //订单编号
				id: '', //商品ID
				goods: {},

			};
		},
		onLoad(option) {
			this.id = option.id;
			this.ordersn = option.ordersn;
			this.getDetail();
		},
		methods: {
			getDetail() {
				let data={
					order_sn:this.ordersn,
					proid:this.id
				}
				this.$xm.post('/Service/proinfo',data,(res)=>{
					this.goods=res.data;
					this.goods.pro_sn='http://img.xmvogue.com/thumb/' + this.goods.pro_sn + '.jpg?x-oss-process=style/300';
					uni.setStorageSync('refund',res.data)
				})
			},
			togoods(e) {
				uni.navigateTo({
					url:'../../../goods/goods?gid='+e
				})
			},
			toType(e){
				if(e==1){
					uni.navigateTo({
						url:'money/money'
					})
				}else if(e==2){
					uni.navigateTo({
						url:'refundGood/refundGood'
					})
				}else if(e==3){
					uni.navigateTo({
						url:'barter/barter'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.goods-info {
		background-color: #fff;
		display: flex;
		width: 92%;
		padding: 20rpx 3%;
		margin: 20rpx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

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
				font-size: 28upx;
				height: 40upx;

				.price {
					color: #f06c7a;
				}
			}
		}
	}

	.methods {
		width: 100%;
		background-color: #fff;
		margin-top: 20rpx;

		.row {
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ECECEC;

			.info {
				text-align: left;
				width: 70%;

				.title {
					font-size: 26rpx;

				}

				.desc {
					color: #B2B2B2;
					font-size: 24rpx;
					margin-top: 15rpx;
				}
			}
		}
	}
</style>
