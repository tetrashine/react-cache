// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define(["require","exports","./decorators","./jsxFactory","./widgetUtils"],function(g,c,d,e,f){function b(a){for(var b in a)c.hasOwnProperty(b)||(c[b]=a[b])}Object.defineProperty(c,"__esModule",{value:!0});b(d);b(e);b(f);c.isWidget=function(a){return a&&"function"===typeof a.render};c.isWidgetBase=function(a){return a&&"function"===typeof a.postMixInProperties&&"function"===typeof a.buildRendering&&"function"===typeof a.postCreate&&"function"===typeof a.startup}});