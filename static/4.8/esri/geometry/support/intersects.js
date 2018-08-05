// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define(["require","exports","./contains"],function(D,f,h){function v(a,c){return h.extentContainsPoint(a,c)}function u(a,c){var d=a.hasZ&&c.hasZ,b;if(a.xmin<=c.xmin){if(b=c.xmin,a.xmax<b)return!1}else if(b=a.xmin,c.xmax<b)return!1;if(a.ymin<=c.ymin){if(b=c.ymin,a.ymax<b)return!1}else if(b=a.ymin,c.ymax<b)return!1;if(d&&c.hasZ)if(a.zmin<=c.zmin){if(d=c.zmin,a.zmax<d)return!1}else if(d=a.zmin,c.zmax<d)return!1;return!0}function w(a,c){var d=c.hasZ?h.extentContainsCoords3D:h.extentContainsCoords2D,b=
0;for(c=c.points;b<c.length;b++)if(d(a,c[b]))return!0;return!1}function x(a,c){n[0]=a.xmin;n[1]=a.ymax;p[0]=a.xmax;p[1]=a.ymax;q[0]=a.xmin;q[1]=a.ymin;r[0]=a.xmax;r[1]=a.ymin;for(var d=0,b=C;d<b.length;d++)if(h.polygonContainsCoords(c,b[d]))return!0;d=0;for(c=c.rings;d<c.length;d++)if(b=c[d],b.length){var l=b[0];if(h.extentContainsCoords2D(a,l))return!0;for(var k=1;k<b.length;k++){var g=b[k];if(h.extentContainsCoords2D(a,g)||y(l,g,z))return!0;l=g}}return!1}function A(a,c){n[0]=a.xmin;n[1]=a.ymax;
p[0]=a.xmax;p[1]=a.ymax;q[0]=a.xmin;q[1]=a.ymin;r[0]=a.xmax;r[1]=a.ymin;c=c.paths;for(var d=0;d<c.length;d++){var b=c[d];if(c.length){var l=b[0];if(h.extentContainsCoords2D(a,l))return!0;for(var k=1;k<b.length;k++){var g=b[k];if(h.extentContainsCoords2D(a,g)||y(l,g,z))return!0;l=g}}}return!1}function y(a,c,d){for(var b=0;b<d.length;b++)if(t(a,c,d[b][0],d[b][1]))return!0;return!1}function t(a,c,d,b,l){var k=a[0];a=a[1];var g=c[0];c=c[1];var e=d[0],m=d[1];d=b[0]-e;var e=k-e,B=g-k;b=b[1]-m;var m=a-m,
f=c-a,h=b*B-d*f;if(0===h)return!1;d=(d*m-b*e)/h;e=(B*m-f*e)/h;return 0<=d&&1>=d&&0<=e&&1>=e?(l&&(l[0]=k+d*(g-k),l[1]=a+d*(c-a)),!0):!1}Object.defineProperty(f,"__esModule",{value:!0});f.extentIntersectsPoint=v;f.extentIntersectsExtent=u;f.extentIntersectsMultipoint=w;var n=[0,0],p=[0,0],q=[0,0],r=[0,0],C=[n,p,q,r],z=[[q,n],[n,p],[p,r],[r,q]];f.extentIntersectsPolygon=x;f.extentIntersectsPolyline=A;var e=[0,0];f.isSelfIntersecting=function(a){for(var c=0;c<a.length;c++){for(var d=a[c],b=0;b<d.length-
1;b++)for(var l=d[b],k=d[b+1],g=c+1;g<a.length;g++)for(var f=0;f<a[g].length-1;f++){var m=a[g][f],h=a[g][f+1],n=t(l,k,m,h,e);if(n&&!(e[0]===l[0]&&e[1]===l[1]||e[0]===m[0]&&e[1]===m[1]||e[0]===k[0]&&e[1]===k[1]||e[0]===h[0]&&e[1]===h[1]))return!0}f=d.length;if(!(4>=f))for(b=0;b<f-3;b++){var p=f-1;0===b&&(p=f-2);l=d[b];k=d[b+1];for(g=b+2;g<p;g++)if(m=d[g],h=d[g+1],(n=t(l,k,m,h,e))&&!(e[0]===l[0]&&e[1]===l[1]||e[0]===m[0]&&e[1]===m[1]||e[0]===k[0]&&e[1]===k[1]||e[0]===h[0]&&e[1]===h[1]))return!0}}return!1};
f.segmentIntersects=t;f.getExtentIntersector=function(a){switch(a){case "esriGeometryEnvelope":case "extent":return u;case "esriGeometryMultipoint":case "multipoint":return w;case "esriGeometryPoint":case "point":return v;case "esriGeometryPolygon":case "polygon":return x;case "esriGeometryPolyline":case "polyline":return A;case "mesh":return u}}});