(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/ratings/ratings"],{1690:function(e,t,n){"use strict";var o=n("d4b8"),i=n.n(o);i.a},"2b35":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{labelList:[{name:"全部",number:25,type:"all"},{name:"好评",number:23,type:"good"},{name:"中评",number:1,type:"secondary"},{name:"差评",number:1,type:"poor"},{name:"有图",number:12,type:"img"},{name:"视频",number:2,type:"video"},{name:"追加",number:2,type:"append"}],labelIndex:0,ratingsList:[],videoDirection:0,showFullscreenBtn:!0,showPlayBtn:!0,isPlayVideo:!0,videoSrc:""}},onReady:function(t){this.videoContext=e.createVideoContext("myVideo")},onPullDownRefresh:function(){setTimeout(function(){e.stopPullDownRefresh()},1e3)},onReachBottom:function(){e.showToast({title:"触发上拉加载"})},methods:{loadRatings:function(t){this.labelIndex=t,e.showToast({title:"切换评论列表"})},playVideo:function(e){this.videoSrc=e,this.$nextTick(function(){this.videoContext.requestFullScreen({direction:0})})},stopPlayVideo:function(){this.videoContext.pause()},videoPause:function(){this.videoSrc=""},viderFullscreen:function(e){e.detail.fullScreen?this.videoContext.play():this.stopPlayVideo()},showBigImg:function(t,n){e.previewImage({current:t,urls:n})}}};t.default=n}).call(this,n("543d")["default"])},"6d90":function(e,t,n){"use strict";(function(e){n("a5c7"),n("921b");o(n("66fd"));var t=o(n("6e4e"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"6e4e":function(e,t,n){"use strict";n.r(t);var o=n("78a7"),i=n("98e4");for(var u in i)"default"!==u&&function(e){n.d(t,e,function(){return i[e]})}(u);n("1690");var a,r=n("f0c5"),c=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);t["default"]=c.exports},"78a7":function(e,t,n){"use strict";var o,i=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",function(){return i}),n.d(t,"c",function(){return u}),n.d(t,"a",function(){return o})},"98e4":function(e,t,n){"use strict";n.r(t);var o=n("2b35"),i=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,function(){return o[e]})}(u);t["default"]=i.a},d4b8:function(e,t,n){}},[["6d90","common/runtime","common/vendor"]]]);