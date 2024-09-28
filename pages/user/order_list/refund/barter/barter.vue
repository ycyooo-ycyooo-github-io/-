<template>
	<view style="background-color: #F4F4F4;">
		<view class="goods-info" @tap="togoods()">
			<view class="img">
				<image src="http://img.xmvogue.com/thumb/6941406808415.jpg?x-oss-process=style/300"></image>
			</view>
			<view class="info">
				<view class="title">斯嘉的小屋36K112张磁扣皮本</view>
				<view class="spec">单价25.00 数量:2</view>
				<view class="price-number">
					<view class="price">￥50</view>
				</view>
			</view>
		</view>		
		<view class="info-box">
			<view class="row">
				<view class="text">换货原因</view>
				<view class="arrow" @tap="showtype">
					<text>{{chooseType}}</text>
					<tui-icon name="arrowright" size="30"></tui-icon>					
				</view>
			</view>
			<view class="row" style="border-bottom: none;">
				<view class="text">换货数量</view>
				<view class="arrow">
					<tui-numberbox :value="value" @change="change"></tui-numberbox>
				</view>
			</view>
			<view class="row" style="border-bottom: none;">
				<view class="text">收获地址</view>
				<view class="arrow">					
					<text>{{address}}</text>
					<tui-icon name="arrowright" size="30"></tui-icon>					
				</view>
			</view>	
		</view>
		<view class="refundMoney">
			<view class="text">换货说明：
				<input type="text" value="" placeholder="选填"/>
			</view>
		</view>
		<view class="upload">
			<view class="text">
				上传凭证
			</view>
			<view class="tui-box-upload">
				<tui-upload :serverUrl="serverUrl"  @complete="result" @remove="remove"></tui-upload>
			</view>
		</view>
		<view class="submit">
			<button type="warn">提交</button>
		</view>
		<!-- 退货方式/退款原因-模态层弹窗 -->
		<view class="popup type" :class="typeClass" @touchmove.stop.prevent="discard" @tap="hideType">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="title">
						退货方式
					</view>
					<radio-group @change="radioChange" >
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value" >
							<view style="margin: 0 20rpx;">{{item.name}}</view>							
							<view>
								<radio :value="item.value" :checked="index === current" />
							</view>
						</label>
					</radio-group>
				</view>
				<view class="btn">
					<view class="button" @tap="hideType">完成</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	import tuiUpload from '@/components/tui-upload/tui-upload.vue'
	import tuiNumberbox from "@/components/numberbox/numberbox.vue"
	export default {
		components: {
			tuiIcon,
			tuiUpload,
			tuiNumberbox
		},
		data() {
			return {
				ordersn: '', //订单编号
				id: '', //商品ID
				goods: {},
				typeClass:'',
				chooseType:'七天无理由换货',
				reason:'请选择',
				// 换货数量
				value: 1,
				items: [{
						value: '0',
						name: '七天无理由换货'
					},
				],				
				current: 0,
				imageData: [],
				address:'',
				//上传地址
				serverUrl:"https://dh.xmvogue.com"
			};
		},
		onLoad(option) {
			// this.id = option.id;
			// this.ordersn = option.ordersn;
			// console.log(this.id, this.ordersn);
		},
		methods: {
			getDetail() {

			},
			togoods() {

			},
			//货物状态弹窗
			showtype() {
				this.typeClass = 'show';
			},
			//关闭货物状态弹窗
			hideType() {
				this.typeClass = 'hide';
				setTimeout(() => {
					this.typeClass = 'none';
				}, 200);
			},
			
			radioChange(e) {				
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === e.target.value) {
						this.current = i;
						this.chooseType=this.items[i].name;
						break;
					}
				}
			},
			// 换货数量
			change(e) {
				this.value = e.value;
				if (this.value < 1) {
					this.value = 1;
					uni.showToast({
						title: "亲，不能再减少了",
						icon: 'none'
					});
				}
			},
			result(e) {
				console.log(e)
				this.imageData = e.imgArr;
			},
			remove(e) {
				//移除图片
				console.log(e)
				let index = e.index
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
	
	.info-box {
		width: 100%;		
		background-color: #fff;
		margin-bottom: 20upx;

		.row {
			display: flex;
			align-items: center;			
			border-bottom: 1px solid #EEEEEE;
			padding: 30rpx;

			.text {
				font-size: 26upx;				
				margin-right: 20upx;
			}
			.desc{
				font-size: 20rpx;
				color: #B2B2B2;
				padding: 20rpx 0;
			}
			.arrow {
				position: absolute;
				right: 4%;
				font-size: 24rpx;				
				.icon {
					color: #6C6C6C;
				}
			}
		}
	}
	.refundMoney{
		width: 100%;
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 30rpx;
		.text{
			display: flex;
			justify-content: left;
			align-items: center;
			font-size: 26upx;
		}
		.desc{
			padding: 20rpx 0;
			color: #B2B2B2;
			font-size: 22rpx;
		}
	}
	.upload{
		width: 100%;
		background-color: #fff;
		padding: 30rpx;
		.text{
			font-size: 26rpx;
		}
		.tui-box-upload{
			margin-top: 20rpx;
		}
	}
	.submit{
		position: fixed;
		bottom: 0;
		width: 100%;
		button{
			border-radius: 0 !important;
		}
	}
	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}

		.layer {
			position: fixed;
			z-index: 22;
			bottom: 0;
			width: 92%;
			padding: 0 4%;
			height: 60%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			.content {
				width: 100%;
				padding: 20upx 0;
				.title{
					text-align: center;
					font-size: 30rpx;
					padding: 15rpx 0;
				}
				.uni-list-cell{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20rpx 10rpx;
					border-bottom: 1px solid #EEEEEE;
				}
			}

			.btn {
				width: 100%;
				height: 100upx;

				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f47952;
					font-size: 28upx;
				}
			}
		}

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}




	}
</style>
