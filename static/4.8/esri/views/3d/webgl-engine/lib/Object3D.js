// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ./ComponentUtils ./GeometryRecord ./gl-matrix ./HighlightUtils ./IdGen ./ModelContentType ./Util".split(" "),function(q,z,f,p,r,t,v,w,x){var n=x.assert,e=r.mat4d,k=r.vec3d,y=e.identity();q=function(){function a(b){void 0===b&&(b={});this._bvObjectSpace=new u;this._bvWorldSpace=new u;this._bvDirty=!0;this._hasVolatileTransformation=!1;this._allComponentsHiddenDirty=!0;this.id=a._idGen.gen(b.idHint);this.name=b.name;this.castShadow=null!=b.castShadow?b.castShadow:!0;this.metadata=
b.metadata;this.objectTransformation=e.identity();this._initializeGeometryRecords(b.geometries,b.materials,b.transformations)}a.prototype._initializeGeometryRecords=function(b,c,d){if(Array.isArray(b)){n(c.length===b.length,"Object3D: materials don't match geometries");n(d.length===b.length,"Object3D: transformations don't match geometries");this.geometryRecords=Array(b.length);this.geometries=b.slice();for(var a=0;a<b.length;a++)n(Array.isArray(c[a]),"Object3D: materials parameter must be array of array"),
this.geometryRecords[a]=new p(b[a],c[a].slice(),e.create(d[a]),{});this._hasVolatileTransformation=!1}else this.geometryRecords=[],this.geometries=[]};Object.defineProperty(a.prototype,"parentLayer",{get:function(){return this._parentLayer},set:function(b){n(null==this._parentLayer||null==b,"Object3D can only be added to a single Layer");this._parentLayer=b},enumerable:!0,configurable:!0});a.prototype.getParentLayer=function(){return this.parentLayer};a.prototype.addParentLayer=function(b){this.parentLayer=
b};a.prototype.removeParentLayer=function(b){this.parentLayer=null};a.prototype.getNumGeometryRecords=function(){return this.geometryRecords.length};a.prototype.getFirstGeometryIndex=function(b){b=this.geometries.indexOf(b);n(-1<b,"Object3D.getFirstGeometryIndex: geometry not found");return b};a.prototype.findGeometryRecords=function(b){for(var c=[],a=0;a<this.geometries.length;a++)this.geometries[a]===b&&c.push(this.geometryRecords[a]);return c};a.prototype.getGeometryRecord=function(b){n(0<=b&&
b<this.geometryRecords.length,"Object3d.getGeometryDataByIndex: index out of range");return this.geometryRecords[b]};a.prototype.getGeometryRecords=function(){return this.geometryRecords};a.prototype.addGeometry=function(b,c,a,h,k,l){void 0===a&&(a=y);n(Array.isArray(c),"Object3D.addGeometry: materials must be array");this.geometries.push(b);b=new p(b,c.slice(),e.create(a),h||{},k,l);this.geometryRecords.push(b);this._hasVolatileTransformation=this.geometryRecords.some(function(b){return!!b.customTransformation});
this._notifyDirty("objGeometryAdded",b);this._invalidateBoundingVolume();return b};a.prototype.hasGeometry=function(b){return-1<this.geometries.indexOf(b)};a.prototype.removeGeometry=function(b){var c=this.geometryRecords.splice(b,1)[0];this._hasVolatileTransformation=this.geometryRecords.some(function(b){return!!b.customTransformation});this.geometries.splice(b,1);this._notifyDirty("objGeometryRemoved",c);this._invalidateBoundingVolume();return c};a.prototype.removeAllGeometries=function(){for(;0<
this.getNumGeometryRecords();)this.removeGeometry(0)};a.prototype.geometryVertexAttrsUpdated=function(b){this._notifyDirty("vertexAttrsUpdated",this.geometryRecords[b]);this._invalidateBoundingVolume()};a.prototype.areAllComponentsHidden=function(){if(this._allComponentsHiddenDirty){this._allComponentsHiddenDirty=!1;this._allComponentsHidden=!0;for(var b=0,c=this.geometryRecords;b<c.length;b++){var a=c[b],h=a.instanceParameters.componentVisibilities,a=a.geometry.getData().componentOffsets;if(!f.isAllHidden(h,
a)){this._allComponentsHidden=!1;break}}}return this._allComponentsHidden};a.prototype.areAllComponentsVisible=function(){for(var b=0,c=this.geometryRecords;b<c.length;b++){var a=c[b],h=a.instanceParameters.componentVisibilities,a=a.geometry.getData().componentOffsets;if(!f.isAllVisible(h,a))return!1}return!0};a.prototype.hasComponents=function(){for(var b=!1,c=0;c<this.geometries.length&&!(b=this.geometries[c].getData(),b=f.hasComponents(b.componentOffsets));c++);return b};a.prototype.setComponentVisibility=
function(b,c,a){var d=b.instanceParameters.componentVisibilities,e=b.geometry.getData().componentOffsets;c=f.updateVisibility(d,e,c,a);b.instanceParameters.componentVisibilities=c;this._notifyDirty("visibilityChanged",b);this._allComponentsHiddenDirty=!0};a.prototype.setHidden=function(b,c){b.instanceParameters.hidden=!!c;this._notifyDirty("visibilityChanged",b)};a.prototype.isHidden=function(b){return!!b.instanceParameters.hidden};a.prototype.getComponentVisibility=function(b,c){return f.getVisibility(b.instanceParameters.componentVisibilities,
c)};a.prototype.hideAllComponents=function(){for(var b=0,c=this.geometryRecords;b<c.length;b++){var a=c[b],h=f.hideAllComponents(a.instanceParameters.componentVisibilities);a.instanceParameters.componentVisibilities=h}this._notifyDirty("visibilityChanged");this._allComponentsHiddenDirty=!0};a.prototype.unhideAllComponents=function(){for(var b=0,c=this.geometryRecords;b<c.length;b++){var a=c[b],h=f.unhideAllComponents(a.instanceParameters.componentVisibilities);a.instanceParameters.componentVisibilities=
h}this._notifyDirty("visibilityChanged");this._allComponentsHiddenDirty=!0};a.prototype._setComponentHighlight=function(b,a,d,h){a=f.addHighlight(b.instanceParameters.componentHighlights,a,d,h);b.instanceParameters.componentHighlights=a};a.prototype.setComponentHighlight=function(b,a,d){var c=t.generateHighlightId();this._setComponentHighlight(b,a,d,c);this._notifyDirty("componentHighlightChanged");return c};a.prototype.highlightAllComponents=function(b){for(var a=t.generateHighlightId(),d=0,h=this.geometryRecords;d<
h.length;d++)this._setComponentHighlight(h[d],null,b,a);this._notifyDirty("componentHighlightChanged");return a};a.prototype.removeHighlights=function(b){for(var a=0,d=this.geometryRecords;a<d.length;a++){var h=d[a].instanceParameters,e=f.removeHighlight(h.componentHighlights,b);h.componentHighlights=e}this._notifyDirty("componentHighlightChanged")};a.prototype.getComponentFromTriangleNr=function(b,a){n(0<=b&&b<this.geometryRecords.length,"Object3d.getComponentFromTriangleNr: index out of range");
b=this.geometryRecords[b].geometry.getData().componentOffsets;return f.componentFind(b,3*a)};a.prototype.setGeometryTransformation=function(b,a){n(0<=b&&b<this.geometryRecords.length,"Object3d.setGeometryTransformation: index out of range");var c=this.geometryRecords[b];a=new p(c.geometry,c.materials,e.create(a),c.instanceParameters);this.geometryRecords[b]=a;this._notifyDirty("objGeometryReplaced",[c,a]);this._invalidateBoundingVolume()};a.prototype.getObjectTransformation=function(){return e.create(this.objectTransformation)};
a.prototype.setObjectTransformation=function(b){e.set(b,this.objectTransformation);this._invalidateBoundingVolume();this._notifyDirty("objTransformation")};a.prototype.getCombinedStaticTransformation=function(b,a){a=a||e.create();e.multiply(this.objectTransformation,b.getStaticTransformation(),a);return a};a.prototype.getCombinedShaderTransformation=function(b,a){a=a||e.create();e.multiply(this.objectTransformation,b.getShaderTransformation(),a);return a};a.prototype.hasVolativeTransformation=function(){return this._hasVolatileTransformation};
a.prototype.getCastShadow=function(){return this.castShadow};a.prototype.setCastShadow=function(b){this.castShadow=b};a.prototype.getMetadata=function(){return this.metadata};a.prototype.getName=function(){return this.name};a.prototype.getBBMin=function(b){this._validateBoundingVolume();return b?this._bvObjectSpace.bbMin:this._bvWorldSpace.bbMin};a.prototype.getBBMax=function(b){this._validateBoundingVolume();return b?this._bvObjectSpace.bbMax:this._bvWorldSpace.bbMax};a.prototype.getCenter=function(b){this._validateBoundingVolume();
return b?this._bvObjectSpace.center:this._bvWorldSpace.center};a.prototype.getBSRadius=function(b){this._validateBoundingVolume();return b?this._bvObjectSpace.bsRadius:this._bvWorldSpace.bsRadius};a.prototype._validateBoundingVolume=function(){if(this._bvDirty||this._hasVolatileTransformation){this._bvObjectSpace.init();this._bvWorldSpace.init();for(var b=0;b<this.geometryRecords.length;++b){var a=this.geometries[b],d=this.geometryRecords[b],a=a.getBoundingInfo();this._calculateTransformedBoundingVolume(a,
this._bvObjectSpace,d.getShaderTransformation());this._calculateTransformedBoundingVolume(a,this._bvWorldSpace,this.getCombinedShaderTransformation(d))}k.lerp(this._bvObjectSpace.bbMin,this._bvObjectSpace.bbMax,.5,this._bvObjectSpace.center);k.lerp(this._bvWorldSpace.bbMin,this._bvWorldSpace.bbMax,.5,this._bvWorldSpace.center);for(var d=k.create(),h=k.create(),f=e.maxScale(this.objectTransformation),b=0;b<this.geometryRecords.length;++b){var a=this.geometries[b],l=this.geometryRecords[b].getShaderTransformation(),
g=e.maxScale(l),a=a.getBoundingInfo();e.multiplyVec3(l,a.getCenter(),d);l=k.dist(d,this._bvObjectSpace.center);a=a.getBSRadius()*g;this._bvObjectSpace.bsRadius=Math.max(this._bvObjectSpace.bsRadius,l+a);e.multiplyVec3(this.objectTransformation,d,h);g=k.dist(h,this._bvWorldSpace.center);this._bvWorldSpace.bsRadius=Math.max(this._bvWorldSpace.bsRadius,g+a*f)}this._bvDirty=!1}};a.prototype._calculateTransformedBoundingVolume=function(b,a,d){var c=b.getBBMin();b=b.getBBMax();var f=k.create(c),l=k.create(b);
e.multiplyVec3(d,f);e.multiplyVec3(d,l);for(var g=0;3>g;++g)a.bbMin[g]=Math.min(a.bbMin[g],f[g],l[g]),a.bbMax[g]=Math.max(a.bbMax[g],f[g],l[g]);for(g=0;3>g;++g){k.set(c,f);k.set(b,l);f[g]=b[g];l[g]=c[g];e.multiplyVec3(d,f);e.multiplyVec3(d,l);for(var m=0;3>m;++m)a.bbMin[m]=Math.min(a.bbMin[m],f[m],l[m]),a.bbMax[m]=Math.max(a.bbMax[m],f[m],l[m])}};a.prototype._invalidateBoundingVolume=function(){this._bvDirty=!0;this._parentLayer&&this._parentLayer.notifyObjectBBChanged(this,{center:this._bvWorldSpace.center,
radius:this._bvWorldSpace.bsRadius})};a.prototype._notifyDirty=function(a,c,d,e){this._parentLayer&&(d=d||w.OBJECT,this._parentLayer.notifyDirty(a,c,d,e||this))};a._idGen=new v;return a}();var u=function(){function a(){this.bbMin=k.create();this.bbMax=k.create();this.center=k.create();this.bsRadius=0}a.prototype.init=function(){k.set3(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE,this.bbMin);k.set3(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE,this.bbMax);k.set3(0,0,0,this.center);this.bsRadius=
0};a.prototype.getCenter=function(){return this.center};a.prototype.getBSRadius=function(){return this.bsRadius};return a}();return q});