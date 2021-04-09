(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d224cf4"],{e25f:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-col",{attrs:{cols:"12"}},[n("furniture-table-header",{staticClass:"px-4 mb-3",attrs:{title:"Inventory"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),n("div",{staticClass:"mb-4 d-inline-flex",attrs:{align:"center"}},[n("v-btn",{attrs:{disabled:e.selected.length>0,icon:e.selected.length>0,outlined:e.selected.length>0,color:"primary",rounded:""},on:{click:function(t){return e.addItem()}}},[n("v-icon",{attrs:{left:""}},[e._v("add")]),e._v(" "+e._s(e.selected.length>0?"":"Add")+" ")],1),n("view-action-group",{staticClass:"ml-3",attrs:{"disabled-message":"Select items to use actions",actions:e.inventoryActions,disabled:e.selected.length<1},on:{download:e.getSpreadsheet,archive:function(t){return e.archiveSelected()},donor:function(t){return e.updateSelected(e.STATUS.Donor)},ontruck:function(t){return e.updateSelected(e.STATUS.OnTruck)},shed:function(t){return e.updateSelected(e.STATUS.Shed)},delivered:function(t){return e.updateSelected(e.STATUS.Delivered)},unknown:function(t){return e.updateSelected(e.STATUS.Unknown)}}})],1),n("table-filters",{attrs:{"start-date-filter":e.startDateFilter,"end-date-filter":e.endDateFilter,"status-filter":e.statusFilter,"class-filter":e.classFilter,"donor-filter":e.donorFilter,"zone-filter":e.zoneFilter,inventory:e.inventory},on:{startdate:function(t){e.startDateFilter=t},enddate:function(t){e.endDateFilter=t},status:function(t){e.statusFilter=t},class:function(t){e.classFilter=t},donor:function(t){e.donorFilter=t},zone:function(t){e.zoneFilter=t}}}),n("furniture-table",{attrs:{current:e.current,headers:e.headers,search:e.search,items:e.inventory,collection:e.COLLECTION},on:{"on-item-selected":function(t){return e.setSelected({list:t})},download:function(t){return e.getSpreadsheet()},"on-item-click":function(t){return e.setCurrent({item:t})}}}),n("furniture-card-dialog",{attrs:{current:e.current,dialog:e.editCard,"is-add":e.isAdd,"menu-actions":e.menuActions,"menu-loading":e.menuLoading},on:{"save-changes":function(t){return e.commitItem(t)},archive:function(t){return e.commitArchive()},export:function(t){return e.commitExport()},close:function(t){return e.closeDialog()}}})],1)},i=[],a=(n("4de4"),n("caad"),n("d81d"),n("b64b"),n("07ac"),n("ac1f"),n("2532"),n("841c"),n("96cf"),n("1da1")),c=n("d4ec"),s=n("bee2"),o=n("262e"),u=n("2caf"),d=n("9ab4"),l=n("2b0e"),f=n("2f62"),h=n("2fe1"),m=n("d6da"),p=n("4994"),v=n("849f"),T=n("05c1"),g=n("a963"),E=n("eb98"),S=n("5085"),b=n("30cf"),w=n("0848"),C=n("efe2"),A="inventory",D=function(e){Object(o["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(c["a"])(this,n),e=t.apply(this,arguments),e.COLLECTION=m["a"].INVENTORY,e.isAdd=!1,e.search="",e.startDateFilter="",e.endDateFilter=(new Date).toISOString().substr(0,10),e.classFilter=Object.keys(v["a"]),e.statusFilter=Object.values(p["d"]).filter((function(e){return"number"!==typeof e})).map((function(e,t){return t})),e.donorFilter=[],e.zoneFilter=[],e.downloading=!1,e.STATUS=p["d"],e.statusIcons=["face","local_shipping","storefront","mood","not_listed_location"],e.menuLoading=!1,e.menuActions=[{icon:"archive",desc:"Archive",emit:"archive"},{icon:"cloud_download",desc:"Export",emit:"export"}],e}return Object(s["a"])(n,[{key:"editCard",get:function(){return!!this.current}},{key:"headers",get:function(){var e=this;return[{text:"Class",value:"physical.class",filter:function(t){return e.classFilter.includes(t)}},{text:"Status",value:"status",filter:function(t){return e.statusFilter.includes(t)}},{text:"Zone",value:"donor.zone",filter:function(t){return 0===e.zoneFilter.length||e.zoneFilter.includes(t)}},{text:"Address",value:"donor.address"},{text:"Donor",value:"donor.name",filter:function(t){return 0===e.donorFilter.length||e.donorFilter.includes(t)}},{text:"Date Added",value:"timing.dateAdded",filter:function(t){var n=new Date(T["b"].formatDate(t)),r=new Date(e.endDateFilter);if(""===e.startDateFilter)return n<=r;var i=new Date(e.startDateFilter);return T["b"].inRange(n,i,r)}}]}},{key:"inventoryActions",get:function(){var e=this;return[{icon:"archive",desc:"Archive selected items",emit:"archive"},{icon:"cloud_download",desc:"Export selected items to spreadsheet",emit:"download",loading:function(){return e.downloading}},{icon:"edit_location_alt",desc:"Edit selected items' statuses",emit:"edit-status",menu:this.statusFilter.map((function(t,n){return{icon:e.statusIcons[n],desc:p["d"][t],emit:p["d"][t].toLowerCase()}}))}]}},{key:"mounted",value:function(){this.bindItems()}},{key:"getSpreadsheet",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.downloading=!0,e.next=3,this.exportSelected();case 3:this.downloading=!1;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"addItem",value:function(){this.setCurrent({item:new p["b"]}),this.isAdd=!0}},{key:"closeDialog",value:function(){this.clearCurrent(),this.isAdd=!1}},{key:"commitItem",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.updateCurrent({updates:t}),!this.isAdd){e.next=8;break}return e.next=4,this.commitAddItem();case 4:this.isAdd=!1,this.clearCurrent(),e.next=10;break;case 8:return e.next=10,this.commitUpdates();case 10:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"commitArchive",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.menuLoading=!0,e.next=3,this.archiveCurrent();case 3:this.menuLoading=!1,this.clearCurrent();case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"commitExport",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.menuLoading=!0,e.next=3,this.exportCurrent();case 3:this.menuLoading=!1;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"updateSelected",value:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.updateSelectedStatus({status:t});case 2:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()}]),n}(l["a"]);C["a"].BIND_ITEMS,C["a"].SET_CURRENT,C["a"].EXPORT_SELECTED,C["a"].CLEAR_CURRENT,C["a"].EXPORT_CURRENT,C["a"].UPDATE_SELECTED_STATUS,C["a"].COMMIT_UPDATES,C["a"].UPDATE_CURRENT,D=Object(d["a"])([Object(h["b"])({components:{FurnitureTable:g["a"],FurnitureTableHeader:E["a"],ViewActionGroup:S["a"],FurnitureCardDialog:b["a"],TableFilters:w["a"]},computed:Object(f["c"])(A,{inventory:"getItems",current:"getCurrent",selected:"getSelected"}),methods:Object(f["b"])(A,[C["a"].BIND_ITEMS,C["a"].SET_CURRENT,C["a"].CLEAR_CURRENT,C["a"].EXPORT_SELECTED,C["a"].EXPORT_CURRENT,C["a"].UPDATE_SELECTED_STATUS,C["a"].COMMIT_UPDATES,C["a"].UPDATE_CURRENT,C["a"].SET_SELECTED,"archiveSelected","archiveCurrent","commitAddItem"])})],D);var R=D,F=R,x=n("2877"),_=n("6544"),k=n.n(_),y=n("8336"),O=n("62ad"),U=n("132d"),I=Object(x["a"])(F,r,i,!1,null,null,null);t["default"]=I.exports;k()(I,{VBtn:y["a"],VCol:O["a"],VIcon:U["a"]})}}]);
//# sourceMappingURL=chunk-2d224cf4.fe97483f.js.map