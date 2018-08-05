// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../geometry/SpatialReference ../../../../../geometry/support/geodesicUtils ../../../lib/glMatrix ../../../support/mathUtils ../../../support/projectionUtils".split(" "),function(t,u,m,k,c,e,f){function n(b){b.x=q.normalize(b.x);b.y=r.normalize(b.y)}function p(b,c,a){f.vectorToVector(b,c,a,m.WGS84);a[0]=e.deg2rad(a[0]);a[1]=e.deg2rad(a[1])}var q=new e.Cyclical(-180,180),r=new e.Cyclical(-90,90),l;(function(b){var g=function(){function a(h,d){this._startPosition=
c.vec3d.create();this._endPosition=c.vec3d.create();c.vec3d.set(h,this._startPosition);c.vec3d.set(d,this._endPosition)}a.prototype.eval=function(h,d){c.vec3d.lerp(this._startPosition,this._endPosition,h,d)};return a}();b.Linear=g;g=function(){function a(h,d,a,b){this._startCoords=c.vec3d.create();this._endCoords=c.vec3d.create();p(h,a,this._startCoords);p(d,a,this._endCoords);this._destSR=b;this._startToEnd=k.inverseGeodeticSolver(this._startCoords[1],this._startCoords[0],this._endCoords[1],this._endCoords[0]);
this._endToStart=k.inverseGeodeticSolver(this._endCoords[1],this._endCoords[0],this._startCoords[1],this._startCoords[0])}a.prototype.eval=function(a,d){var b=k.directGeodeticSolver(this._startCoords[1],this._startCoords[0],this._startToEnd.azimuth,this._startToEnd.geodesicDistance*a),c=k.directGeodeticSolver(this._endCoords[1],this._endCoords[0],this._endToStart.azimuth,this._endToStart.geodesicDistance*(1-a));n(b);n(c);d[0]=e.lerp(b.x,c.x,a);d[1]=e.lerp(b.y,c.y,a);d[2]=e.lerp(this._startCoords[2],
this._endCoords[2],a);f.vectorToVector(d,m.WGS84,d,this._destSR)};return a}();b.Geodesic=g;g=function(){function a(a,d,b,e){this._startPosition=c.vec3d.create();this._endPosition=c.vec3d.create();f.vectorToVector(a,b,this._startPosition,f.SphericalECEFSpatialReference);f.vectorToVector(d,b,this._endPosition,f.SphericalECEFSpatialReference);this._destSR=e}a.prototype.eval=function(a,b){e.slerp(this._startPosition,this._endPosition,a,b);f.vectorToVector(b,f.SphericalECEFSpatialReference,b,this._destSR)};
return a}();b.Spherical=g})(l||(l={}));return l});