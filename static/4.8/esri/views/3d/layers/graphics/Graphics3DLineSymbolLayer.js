// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../../../core/screenUtils ../../../../geometry/Polygon ../../../../geometry/support/aaBoundingBox ../../../../layers/graphics/dehydratedFeatures ./ElevationAligners ./Graphics3DDrapedGraphicLayer ./Graphics3DObject3DGraphicLayer ./Graphics3DSymbolCommonCode ./Graphics3DSymbolLayer ./graphicUtils ./lineUtils ../../lib/glMatrix ../../webgl-engine/Stage ../../webgl-engine/lib/Geometry ../../webgl-engine/lib/Object3D ../../webgl-engine/lib/RenderGeometry".split(" "),
function(Q,R,E,z,F,A,G,H,I,J,n,K,L,w,B,C,M,N,O){var D=B.vec3d,x=B.mat4d;return function(m){function e(){return null!==m&&m.apply(this,arguments)||this}E(e,m);e.prototype._prepareResources=function(){var a=this.symbol,b=this._isPropertyDriven("size")||this._isPropertyDriven("color")||this._isPropertyDriven("opacity"),a={idHint:this._getStageIdHint(),width:this._getWidth(a),color:this._getMaterialOpacityAndColor()};if(!this._isPropertyDriven("size")){var g=L.validateSymbolLayerSize(a.width);if(g){this._logWarning(g);
this.reject();return}}if(b||1.5<=a.width)this._isPropertyDriven("size")&&(a.width=0),this._material=w.createRibbonMaterial(a);else if(0<a.width)this._material=w.createNativeMaterial(a);else{this.reject();return}this._context.stage.add(C.ModelContentType.MATERIAL,this._material);this.resolve()};e.prototype._getWidth=function(a){return null!=a.size?z.pt2px(a.size):1};e.prototype.destroy=function(){m.prototype.destroy.call(this);this.isFulfilled()||this.reject();this._material&&(this._context.stage.remove(C.ModelContentType.MATERIAL,
this._material.id),this._material=null)};e.prototype.createGraphics3DGraphic=function(a){var b=a.renderingInfo;a=a.graphic;var g=a.geometry;if("polyline"!==g.type&&"polygon"!==g.type&&"extent"!==g.type)return this._logWarning("unsupported geometry type for line symbol: "+g.type),null;if(!this._validateGeometry(g))return null;var g="polygon"===g.type||"extent"===g.type?"rings":"paths",c="graphic"+a.uid,d=this._getVertexOpacityAndColor(b,Float32Array,255),h=0;b.size&&this._isPropertyDriven("size")&&
(h=n.getSingleSizeDriver(b.size),h=z.pt2px(h));b=this.getGraphicElevationContext(a);return"on-the-ground"===b.mode?this._createAsOverlay(a,g,d,h,b,c):this._createAs3DShape(a,g,d,h,b,c,a.uid)};e.prototype.layerPropertyChanged=function(a,b,g){if("opacity"===a)return b=this._material.getColor(),this._material.setColor([b[0],b[1],b[2],this._getMaterialOpacity()]),!0;if("elevationInfo"===a){a=this._elevationContext.mode;this._updateElevationContext();var c=this._elevationContext.mode;if(null==a||null==
c)return!1;if("on-the-ground"===a&&"on-the-ground"===c)return!0;if(a!==c&&("on-the-ground"===a||"on-the-ground"===c))return!1;a=n.needsElevationUpdates2D(c);for(var d in b){var h=b[d];(c=g(h))&&"object3d"===c.type&&(h=h.graphic,c.needsElevationUpdates=a,c.elevationContext.set(this.getGraphicElevationContext(h)))}return!0}return!1};Object.defineProperty(e.prototype,"numberOfVertices",{get:function(){return 0},enumerable:!0,configurable:!0});e.prototype._getOutlineGeometry=function(a,b){return b};e.prototype._getGeometry=
function(a){a=a.geometry;"extent"===a.type&&(a=F.fromExtent(a));return a};e.prototype._createAs3DShape=function(a,b,g,c,d,h,P){var f=this._getGeometry(a),e=f[b],r=this._getOutlineGeometry(f,e);a=[];var t=[],k=[],p=D.create(),q=Array(6),f=n.getGeometryVertexData3D(r,G.hasZ(f),f.spatialReference,this._context.renderSpatialReference,this._context.elevationProvider,this._context.renderCoordsHelper,d);this._logGeometryCreationWarnings(f,e,b,"LineSymbol3DLayer");if(0<r.length){for(var e=f.geometryData.outlines,
r=f.eleVertexData,m=f.vertexData,y=0;y<e.length;++y){var u=e[y];if(!(1>=u.count)){var l=u.index,v=u.count;if(this._context.clippingExtent&&(n.computeBoundingBox(r,l,v,q),n.boundingBoxClipped(q,this._context.clippingExtent)))continue;n.chooseOrigin(m,l,v,p);n.subtractCoordinates(m,l,v,p);u=new Float64Array(r.buffer,3*l*r.BYTES_PER_ELEMENT,3*v);l=new Float64Array(m.buffer,3*l*m.BYTES_PER_ELEMENT,3*v);l=w.createPolylineGeometry(l,u,"rings"===b,g,c);l=new M(l,h+"path"+y);l.singleUse=!0;a.push(l);t.push([this._material]);
l=x.identity();x.translate(l,p,l);k.push(l)}}if(0<a.length)return b=new N({geometries:a,materials:t,transformations:k,castShadow:!1,metadata:{layerUid:this._context.layer.uid,graphicUid:P},idHint:h}),b=new J(this,b,a,null,null,H.perVertexElevationAligner,d),b.alignedTerrainElevation=f.terrainElevation,b.needsElevationUpdates=n.needsElevationUpdates2D(d.mode),b}return null};e.prototype._createAsOverlay=function(a,b,g,e,d,h){var c=this._getGeometry(a);this._material.renderPriority=this._symbolLayerOrder;
var f=c[b],m=this._getOutlineGeometry(c,f);a=[];d=Array(6);var r=A.empty(),t=D.create(),c=n.getGeometryVertexDataDraped(m,c.spatialReference,this._context.overlaySR);this._logGeometryCreationWarnings(c,f,b,"LineSymbol3DLayer");if(0<m.length){f=c.vertexData;m=c.geometryData.outlines;for(c=0;c<m.length;++c){var k=m[c],p=k.index,k=k.count;n.computeBoundingBox(f,p,k,d);if(!n.boundingBoxClipped(d,this._context.clippingExtent)){A.expand(r,d);n.chooseOrigin(f,p,k,t);n.subtractCoordinates(f,p,k,t);n.setZ(f,
p,k,this._getDrapedZ());k=new Float64Array(f.buffer,3*p*f.BYTES_PER_ELEMENT,3*k);p=x.identity();x.translate(p,t,p);var k=w.createPolylineGeometry(k,null,"rings"===b,g,e),q=new O(k);q.material=this._material;q.center=[.5*(d[0]+d[3]),.5*(d[1]+d[4]),0];q.bsRadius=.5*Math.sqrt((d[3]-d[0])*(d[3]-d[0])+(d[4]-d[1])*(d[4]-d[1]));q.transformation=p;q.name=h;q.uniqueName=h+"#"+k.id;a.push(q)}}return new I(this,a,r)}return null};return e}(K)});