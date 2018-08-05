// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../geometry ../../core/Accessor ../../core/Collection ../../core/Handles ../../core/watchUtils ../../core/accessorSupport/decorators ../../geometry/support/contains ../../geometry/support/webMercatorUtils".split(" "),function(y,z,t,l,u,v,p,w,n,f,x,q){return function(r){function c(a){a=r.call(this,a)||this;a._handles=new w;a._pendingAttributionItemsByLayerId={};a._attributionDataByLayerId={};a.items=
new p;a.view=null;a._updateAttributionItems=a._updateAttributionItems.bind(a);return a}t(c,r);c.prototype.initialize=function(){this._handles.add(n.init(this,"view",this._viewWatcher))};c.prototype.destroy=function(){this._handles.destroy();this.view=this._handles=null};Object.defineProperty(c.prototype,"state",{get:function(){return this.get("view.ready")?"ready":"disabled"},enumerable:!0,configurable:!0});c.prototype._viewWatcher=function(a){var d=this,b=this._handles;b&&b.remove();a&&(b.add([a.allLayerViews.on("change",
function(a){d._addLayerViews(a.added);0<a.removed.length&&(a.removed.forEach(function(a){b.remove(a.uid)}),d._updateAttributionItems())}),n.init(a,"stationary",this._updateAttributionItems)]),this._addLayerViews(a.allLayerViews))};c.prototype._addLayerViews=function(a){var d=this;a.forEach(function(a){d._handles.has(a.uid)||d._handles.add(n.init(a,"suspended",d._updateAttributionItems),a.uid)})};c.prototype._updateAttributionItems=function(){var a=this,d=[];this._getActiveLayerViews().forEach(function(b){var e=
b.layer;if(!e.hasAttributionData){if(b=e.get("copyright")){var c=a._findItem(d,{layer:e,text:b});c||d.push({text:b,layer:e})}}else if(e&&e.tileInfo){var h=a._attributionDataByLayerId;if(h[e.uid]){if(b=a._getDynamicAttribution(h[e.uid],a.view,e))(c=a._findItem(d,{layer:e,text:b}))||d.push({text:b,layer:e})}else{var k=a._pendingAttributionItemsByLayerId;a._inProgress(k[e.uid])||(k[e.uid]=e.fetchAttributionData().then(function(b){b=a._createContributionIndex(b,a._isBingLayer(e));delete k[e.uid];h[e.uid]=
b;a._updateAttributionItems()}))}}});this._itemsChanged(this.items,d)&&(this.items.removeAll(),this.items.addMany(d))};c.prototype._itemsChanged=function(a,d){return a.length!==d.length||a.some(function(a,e){return a.text!==d[e].text})};c.prototype._inProgress=function(a){return a&&!a.isFulfilled()};c.prototype._getActiveLayerViews=function(){return this.get("view.allLayerViews").filter(function(a){return!a.suspended&&a.get("layer.attributionVisible")})};c.prototype._findItem=function(a,d){var b=
d.layer,e=d.text,c;a.some(function(a){var d=a.layer===b&&a.text===e;d&&(c=a);return d});return c};c.prototype._isBingLayer=function(a){return"bing-maps"===a.type};c.prototype._createContributionIndex=function(a,d){a=a.contributors;var b={};if(!a)return b;for(var e=0;e<a.length;e++){var c=a[e],h=c.coverageAreas;if(!h)return;for(var k=0;k<h.length;k++)for(var g=h[k],f=g.bbox,m=g.zoomMin-(d&&g.zoomMin?1:0),l=g.zoomMax-(d&&g.zoomMax?1:0),g={extent:q.geographicToWebMercator({xmin:f[1],ymin:f[0],xmax:f[3],
ymax:f[2],spatialReference:u.SpatialReference.WGS84}),attribution:c.attribution||"",score:null!=g.score?g.score:100,id:e};m<=l;m++)b[m]=b[m]||[],b[m].push(g)}b.maxKey=Math.max.apply(null,Object.keys(b));return b};c.prototype._getDynamicAttribution=function(a,d,b){var e=d.extent;b=b.tileInfo.scaleToZoom(d.scale);b=Math.min(a.maxKey,Math.round(b));if(!e||null==b||-1>=b)return"";a=a[b];var c=q.project(e.center.clone().normalize(),d.spatialReference),f={};return a.filter(function(a){var b=!f[a.id]&&c&&
x.extentContainsPoint(a.extent,c);b&&(f[a.id]=!0);return b}).sort(function(a,b){return b.score-a.score||a.objectId-b.objectId}).map(function(a){return a.attribution}).join(", ")};l([f.property({readOnly:!0,type:p})],c.prototype,"items",void 0);l([f.property({dependsOn:["view.ready"],readOnly:!0})],c.prototype,"state",null);l([f.property()],c.prototype,"view",void 0);return c=l([f.subclass("esri.widgets.Attribution.AttributionViewModel")],c)}(f.declared(v))});