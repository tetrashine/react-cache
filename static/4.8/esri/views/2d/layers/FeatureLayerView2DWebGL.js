// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/tsSupport/paramHelper ../../../geometry ../../../Graphic ../../../core/Collection ../../../core/Error ../../../core/promiseUtils ../../../core/watchUtils ../../../core/accessorSupport/decorators ../../../core/accessorSupport/ensureType ../../../layers/support/TileInfo ../../../tasks/support/FeatureSet ../../../tasks/support/Query ../engine/DOMContainer ./LayerView2D ./features/controllers ./features/tileRenderers ./support/FeatureLayerProxy ../tiling/TileInfoView ../tiling/TileStrategy ../../layers/RefreshableLayerView".split(" "),
function(G,H,n,f,I,p,l,q,r,g,m,d,t,u,v,h,w,x,y,z,A,B,C,D){function E(d){return d&&d.highlight}var F=t.ensureType(h);return function(k){function b(){var a=null!==k&&k.apply(this,arguments)||this;a._pipelineIsUpdating=!0;a.container=new w;return a}n(b,k);b.prototype.destroy=function(){this._proxy.destroy()};b.prototype.initialize=function(){var a=this,b=this._tileInfo=u.create({spatialReference:this.view.spatialReference,size:512});this._tileInfoView=new B(b);this._tileStrategy=new C({cachePolicy:"purge",
acquireTile:function(c){return a._acquireTile(c)},releaseTile:function(c){return a._releaseTile(c)},tileInfoView:this._tileInfoView,buffer:0});this._proxy=new A.default({layer:this.layer,tileInfo:b,client:{executeProcessing:function(c){var b=a.layer.processing;return b?(c=b.process(c.featureSet,b.options))?c:g.reject(new r("FeatureLayer","invalid processing.process() method, returns nothing")):c.featureSet},setUpdating:function(c){a._pipelineIsUpdating=c;a.notifyChange("updating")}}});this.addResolvingPromise(g.all([y.getControllerConfiguration(this.layer),
this._proxy.when()]).then(function(a){return a[1].configure({controller:a[0]})}))};Object.defineProperty(b.prototype,"numFeatures",{get:function(){var a=0;this.attached?this._tileStrategy.tiles.forEach(function(b){a+=b.iconDisplayRecords?b.iconDisplayRecords.length:0}):0;return a},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"renderingConfigHash",{get:function(){if(!this.layer)return null;var a=this.layer,b=a.renderer,c=a.labelingInfo;return JSON.stringify({definitionExpression:a.definitionExpression,
historicMoment:a.historicMoment,outFields:a.outFields.slice().sort(),renderer:b,labelingInfo:c})},enumerable:!0,configurable:!0});b.prototype.highlight=function(a,b){var c=this,e;a instanceof l?e=[a.getAttribute(this.layer.objectIdField)]:"number"===typeof a?e=[a]:q.isCollection(a)?e=a.map(function(a){return a&&a.getAttribute(c.layer.objectIdField)}).toArray():Array.isArray(a)&&0<a.length&&(e="number"===typeof a[0]?a:a.map(function(a){return a&&a.getAttribute(c.layer.objectIdField)}));return(e=e.filter(function(a){return null!=
a}))&&e.length&&E(this.tileRenderer)?this.tileRenderer.highlight(e):{remove:function(){}}};b.prototype.hitTest=function(a,b){var c=this;return this.suspended||!this.tileRenderer?g.resolve(null):this.tileRenderer.hitTest(a,b).then(function(a){return 0===a.length?null:c._proxy.queryFeatures(new h({objectIds:a,outSpatialReference:c.view.spatialReference,returnGeometry:!0})).then(function(a){if(!a.features[0])return null;a=l.fromJSON(a.features[0]);a.layer=c.layer;a.sourceLayer=c.layer;a.geometry&&(a.geometry.spatialReference=
c.view.spatialReference);return a})})};b.prototype.queryFeatures=function(a){var b=this;return this.queryFeaturesJSON(a).then(function(a){a=v.fromJSON(a);a.features.forEach(function(a){a.layer=b.layer;a.sourceLayer=b.layer});return a})};b.prototype.queryFeaturesJSON=function(a){return this._proxy.queryFeatures(this._cleanUpQuery(a))};b.prototype.queryObjectIds=function(a){return this._proxy.queryObjectIds(this._cleanUpQuery(a))};b.prototype.queryFeatureCount=function(a){return this._proxy.queryFeatureCount(this._cleanUpQuery(a))};
b.prototype.queryExtent=function(a){return this._proxy.queryExtent(this._cleanUpQuery(a)).then(function(a){return{count:a.count,extent:p.Extent.fromJSON(a.extent)}})};b.prototype.update=function(a){this.attached&&this._tileStrategy&&this.tileRenderer&&(this._tileStrategy.update(a),this._proxy.setViewState(a.state),this.notifyChange("numFeatures"),this.notifyChange("updating"))};b.prototype.attach=function(){var a=this;this.handles.add([m.init(this,"layer.processing.version",function(b){a._proxy.redraw()}),
m.init(this,"renderingConfigHash",function(){var b=a._tileRendererPromise=z.createOrReuseTileRenderer(a.tileRenderer,a.layer.renderer,{layerView:a,tileInfoView:a._tileInfoView,layer:a.layer,highlightOptions:a.view.highlightOptions}).then(function(c){a._tileRendererPromise===b&&(a._tileRendererPromise=null,a.tileRenderer!==c&&(a._tileStrategy.clear(),a.tileRenderer&&(a.tileRenderer.uninstall(a.container),a.tileRenderer.destroy()),(a.tileRenderer=a._proxy.client.tileRenderer=c)&&c.install(a.container),
a.requestUpdate()),c=c.getProcessorConfiguration(),a.tileRenderer.needsProcessorReconfiguration(c)?(a.tileRenderer.applyConfiguration(c,!0),a._proxy.configure({processor:c}),a.requestUpdate()):a.tileRenderer.applyConfiguration(c,!1))},function(){return a._tileRendererPromise=null})})])};b.prototype.detach=function(){this.container.removeAllChildren();this.handles.remove(this);this._tileRendererPromise=null;this.tileRenderer&&(this.tileRenderer.uninstall(this.container),this.tileRenderer=null);this._tileStrategy&&
(this._tileStrategy.destroy(),this._tileStrategy=null)};b.prototype.moveStart=function(){this.requestUpdate()};b.prototype.viewChange=function(){this.requestUpdate()};b.prototype.moveEnd=function(){this.requestUpdate()};b.prototype.doRefresh=function(){this._proxy.refresh()};b.prototype.isUpdating=function(){return null==this.tileRenderer||this._pipelineIsUpdating||this.tileRenderer.updating};b.prototype._cleanUpQuery=function(a){a=a?F(a):new h;a.outSpatialReference||(a.outSpatialReference=this.view.spatialReference);
return a};b.prototype._acquireTile=function(a){var b=this;a=this.tileRenderer.acquireTile(a);a.once("attach",function(){b.requestUpdate()});return a};b.prototype._releaseTile=function(a){this.tileRenderer.releaseTile(a)};f([d.property()],b.prototype,"numFeatures",null);f([d.property({dependsOn:["layer.renderer","layer.outFields","layer.definitionExpression","layer.historicMoment","layer.labelingInfo"]})],b.prototype,"renderingConfigHash",null);f([d.property()],b.prototype,"tileRenderer",void 0);f([d.property({dependsOn:["tileRenderer.updating"]})],
b.prototype,"updating",void 0);return b=f([d.subclass("esri.views.2d.layers.AutoFeatureLayerView2D")],b)}(d.declared(x,D))});