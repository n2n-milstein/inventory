(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2e058c"],{"1b63":function(t,e,s){},"36a7":function(t,e,s){},"5e41":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-card",{staticClass:"mb-4",attrs:{light:"",color:"white"}},[s("v-row",{staticClass:"pt-3 px-3"},[s("v-col",{staticClass:"pb-0",attrs:{cols:"12"}},[s("h4",{staticClass:"date"},[t._v(" "+t._s(t.request.timing.dateOffered.toDate().toLocaleDateString())+" ")])]),s("v-col",{attrs:{cols:"6"}},[s("h2",{staticClass:"f-class"},[t._v(" "+t._s(t.request.physical.class)+" ")]),s("h3",{staticClass:"f-desc"},[t._v(" "+t._s(t.request.physical.material.toLowerCase())+" "+t._s(t.request.physical.class.toLowerCase())+" "+t._s(t.request.physical.set?", set":"")+" ")])]),s("v-col",{attrs:{cols:"6"}},[s("p",{staticClass:"d-info"},[t._v(" "+t._s(t.request.donor.name)+" ")]),s("p",{staticClass:"d-info"},[t._v(" "+t._s(t.request.donor.phone)+" ")]),s("p",{staticClass:"d-info"},[t._v(" "+t._s(t.request.donor.email)+" ")]),s("p",{staticClass:"d-info"},[t._v(" "+t._s(t.request.donor.address)+" ")])]),s("v-col",{staticClass:"text-center mt-2",attrs:{cols:"12"}},[s("v-btn",{attrs:{block:"",text:""},on:{click:function(e){t.show=!t.show}}},[s("v-icon",[t._v(" "+t._s(t.show?"keyboard_arrow_up":"keyboard_arrow_down")+" ")])],1),s("v-slide-y-transition",[s("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"text-left"},[s("v-divider",{staticClass:"py-2"}),s("h3",{staticClass:"pb-2"},[t._v(" Attributes ")]),s("v-row",[s("v-col",{attrs:{cols:"4"}},t._l(t.pros,(function(e){return s("div",{key:e.key,staticClass:"f-attr f-pro d-flex"},[s("v-icon",{staticClass:"f-attr-icon",attrs:{left:""}},[t._v(" thumb_up ")]),t._v(" "+t._s(e.pretty)+" ")],1)})),0),s("v-col",{attrs:{cols:"4"}},t._l(t.cons,(function(e){return s("div",{key:e.key,staticClass:"f-attr f-con d-flex"},[s("v-icon",{staticClass:"f-attr-icon",attrs:{left:""}},[t._v(" thumb_down ")]),t._v(" "+t._s(e.pretty)+" ")],1)})),0)],1),s("h3",{staticClass:"pt-4 pb-2"},[t._v(" Images ")]),s("v-row",{staticClass:"flex-nowrap",staticStyle:{"overflow-x":"scroll"}},t._l(t.request.images,(function(e,a){return s("div",{key:a,staticClass:"mr-3"},[s("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(a){var i=a.on;return[s("v-img",t._g({staticClass:"f-image",attrs:{src:e.url,"aspect-ratio":"1",width:"10rem"}},i))]}}],null,!0)},[s("span",[t._v(t._s(e.caption?e.caption:"image"))])])],1)})),0),s("h3",{staticClass:"pt-4 pb-2"},[t._v(" Donor Comments ")]),s("div",{staticClass:"f-comments py-2 px-3"},[t._v(" "+t._s(t.request.comments)+" ")]),s("h3",{staticClass:"pt-4 pb-2"},[t._v(" Staff Notes ")]),s("v-textarea",{attrs:{value:t.request.staffNotes,label:"Staff Notes","auto-grow":"",filled:""},on:{change:t.updateNotes}})],1)])],1)],1),s("v-card-actions",[s("v-spacer"),t.isPending?s("v-btn",{attrs:{text:"",color:"red"},on:{click:function(e){return t.$emit("deny",t.request)}}},[t._v(" Deny ")]):t._e(),s("v-btn",{attrs:{text:"",color:"green"},on:{click:function(e){return t.$emit("approve",t.request)}}},[t._v(" "+t._s(t.isPending?"Approve":"Move to Pending")+" ")])],1)],1)},i=[],r=(s("4160"),s("b64b"),s("159b"),s("d4ec")),n=s("bee2"),o=s("262e"),c=s("2caf"),l=s("9ab4"),d=s("2b0e"),u=s("60a3"),h=s("4994"),p=function(){var t,e=t=function(e){Object(o["a"])(a,e);var s=Object(c["a"])(a);function a(){var t;return Object(r["a"])(this,a),t=s.apply(this,arguments),t.show=!1,t.pros=[],t.cons=[],t}return Object(n["a"])(a,[{key:"genProsCons",value:function(e){var s=e.attributes,a=Object.prototype.hasOwnProperty,i=[],r=[];Object.keys(s).forEach((function(e){if(a.call(s,e)){var n=s[e];n?i.push({key:e,pretty:t.prettyAttr(e,!0)}):r.push({key:e,pretty:t.prettyAttr(e,!1)})}})),this.pros=i,this.cons=r}},{key:"updateNotes",value:function(t){this.request.staffNotes=t,this.$emit("notes",this.request)}},{key:"mounted",value:function(){this.genProsCons(this.request)}}],[{key:"prettyAttr",value:function(t,e){var s="";return Object.keys(h["a"]).forEach((function(a){a===t&&(s=e?h["a"][a].prettyPos:h["a"][a].prettyNeg)})),""!==s?s:"Invalid attribute"}},{key:"getRating",value:function(t){var e=t.attributes,s=Object.prototype.hasOwnProperty,a=0;return Object.keys(e).forEach((function(t){if(s.call(e,t)){var i=e[t];i&&(a+=1)}})),a}}]),a}(d["a"]);return Object(l["a"])([Object(u["b"])()],e.prototype,"request",void 0),Object(l["a"])([Object(u["b"])({default:!0})],e.prototype,"isPending",void 0),e=t=Object(l["a"])([u["a"]],e),e}(),v=p,f=v,m=(s("ffbf"),s("2877")),g=s("6544"),b=s.n(g),_=s("8336"),y=s("b0af"),S=s("99d9"),C=s("62ad"),w=s("ce7e"),j=s("132d"),k=s("adda"),O=s("0fd9"),z=s("0789"),q=s("2fa4"),x=s("a844"),R=s("3a2f"),$=Object(m["a"])(f,a,i,!1,null,"d1c704be",null);e["a"]=$.exports;b()($,{VBtn:_["a"],VCard:y["a"],VCardActions:S["a"],VCol:C["a"],VDivider:w["a"],VIcon:j["a"],VImg:k["a"],VRow:O["a"],VSlideYTransition:z["f"],VSpacer:q["a"],VTextarea:x["a"],VTooltip:R["a"]})},"8efc":function(t,e,s){},adda:function(t,e,s){"use strict";s("a15b"),s("a9e3"),s("8efc");var a=s("90a2"),i=(s("36a7"),s("24b2")),r=s("58df"),n=Object(r["a"])(i["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number]},computed:{computedAspectRatio:function(){return Number(this.aspectRatio)},aspectStyle:function(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer:function(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-responsive__content"},this.$slots.default)}},render:function(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),o=n,c=s("7560"),l=s("d9f7"),d=s("d9bd"),u="undefined"!==typeof window&&"IntersectionObserver"in window;e["a"]=Object(r["a"])(o,c["a"]).extend({name:"v-img",directives:{intersect:a["a"]},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:function(){return{root:void 0,rootMargin:void 0,threshold:void 0}}},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data:function(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0}},computed:{computedAspectRatio:function(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc:function(){return"string"===typeof this.src?{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}:{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}},__cachedImage:function(){if(!this.normalisedSrc.src&&!this.normalisedSrc.lazySrc)return[];var t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push("linear-gradient(".concat(this.gradient,")")),e&&t.push('url("'.concat(e,'")'));var s=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[s]):s}},watch:{src:function(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted:function(){this.init()},methods:{init:function(t,e,s){if(!u||s||this.eager){if(this.normalisedSrc.lazySrc){var a=new Image;a.src=this.normalisedSrc.lazySrc,this.pollForSize(a,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad:function(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src)},onError:function(){this.$emit("error",this.src)},getSrc:function(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage:function(){var t=this,e=new Image;this.image=e,e.onload=function(){e.decode?e.decode().catch((function(e){Object(d["c"])("Failed to decode image, trying to render anyway\n\n"+"src: ".concat(t.normalisedSrc.src)+(e.message?"\nOriginal error: ".concat(e.message):""),t)})).then(t.onLoad):t.onLoad()},e.onerror=this.onError,e.src=this.normalisedSrc.src,this.sizes&&(e.sizes=this.sizes),this.normalisedSrc.srcset&&(e.srcset=this.normalisedSrc.srcset),this.aspectRatio||this.pollForSize(e),this.getSrc()},pollForSize:function(t){var e=this,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,a=function a(){var i=t.naturalHeight,r=t.naturalWidth;i||r?(e.naturalWidth=r,e.calculatedAspectRatio=r/i):null!=s&&setTimeout(a,s)};a()},genContent:function(){var t=o.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:"".concat(this.naturalWidth,"px")}}),t},__genPlaceholder:function(){if(this.$slots.placeholder){var t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},this.$slots.placeholder)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},t):t[0]}}},render:function(t){var e=o.options.render.call(this,t),s=Object(l["a"])(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:u?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,s,e.children)}})},d856:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{fluid:""}},[s("v-row",{attrs:{justify:"start",align:"start"}},[s("v-col",{staticClass:"pb-3",attrs:{cols:"12"}},[s("h2",[t._v("Rejections")])]),0===t.rejected.length?s("v-col",{attrs:{cols:"12"}},[s("p",[t._v(" No rejections. ")])]):t._e(),s("v-col",{attrs:{lg:"8",md:"9",cols:"12"}},t._l(t.rejected,(function(e){return s("approval-card",{key:e.id,attrs:{request:e,"is-pending":!1},on:{approve:t.pushPending}})})),1)],1)],1)},i=[],r=(s("4160"),s("159b"),s("d4ec")),n=s("bee2"),o=s("262e"),c=s("2caf"),l=s("9ab4"),d=s("2b0e"),u=s("60a3"),h=s("5e41"),p=s("59ca"),v=(s("e71f"),function(){var t=function(t){Object(o["a"])(s,t);var e=Object(c["a"])(s);function s(){var t;return Object(r["a"])(this,s),t=e.apply(this,arguments),t.show=!1,t.rejected=[],t.db=p["firestore"](),t}return Object(n["a"])(s,[{key:"getRejected",value:function(){var t=this,e=this.db.collection("rejected");e.onSnapshot((function(e){t.rejected=[],e.forEach((function(e){t.rejected.push(e.data())}))}))}},{key:"pushPending",value:function(t){var e=this.db.collection("pending");e.doc(t.id).set(t),this.db.collection("rejected").doc(t.id).delete()}},{key:"mounted",value:function(){this.getRejected()}}]),s}(d["a"]);return t=Object(l["a"])([Object(u["a"])({components:{ApprovalCard:h["a"]}})],t),t}()),f=v,m=f,g=s("2877"),b=s("6544"),_=s.n(b),y=s("62ad"),S=s("a523"),C=s("0fd9"),w=Object(g["a"])(m,a,i,!1,null,null,null);e["default"]=w.exports;_()(w,{VCol:y["a"],VContainer:S["a"],VRow:C["a"]})},ffbf:function(t,e,s){"use strict";var a=s("1b63"),i=s.n(a);i.a}}]);
//# sourceMappingURL=chunk-2d2e058c.cff8ed7e.js.map