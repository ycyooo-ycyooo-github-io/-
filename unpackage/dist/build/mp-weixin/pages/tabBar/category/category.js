(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/category/category"],{3739:function(t,i,o){"use strict";o.r(i);var e=o("52a5"),n=o("38bf");for(var s in n)"default"!==s&&function(t){o.d(i,t,function(){return n[t]})}(s);o("d3b4");var a,c=o("f0c5"),r=Object(c["a"])(n["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],a);i["default"]=r.exports},"38bf":function(t,i,o){"use strict";o.r(i);var e=o("9a64"),n=o.n(e);for(var s in e)"default"!==s&&function(t){o.d(i,t,function(){return e[t]})}(s);i["default"]=n.a},"4c9b":function(t,i,o){"use strict";(function(t){o("e146"),o("921b");e(o("66fd"));var i=e(o("3739"));function e(t){return t&&t.__esModule?t:{default:t}}t(i.default)}).call(this,o("543d")["createPage"])},"52a5":function(t,i,o){"use strict";var e,n=function(){var t=this,i=t.$createElement;t._self._c},s=[];o.d(i,"b",function(){return n}),o.d(i,"c",function(){return s}),o.d(i,"a",function(){return e})},"9a64":function(t,i,o){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var e=o("5df8"),n=function(){return o.e("components/icon/icon").then(o.bind(null,"be58"))},s={components:{tuiIcon:n},data:function(){return{openid:"",fid:160,mid:"",small:"",pageid:1,secret:"",timestamp:"",showCategoryIndex:160,headerPosition:"fixed",tabbar:[],winHeight:"",currentTab:0,scrollLeft:0,showHeader:!0,categoryList:[],productList:[],pagecount:"",allShow:!1,stateTab:!0,pronum:0,loadingText:"正在加载中",scrollTop:0}},onPageScroll:function(t){t.scrollTop>=0?this.headerPosition="fixed":this.headerPosition="absolute"},onLoad:function(){var i=this;this.getList();var o=(0,e.getSecret)();this.secret=o.secret,this.timestamp=o.timestamp,t.getStorage({key:"user",success:function(t){i.openid=t.data.openid}}),this.getbig()},onShow:function(){var i=t.getStorageSync("cateSelect");i&&(this.productList=[],this.fid=i,this.showCategoryIndex=i,this.getList())},onHide:function(){t.removeStorageSync("cateSelect")},methods:{loadMore:function(){var t=this;this.pageid++,this.pageid<=this.pagecount?(this.loadingText="正在加载中...",setTimeout(function(){t.getgoodList(),t.scrollTop=0},1e3)):this.loadingText="到底了"},swichNav:function(t){if(this.currentTab==t)return!1;this.currentTab=t,this.mid=t,this.pageid=1,this.productList=[],this.getgoodList()},isshow:function(){this.allShow=!0},close:function(){this.allShow=!1},swichall:function(){this.mid="",this.currentTab=0,this.pageid=1,this.productList=[],this.getgoodList()},getList:function(){var t=this,i={fid:this.fid};this.$xm.post("/Procate/getMid",i,function(i){console.log(i),t.tabbar=i,t.getgoodList()})},getbig:function(){var t=this;this.$xm.post("/Procate/getBig","",function(i){console.log(i),t.categoryList=i})},getgoodList:function(){var t=this,i={big:this.fid,mid:this.mid,small:this.small,pageid:this.pageid};this.$xm.post("/Product/proList",i,function(i){var o=i.prolist;0==i.prolist.length?t.loadingText="没有更多商品！":t.loadingText="正在加载中...",o.map(function(t){t.pro_sn="http://img.xmvogue.com/thumb/"+t.pro_sn+".jpg?x-oss-process=style/300",t.itemcount=0}),t.productList=t.productList.concat(o),t.pagecount=i.count,console.log(t.productList)})},showCategory:function(t){this.loadingText="正在加载中...",this.productList=[],this.showCategoryIndex=t,this.fid=t,this.currentTab=0,this.mid="",this.pageid=1,this.getList()},toGoods:function(i){t.navigateTo({url:"../../goods/goods?gid="+i.id})},joinCart:function(i){i.itemcount++;var o={proid:i.id,pronum:1};this.$xm.post("/Cart/add",o,function(i){var o=i.msg;"加入购物车成功"==o&&t.showToast({title:"已加入购物车"})})},toSearch:function(){t.navigateTo({url:"../../search/search/search"})}}};i.default=s}).call(this,o("543d")["default"])},d3b4:function(t,i,o){"use strict";var e=o("fd98"),n=o.n(e);n.a},fd98:function(t,i,o){}},[["4c9b","common/runtime","common/vendor"]]]);