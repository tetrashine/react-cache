// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../request ../../../core/Accessor ../../../core/Error ../../../core/Logger ../../../core/promiseUtils ../../../core/accessorSupport/decorators ../../../tasks/QueryTask ../../../tasks/support/Query ../../../tasks/support/StatisticDefinition ./featureUtils".split(" "),function(z,A,t,k,u,v,l,w,h,f,x,m,y,n){var p=new Map,q=w.getLogger("esri.widgets.Popup.support.RelatedFeatures");return function(r){function d(a){a=
r.call(this)||this;a.relatedInfoCount=null;a.relatedInfos=new Map;return a}t(d,r);d.prototype.destroy=function(){this.relatedInfos.clear()};d.prototype.addRelatedFeatureAttributes=function(a){var b=this;this.relatedInfos.forEach(function(c){return b._addRelatedFeatureAttribute(a,c)})};d.prototype.getRelatedFieldInfo=function(a){if(-1===a.indexOf("relationships/"))return null;a=a.split("/").slice(1);return{layerId:a[0],fieldName:a[1]}};d.prototype.getRelatedInfo=function(a){return this.relatedInfos.get(a.toString())};
d.prototype.isRelatedField=function(a){void 0===a&&(a="");return a?-1!==a.indexOf("relationships/"):!1};d.prototype.queryRelatedInfos=function(a,b){var c=this;this.relatedInfos.clear();var e=n.getSourceLayer(a);if(!e)return h.resolve();var d=b.filter(function(a){return a&&c.isRelatedField(a.fieldName)});if(!d||!d.length)return h.resolve();this._createRelatedInfos(b,e);return this._queryLayerInfos(e,b).then(function(b){c._updateRelatedInfoLayerInfos(b);return c._queryRelatedFeatureMap(a).then(function(a){Object.keys(a).forEach(function(b){c._setRelatedFeatures(a[b],
b.toString())});return a})})};d.prototype._addRelatedFeatureAttribute=function(a,b){var c=this;a&&b&&("one-to-one"===b.relation.cardinality&&b.relatedFeatures&&b.relatedFeatures.forEach(function(e){return c._addAttributesFromFeature(a,e,b)}),b.relatedStatsFeatures&&b.relatedStatsFeatures.forEach(function(e){return c._addAttributesFromFeature(a,e,b)}))};d.prototype._updateRelatedInfoLayerInfo=function(a,b){if(a=a.value)this.getRelatedInfo(b).layerInfo=a.data};d.prototype._updateRelatedInfoLayerInfos=
function(a){var b=this;Object.keys(a).forEach(function(c){return b._updateRelatedInfoLayerInfo(a[c],c.toString())})};d.prototype._addAttributesFromFeature=function(a,b,c){var e=this;a&&b&&c&&Object.keys(b.attributes).forEach(function(d){var g=e._relatedFieldInfoToString({layerId:c.relation.id.toString(),fieldName:d});a[g]=b.attributes[d]})};d.prototype._relatedFieldInfoToString=function(a){return a?"relationships/"+a.layerId+"/"+a.fieldName:""};d.prototype._createRelatedInfoForFieldInfo=function(a,
b){var c=this.getRelatedFieldInfo(a.fieldName);if(c){var e=c.layerId,c=c.fieldName;e&&(b=this.getRelatedInfo(e)||this._createRelatedInfo(e,b))&&(b.relatedFields.push(c),a.statisticType&&(a=new y({statisticType:a.statisticType,onStatisticField:c,outStatisticFieldName:c}),b.outStatistics.push(a)))}};d.prototype._createRelatedInfos=function(a,b){var c=this;a.forEach(function(a){return c._createRelatedInfoForFieldInfo(a,b)})};d.prototype._queryRelatedFeatureMap=function(a){var b=this,c={};this.relatedInfos.forEach(function(d,
g){c[g]=b._queryRelatedLayerFeatures(a,d)});return h.eachAlways(c)};d.prototype._queryLayerInfos=function(a,b){var c=this,d={};this.relatedInfos.forEach(function(b,e){b=b.relation;if(!b)return e=new l("relation-required","A relation is required on a layer to retrieve related records."),q.error(e),h.reject(e);b=b.relatedTableId;if(!b)return e=new l("A related table ID is required on a layer to retrieve related records."),q.error(e),h.reject(e);b=a.url+"/"+b;var g=p.get(b),f=g?g:c._queryLayerInfo(b);
g||p.set(b,f);d[e]=f});return h.eachAlways(d)};d.prototype._queryLayerInfo=function(a){return u(a,{query:{f:"json"},callbackParamName:"callback"})};d.prototype._queryRelatedLayerFeatures=function(a,b){var c=n.getSourceLayer(a).layerId.toString(),d=b.layerInfo,g=b.queryTask,f=b.relation;if(c=this._getDestinationRelation(d,c)){var f=f.keyField,k=c.keyField,c="string"===this._getDestinationFieldType(d,c)?k+"\x3d'"+a.attributes[f]+"'":k+"\x3d"+a.attributes[f];a=g.execute(new m({where:c,outFields:b.relatedFields}));
b=b.outStatistics&&0<b.outStatistics.length&&d.supportsStatistics?g.execute(new m({where:c,outFields:b.relatedFields,outStatistics:b.outStatistics})):null;return h.eachAlways({features:a,statsFeatures:b?b:h.resolve()})}return h.resolve()};d.prototype._setRelatedFeatures=function(a,b){if(b=this.getRelatedInfo(b)){var c=a.value;c&&(a=c.features,c=c.statsFeatures,a=a&&a.value,b.relatedFeatures=a?a.features:[],a=c&&c.value,b.relatedStatsFeatures=a?a.features:[])}};d.prototype._getRelation=function(a,
b){if("feature"!==b.type)return null;var c=null;b.relationships.some(function(b){if(b.id===parseInt(a,10))return c=b,!0});return c};d.prototype._createRelatedInfo=function(a,b){var c=this._getRelation(a,b);if(c){b=b.url+"/"+c.relatedTableId;var d=new x({url:b}),c={url:b,queryTask:d,relation:c,relatedFields:[],outStatistics:[]};this.relatedInfos.set(a,c);return c}};d.prototype._getDestinationRelation=function(a,b){var c;a&&a.relationships&&a.relationships.some(function(a){if(""+a.relatedTableId===
b)return c=a,!0});return c};d.prototype._getDestinationFieldType=function(a,b){var c=void 0;a.fields.some(function(a){if(a.name===b.keyField)return c=-1!==["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"].indexOf(a.type)?"number":"string",!0});return c};k([f.aliasOf("relatedInfos.size")],d.prototype,"relatedInfoCount",void 0);k([f.property()],d.prototype,"relatedInfos",void 0);return d=k([f.subclass("esri.widgets.Popup.support.RelatedFeatures")],d)}(f.declared(v))});