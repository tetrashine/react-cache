// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define(["require","exports","../../core/global","../../views/3d/support/mathUtils"],function(z,g,r,t){function l(b,a,c,e,d){b=new Uint32Array(b*b);a="buffer"in a?a:new Float64Array(a);c="buffer"in c?new Uint32Array(c.buffer):new Uint32Array((new Uint8Array(c)).buffer);d=c.length/(d-e);for(var h=0;h<a.length;h++)b[h]=c[t.clamp(Math.floor((a[h]-e)*d),0,c.length-1)];return b.buffer}function v(b){for(var a=Math.round(4.5*b),c=b*b,e=new Float64Array(2*a+1),d=0;d<=e.length;d++)e[d]=Math.exp(-Math.pow(d-
a,2)/(2*c))/Math.sqrt(2*Math.PI)*(b/2);return e}function w(b,a){return"function"===typeof b?b:b?"string"===typeof a?function(a){return-1*+a[b]}:function(c){return+c[b]+a}:function(a){return 1}}Object.defineProperty(g,"__esModule",{value:!0});g.generateGradient=function(){if(!("document"in r))return function(a){return null};var b=document.createElement("canvas"),a=b.getContext("2d");b.height=512;b.width=1;return function(c){var e=a.createLinearGradient(0,0,0,b.height),d=0;for(c=c.colorStops;d<c.length;d++){var h=
c[d],f=h.color;e.addColorStop(h.ratio,"rgba("+f[0]+", "+f[1]+", "+f[2]+", "+f[3]+")")}a.fillStyle=e;a.fillRect(0,0,1,b.height);return a.getImageData(0,0,1,b.height).data}}();g.calculateHeatmapIntensityInfo=function(b,a,c,e){var d=a.blurRadius,h=a.fieldOffset,f=a.field;a=new Float64Array(c*e);for(var g=v(d),d=Math.round(4.5*d),u=Number.NEGATIVE_INFINITY,m,h=w(f,h),f=0;f<b.length;f++){var q=b[f],k=q.geometry,l=k.x-d,x=k.y-d,r=Math.max(0,l);m=Math.max(0,x);for(var t=Math.min(e,k.y+d),k=Math.min(c,k.x+
d),q=+h(q.attributes),n=m;n<t;n++)for(var y=g[n-x],p=r;p<k;p++)m=a[n*c+p]+=y*g[p-l]*q,m>u&&(u=m)}return{matrix:a.buffer,max:u}};g.drawHeatmap=function(b,a,c,e,d,h){var f=b.getContext("2d");f.clearRect(0,0,a,a);var g=f.getImageData(0,0,a,a);g.data.set(new Uint8ClampedArray(l(a,c,e,d,h)));f.putImageData(g,0,0);return b};g.createHeatmapImageData=l;g.createKernel=v;g.createValueFunction=w});