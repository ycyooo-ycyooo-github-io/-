import {
	ApiUrl
} from './ajax/env.js'
import md5 from "./utils/md5.js"
// POST请求
function post(url, params, success, fail) {
	let that = this;
	if (uni.getStorageSync('user')) {
		const user = uni.getStorageSync('user');
		const cooking = JSON.parse(JSON.stringify(user).replace(/openid/g, "xopenid"));
		if (uni.getStorageSync('store').store_code) {
			cooking.store = uni.getStorageSync('store').store_code
		} else {
			cooking.store = '10001'
		}
		let label = Object.assign(cooking, params);
		uni.request({
			url: ApiUrl + url,
			method: 'POST',
			header: {
				'Content-type': 'application/x-www-form-urlencoded'
			},
			data: label,
			success: res => {
				success(res.data) //回调
			},
			fail: (res) => {
				console.log(res);
				uni.hideLoading();
				uni.showModal({
					content: "网络异常,请重新加载",
					success: (e) => {
						if (e.confirm) {
							load("重新加载")
							loadsatus = 2
							setTimeout(function() {
								post(url, params, success, fail)
							}, 1000)
						}
					}
				})
				if (res.errMsg == "request:fail timeout") {
					return false;
				};
				fail(res) //回调
			},
			complete: function() {}
		});
	} else {
		console.log("登录失败");
		uni.getProvider({
			service: 'oauth',
			success: function(res) {
				console.log(res.provider[0]);
				let http;
				if (res.provider[0] == 'weixin') {
					http = 'https://dh.xmvogue.com/API/Index/index/'
				} else {
					http = 'https://dh.xmvogue.com/API/Index/index_zjtd/'
				}
				uni.login({
					provider: res.provider[0],
					success: (res) => {
						var timestamp = (new Date()).getTime();
						var secret = md5.hex_md5("XM#" + md5.hex_md5(String(timestamp)) + "@secret");
						console.log(res)
						if (res.code) {
							uni.request({
								url: http,
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
											post(url, params, success, fail)
										}
									});
								}
							});
						}
					}
				});
			}
		});
	}

}
// 优化商品数据
function requestImg(list) {
	list.forEach((item, index) => {
		if (item.pro_price) {
			item.pro_price = Number(item.pro_price)
		}
		if (item.pronum) {
			item.pronum = Number(item.pronum)
		}
		item.pro_img =
			"http://img.xmvogue.com/thumb/" +
			item.pro_sn +
			".jpg?x-oss-process=style/300";
	})
}
/**
 * 把时间转化成2017-05-28 00:00:00 类似这样的时间格式
 */
function changeTime(time) {
	let date = new Date(time);
	let z = date.getFullYear() + '年',
		b = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月',
		n = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + " 日",
		h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ":",
		m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ":",
		s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
	return z + b + n + h + m + s;
}
/**
 * 把时间转化成2017-05-28类似这样的时间格式
 */
function changeDay(time) {
	let date = new Date(time);
	let z = date.getFullYear() + '-',
		b = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
		n = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
	return z + b + n;
}
// 登录方式
function userProvider(){
	let provider;
	uni.getProvider({
		service: 'oauth',
		success: function(res) {
			provider=res.provider[0];				
		},
	})
	return provider;	
}
export default {
	post: post,
	requestImg: requestImg,
	changeTime: changeTime,
	changeDay: changeDay,
	userProvider:userProvider
}
