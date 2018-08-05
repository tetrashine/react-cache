// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Accessor ../../core/Collection ../../core/Handles ../../core/watchUtils ../../core/accessorSupport/decorators ./support/ActiveLayerInfo".split(" "),function(w,x,p,h,q,r,t,k,e,n){var l=r.ofType(n),u="esri.layers.CSVLayer esri.layers.FeatureLayer esri.layers.HeatmapLayer esri.layers.MapImageLayer esri.layers.MapNotesLayer esri.layers.PointCloudLayer esri.layers.TileLayer esri.layers.StreamLayer esri.layers.SceneLayer esri.layers.GeoRSSLayer esri.layers.GroupLayer esri.layers.ImageryLayer esri.layers.WMSLayer esri.layers.WMTSLayer".split(" "),
v=["view.basemapView.baseLayerViews","view.groundView.layerViews","view.layerViews","view.basemapView.referenceLayerViews"];return function(m){function b(a){a=m.call(this,a)||this;a._handles=new t;a._layerViewByLayerId={};a._layerInfosByLayerViewId={};a._activeLayerInfosByLayerViewId={};a.activeLayerInfos=new l;a.basemapLegendVisible=!1;a.groundLegendVisible=!1;a.layerInfos=[];a.view=null;return a}p(b,m);b.prototype.initialize=function(){this._handles.add(k.init(this,"view",this._viewHandles),"view")};
b.prototype.destroy=function(){this._destroyViewActiveLayerInfos();this._handles.destroy();this.view=this._handles=null};Object.defineProperty(b.prototype,"state",{get:function(){return this.get("view.ready")?"ready":"disabled"},enumerable:!0,configurable:!0});b.prototype._viewHandles=function(){this._handles.remove("state");this.view&&this._handles.add(k.init(this,"state",this._stateHandles),"state")};b.prototype._stateHandles=function(){this._resetAll();"ready"===this.state&&this._watchPropertiesAndAllLayerViews()};
b.prototype._resetAll=function(){this._handles.remove(["all-layer-views","legend-properties"]);this._destroyViewActiveLayerInfos();this.activeLayerInfos.removeAll()};b.prototype._destroyViewActiveLayerInfos=function(){Object.keys(this._activeLayerInfosByLayerViewId).forEach(this._destroyViewActiveLayerInfo,this)};b.prototype._destroyViewActiveLayerInfo=function(a){this._handles.remove(a);delete this._activeLayerInfosByLayerViewId[a]};b.prototype._watchPropertiesAndAllLayerViews=function(){var a=this.view.allLayerViews;
a.length&&this._refresh();this._handles.add(a.on("change",this._allLayerViewsChangeHandle.bind(this)),"all-layer-views");this._handles.add(k.watch(this,"layerInfos, basemapLegendVisible, groundLegendVisible",this._propertiesChangeHandle.bind(this)),"legend-properties")};b.prototype._allLayerViewsChangeHandle=function(a){var c=this;a.removed.forEach(function(a){return c._destroyViewActiveLayerInfo(a.uid)});this._refresh()};b.prototype._propertiesChangeHandle=function(){this._destroyViewActiveLayerInfos();
this._refresh()};b.prototype._refresh=function(){this._layerInfosByLayerViewId={};this.activeLayerInfos.removeAll();this._generateLayerViews().filter(this._filterLayerViewsByLayerInfos,this).filter(this._isLayerViewSupported,this).forEach(this._generateActiveLayerInfo,this);this._sortActiveLayerInfos(this.activeLayerInfos)};b.prototype._sortActiveLayerInfos=function(a){var c={};this.view.allLayerViews.forEach(function(a,b){return c[a.layer.uid]=b});a.sort(function(a,b){return(c[b.layer.uid]||0)-(c[a.layer.uid]||
0)})};b.prototype._generateLayerViews=function(){var a=[];v.filter(this._filterLayerViews,this).map(this.get,this).filter(function(a){return null!=a}).forEach(this._collectLayerViews("layerViews",a));return a};b.prototype._filterLayerViews=function(a){var c=!this.groundLegendVisible&&"view.groundView.layerViews"===a;return!(!this.basemapLegendVisible&&("view.basemapView.baseLayerViews"===a||"view.basemapView.referenceLayerViews"===a))&&!c};b.prototype._collectLayerViews=function(a,c){var b=function(d){d&&
d.forEach(function(d){c.push(d);b(d[a])});return c};return b};b.prototype._filterLayerViewsByLayerInfos=function(a){var c=this,b=this.layerInfos;return b&&b.length?b.some(function(b){return c._hasLayerInfo(b,a)}):!0};b.prototype._hasLayerInfo=function(a,c){var b=this._isLayerUIDMatching(a.layer,c.layer.uid);b&&(this._layerInfosByLayerViewId[c.uid]=a);return b};b.prototype._isLayerUIDMatching=function(a,b){return a&&(a.uid===b||this._hasLayerUID(a.layers,b))};b.prototype._hasLayerUID=function(a,b){var c=
this;return a&&a.some(function(a){return c._isLayerUIDMatching(a,b)})};b.prototype._isLayerViewSupported=function(a){return-1<u.indexOf(a.layer.declaredClass)?(this._layerViewByLayerId[a.layer.uid]=a,!0):!1};b.prototype._generateActiveLayerInfo=function(a){var b=this;this._isLayerActive(a)?this._buildActiveLayerInfo(a):(this._handles.remove(a.uid),this._handles.add(k.watch(a,"suspended, layer.legendEnabled",function(){return b._layerActiveHandle(a)}),a.uid))};b.prototype._layerActiveHandle=function(a){this._isLayerActive(a)&&
(this._handles.remove(a.uid),this._buildActiveLayerInfo(a))};b.prototype._isLayerActive=function(a){return!a.suspended&&a.get("layer.legendEnabled")};b.prototype._buildActiveLayerInfo=function(a){var b=this,d=a.layer,e=a.uid,g=this._layerInfosByLayerViewId[e],f=this._activeLayerInfosByLayerViewId[e];f||(f=new n({layer:d,title:g&&void 0!==g.title?g.title:d.title}),this._activeLayerInfosByLayerViewId[e]=f);f.parent||(g=(g=d.parent)&&this._layerViewByLayerId[g.uid],f.parent=g&&this._activeLayerInfosByLayerViewId[g.uid]);
if(!this._handles.has(e)){var g=k.watch(d,"title",function(c){return b._titleHandle(c,f,a)}),h=k.watch(d,"legendEnabled",function(c){return b._legendEnabledHandle(c,f,a)}),d=k.watch(d,"renderer, opacity",function(){return b._constructLegendElements(f,a)}),l=k.watch(a,"suspended",function(c){return b._suspendedHandle(c,f,a)}),m=k.whenTrue(this.view,"stationary",function(){return b._scaleHandle(f,a)});this._handles.add([g,h,d,l,m],e);this._constructLegendElements(f,a)}this._addActiveLayerInfo(f,a)};
b.prototype._titleHandle=function(a,b,d){b.title=a;this._constructLegendElements(b,d)};b.prototype._legendEnabledHandle=function(a,b,d){a?this._addActiveLayerInfo(b,d):this._removeActiveLayerInfo(b)};b.prototype._suspendedHandle=function(a,b,d){a?this._removeActiveLayerInfo(b):this._addActiveLayerInfo(b,d)};b.prototype._scaleHandle=function(a,b){a.scale!==this.view.scale&&a.isScaleDriven&&this._constructLegendElements(a,b)};b.prototype._addActiveLayerInfo=function(a,b){this._isLayerActive(b)&&-1===
this.activeLayerInfos.indexOf(a)&&((b=a.parent,b)?-1===b.children.indexOf(a)&&(b.children.push(a),this._sortActiveLayerInfos(b.children)):(this.activeLayerInfos.add(a),this._sortActiveLayerInfos(this.activeLayerInfos)))};b.prototype._removeActiveLayerInfo=function(a){var b=a.parent;b?(a=b.children.indexOf(a),-1!==a&&b.children.splice(a,1)):this.activeLayerInfos.remove(a)};b.prototype._constructLegendElements=function(a,b){b=b.layer;a.scale=this.view.scale;b.featureCollections?a.buildLegendElementsForFeatureCollections(b.featureCollections):
b.renderer?a.buildLegendElementsForRenderer():b.url&&a.buildLegendElementsForTools()};h([e.property({type:l})],b.prototype,"activeLayerInfos",void 0);h([e.property()],b.prototype,"basemapLegendVisible",void 0);h([e.property()],b.prototype,"groundLegendVisible",void 0);h([e.property()],b.prototype,"layerInfos",void 0);h([e.property({dependsOn:["view.ready"],readOnly:!0})],b.prototype,"state",null);h([e.property()],b.prototype,"view",void 0);return b=h([e.subclass("esri.widgets.Legend.LegendViewModel")],
b)}(e.declared(q))});