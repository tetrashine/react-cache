// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ./enums ./MaterialInfoUtils ./MaterialInfoUtils_updateMaterialVariations ./MaterialKeyInfo ./util/serializationUtils".split(" "),function(n,h,d,p,r,k,l){Object.defineProperty(h,"__esModule",{value:!0});var m=function(){function c(a,c,e){this.unit=a;this.pageId=c;this.semantic=e}c.prototype.clone=function(){return new c(this.unit,this.pageId,this.semantic)};c.prototype.serialize=function(a){a.writeInt32(this.unit);a.writeInt32(this.pageId);return a};c.deserialize=function(a){var g=
a.readInt32();a=a.readInt32();return new c(g,a,"u_texture")};return c}();h.TexBindingInfo=m;var q=function(){function c(a,c){this.name=a;this.value=c}c.prototype.clone=function(){return new c(this.name,this.value)};c.prototype.serialize=function(a){a.writeInt32(this.value);return a};c.deserialize=function(a){a=a.readInt32();return new c("u_my_param",a)};return c}();h.MaterialParam=q;n=function(){function c(){this.texBindingInfo=[];this.materialParams=[]}c.fromSprite=function(a,g,e){var f=new c,b=
new k;b.geometryType=g;a?(b.sdf=a.sdf,b.pattern=!0,f.texBindingInfo.push(new m(1,a.page,"u_texture"))):(b.sdf=!1,b.pattern=!1);0===e?b.vvOpacity=b.vvSizeMinMaxValue=b.vvSizeScaleStops=b.vvSizeFieldStops=b.vvSizeUnitValue=b.vvColor=b.vvRotation=!1:(b.vvOpacity=0!==(e&d.WGLVVFlag.OPACITY),b.vvSizeMinMaxValue=0!==(e&d.WGLVVFlag.SIZE_MINMAX_VALUE),b.vvSizeScaleStops=0!==(e&d.WGLVVFlag.SIZE_SCALE_STOPS),b.vvSizeFieldStops=0!==(e&d.WGLVVFlag.SIZE_FIELD_STOPS),b.vvSizeUnitValue=0!==(e&d.WGLVVFlag.SIZE_UNIT_VALUE),
b.vvColor=0!==(e&d.WGLVVFlag.COLOR),b.vvRotation=0!==(e&d.WGLVVFlag.ROTATION));b.visibility=!1;f.materialKey=p.getMaterialKey(b);f.materialKeyInfo=b;return f};c.fromGlyph=function(a,g,e){var f=new c,b=new k;b.geometryType=g;b.sdf=!0;b.pattern=!1;b.visibility=!1;b.heatmap=!1;f.texBindingInfo.push(new m(2,a.page,"u_texture"));0===e?b.vvOpacity=b.vvSizeMinMaxValue=b.vvSizeScaleStops=b.vvSizeFieldStops=b.vvSizeUnitValue=b.vvColor=b.vvRotation=!1:(b.vvOpacity=0!==(e&d.WGLVVFlag.OPACITY),b.vvSizeMinMaxValue=
0!==(e&d.WGLVVFlag.SIZE_MINMAX_VALUE),b.vvSizeScaleStops=0!==(e&d.WGLVVFlag.SIZE_SCALE_STOPS),b.vvSizeFieldStops=0!==(e&d.WGLVVFlag.SIZE_FIELD_STOPS),b.vvSizeUnitValue=0!==(e&d.WGLVVFlag.SIZE_UNIT_VALUE),b.vvColor=0!==(e&d.WGLVVFlag.COLOR),b.vvRotation=0!==(e&d.WGLVVFlag.ROTATION));f.materialKey=p.getMaterialKey(b);f.materialKeyInfo=b;return f};c.prototype.copy=function(a){this.materialParams=a.materialParams.map(function(a){return a.clone()});this.texBindingInfo=a.texBindingInfo.map(function(a){return a.clone()});
a.materialKeyInfo&&(this.materialKeyInfo=new k,this.materialKeyInfo.copy(a.materialKeyInfo));this.materialKey=a.materialKey};c.prototype.serialize=function(a){a.writeInt32(this.materialKey);l.serializeList(a,this.texBindingInfo);l.serializeList(a,this.materialParams);return a};c.deserialize=function(a){var d=new c;d.materialKey=a.readInt32();d.texBindingInfo=l.deserializeList(a,m);d.materialParams=l.deserializeList(a,q);d.materialKeyInfo=new k;r(d.materialKeyInfo,d.materialKey);return d};return c}();
h.default=n});