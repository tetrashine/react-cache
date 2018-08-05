// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/tsSupport/assignHelper ../../../../core/Accessor ../../../../core/Handles ../../../../core/promiseUtils ../../../../core/watchUtils ../../../../core/accessorSupport/decorators ../../../../layers/Layer ../../../../layers/graphics/dehydratedFeatures ./constants ./Graphics3DCore ./Graphics3DElevationAlignment ./Graphics3DScaleVisibility ./Graphics3DSpatialIndex ./graphicUtils".split(" "),
function(y,z,h,d,k,l,m,f,n,c,p,q,r,t,u,v,w,x){return function(g){function a(b){b=g.call(this)||this;b.graphicsCore=null;b.elevationAlignment=new u;b.handles=new m;b.suspendResumeExtent=null;return b}h(a,g);a.prototype.normalizeCtorArgs=function(b){var a=null;b.scaleVisibilityEnabled&&(a=new v);var e=new t({owner:b.owner,layer:b.layer,basemapTerrain:b.owner.view.basemapTerrain,asyncUpdates:!1});return k({},b,{graphicsCore:e,scaleVisibility:a})};a.prototype.initialize=function(){var b=this;this._set("spatialIndex",
new w({spatialReference:this.owner.view.spatialReference}));this.scaleVisibility&&"minScale"in this.layer&&this.handles.add(this.layer.watch(["minScale","maxScale"],function(){return b.scaleVisibility.layerMinMaxScaleChangeHandler()}));this.idleClients=[this.scaleVisibility,this.elevationAlignment,this.graphicsCore]};a.prototype.setup=function(){var b=this;this.elevationAlignment.setup(this.owner,function(a,e,c){return b.spatialIndex.queryGraphicUIDsInExtent(a,e,c)},this.graphicsCore,this.view.elevationProvider);
this.scaleVisibility&&"minScale"in this.layer&&this.scaleVisibility.setup(this.owner,this.layer,function(a,e,c){return b.spatialIndex.queryGraphicUIDsInExtent(a,e,c)},this.graphicsCore,this.owner.view.basemapTerrain);this.graphicsCore.setup({elevationAlignment:this.elevationAlignment,spatialIndex:this.spatialIndex,scaleVisibility:this.scaleVisibility});this.handles.add(this.view.watch("clippingArea",function(){return b.updateClippingExtent()}));this.updateClippingExtent();this.setupSuspendResumeExtent();
this.handles.add(this.view.resourceController.registerIdleFrameWorker({needsUpdate:function(){return b.needsIdleUpdate()},idleFrame:function(a){return b.idleUpdate(a)}}))};a.prototype.destroy=function(){this.handles&&(this.handles.destroy(),this.handles=null);this.elevationAlignment&&(this.elevationAlignment.destroy(),this._set("elevationAlignment",null));this.scaleVisibility&&(this.scaleVisibility.destroy(),this._set("scaleVisibility",null));this.graphicsCore&&(this.graphicsCore.destroy(),this._set("graphicsCore",
null));this.spatialIndex&&(this.spatialIndex.destroy(),this._set("spatialIndex",null))};Object.defineProperty(a.prototype,"suspended",{get:function(){return!(!this.scaleVisibility||!this.scaleVisibility.suspended)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"updating",{get:function(){return!!(this.graphicsCore&&this.graphicsCore.updating||this.scaleVisibility&&this.scaleVisibility.updating)},enumerable:!0,configurable:!0});a.prototype.getGraphicFromGraphicUid=function(b){var a=
this,c=null;this.owner.loadedGraphics&&this.owner.loadedGraphics.some(function(e){return e.uid===b?(c=q.hydrateGraphic(e,a.layer instanceof p?a.layer:null),!0):!1});return f.create(function(a,b){null!==c?a(c):b()})};a.prototype.whenGraphicBounds=function(a,c){return this.spatialIndex?this.graphicsCore?this.graphicsCore.whenGraphicBounds(a,c):f.reject():f.reject()};a.prototype.needsIdleUpdate=function(){for(var a=0,c=this.idleClients;a<c.length;a++){var e=c[a];if(e&&e.needsIdleUpdate())return!0}return!1};
a.prototype.idleUpdate=function(a){for(var b=0,c=this.idleClients;b<c.length;b++){var d=c[b];d&&d.idleUpdate(a)}};a.prototype.updateClippingExtent=function(){this.graphicsCore.setClippingExtent(this.view.clippingArea,this.view.spatialReference)&&this.graphicsCore.recreateAllGraphics()};a.prototype.setupSuspendResumeExtent=function(){var a=this;this.scaleVisibility&&n.init(this.graphicsCore,"computedExtent",function(b){a.suspendResumeExtent=x.enlargeExtent(b,a.suspendResumeExtent,r.SUSPEND_RESUME_EXTENT_OPTIMISM);
a.scaleVisibility.setExtent(a.suspendResumeExtent)},!0)};d([c.property({constructOnly:!0})],a.prototype,"owner",void 0);d([c.property({constructOnly:!0})],a.prototype,"layer",void 0);d([c.property({readOnly:!0,aliasOf:"owner.view"})],a.prototype,"view",void 0);d([c.property({constructOnly:!0})],a.prototype,"graphicsCore",void 0);d([c.property({readOnly:!0})],a.prototype,"spatialIndex",void 0);d([c.property({constructOnly:!0})],a.prototype,"scaleVisibility",void 0);d([c.property({readOnly:!0})],a.prototype,
"elevationAlignment",void 0);d([c.property({readOnly:!0,dependsOn:["scaleVisibility.suspended"]})],a.prototype,"suspended",null);d([c.property({readOnly:!0,dependsOn:["graphicsCore.updating","scaleVisibility.updating"]})],a.prototype,"updating",null);return a=d([c.subclass("esri.views.3d.layers.graphics.Graphics3DGraphicLikeLayerView")],a)}(c.declared(l))});