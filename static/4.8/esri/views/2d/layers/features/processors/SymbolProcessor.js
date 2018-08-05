// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/declareExtendsHelper ../../../../../core/tsSupport/decorateHelper ../../../../../renderers ../../../../../core/Error ../../../../../core/Logger ../../../../../core/MapPool ../../../../../core/promiseUtils ../../../../../core/SetPool ../../../../../core/accessorSupport/decorators ../../../../../geometry/SpatialReference ../../../../../layers/support/LabelClass ../../../../../renderers/support/jsonUtils ../../../engine/webgl/definitions ../../../engine/webgl/rendererInfoUtils ../../../engine/webgl/Utils ../../../engine/webgl/mesh/factories/WGLMeshFactory ../../../engine/webgl/util/BidiText ./BaseProcessor".split(" "),
function(u,v,E,h,w,F,G,r,q,x,e,H,t,y,I,J,p,z,A,K){function L(d){var c=d&&d.getSymbols();return d&&("unique-value"===d.type||"class-breaks"===d.type)&&null!==d.backgroundFillSymbol||c.some(function(a){return"simple-fill"===a.type||"picture-fill"===a.type})}function M(d,c){switch(d){case "esriGeometryPoint":return!0;case "esriGeometryPolyline":return!0;case "esriGeometryMultipoint":return!0;case "esriGeometryPolygon":return L(c);default:return N.error(new F("mapview-invalid-type",d+" is not supported")),
!1}}function B(d,c){p.isMarkerSymbol(d)||p.isLineSymbol(d)?c.add(d):p.isFillSymbol(d)&&(c.add(d),d.outline&&"none"!==d.outline.style&&c.add(d.outline))}function C(d,c,a){a.has(d)||a.set(d,new Set);d=a.get(d);a=c.length;for(var b=0;b<a;b++){var n=c.charCodeAt(b);d.add(n)}}Object.defineProperty(v,"__esModule",{value:!0});var N=G.getLogger("esri.views.2d.layers.features.processors.SymbolProcessor");u=function(d){function c(){var a=null!==d&&d.apply(this,arguments)||this;a._symbolToMosaicItemMap=new Map;
a._visualSetPromises=new Map;a.type="symbol";return a}E(c,d);c.prototype.destroy=function(){this._visualSetPromises.forEach(function(a,b){a.cancel()});this._visualSetPromises.clear();this._symbolToMosaicItemMap.clear();this.notifyChange("updating")};Object.defineProperty(c.prototype,"supportsTileUpdates",{get:function(){return!0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"labelingInfo",{get:function(){return this.configuration&&this.configuration.labelingInfo?this.configuration.labelingInfo.map(function(a){return t.fromJSON(a)}):
null},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"labelClassInfos",{get:function(){var a=this;return this.labelingInfo?this.labelingInfo.map(function(b){return{labelOptions:b.getOptions(a.spatialReference),labelExpression:b.getLabelExpression(),labelClass:b}}):null},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"factory",{get:function(){return this.configuration?z.default.from(this.renderer,{fields:this.fields},this._symbolToMosaicItemMap,this.service.geometryType,
this.service.objectIdField,H.fromJSON(this.spatialReference),this.configuration.devicePixelRatio,this.labelingInfo):null},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"queryInfo",{get:function(){var a=this.configuration,b=a.renderer,c=a.definitionExpression,d=a.outFields,e=a.gdbVersion,a=a.historicMoment,f=this.service.geometryType,D=this._getReturnCentroid(this.rendererInfo.renderer),l=M(f,this.rendererInfo.renderer),f="esriGeometryPoint"===f||"esriGeometryMultipoint"===f||D?
20:0,k=null;(b=b.visualVariables)&&b.some(function(a){if("size"===a.type&&a.field&&!a.normalizationField)return k=[a.field+" DESC"],!0});return{definitionExpression:c,orderByFields:k,outFields:d,pixelBuffer:f,returnCentroid:D,returnGeometry:l,gdbVersion:e,historicMoment:a}},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"renderer",{get:function(){return this.configuration?y.fromJSON(this.configuration.renderer):null},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,
"rendererInfo",{get:function(){return this.configuration?J.createRendererInfo(y.fromJSON(this.configuration.renderer),this.tileStore.spatialReference,{fields:this.service.fields}):null},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"updating",{get:function(){return 0<this._visualSetPromises.size},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"fields",{get:function(){return this.service.fields},enumerable:!0,configurable:!0});c.prototype.onTileData=function(a,
b){var c=this,d=b.addOrUpdate,e=b.clear,f=b.remove;b=(d&&d.length?this._processFeatures(a,d):q.resolve()).then(function(b){return c.remoteClient.invoke("tileRenderer.onTileData",{tileKey:a.id,data:{addOrUpdate:b&&b.message||null,remove:f,clear:e}},b&&b.transferList||null)}).catch(function(b){return c._handleError(a,b)});this._visualSetPromises.set(a,b);b.then(function(){return c._cleanPromise(a)},function(){return c._cleanPromise(a)});this.notifyChange("updating");return b};c.prototype.onTileError=
function(a,b){var c=this;b=this.remoteClient.invoke("tileRenderer.onTileError",{tileKey:a.id,error:b});this._visualSetPromises.set(a,b);b.then(function(){return c._cleanPromise(a)},function(){return c._cleanPromise(a)});this.notifyChange("updating");return b};c.prototype.onTileUpdate=function(a){var b=0;for(a=a.removed;b<a.length;b++){var c=a[b],d=this._visualSetPromises;if(!d.has(c))break;d.get(c).cancel();d.delete(c);this.notifyChange("updating")}};c.prototype._cleanPromise=function(a){this._visualSetPromises.delete(a);
this.notifyChange("updating")};c.prototype._processFeatures=function(a,b){var c=this;return b&&b.length?this._getMosaicItems(a,b).then(function(d){return c._writeFeatures(a,b,d)}):q.resolve(null)};c.prototype._writeFeatures=function(a,b,c){var d=this.factory,n=d.createMeshData(b.length);a={viewingMode:"",scale:a.scale};for(var f=0;f<b.length;f++)d.write(n,b[f],a,c,this._symbolToMosaicItemMap);return this._encodeDisplayData(n)};c.prototype._encodeDisplayData=function(a){var b={},c=[];a.encode(b,c);
return{message:b,transferList:c}};c.prototype._handleError=function(a,b){if(b&&"cancel"!==b.dojoType)return this.remoteClient.invoke("tileRenderer.onTileError",{tileKey:a.id,error:b.message})};c.prototype._getReturnCentroid=function(a){function b(a){if(!a)return!1;a=a.type;return"simple-marker"===a||"picture-marker"===a||"text"===a}if("esriGeometryPolygon"===this.service.geometryType&&this.labelingInfo)return!0;if("esriGeometryPolygon"!==this.service.geometryType)return!1;switch(a.type){case "simple":return b(a.symbol);
case "unique-value":return b(a.defaultSymbol)||a.uniqueValueInfos.some(function(a){return b(a.symbol)});case "class-breaks":return b(a.defaultSymbol)||a.classBreakInfos.some(function(a){return b(a.symbol)});default:return!0}};c.prototype._getMosaicItems=function(a,b){var c=x.default.acquire(),d=r.acquire(),e=this._createLabelFeatures(a.scale,b,d);a=0;for(b=this.renderer.getSymbols();a<b.length;a++){var f=b[a];if(p.isTextSymbol(f)){var h=A.bidiText(f.text)[0];C(f,h,d)}else B(f,c)}(this.renderer instanceof
w.UniqueValueRenderer||this.renderer instanceof w.ClassBreaksRenderer)&&(a=this.renderer.backgroundFillSymbol)&&B(a,c);var l=this._symbolToMosaicItemMap,k=r.acquire(),m=[],g=0;c.forEach(function(a){l.has(a.id)||(k.set(g,a),m.push({symbol:a.toJSON(),id:g}),g++)});d.forEach(function(a,b){if(l.has(b.id)){var c=l.get(b.id).glyphMosaicItems,d=[];a.forEach(function(a){if(c&&c.length<a||!c[a])d[a]=a});0<d.length&&(k.set(g,b),m.push({symbol:b.toJSON(),id:g,glyphIds:d}),g++)}else{k.set(g,b);var e=[];a.forEach(function(a){return e.push(a)});
m.push({symbol:b.toJSON(),id:g,glyphIds:e});g++}});if(0<m.length)return this.remoteClient.invoke("tileRenderer.getMaterialItems",m).then(function(a){for(var b=0;b<a.length;b++){var c=a[b],d=k.get(c.id);if(d)if(p.isTextSymbol(d))if(l.has(d.id)){if(d=l.get(d.id).glyphMosaicItems,c=c.mosaicItem.glyphMosaicItems)for(var f=0;f<c.length;f++)null!=c[f]&&(d[f]=c[f])}else l.set(d.id,c.mosaicItem);else l.set(d.id,c.mosaicItem)}r.release(k);return e});x.default.release(c);r.release(d);return q.resolve(e)};c.prototype._getLabelClassInfos=
function(a){return this.labelClassInfos.map(function(a,c){return{id:c,labelClassInfo:a}}).filter(function(b){b=b.labelClassInfo;return(!b.labelClass.minScale||b.labelClass.minScale>=a||0===b.labelClass.minScale)&&(!b.labelClass.maxScale||b.labelClass.maxScale<=a||0===b.labelClass.maxScale)})};c.prototype._createLabelFeatures=function(a,b,c){if(!this.labelingInfo||!b||0===b.length)return null;a=this._getLabelClassInfos(a);if(0===a.length)return null;for(var d=r.acquire(),e=a.map(function(a){return a.id}),
f=new z.LabelGrid(I.COLLISION_EARLY_REJECT_BUCKET_SIZE),h=0;h<b.length;h++){var l=b[h],k=this.service.geometryType,m=0,g=0;if("esriGeometryPoint"===k)k=l.geometry,m=k.x,g=k.y;else if("esriGeometryPolygon"===k)m=l.centroid.x,g=l.centroid.y;else return null;k=l.attributes[this.service.objectIdField];if(!f.checkOverlap(m,g)){m=Array(a.length);for(g=0;g<a.length;g++){var p=a[g].labelClassInfo,n=A.bidiText(this._evaluateLabelExpression(l,p)),q=n[0],n=n[1];C(p.labelClass.symbol,q,c);m[g]={text:q,rtl:n}}d.set(k,
{text:m,labelingInfo:e})}}return d};c.prototype._evaluateLabelExpression=function(a,b){return b.labelClass.symbol&&t.evaluateWhere(b.labelClass.where,a.attributes)&&b.labelExpression.expression?t.buildLabelText(b.labelExpression.expression,a,this.fields,b.labelOptions):""};h([e.property({readOnly:!0})],c.prototype,"supportsTileUpdates",null);h([e.property()],c.prototype,"configuration",void 0);h([e.property({dependsOn:["configuration"]})],c.prototype,"labelingInfo",null);h([e.property({dependsOn:["labelingInfo"]})],
c.prototype,"labelClassInfos",null);h([e.property({dependsOn:["configuration","service","fields"]})],c.prototype,"factory",null);h([e.property({constructOnly:!0})],c.prototype,"queryInfo",null);h([e.property({dependsOn:["configuration"]})],c.prototype,"renderer",null);h([e.property({dependsOn:["configuration"]})],c.prototype,"rendererInfo",null);h([e.property({readOnly:!0})],c.prototype,"updating",null);h([e.property({dependsOn:["service"]})],c.prototype,"fields",null);return c=h([e.subclass()],c)}(e.declared(K.default));
v.default=u});