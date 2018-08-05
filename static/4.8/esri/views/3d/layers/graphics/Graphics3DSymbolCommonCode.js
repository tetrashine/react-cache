// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../../geometry/support/coordsUtils ../../../../geometry/support/triangulationUtils ../../../../layers/graphics/dehydratedFeatures ../../../../symbols/callouts/calloutUtils ./graphicUtils ../../lib/glMatrix ../../support/projectionUtils ../../webgl-engine/lib/Object3D".split(" "),function(B,e,C,I,n,J,D,E,w,K){function y(b,a,c,d,f){var p=a.z||0,e=c.featureExpressionInfoContext;switch(c.mode){case "on-the-ground":return c=b.getElevation(a,"ground")||0,f&&(f.verticalDistanceToGround=
0,f.terrainElevation=c),c;case "relative-to-ground":return b=b.getElevation(a,"ground")||0,c=c.calculateOffsetRenderUnits(d),null==e&&(c+=p),f&&(f.verticalDistanceToGround=c,f.terrainElevation=b),c+b;case "relative-to-scene":return b=b.getElevation(a,"scene")||0,c=c.calculateOffsetRenderUnits(d),f&&(f.verticalDistanceToGround=c,f.terrainElevation=b),c+b;case "absolute-height":return c=c.calculateOffsetRenderUnits(d),null==e&&(c+=p),f&&(b=b.getElevation(a,"ground")||0,f.verticalDistanceToGround=c-
b,f.terrainElevation=b),c}return 0}function z(b,a){b=I.pathsToTriangulationInfo(b,a);return{vertexData:b.position,polygons:b.polygons,outlines:b.outlines}}function F(b,a,c,d,f){a*=3;d*=3;for(var e=0;e<f;++e)c[d++]=b[a++],c[d++]=b[a++],c[d++]=b[a++]}function A(b,a,c,d,f,e,h){return w.bufferToBuffer(b,c,a,d,e,f,h)}function x(b,a,c){w.pointToVector(b,a,c)}function G(b,a){return!(b[0]>a[3]||b[0]<a[0]||b[1]>a[4]||b[1]<a[1])}function H(b,a){return!(a[0]>b[3]||a[3]<b[0]||a[1]>b[4]||a[4]<b[1])}Object.defineProperty(e,
"__esModule",{value:!0});B=E.mat4d;var g=E.vec3d.create(),L=B.identity(),m=n.makeDehydratedPoint(0,0,0,null);e.createStageObjectForPoint=function(b,a,c,d,f,e,h,k,m,M,t){var p=a?a.length:0,q=this._context.clippingExtent;x(b,g,this._context.elevationProvider.spatialReference);if(q&&!G(g,q))return null;x(b,g,this._context.renderSpatialReference);q=this._context.localOriginFactory.getOrigin(g);h=new K({castShadow:!1,metadata:{layerUid:k,graphicUid:m,usesVerticalDistanceToGround:!!M},idHint:h});for(k=
0;k<p;k++)h.addGeometry(a[k],c[k],d?d[k]:L,f,q,t);a=this._context.renderSpatialReference;d=this._context.elevationProvider;f=this._context.renderCoordsHelper;c=0;var l;h.metadata.usesVerticalDistanceToGround?(c=y(d,b,e,f,r),D.updateVertexAttributeAuxpos1w(h,r.verticalDistanceToGround),l=r.terrainElevation):(t="absolute-height"!==e.mode,c=y(d,b,e,f,t?r:null),t&&(l=r.terrainElevation));e=h.getObjectTransformation();g[0]=b.x;g[1]=b.y;g[2]=c;w.computeLinearTransformation(b.spatialReference,g,e,a)?h.setObjectTransformation(e):
console.warn("Could not locate symbol object properly, it might be misplaced");return{object:h,terrainElevation:l}};e.extendPointGraphicElevationContext=function(b,a,c){b=b.elevationContext;c=c.spatialReference;x(a,g,c);b.centerPointInElevationSR=n.makeDehydratedPoint(g[0],g[1],n.hasZ(a)?g[2]:0,c)};e.placePointOnGeometry=function(b){switch(b.type){case "point":return b;case "polygon":case "extent":return D.computeCentroid(b);case "polyline":var a=b.paths[0];if(!a||0===a.length)break;a=C.getPointOnPath(a,
C.getPathLength(a)/2);return n.makeDehydratedPoint(a[0],a[1],a[2],b.spatialReference);case "mesh":return b.extent.center}return null};e.computeElevation=y;e.getSingleSizeDriver=function(b,a){void 0===a&&(a=0);return isFinite(b[a])?b[a]:null};e.copyPathData=z;e.copyVertices=F;e.chooseOrigin=function(b,a,c,d){a=Math.floor(a+(c-1)/2);d[0]=b[3*a+0];d[1]=b[3*a+1];d[2]=b[3*a+2]};e.subtractCoordinates=function(b,a,c,d){a*=3;for(var f=0;f<c;++f)b[a++]-=d[0],b[a++]-=d[1],b[a++]-=d[2]};e.setZ=function(b,a,
c,d){a*=3;for(var f=0;f<c;++f)b[a+2]=d,a+=3};e.offsetZ=function(b,a,c,d){a*=3;for(var f=0;f<c;++f)b[a+2]+=d,a+=3};e.scaleZ=function(b,a,c,d){a*=3;for(var f=0;f<c;++f)b[a+2]*=d,a+=3};e.flatArrayToArrayOfArrays=function(b,a,c){var d=[];a*=3;for(var f=0;f<c;++f)d.push([b[a++],b[a++],b[a++]]);return d};e.reproject=A;e.reprojectPoint=x;e.getGeometryVertexData3D=function(b,a,c,d,f,e,h){var k=f.spatialReference;b=z(b,a);a=b.vertexData;var p=a.length/3,g=new Float64Array(a.length),t=!0;c.equals(k)?F(a,0,
g,0,a.length):t=A(a,0,c,g,0,k,p);var v=c=0,q=h.mode,l=0,u=0,n=0;e=h.calculateOffsetRenderUnits(e);h=h.featureExpressionInfoContext;m.spatialReference=f.spatialReference;c*=3;for(var v=3*v,r=0;r<p;++r)m.x=g[c+0],m.y=g[c+1],m.z=g[c+2],"on-the-ground"===q?(u=l=f.getElevation(m)||0,n+=l):"relative-to-ground"===q?(l=f.getElevation(m)||0,u=l+e,null==h&&(u+=m.z),n+=l):"relative-to-scene"===q?(l=f.getElevation(m,"scene")||0,u=l+e,n+=l):"absolute-height"===q&&(u=e,null==h&&(u+=m.z)),a[v+0]=g[c+0],a[v+1]=g[c+
1],a[v+2]=u,c+=3,v+=3;f=n/p;k.equals(d)||A(a,0,k,a,0,d,p);return{geometryData:b,vertexData:a,eleVertexData:g,terrainElevation:f,projectionSuccess:t}};e.getGeometryVertexDataDraped=function(b,a,c){b=z(b,!1);var d=b.vertexData,f=d.length/3,e=!0;a.equals(c)||(e=w.bufferToBuffer(d,a,0,d,c,0,f));return{geometryData:b,vertexData:d,projectionSuccess:e}};e.computeBoundingBox=function(b,a,c,d){d[0]=Number.MAX_VALUE;d[1]=Number.MAX_VALUE;d[2]=Number.MAX_VALUE;d[3]=-Number.MAX_VALUE;d[4]=-Number.MAX_VALUE;d[5]=
-Number.MAX_VALUE;a*=3;for(var e=0;e<c;++e){var g=b[a++],h=b[a++],k=b[a++];g<d[0]&&(d[0]=g);h<d[1]&&(d[1]=h);k<d[2]&&(d[2]=k);g>d[3]&&(d[3]=g);h>d[4]&&(d[4]=h);k>d[5]&&(d[5]=k)}return d};e.pointInBox2D=G;e.boxesIntersect2D=H;e.boundingBoxClipped=function(b,a){return a?!H(b,a):!1};e.needsElevationUpdates2D=function(b){return"relative-to-ground"===b||"relative-to-scene"===b};e.needsElevationUpdates3D=function(b){return"absolute-height"!==b};e.needsOffsetAdjustment=function(b,a,c,d){if(!1===a.needsOffsetAdjustment||
!1===a.supportsOffsetAdjustment||"on-the-ground"===b.mode)return!1;if(0===b.meterUnitOffset){if(!0===a.needsOffsetAdjustment)return!0;if(J.isCalloutSupport(d)&&d.hasVisibleVerticalOffset())return!1;if("relative-to-ground"===b.mode&&(!n.hasZ(c)||b.featureExpressionInfoContext)||"relative-to-scene"===b.mode)return!0}return!1};var r={verticalDistanceToGround:0,terrainElevation:0}});