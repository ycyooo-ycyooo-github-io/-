<template>
	<view>
		<!-- 状态栏 -->
		<view class="status" :style="{position:headerPosition}"></view>
		<view class="header" :style="{position:headerPosition}">
			<view class="addr">
				<image src="../../../static/img/logo.png" mode="" class="logo"></image>
			</view>
			<view class="input-box">
				<input placeholder="熙美诚品" placeholder-style="color:#c0c0c0;" @tap="toSearch()" />
				<view class="icon search"></view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view scroll-y="true" class="left">
				<view class="row" :class="[showCategoryIndex==1000?'on':'']"
				 @tap="shownewGoods">
					<view class="text">
						<view class="block"></view>
						新品推荐
					</view>
				</view>
				<view class="row" v-for="(category,index) in categoryList" :key="index" :class="[category.id==showCategoryIndex?'on':'']"
				 @tap="showCategory(category.id)">
					<view class="text">
						<view class="block"></view>
						{{category.cate_name}}
					</view>
				</view>
			</scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view scroll-y="true" class="right" @scrolltolower="loadMore" :scroll-top="scrollTop">
				
				<view class="header-info">
					<view class="cate">
						<scroll-view scroll-x scroll-with-animation class="tab-view" :scroll-left="scrollLeft">
							<view class="tab-bar-item" :class="[currentTab==0 ? 'active' : '']" @tap.stop="swichall" style="margin-left:0;">
								<text class="tab-bar-title">全部</text>
							</view>
							<view v-for="(item,index) in tabbar" :key="index" class="tab-bar-item" :class="[currentTab==item.id ? 'active' : '']"
							 :data-current="index" @tap.stop="swichNav(item.id)">
								<text class="tab-bar-title">{{item.cate_name}}</text>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="place"></view>
				<view class="category">
					<view class="banner" v-show="showCategoryIndex==1000">
						<image :src="newImg"></image>
					</view>
					<view class="banner" v-for="(category,index) in categoryList" :key="index" v-show="category.id==showCategoryIndex">
						<image :src="category.img" ></image>
					</view>
					<view class="goodslist">
						<view class="good-info" v-for="(item,index) in productList" :key="index">
							<view class="left-info" @tap="toGoods(item)">
								<image :src="item.pro_sn" mode=""></image>
							</view>
							<view class="right-info">
								<view class="title title-two" @tap="toGoods(item)">{{item.pro_name}}</view>
					
								<view class="price">
									<text class="p" @tap="toGoods(item)" v-if="item.dis_price">¥{{ item.dis_price }}
										<text class="dis_price" v-if="item.dis_price" style="font-size: 24rpx;text-decoration: line-through;">{{item.pro_price}}</text>
									</text>
									<text class="p" @tap="toGoods(item)" v-else>¥{{item.pro_price}}</text>
									<view class="cartNum">
										<image src="../../../static/img/tabBar/cart-on.png" mode="" class="cart" @tap="joinCart(item)"></image>
										<text class="num" v-if="item.itemcount>0">{{item.itemcount}}</text>
									</view>
					
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="loading-text">{{loadingText}}</view>				
			</scroll-view>
		</view>
	</view>
</template>
<script>
	import tuiIcon from "@/components/icon/icon"
	import {
		ajax,
		getSecret
	} from '@/common/ajax/ajax.js'
	export default {
		components: {
			tuiIcon
		},
		data() {
			return {
				openid: '',
				// 商品分类ID
				fid: 160,
				mid: '',
				small: '',
				// pageid: 1,
				secret: '',
				timestamp: '',
				showCategoryIndex: 1000,
				headerPosition: "fixed",
				tabbar: [],
				winHeight: "", //窗口高度
				currentTab: 0, //预设当前项的值
				scrollLeft: 0, //tab标题的滚动条位置
				showHeader: true,
				//分类列表
				categoryList: [],
				productList: [],
				pagecount: '',
				// 显示全部分类
				allShow: false,
				stateTab: true,
				pronum: 0,
				loadingText: '正在加载中',
				scrollTop: 0,
				flag: true, //记录是否请求数据的状态
				page: 1,
				addShow: true,
				top: 0,
				newImg:null
			}
		},

		onPageScroll(e) {
			
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},

		onLoad() {			
			this.getbig()
			if(this.showCategoryIndex==1000){
				this.getnewGoods()
			}else{
				this.getList()
			}
			
			
		},
		onShow() {
			let index = uni.getStorageSync('cateSelect');
			if (index) {
				this.productList = []
				this.showCategoryIndex = index;
				this.loadingText = '正在加载中...';
				if(index==1000){
					this.tabbar=[];
					this.getnewGoods()
				}else{
					this.fid = index;
					this.getList();
				}
			}
		},
		onHide() {
			uni.removeStorageSync('cateSelect');
		},		
		methods: {			
			loadMore() {
				this.page++
				if (this.page <= this.pagecount) {
					setTimeout(()=>{
						this.getgoodList();
					},2000)
					
					this.loadingText = '正在加载中...';
				} else {
					this.loadingText = '到底了';
				}
			},
			// 点击标题切换当前页时改变样式
			swichNav(e) {
				if (this.currentTab == e) {
					return false;
				} else {
					this.currentTab = e
				}
				this.mid = e;
				this.page = 1;
				this.productList = [];
				this.getgoodList();
			},
			isshow() {
				this.allShow = true
			},
			close() {
				this.allShow = false;
			},
			swichall() {
				this.mid = '';
				this.currentTab = 0;
				this.page = 1;
				this.productList = [];
				this.getgoodList();
			},
			// 获取分类商品
			getList() {
				let data = {
					fid: this.fid
				}
				this.$xm.post('/Procate/getMid', data, (res) => {
					this.tabbar = res;
					this.getgoodList()
				})

			},
			// 获取商品总分类
			getbig() {
				this.$xm.post('/Procate/getBig', '', (res) => {
					this.categoryList = res;
				})

			},
			// 获取商品
			getgoodList() {
				this.flag = false;
				let data = {
					big: this.fid,
					mid: this.mid,
					small: this.small,
					pageid: this.page
				}
				this.$xm.post('/Product/proList', data, (res) => {
					let result = res.prolist;
					if (res.prolist.length == 0 || res.count==1) {
						this.loadingText = '没有更多商品了！'
					} else {
						this.loadingText = '正在加载中...'
					}
					result.map((ele) => {
						ele.pro_sn = 'http://img.xmvogue.com/thumb/' + ele.pro_sn + '.jpg?x-oss-process=style/300'
						ele.itemcount = 0;

					})
					this.pagecount = res.count;
					this.productList = this.productList.concat(result);

					console.log(this.productList)
				})

			},
			//分类切换显示
			showCategory(index) {
				this.loadingText = '正在加载中...';
				this.productList = [];
				this.showCategoryIndex = index;
				this.fid = index;
				this.currentTab = 0;
				this.mid = '';
				this.page = 1;
				this.newImg=null;
				this.getList()
			},
			// 新品推荐
			shownewGoods(){
				this.loadingText = '正在加载中...';
				this.productList = [];
				this.showCategoryIndex = 1000;
				this.page = 1;
				this.tabbar=[];
				this.getnewGoods()
			},
			getnewGoods(){
				let data={
					p:this.page
				}
				this.$xm.post('/Index/newpro',data,(res)=>{
					console.log(res);
					this.pagecount=Number(res.p);
					if (this.pagecount==1) {
						this.loadingText = '到底了！'
					} else {
						this.loadingText = '正在加载中...'
					}
					res.data.forEach(ele=>{
						ele.pro_sn = 'http://img.xmvogue.com/thumb/' + ele.pro_sn + '.jpg?x-oss-process=style/300'
						ele.itemcount = 0;
					})
					this.productList = this.productList.concat(res.data);
					this.newImg=res.img;
					console.log(this.newImg);
				})
			},
			//商品跳转
			toGoods(e) {
				uni.navigateTo({
					url: '../../goods/goods?gid=' + e.id
				});
			},
			// 加入购物车
			joinCart(e) {
				if (this.addShow) {
					e.itemcount++;
				}
				let data = {
					proid: e.id,
					pronum: 1
				};
				this.$xm.post('/Cart/add', data, (res) => {
					let result = res.msg;
					if (res.s == 1) {
						this.addShow = true;
						uni.showToast({
							title: result
						});
					} else if (res.s == 0) {
						this.addShow = false;
						uni.showToast({
							title: result,
							icon: 'none'
						});
					}
				})
			},
			//搜索跳转
			toSearch() {
				uni.navigateTo({
					url: '../../search/search/search'
				})
			}
		}
	}
</script>
<style lang="scss">
	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */

	}

	.header {
		width: 92%;
		padding: 0 4%;
		// height: 100upx;
		display: flex;
		padding-left: 10rpx;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */

		.addr {
			width: 190upx;
			height: 50upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;

			.logo {
				width: 100%;
				height: 100%;
			}
		}

		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
			margin-left: 20upx;

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

		.icon-btn {
			width: 60upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;

			.icon {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}

	.place {

		background-color: #ffffff;
		height: 80upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	.category-list {
		width: 100%;
		background-color: #fff;
		display: flex;

		.left,
		.right {
			position: absolute;

			top: 100upx;
			/*  #ifdef  APP-PLUS  */
			top: calc(100upx + var(--status-bar-height));
			/*  #endif  */
			bottom: 0upx;
		}

		.left {
			width: 24%;
			left: 0upx;
			background-color: #f2f2f2;

			.row {
				width: 100%;
				height: 90upx;
				display: flex;
				align-items: center;

				.text {
					width: 100%;
					position: relative;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;

					.block {
						position: absolute;
						width: 0upx;
						left: 0;
					}
				}

				&.on {
					height: 100upx;
					background-color: #fff;

					.text {
						font-size: 30upx;
						font-weight: 600;
						color: #2d2d2d;

						.block {
							width: 10upx;
							height: 80%;
							top: 10%;
							background-color: #f06c7a;
						}
					}
				}
			}
		}

		.right {
			width: 76%;
			left: 24%;
			.tui-scroll-top {
				bottom: 120rpx;
				right: 24rpx;
				width: 76rpx;
				height: 76rpx;
				background: rgba(255, 255, 255, .98);
				border: 1rpx solid #BCBCBC;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
				position: fixed;
				z-index: 999999;
				/* -webkit-transform: translateZ(0);
				transform: translateZ(0); */
				/* -webkit-overflow-scroll: touch; */
				.tui-scroll-top-img {
					width: 48rpx;
					height: 48rpx;
					display: block;
				}
			}		
			
			.loading-text {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 60upx;
				color: #979797;
				font-size: 24upx;
			}

			.header-info {
				padding: 15upx 0;
				background-color: #FFFFFF;
				position: fixed;
				width: 100%;
				z-index: 100;
				padding-top: 0;
				.cate {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 93%;
					margin: auto;
					// .down{
					// 	width: 40upx;

					// }
					.tab-view::before {
						content: '';
						position: absolute;
						border-bottom: 1upx solid #eaeef1;
						-webkit-transform: scaleY(0.5);
						transform: scaleY(0.5);
						bottom: 0;
						right: 20rpx;
						left: 0;
					}

					.tab-view {
						width: 75%;
						overflow: hidden;
						box-sizing: border-box;
						top: 0;
						/* #ifdef H5 */
						top: 44px;
						/* #endif */
						left: 0;
						z-index: 99;
						background: #fff;
						white-space: nowrap;
						// margin-top: 30upx;

						.tab-bar-item {
							padding: 8upx 13upx;
							margin: 0 10upx;
							display: inline-block;
							text-align: center;
							box-sizing: border-box;
							border: 1px solid #CCCCCC;
							border-radius: 10upx;

							.tab-bar-title {
								font-size: 24upx;
								font-weight: 400;
							}
						}

						.active {
							border: 1px solid #e84341;

							.tab-bar-title {
								color: #e84341 !important;
								font-size: 28upx;
							}
						}
					}
				}
			}

			.place {
				background-color: #ffffff;
				height: 80upx;
			}

			.category {
				width: 94%;
				padding: 20upx 3%;
				.banner {
					width: 100%;
					height: 28vw;
					border-radius: 10upx;
					overflow: hidden;
				
					image {
						width: 100%;
						height: 100%;
					}
				}
				
				.goodslist {
					margin-top: 20rpx;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
				
					.good-info {
						width: 100%;
						height: 100rpx;
						display: flex;
						border-bottom: 1px solid #eee;
						padding: 20upx;
						height: 200upx;
				
						.left-info {
							width: 37%;
							height: 200upx;
				
							image {
								width: 200upx;
								height: 200upx;
							}
						}
				
						.right-info {
							width: 70%;
							padding: 20upx;
							margin-left: 20upx;
				
							.title {
								// height: 50%;
							}
				
							.price {
								margin-top: 40upx;
								display: flex;
								justify-content: space-between;
								color: #e84341;
								align-items: center;
				
								.dis_price {
									color: #b2b2b2;
									margin-left: 10rpx;
									font-size: 30rpx;
								}
				
								.cartNum {
									position: relative;
				
									.cart {
										width: 50upx;
										height: 50upx;
									}
				
									.num {
										position: absolute;
										right: -10rpx;
										top: -10rpx;
										display: inline-block;
										width: 30rpx;
										height: 30rpx;
										background-color: red;
										color: #FFFFFF;
										font-size: 25rpx;
										border-radius: 50%;
										display: flex;
										align-items: center;
										justify-content: center;
				
									}
								}
				
							}
						}
					}
				}
			}
		}
	}
</style>
