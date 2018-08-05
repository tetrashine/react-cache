// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define(["require","exports","../lib/glMatrix"],function(q,h,f){function l(a,c,b,e){var d=p;a?(b&&e&&(d.len=f.vec3d.dist(c,b)),f.vec3d.set(a,d.dir)):e?(d.len=f.vec3d.dist(c,b),f.vec3d.scale(f.vec3d.subtract(b,c,d.dir),1/d.len)):f.vec3d.normalize(f.vec3d.subtract(b,c,d.dir));return d}function m(a,c){return-f.vec3d.dot(c,a)-a[3]}function n(a,c,b,e){e.clip[0]=0;e.clip[1]=b?e.len:Number.MAX_VALUE;for(b=0;b<a.length;b++){var d;var g=a[b],h=c;d=e;var k=f.vec3d.dot(g,d.dir),g=m(g,h);0>g&&0<=k?d=!1:-1E-6<
k&&1E-6>k?d=0<g:!(0>g||0>k)||0>g&&0>k?(g/=k,0<k?g<d.clip[1]&&(d.clip[1]=g):g>d.clip[0]&&(d.clip[0]=g),d=d.clip[0]<=d.clip[1]):d=!0;if(!d)return!1}return!0}Object.defineProperty(h,"__esModule",{value:!0});h.planeSphere=function(a,c,b){return a[0]*c[0]+a[1]*c[1]+a[2]*c[2]+a[3]<b};h.frustumSphere=function(a,c,b){var e=c[0],d=c[1];c=c[2];return a[0][0]*e+a[0][1]*d+a[0][2]*c+a[0][3]>b||a[1][0]*e+a[1][1]*d+a[1][2]*c+a[1][3]>b||a[2][0]*e+a[2][1]*d+a[2][2]*c+a[2][3]>b||a[3][0]*e+a[3][1]*d+a[3][2]*c+a[3][3]>
b||a[4][0]*e+a[4][1]*d+a[4][2]*c+a[4][3]>b||a[5][0]*e+a[5][1]*d+a[5][2]*c+a[5][3]>b?!1:!0};h.frustumRay=function(a,c,b,e){b=l(e,c,b,!1);return n(a,c,null,b)};h.frustumPoint=function(a,c){for(var b=0;6>b;b++)if(0>m(a[b],c))return!1;return!0};h.frustumLineSegment=function(a,c,b,e){e=l(e,c,b,!0);return n(a,c,b,e)};h.closestPointOnRay=function(a,c,b,e){b=f.vec3d.dot(c,f.vec3d.subtract(b,a,e));f.vec3d.add(a,f.vec3d.scale(c,b,e),e);return e};var p={dir:f.vec3d.create(),len:0,clip:f.vec2d.create()}});