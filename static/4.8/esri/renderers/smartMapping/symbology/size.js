// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../core/tsSupport/assignHelper","../../../Color","./support/utils"],function(e,h,x,d,f){function v(a,b){var c;if(a)switch(b){case "point":case "multipoint":c={color:new d(a.color),noDataColor:new d(a.noDataColor),outline:{color:new d(a.outline.color),width:a.outline.width},size:a.size,noDataSize:a.noDataSize,minSize:a.minSize,maxSize:a.maxSize,opacity:a.opacity||1};break;case "polyline":c={color:new d(a.color),noDataColor:new d(a.noDataColor),width:a.width,noDataWidth:a.noDataWidth,
minWidth:a.minWidth,maxWidth:a.maxWidth,opacity:a.opacity||1};break;case "polygon":b=a.marker,c=a.background,c={marker:{color:new d(b.color),noDataColor:new d(b.noDataColor),outline:{color:new d(b.outline.color),width:b.outline.width},size:b.size,noDataSize:b.noDataSize,minSize:b.minSize,maxSize:b.maxSize},background:{color:new d(c.color),outline:{color:new d(c.outline.color),width:c.outline.width}},opacity:a.opacity||1}}return c}function q(a){var b;a&&(b=x({},a),b.color&&(b.color=new d(b.color)),
b.noDataColor&&(b.noDataColor=new d(b.noDataColor)),b.outline&&(b.outline={color:b.outline.color&&new d(b.outline.color),width:b.outline.width}));return b}function w(a,b){a.size&&(a.size=f.toWorldScale(a.size,b));a.noDataSize&&(a.noDataSize=f.toWorldScale(a.noDataSize,b));a.minSize&&(a.minSize=f.toWorldScale(a.minSize,b));a.maxSize&&(a.maxSize=f.toWorldScale(a.maxSize,b));return a}function y(a,b){var c=n["default"];b=f.getStorageType(b);return(c=c&&c[b])&&c[a]}e=[128,128,128,1];h=[128,128,128,1];
var k={primary:{color:[227,139,79,1],noDataColor:e,outline:{color:[255,255,255,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},secondary:[{color:[128,128,128,1],noDataColor:e,outline:{color:[255,255,255,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},{color:[255,255,255,1],noDataColor:e,outline:{color:[128,128,128,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8}]},l={primary:{color:[227,
139,79,1],noDataColor:h,outline:{color:[92,92,92,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},secondary:[{color:[178,178,178,1],noDataColor:h,outline:{color:[92,92,92,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},{color:[26,26,26,1],noDataColor:h,outline:{color:[128,128,128,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8}]},m={r:0,g:0,b:0,a:0},r={color:m,outline:{color:{r:166,
g:166,b:166,a:.25},width:"1px"}},m={color:m,outline:{color:{r:153,g:153,b:153,a:.25},width:"1px"}},p={default:{name:"default",label:"Default",description:"Default theme for visualizing features by varying their size to show data.",basemapGroups:{light:"streets gray topo terrain national-geographic oceans osm gray-vector streets-vector topo-vector streets-relief-vector streets-navigation-vector".split(" "),dark:["satellite","hybrid","dark-gray","dark-gray-vector","streets-night-vector"]},pointSchemes:{light:k,
dark:l},lineSchemes:{light:{primary:{color:[226,119,40,1],noDataColor:e,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},secondary:[{color:[77,77,77,1],noDataColor:e,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},{color:[153,153,153,1],noDataColor:e,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"}]},dark:{primary:{color:[226,119,40,1],noDataColor:h,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},secondary:[{color:[255,255,255,1],noDataColor:h,
noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},{color:[153,153,153,1],noDataColor:h,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"}]}},polygonSchemes:{light:{primary:{marker:k.primary,background:m,opacity:k.primary.opacity},secondary:[{marker:k.secondary[0],background:m,opacity:k.secondary[0].opacity},{marker:k.secondary[1],background:m,opacity:k.secondary[1].opacity}]},dark:{primary:{marker:l.primary,background:r,opacity:l.primary.opacity},secondary:[{marker:l.secondary[0],
background:r,opacity:l.secondary[0].opacity},{marker:l.secondary[1],background:r,opacity:l.secondary[1].opacity}]}}}},n={};(function(){for(var a in p){var b=p[a],c=b.basemapGroups,t=n[a]={basemaps:[].concat(c.light).concat(c.dark),point:{},polyline:{},polygon:{}},g;for(g in c)for(var d=c[g],f=0;f<d.length;f++){var e=d[f];b.pointSchemes&&(t.point[e]=b.pointSchemes[g]);b.lineSchemes&&(t.polyline[e]=b.lineSchemes[g]);b.polygonSchemes&&(t.polygon[e]=b.polygonSchemes[g])}}})();var u={getThemes:function(a){var b=
[],c;for(c in p){var d=p[c],g=n[c],e=f.getBasemapId(a,g.basemaps);e&&-1===g.basemaps.indexOf(e)||b.push({name:d.name,label:d.label,description:d.description,basemaps:g.basemaps.slice(0)})}return b},getSchemes:function(a){if("mesh"===a.geometryType)return null;var b=a.geometryType,c=a.worldScale,d=a.view;a=f.getBasemapId(a.basemap,n["default"].basemaps);var g=y(a,b),e;g&&(e=v(g.primary,b),e={primaryScheme:c?u.toWorldScale({scheme:e,view:d}):e,secondarySchemes:g.secondary.map(function(a){a=v(a,b);return c?
u.toWorldScale({scheme:a,view:d}):a}),basemapId:a});return e},cloneScheme:function(a){var b;a&&(b=q(a),b.marker&&(b.marker=q(b.marker)),b.background&&(b.background=q(b.background)));return b},toWorldScale:function(a){if(a.scheme&&a.view){var b=a.scheme,c=a.scheme,d=a.scheme,e=null;b.hasOwnProperty("size")?e=w(b,a.view):c.hasOwnProperty("width")?(a=a.view,c.width&&(c.width=f.toWorldScale(c.width,a)),c.noDataWidth&&(c.noDataWidth=f.toWorldScale(c.noDataWidth,a)),c.minWidth&&(c.minWidth=f.toWorldScale(c.minWidth,
a)),c.maxWidth&&(c.maxWidth=f.toWorldScale(c.maxWidth,a)),e=c):d.hasOwnProperty("marker")&&(d.marker&&(d.marker=w(d.marker,a.view)),e=d);return e}}};return u});