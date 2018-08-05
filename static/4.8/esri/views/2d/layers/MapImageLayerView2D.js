// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/assignHelper ../../../core/tsSupport/extendsHelper ../../../core/tsSupport/decorateHelper ../../../core/Handles ../../../core/Logger ../../../core/promiseUtils ../../../core/accessorSupport/decorators ../../../layers/support/ExportImageParameters ../engine/BitmapSource ../engine/Canvas2DContainer ./LayerView2D ./support/ExportStrategy ../../layers/RefreshableLayerView".split(" "),function(z,A,k,l,m,n,p,q,g,r,t,u,v,w,x){var y=p.getLogger("esri.views.2d.layers.MapImageLayerView2D");
return function(h){function a(){var f=h.call(this)||this;f._handles=new n;f.container=new u;f.container.hidpi=!0;return f}l(a,h);a.prototype.hitTest=function(f,a){return null};a.prototype.update=function(a){this.strategy.update(a);this.notifyChange("updating")};a.prototype.attach=function(){var a=this,b=this.layer,e=b.imageMaxWidth,c=b.imageMaxHeight,d=b.version,b=10.3<=d,d=10<=d;this.strategy=new w({container:this.container,fetchSource:this.fetchImage.bind(this),requestUpdate:this.requestUpdate.bind(this),
imageMaxWidth:e,imageMaxHeight:c,imageRotationSupported:b,imageNormalizationSupported:d,hidpi:!0});this._exportImageParameters=new r({layer:this.layer});this._handles.add(this._exportImageParameters.watch("version",function(e){a._exportImageVersion!==e&&(a._exportImageVersion=e,a.requestUpdate())}))};a.prototype.detach=function(){this.container.removeAllChildren();this.strategy.destroy();this._handles.removeAll();this._exportImageParameters.layer=null;this._exportImageParameters.destroy();this._exportImageParameters=
null};a.prototype.moveStart=function(){};a.prototype.viewChange=function(){};a.prototype.moveEnd=function(){this.requestUpdate()};a.prototype.doRefresh=function(){this.requestUpdate()};a.prototype.isUpdating=function(){return this.attached&&(this.strategy.updating||this.updateRequested)};a.prototype.getPopupData=function(a){var b=this.view.scale;return this.layer.allSublayers.filter(function(a){var c=0===a.minScale||b<=a.minScale,d=0===a.maxScale||b>=a.maxScale;return a.popupTemplate&&a.popupEnabled&&
a.visible&&c&&d}).map(function(b){var c=b.createQuery();c.geometry=a;c.outFields=b.popupTemplate.requiredFields;return b.queryFeatures(c).then(function(a){return a.features})})};a.prototype.fetchImage=function(a,b,e,c){var d=this;this._exportImageParameters.scale!==this.view.scale&&(this._exportImageParameters.scale=this.view.scale,this._exportImageVersion=this._exportImageParameters.version);c=k({timestamp:this.refreshTimestamp},c);return this.layer.fetchImage(a,b,e,c).then(function(a){d.notifyChange("updating");
return new t.default(a)}).catch(function(a){"cancel"!==a.dojoType&&y.error(a);d.notifyChange("updating");return q.reject(a)})};return a=m([g.subclass("esri.views.2d.layers.MapImageLayerView2D")],a)}(g.declared(v,x))});