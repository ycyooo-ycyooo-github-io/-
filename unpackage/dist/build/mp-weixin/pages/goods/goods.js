(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/goods"],{"196e":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;o("2e70");function i(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var n=function(){return o.e("components/icon/icon").then(o.bind(null,"1840"))},s=function(){return o.e("components/numberbox/numberbox").then(o.bind(null,"ea74"))},r=function(){return o.e("components/rate/rate").then(o.bind(null,"03ba"))},c=function(){return o.e("wxcomponents/hch-poster/hch-poster").then(o.bind(null,"5baf"))},a=function(){return o.e("components/countdown/countdown").then(o.bind(null,"b6bd"))},u={onShareAppMessage:function(t){return"button"===t.from&&console.log(t.target),{title:this.goodsData.name,imageUrl:this.swiperList[0].img,path:"pages/goods/goods?gid="+this.goodsData.id,success:function(t){console.log(t)},fail:function(t){console.log(t)}}},components:{tuiNumberbox:s,tuiRate:r,hchPoster:c,tuiIcon:n,tuiCountdown:a},data:function(){return{id:"",secret:"",timestamp:"",beforeHeaderzIndex:11,afterHeaderzIndex:10,beforeHeaderOpacity:1,afterHeaderOpacity:0,swiperList:[{}],currentSwiper:0,anchorlist:[],selectAnchor:0,serviceClass:"",specClass:"",shareClass:"",goodsData:{id:"",name:"",price:"",disPrice:"",group_price:"",number:1,service:[],spec:["XS","S","M","L","XL","XXL"],comment:{number:0,userface:"../../static/img/face.jpg",username:"未上线",content:"商品评论还未上线，敬请期待！"}},selectSpec:null,isKeep:!1,descriptionStr:"",value:1,current:4,xopenid:"",deliveryFlag:!1,canvasFlag:!0,posterData:{},secShow:!1,endTime:0,secPrice:0,nextShow:!1,startTime:0,group:"",rule:["选择商品","支付开团","分享好友","成功(失败退款)"],groupList:[],group_num:"",group_gid:"",couponList:[]}},onLoad:function(t){this.showBack=!1,this.gid=t.gid,t&&t.type&&(this.group=t)},onShow:function(){this.getDetails()},onReady:function(){this.calcAnchor()},onPageScroll:function(t){this.selectAnchor=t.scrollTop>=this.anchorlist[2].top?2:t.scrollTop>=this.anchorlist[1].top?1:0;var e=375;t.scrollTop=t.scrollTop>e?375:t.scrollTop,this.afterHeaderOpacity=t.scrollTop*(1/e),this.beforeHeaderOpacity=1-this.afterHeaderOpacity,this.beforeHeaderzIndex=t.scrollTop>0?10:11,this.afterHeaderzIndex=t.scrollTop>0?11:10},onReachBottom:function(){},mounted:function(){},methods:{getDetails:function(){var t=this,e={id:this.gid};this.$xm.post("/Product/getInfo",e,function(e){var o=e;t.goodsData.id=o.id,t.goodsData.price=o.pro_price,t.goodsData.name=o.pro_name,t.goodsData.disPrice=o.dis_price,t.goodsData.group_price=o.group_price,t.goodsData.service=o.service,t.secPrice=o.sec_price,t.group_gid=o.gid,t.group_num=o.group_num,t.couponList=o.discount,o.keep?t.isKeep=!0:t.isKeep=!1,o.nextstart?(t.nextShow=!0,t.startTime=parseInt(o.nextstart)-Math.round(new Date/1e3)):t.nextShow=!1,o.etime?(t.secShow=!0,t.endTime=parseInt(o.etime)-Math.round(new Date/1e3)):t.secShow=!1,o.group_price&&t.groupData(),t.swiperList[0].img="http://ximiphoto.oss-cn-hangzhou.aliyuncs.com/thumb/"+o.pro_sn+".jpg?x-oss-process=style/600",t.descriptionStr='<div style="text-align:center;"><img width="100%" src="http://img.xmvogue.com/detail/'+o.pro_sn+'-.jpg?x-oss-process=style/800"/></div>'})},groupData:function(){var t=this,e={gid:this.gid};this.$xm.post("/groupbuy/get_group_list",e,function(e){e&&(e.forEach(function(t){t.num=Number(t.group_num)-Number(t.list.length),t.seckillTime=parseInt(t.etime)-Math.round(new Date/1e3)}),t.groupList=e)})},bindGroup:function(e){var o;o=t.getStorageSync("store").store_code?t.getStorageSync("store").store_code:10001,t.navigateTo({url:"../order/confirmation?store="+o+"&proid="+this.gid+"&pronum="+this.value+"&type=join&groupid="+e.geoup_id+"&sid="+e.gid})},like:function(){var e=this,o={proid:this.gid};this.$xm.post("/Collect/addcollect",o,function(o){"添加成功!"==o.msg&&(e.isKeep=!0,t.showToast({title:"收藏成功"})),console.log(o)})},dellike:function(){var e,o=this;t.showModal((e={title:"确定取消收藏吗？",content:"",confirmText:"取  消",cancelColor:"#b2b2b2"},i(e,"confirmText","确  定"),i(e,"confirmColor","#2c2c2c"),i(e,"success",function(e){if(e.confirm){var i={id:o.gid};o.$xm.post("/Collect/delcollect",i,function(e){console.log(e),2e3==e.code&&(o.isKeep=!1,t.showToast({title:"删除成功"}))})}}),e))},swiperChange:function(t){this.currentSwiper=t.detail.current},change:function(e){this.value=e.value,console.log(this.secPrice),this.secPrice&&this.value>1&&(this.value=1,t.showToast({title:"秒杀商品限购一件！",icon:"none"})),this.value<1&&(this.value=1,t.showToast({title:"亲，不能再见少了",icon:"none"}))},cart:function(){t.switchTab({url:"../tabBar/cart/cart"})},share:function(){this.shareClass="show"},hideShare:function(){var t=this;this.shareClass="hide",setTimeout(function(){t.shareClass="none"},150)},createCanvasImageEvn:function(){var t=this;this.shareClass="hide",Object.assign(this.posterData,{url:this.swiperList[0].img,title:this.goodsData.name,discountPrice:this.goodsData.disPrice||0,orignPrice:this.goodsData.price,code:"pages/details/details?gid="+this.gid,id:this.gid,close:"../../static/img/close_btn.png"}),this.$forceUpdate(),setTimeout(function(){t.canvasFlag=!1,t.deliveryFlag=!1,t.$refs.hchPoster.createCanvasImage()},500)},canvasCancel:function(t){this.canvasFlag=t,this.getDetails()},joinCart:function(){var e={proid:this.gid,pronum:this.value};this.$xm.post("/Cart/add",e,function(e){var o=e.msg;1==e.s?t.showToast({title:o}):0==e.s&&t.showToast({title:o,icon:"none"})})},buy:function(){this.toConfirmation()},toRatings:function(){t.navigateTo({url:"./ratings/ratings"})},toConfirmation:function(){var e;e=t.getStorageSync("store").store_code?t.getStorageSync("store").store_code:10001,t.navigateTo({url:"../order/confirmation?store="+e+"&proid="+this.gid+"&pronum="+this.value})},showComments:function(t){},setSelectSpec:function(t){this.selectSpec=t},sub:function(){this.goodsData.number<=1||this.goodsData.number--},add:function(){this.goodsData.number++},toAnchor:function(e){this.selectAnchor=e,t.pageScrollTo({scrollTop:this.anchorlist[e].top,duration:200})},calcAnchor:function(){var e=this;this.anchorlist=[{name:"主图",top:0},{name:"评价",top:0},{name:"详情",top:0}];var o=t.createSelectorQuery().select("#comments");o.boundingClientRect(function(o){console.log(o);var i=0,n=t.upx2px(100);e.anchorlist[0].top=o.top-n-i,e.anchorlist[1].top=o.bottom-n-i}).exec()},back:function(){t.navigateBack()},showService:function(){this.serviceClass="show"},hideService:function(){var t=this;this.serviceClass="hide",setTimeout(function(){t.serviceClass="none"},200)},showSpec:function(t){this.specClass="show",this.specCallback=t},specCallback:function(){},hideSpec:function(){var t=this;this.specClass="hide",this.selectSpec&&this.specCallback&&this.specCallback(),this.specCallback=!1,setTimeout(function(){t.specClass="none"},200)},discard:function(){},joinGroup:function(){var e;e=t.getStorageSync("store").store_code?t.getStorageSync("store").store_code:10001,"join"==this.group.type?t.navigateTo({url:"../order/confirmation?store="+e+"&proid="+this.gid+"&pronum="+this.value+"&type="+this.group.type+"&groupid="+this.group.groupid+"&sid="+this.group_gid}):t.navigateTo({url:"../order/confirmation?store="+e+"&proid="+this.gid+"&pronum="+this.value+"&type="+this.group.type+"&sid="+this.group_gid})}}};e.default=u}).call(this,o("543d")["default"])},"1a10":function(t,e,o){},4227:function(t,e,o){"use strict";var i=o("1a10"),n=o.n(i);n.a},"9e04":function(t,e,o){"use strict";o.r(e);var i=o("196e"),n=o.n(i);for(var s in i)"default"!==s&&function(t){o.d(e,t,function(){return i[t]})}(s);e["default"]=n.a},a460:function(t,e,o){"use strict";var i,n=function(){var t=this,e=t.$createElement,o=(t._self._c,t.__map(t.couponList,function(e,o){var i=parseInt(e[1].money);return{$orig:t.__get_orig(e),m0:i}}));t.$mp.data=Object.assign({},{$root:{l0:o}})},s=[];o.d(e,"b",function(){return n}),o.d(e,"c",function(){return s}),o.d(e,"a",function(){return i})},be14:function(t,e,o){"use strict";o.r(e);var i=o("a460"),n=o("9e04");for(var s in n)"default"!==s&&function(t){o.d(e,t,function(){return n[t]})}(s);o("4227");var r,c=o("f0c5"),a=Object(c["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);e["default"]=a.exports},f6f5:function(t,e,o){"use strict";(function(t){o("a5c7"),o("921b");i(o("66fd"));var e=i(o("be14"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])}},[["f6f5","common/runtime","common/vendor"]]]);