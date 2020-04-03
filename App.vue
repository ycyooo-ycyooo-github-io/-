<script>
	import md5 from "@/common/utils/md5.js"
	export default {
		globalData: {

		},
		onLaunch: function() {
			console.log('App Launch')			
			if (uni.canIUse('getUpdateManager')) {
				const updateManager = uni.getUpdateManager()
				updateManager.onCheckForUpdate(function(res) {
					console.log(res)
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							uni.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success: function(res) {
									if (res.confirm) {
										updateManager.applyUpdate()
									}
								}
							})
						})
						updateManager.onUpdateFailed(function() {
							uni.showModal({
								title: '已经有新版本了哟~',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
							})
						})
					}
				})
			} else {
				uni.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}


		},
		onShow: function(res) {
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					console.log(res.provider[0]);
					let url;
					if (res.provider[0] == 'weixin') {
						url = 'https://dh.xmvogue.com/API/Index/index/'
					} else {
						url = 'https://dh.xmvogue.com/API/Index/index_zjtd/'
					}
					uni.login({
						provider: res.provider[0],
						success: (res) => {
							var timestamp = (new Date()).getTime();
							var secret = md5.hex_md5("XM#" + md5.hex_md5(String(timestamp)) + "@secret");
							console.log(res)
							if (res.code) {								
								console.log(url)
								uni.request({
									url: url,
									data: {
										code: res.code,
										secret: secret,
										timestamp: timestamp
									},
									method: 'POST',
									header: {
										"Content-Type": "application/x-www-form-urlencoded" //自定义请求头信息
									},
									success: (res) => {
										res.data.secret = secret;
										res.data.timestamp = timestamp;
										uni.setStorage({
											key: 'user',
											data: res.data,
											success: (res) => {
												console.log(res);
											}
										});
									}
								});
							}
						}
					});
				}
			});
			
			uni.setStorageSync('scene', res.scene);
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/static/iconfont/font.scss";

	.title-two {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.title-one {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
