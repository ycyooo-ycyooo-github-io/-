<template>
	<view class="tarbar">
		<view class="tarbar-list" :style="{
                background: tabBar.backgroundColor,
                color: tabBar.color,
                'border-top': tabBar.position == 'bottom' ? '1rpx solid ' + tabBar.borderStyle : 0,
                'border-bottom': tabBar.position == 'top' ? '1rpx solid ' + tabBar.borderStyle : 0
            }">
			<view class="tarbar-list-ul">
				<view class="tarbar-list-li" v-for="(item, index) in tabBar.list" :key="index" @tap="setSelected(item.pagePath)">
					<view class="tarbar-list-li-icon">
						<image :src="selected == item.id ? item.selectedIconPath : item.iconPath" mode=""></image>
					</view>
					<view class="tarbar-list-li-name" :class="selected == item.id ? 'active' :''">{{ item.text }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['selected'],
		data() {
			return {
				tabBar: {
					color: '#ccc',
					selectedColor: '#E84351',
					borderStyle: '#ccc',
					backgroundColor: '#fff',
					position: 'bottom',
					list: [{
							pagePath: '/pages/seckill/seckill/seckill',
							iconPath: '/static/img/seckill/ms.png',
							selectedIconPath: '/static/img/seckill/ms-on.png',
							text: '秒杀',
							id:'0'
						},						
						{
							pagePath: '/pages/seckill/group/group',
							iconPath: '/static/img/seckill/pt.png',
							selectedIconPath: '/static/img/seckill/pt-on.png',
							text: '拼团',
							id:'1'
						},
						{
							pagePath: '/pages/seckill/bargain/bargain',
							iconPath: '/static/img/seckill/kj.png',
							selectedIconPath: '/static/img/seckill/kj-on.png',
							text: '砍价',
							id:'2'
						},
						// {
						// 	pagePath: '/pages/goods/goods-list/product/product?key=2',
						// 	iconPath: '/static/img/seckill/ten.png',
						// 	selectedIconPath: '/static/img/seckill/ten-on.png',
						// 	text: '十元',
						// 	id:'3'
						// },
						{
							pagePath: '/pages/goods/goods-list/product/product?key=3',
							iconPath: '/static/img/seckill/hot.png',
							selectedIconPath: '/static/img/seckill/hot-on.png',
							text: '特卖',
							id:'4'
						}
					]
				},
				oldSelected: 0,
				isShowMask: false
			};
		},
		onLoad() {},
		methods: {
			setSelected(index) {
				console.log(index);
				uni.redirectTo({
					url: index
				});

			}
		}
	};
</script>

<style>
	.tarbar {
		width: 100%;
		z-index: 9999;
		position: fixed;
	}

	.tarbar-list {
		width: 100%;
		background: #4d586f;
		position: fixed;
		left: 0;
		bottom: 0;
	}

	.tarbar-list-ul {
		width: 100%;
		height: 100%;
		padding: 10upx 30upx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.tarbar-list-li {
		width: 80upx;
		height: 80upx;
	}

	.tarbar-list-li-icon {
		width: 50upx;
		height: 50upx;
		margin: 0 auto;
	}

	.tarbar-list-li-icon image {
		width: 50upx;
		height: 50upx;
	}

	.tarbar-list-li-name {
		width: 100%;
		text-align: center;
		line-height: 30upx;
		font-size: 25upx;
		height: 30upx;
	}

	.tarbar-list-li-center {
		width: 100upx;
	}

	.tarbar-list-li-center .tarbar-list-li-icon,
	.tarbar-list-li-center .tarbar-list-li-icon image {
		width: 90upx;
		height: 60upx;
	}

	.active {
		color: #c03d38;
	}
</style>
