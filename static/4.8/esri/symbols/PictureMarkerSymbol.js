// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define(["../core/declare","../core/lang","../core/screenUtils","./MarkerSymbol","./support/urlUtils"],function(k,f,d,l,g){var h={width:12,height:12,angle:0,xoffset:0,yoffset:0},c=k(l,{declaredClass:"esri.symbols.PictureMarkerSymbol",properties:{color:{json:{write:!1}},type:"picture-marker",url:g.urlPropertyDefinition,source:g.sourcePropertyDefinition,height:{json:{read:{source:["height","size"],reader:function(a,b){return b.size||a}},write:!0},cast:d.toPt},width:{json:{read:{source:["width","size"],
reader:function(a,b){return b.size||a}},write:!0},cast:d.toPt},size:{json:{write:!1}}},getDefaults:function(){return f.mixin(this.inherited(arguments),h)},normalizeCtorArgs:function(a,b,c){if(a&&"string"!==typeof a&&null==a.imageData)return a;var e={};a&&(e.url=a);null!=b&&(e.width=d.toPt(b));null!=c&&(e.height=d.toPt(c));return e},clone:function(){var a=new c({angle:this.angle,height:this.height,url:this.url,width:this.width,xoffset:this.xoffset,yoffset:this.yoffset});a._set("source",f.clone(this.source));
return a}});c.defaultProps=h;return c});