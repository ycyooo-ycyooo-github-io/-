(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/divider/divider"],{"2a632":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"tuiDivider",props:{height:{type:Number,default:100},width:{type:String,default:"100%"},dividerColor:{type:String,default:"#e5e5e5"},color:{type:String,default:"#999"},size:{type:Number,default:24},bold:{type:Boolean,default:!1},bgcolor:{type:String,default:"#fafafa"},gradual:{type:Boolean,default:!1},gradualColor:{type:Array,default:function(){return["#eee","#ccc"]}}},methods:{getBgColor:function(t,e,r){var n=r;return t&&(n="linear-gradient(to right,"+e[0]+","+e[1]+","+e[1]+","+e[0]+")"),n}}};e.default=n},"73cc":function(t,e,r){},"7f68":function(t,e,r){"use strict";var n,a=function(){var t=this,e=t.$createElement,r=(t._self._c,t.getBgColor(t.gradual,t.gradualColor,t.dividerColor));t.$mp.data=Object.assign({},{$root:{m0:r}})},u=[];r.d(e,"b",function(){return a}),r.d(e,"c",function(){return u}),r.d(e,"a",function(){return n})},9141:function(t,e,r){"use strict";r.r(e);var n=r("2a632"),a=r.n(n);for(var u in n)"default"!==u&&function(t){r.d(e,t,function(){return n[t]})}(u);e["default"]=a.a},c2e7:function(t,e,r){"use strict";r.r(e);var n=r("7f68"),a=r("9141");for(var u in a)"default"!==u&&function(t){r.d(e,t,function(){return a[t]})}(u);r("c976");var o,i=r("f0c5"),l=Object(i["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=l.exports},c976:function(t,e,r){"use strict";var n=r("73cc"),a=r.n(n);a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/divider/divider-create-component',
    {
        'components/divider/divider-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("c2e7"))
        })
    },
    [['components/divider/divider-create-component']]
]);
