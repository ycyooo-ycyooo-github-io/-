(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/address/address"],{"14b2":function(t,e,n){"use strict";var s=n("3acd"),a=n.n(s);a.a},"32b8":function(t,e,n){"use strict";n.r(e);var s=n("d3e0"),a=n("5632");for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n("14b2");var c,r=n("f0c5"),u=Object(r["a"])(a["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],c);e["default"]=u.exports},"3acd":function(t,e,n){},5632:function(t,e,n){"use strict";n.r(e);var s=n("afe3"),a=n.n(s);for(var i in s)"default"!==i&&function(t){n.d(e,t,function(){return s[t]})}(i);e["default"]=a.a},afe3:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{isSelect:!1,addressList:[],secret:{}}},onShow:function(){var e=this;t.getStorage({key:"user",success:function(t){e.secret=t.data,e.loadData(),e.getDefaultAddress()}})},onLoad:function(t){"select"==t.type&&(this.isSelect=!0)},methods:{getDefaultAddress:function(){var e={xopenid:this.secret.openid,secret:this.secret.secret,timestamp:this.secret.timestamp};this.$xm.post("/Order/getDefAdr",e,function(e){t.setStorage({key:"address",data:e,success:function(t){}})})},edit:function(e){t.navigateTo({url:"edit/edit?type=edit&id="+e.id})},add:function(){t.navigateTo({url:"edit/edit?type=add"})},loadData:function(){var t=this,e={xopenid:this.secret.openid,secret:this.secret.secret,timestamp:this.secret.timestamp};this.$xm.post("/User/shipAdr",e,function(e){e&&(e.forEach(function(t){t.head=t.name.substring(0,1)}),t.addressList=e||[])})},select:function(e){this.isSelect&&t.setStorage({key:"selectAddress",data:e,success:function(){t.navigateBack()}})}}};e.default=n}).call(this,n("543d")["default"])},d3e0:function(t,e,n){"use strict";var s,a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return i}),n.d(e,"a",function(){return s})},ff72:function(t,e,n){"use strict";(function(t){n("e1d9"),n("921b");s(n("66fd"));var e=s(n("32b8"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["ff72","common/runtime","common/vendor"]]]);