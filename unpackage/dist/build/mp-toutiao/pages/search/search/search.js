(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/search/search/search"],{1291:function(t,e,s){"use strict";s.r(e);var o=s("c7e0"),i=s("5ac0");for(var n in i)"default"!==n&&function(t){s.d(e,t,function(){return i[t]})}(n);s("22c3");var c,r=s("f0c5"),a=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);e["default"]=a.exports},"135d":function(t,e,s){"use strict";(function(t){s("e146"),s("921b");o(s("66fd"));var e=o(s("1291"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,s("f266")["createPage"])},"1bce":function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{secret:{},headerPosition:"fixed",key:"",historyList:[],hotList:[]}},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onLoad:function(){var e=this;t.getStorage({key:"user",success:function(t){e.secret=t.data,e.getkey()}})},onShow:function(){var e=this;t.getStorage({key:"searchWord",success:function(t){console.log(t.data),e.historyList=t.data}})},methods:{getkey:function(){var t=this,e={secret:this.secret.secret,timestamp:this.secret.timestamp};this.$xm.post("/Product/getSearchKey",e,function(e){t.hotList=e})},to:function(e){t.navigateTo({url:"../../goods/goods-list/goods-list?key="+e})},toSearch:function(){t.navigateTo({url:"../../goods/goods-list/goods-list?key="+this.key}),this.historyList.unshift(this.key),this.historyList=Array.from(new Set(this.historyList)),this.key="",t.setStorage({key:"searchWord",data:this.historyList,success:function(t){},fail:function(t){}})},del:function(){this.historyList=[],t.setStorage({key:"searchWord",data:this.historyList,success:function(t){},fail:function(t){}})}}};e.default=s}).call(this,s("f266")["default"])},"22c3":function(t,e,s){"use strict";var o=s("39df"),i=s.n(o);i.a},"39df":function(t,e,s){},"5ac0":function(t,e,s){"use strict";s.r(e);var o=s("1bce"),i=s.n(o);for(var n in o)"default"!==n&&function(t){s.d(e,t,function(){return o[t]})}(n);e["default"]=i.a},c7e0:function(t,e,s){"use strict";var o,i=function(){var t=this,e=t.$createElement;t._self._c},n=[];s.d(e,"b",function(){return i}),s.d(e,"c",function(){return n}),s.d(e,"a",function(){return o})}},[["135d","common/runtime","common/vendor"]]]);