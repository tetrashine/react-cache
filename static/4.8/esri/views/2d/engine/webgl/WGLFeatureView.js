// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/assignHelper ../../../../core/tsSupport/extendsHelper ../../../../core/promiseUtils ../../../../core/promiseUtils ../../../../core/libs/gl-matrix/mat4 ../../../../core/libs/gl-matrix/vec3 ../../../../geometry/Point ../Container ../StageGL ../../engine/webgl/TileData ./enums ./GeometryUtils ./TextureManager ./Utils ./WGLPainter ./WGLRendererInfo".split(" "),function(q,r,u,v,w,x,l,n,y,z,A,B,p,C,D,t,E,F){Object.defineProperty(r,"__esModule",{value:!0});
q=function(m){function c(a){var b=m.call(this)||this;b._rendererInfo=new F;b._stage=new A;b._container=null;b._tileCoordinateScale=n.create();b._orientationVec=n.fromValues(0,0,1);b._displayScale=n.create();b._defaultTransform=l.create();b._pointToCallbacks=new Map;b._highlightIDs=new Set;b._displayWidth=0;b._displayHeight=0;b._highlightOptionsUpToDate=!1;b.layer=null;b.textureManager=new D;b.highlightOptions=a.highlightOptions;b.tileInfoView=a.tileInfoView;b._stage.useContextVersion("webgl");b.layer=
a.layer;b._layerView=a.layerView;return b}v(c,m);c.prototype.fadeInLabels=function(){this._stage.fadeInLabels()};c.prototype.dispose=function(){this.textureManager&&(this.textureManager.dispose(),this.textureManager=null);this.removeAllChildren();for(var a=0,b=this.children;a<b.length;a++)b[a].dispose()};c.prototype.disposeWebGLResources=function(){for(var a=0,b=this.children;a<b.length;a++)b[a].clear()};c.prototype.displayWidth=function(){return this._displayWidth};Object.defineProperty(c.prototype,
"displayHeight",{get:function(){return this._displayHeight},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"highlightOptions",{get:function(){return this._highlightOptions},set:function(a){this._highlightOptions=a;this._highlightOptionsUpToDate=!1},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"visualVariablesInfo",{get:function(){return this._visualVariablesInfo},set:function(a){this._visualVariablesInfo=a;this.requestRender()},enumerable:!0,configurable:!0});
c.prototype.install=function(a){a.addChild(this._stage);this._stage.addChild(this);this._container=a};c.prototype.uninstall=function(a){a.removeChild(this._stage);this._stage.removeChild(this);this.dispose();this._container=null};c.prototype.hitTest=function(a,b){var e=this,c=[a,b];return w.create(function(a,b){e._pointToCallbacks.set(c,{resolve:a,reject:b});e.requestRender()},function(){e._pointToCallbacks.has(c)&&e._pointToCallbacks.delete(c)})};c.prototype.highlight=function(a){var b=this;b.addHighlight(a);
return{remove:function(){b.removeHighlight(a)}}};c.prototype.setHighlight=function(a){this._highlightIDs.clear();this.addHighlight(a)};c.prototype.setVisibility=function(a,b){for(var e=function(e){if(e.data){var c=e.data.tileDisplayData.displayObjectRegistry,d=a.filter(function(a){return c.has(a.id)});e.setVisibility(d,b)}},c=0,d=this.children;c<d.length;c++)e(d[c])};c.prototype.setVisibilityRange=function(a,b,e,c){for(var d=0,g=this.children;d<g.length;d++){var f=g[d];f.data&&f.data.tileDisplayData.displayObjectRegistry.has(a)&&
f.setVisibilityRange(a,b,e,c)}};c.prototype.addHighlight=function(a){for(var b=0;b<a.length;b++)this._highlightIDs.add(a[b]);this._buildHLList()};c.prototype.removeHighlight=function(a){for(var b=0;b<a.length;b++)this._highlightIDs.delete(a[b]);this._buildHLList()};c.prototype.getMaterialItems=function(a){if(a&&0!==a.length){for(var b=[],e=0;e<a.length;e++){var c=a[e];b.push(this.textureManager.rasterizeItem(c.symbol,c.glyphIds))}return x.all(b).then(function(a){return a.map(function(a,b){return{id:b,
mosaicItem:a}})})}};c.prototype.onTileData=function(a,b){var c=null;b.addOrUpdate&&(c=B.decode(b.addOrUpdate));c?b.clear||!a.hasData?a.setData(c,this.layer.labelsVisible):a.patchData({remove:b.remove,addOrUpdate:c},this.layer.labelsVisible):a.hasData?b.clear?a.clear():b.remove&&a.patchData({remove:b.remove,addOrUpdate:null},this.layer.labelsVisible):a.setData(null,!1);this._layerView&&this._layerView.view.labelManager.requestUpdate();a.buildHLList(this._highlightIDs);this.contains(a)||this.addChild(a);
this.fadeInLabels();this.requestRender()};c.prototype.onTileError=function(a){a.clear();a.buildHLList(this._highlightIDs);this.contains(a)||this.addChild(a);this.requestRender()};c.prototype.addChild=function(a){var b=m.prototype.addChild.call(this,a);this.layer.labelingInfo&&this._layerView&&this._layerView.view.labelManager.addTile(this.layer.uid,a);this._buildHLList();return b};c.prototype.removeChild=function(a){var b=m.prototype.removeChild.call(this,a);this.layer.labelingInfo&&this._layerView&&
this._layerView.view.labelManager.removeTile(this.layer.uid,a.key.id);this._buildHLList();return b};c.prototype.prepareChildrenRenderParameters=function(a){this._rendererInfo.updateVisualVariables(this._visualVariablesInfo.vvRanges,a.state);var b=this.tileInfoView.getClosestInfoForScale(a.state.scale).level,c=this.tileInfoView.tileInfo.scaleToZoom(a.state.scale);return u({},a,{rendererInfo:this._rendererInfo,requiredLevel:b,displayLevel:c})};c.prototype.renderChildren=function(a){var b=this,c=a.painter;
c.bindTextureManager(this.textureManager);this._rendererInfo.updateVisualVariables(this._visualVariablesInfo.vvRanges,a.state);this.sortChildren(function(a,b){return 0!==a.key.level-b.key.level?a.key.level-b.key.level:0!==a.key.row-b.key.row?a.key.row-b.key.row:a.key.col-b.key.col});var h=E.default.toWGLDrawPhases(a.drawPhase);if(0<h.length&&h[0]===p.WGLDrawPhase.LABEL||h[0]===p.WGLDrawPhase.LABEL_ALPHA){var d=this.layer;if(!(d.labelsVisible&&d.labelingInfo&&0<d.labelingInfo.length))return;this._updateTilesTransform(a.state,
a.requiredLevel);c.update(a.state,a.pixelRatio)}c.draw(a,this.children,h,this._painterOptions);0<this._highlightIDs.size&&c.highlight(a,this.children);0!==this._pointToCallbacks.size&&(this._pointToCallbacks.forEach(function(c,e){c.resolve(b._hitTest(a,e[0],e[1]))}),this._pointToCallbacks.clear())};c.prototype.attachChild=function(a,b){return a.attach(b)};c.prototype.detachChild=function(a,b){a.detach(b)};c.prototype.renderChild=function(a,b){a.doRender(b)};c.prototype.beforeRenderChildren=function(a,
b){this._updateTilesTransform(a.state,this.tileInfoView.getClosestInfoForScale(a.state.scale).level);this._updateHighlightOptions();this._stage.opacity=this._container.opacity};c.prototype._hitTest=function(a,b,c){var e=a.painter,d=a.requiredLevel,g=[0,0];a.state.toMap(g,[b,c]);b=a.state.clone();c=b.viewpoint.clone();c.targetGeometry=new y(g[0],g[1],a.state.spatialReference);b.viewpoint=c;b.size=[t.C_HITTEST_SEARCH_SIZE,t.C_HITTEST_SEARCH_SIZE];this._updateTilesTransform(b,d);e.update(b,a.pixelRatio);
return e.hitTest({context:a.context,drawPhase:p.WGLDrawPhase.HITTEST,painter:e,pixelRatio:a.pixelRatio,displayLevel:a.displayLevel,rendererInfo:this._rendererInfo,requiredLevel:d,state:b,stationary:a.stationary},this.children)};c.prototype._updateTilesTransform=function(a,b){var c=1/a.width,h=1/a.height,d=[0,0];this._calculateRelativeViewProjMat(this.tileInfoView.tileInfo.lods[b].resolution,a.resolution,a.rotation,this.tileInfoView.tileInfo.size[0],a.width,a.height,this._defaultTransform);for(var g=
0,f=this.children;g<f.length;g++){var k=f[g];a.toScreen(d,k.coords);d[1]=a.height-d[1];k.tileTransform.displayCoord[0]=2*d[0]*c-1;k.tileTransform.displayCoord[1]=2*d[1]*h-1;k.key.level===b?k.tileTransform.transform.set(this._defaultTransform):this._calculateRelativeViewProjMat(this.tileInfoView.tileInfo.lods[k.key.level].resolution,a.resolution,a.rotation,this.tileInfoView.tileInfo.size[0],a.width,a.height,k.tileTransform.transform)}};c.prototype._calculateRelativeViewProjMat=function(a,b,c,h,d,g,
f){a/=b;this._tileCoordinateScale.set([a,a,1]);if(d!==this._displayWidth||g!==this._displayHeight)this._displayScale.set([2/d,-2/g,1]),this._displayWidth=d,this._displayHeight=g;l.identity(f);l.scale(f,f,this._tileCoordinateScale);l.rotate(f,f,-c*C.C_DEG_TO_RAD,this._orientationVec);l.scale(f,f,this._displayScale);l.transpose(f,f)};c.prototype._updateHighlightOptions=function(){if(!this._highlightOptionsUpToDate&&this.parent){var a=this.parent.glPainter,b=this._highlightOptions;if(a){var c=b.color.toRgba();
c[0]/=255;c[1]/=255;c[2]/=255;var h=c.slice();c[3]*=b.fillOpacity;h[3]*=b.haloOpacity;a.setHighlightOptions({fillColor:c,outlineColor:h,outlineWidth:2,outerHaloWidth:.3,innerHaloWidth:.3,outlinePosition:0})}}};c.prototype._buildHLList=function(){for(var a=0,b=this.children;a<b.length;a++)b[a].buildHLList(this._highlightIDs);this.requestRender()};return c}(z);r.default=q});