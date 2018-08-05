// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/ObjectPool ./FeatureTileDescriptor3D ../../lib/glMatrix ../../state/Frustum ../../support/FrustumExtentIntersection ../../support/geometryUtils ../../support/mathUtils".split(" "),function(m,n,r,l,f,g,t,p,u){Object.defineProperty(n,"__esModule",{value:!0});m=function(){function b(a){this.surfaceElevation=0;this.cache=new Map;a=a.renderCoordsHelper;this.frustum=new g.Frustum({renderCoordsHelper:a});this.extendedFrustum=new g.Frustum({renderCoordsHelper:a});
this.intersector=new t.FrustumExtentIntersection({renderCoordsHelper:a});this.renderCoordsHelper=a}b.prototype.begin=function(a,d){this.surfaceElevation=d;this.aboveGround=this.renderCoordsHelper.getAltitude(a.eye)>d;this.frustum.update(a);this.shortenFrustumFarPlane(this.frustum);this.updateExtendedFrustum(a,d)};b.prototype.end=function(){this.cache.clear()};b.prototype.calculate=function(a){if(this.allTilesInvisible)return 0;var d="global"===this.renderCoordsHelper.type&&a.lij[0]>=v&&a.lij[0]<w,
c=this.getOrCalculateSingleTileVisibility(a,!d);return 0!==c&&d?this.calculateAggregatedChildrenVisibility(a):c};b.prototype.shortenFrustumFarPlane=function(a){for(var d=a.points,c=0,b=g.Frustum.nearFarLineIndices;c<b.length;c++){var e=b[c],h=e[1],e=d[e[0]];f.vec3d.add(e,f.vec3d.scale(f.vec3d.subtract(d[h],e,k),x),d[h])}a.updatePoints(d)};b.prototype.calculateAggregatedChildrenVisibility=function(a){var d=0,c=this.cache.get(a.id);if(null!=c)return c;c=q.acquire();a.getChildren(c);for(var b=0;b<c.length;b++){var e=
this.calculate(c[b]);if(0!==e&&(d=e,2===e))break}q.release(c);this.cache.set(a.id,d);return d};b.prototype.getOrCalculateSingleTileVisibility=function(a,b){var c=this.cache.get(a.id);if(null!=c)return c;c=this.calculateSingleTileVisibility(a);b&&this.cache.set(a.id,c);return c};b.prototype.calculateSingleTileVisibility=function(a){if(!this.aboveGround&&"global"===this.renderCoordsHelper.type&&a.lij[0]<y){if(0===this.calculateSingleTileVisibilitySided(a,!1))return this.calculateSingleTileVisibilitySided(a,
!0)}else return this.calculateSingleTileVisibilitySided(a,this.aboveGround)};b.prototype.calculateSingleTileVisibilitySided=function(a,b){this.intersector.update(a.extent,a.tilingScheme.spatialReference,this.surfaceElevation,b);return this.intersector.isVisibleInFrustum(this.extendedFrustum)?this.intersector.isVisibleInFrustum(this.frustum,!0)?2:1:0};b.prototype.updateExtendedFrustum=function(a,b){var c=this.renderCoordsHelper;this.extendedFrustum.update(a);this.shortenFrustumFarPlane(this.extendedFrustum);
var d=this.renderCoordsHelper.worldUpAtPosition(a.eye,k);this.aboveGround||f.vec3d.negate(d);d=u.acos(-f.vec3d.dot(d,a.viewForward));this.allTilesInvisible=d>(Math.PI+a.fovY)/2;if(!this.allTilesInvisible&&(this.hasExtendedFrustum=d>a.fovY/2)){a=this.extendedFrustumParameters(b);b=this.extendedFrustum.points;for(d=0;4>d;d++){var e=a.pointIndices[d],h=b[e],g=c.getAltitude(h);if(a.needsAltitudeAdjustment(g)){this.renderCoordsHelper.worldUpAtPosition(h,k);switch(e){case 4:case 7:case 0:case 3:p.plane.projectVector(this.extendedFrustum.planes[0],
k);break;case 5:case 6:case 1:case 2:p.plane.projectVector(this.extendedFrustum.planes[1],k)}f.vec3d.scale(k,a.direction);this.renderCoordsHelper.intersectManifold(h,k,a.zWithMargin,h)}}this.extendedFrustum.updatePoints(b);0>f.vec3d.dot(this.extendedFrustum.planes[4],this.frustum.planes[4])&&(c=this.extendedFrustum.points,this.aboveGround?(a=[c[1],c[0]],c[0]=a[0],c[1]=a[1]):(a=[c[2],c[3]],c[3]=a[0],c[2]=a[1]),this.extendedFrustum.updatePoints(c))}};b.prototype.extendedFrustumParameters=function(a){return this.aboveGround?
this.extendedFrustumParametersAboveSurface(a,1):this.extendedFrustumParametersBelowSurface(a,1)};b.prototype.extendedFrustumParametersAboveSurface=function(a,b){var c=a-b;return{zWithMargin:c,pointIndices:g.Frustum.planePointIndices.bottom,direction:-1,needsAltitudeAdjustment:function(a){return a>c}}};b.prototype.extendedFrustumParametersBelowSurface=function(a,b){var c=a+b;return{zWithMargin:c,pointIndices:g.Frustum.planePointIndices.top,direction:1,needsAltitudeAdjustment:function(a){return a<c}}};
return b}();n.FeatureTileVisibility3D=m;var v=2,w=6,y=12,x=.95,k=f.vec3d.create(),q=new r(Array,function(b){4!==b.length&&(b[0]=new l.FeatureTileDescriptor3D,b[1]=new l.FeatureTileDescriptor3D,b[2]=new l.FeatureTileDescriptor3D,b[3]=new l.FeatureTileDescriptor3D)},function(b){b[0].release();b[1].release();b[2].release();b[3].release()});n.default=m});