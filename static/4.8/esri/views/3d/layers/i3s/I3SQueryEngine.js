// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports dojo/promise/all ../../../../core/Error ../../../../core/promiseUtils ../../../../layers/graphics/dehydratedFeatures ../../../../tasks/support/FeatureSet".split(" "),function(p,q,l,k,f,m,n){return function(){function d(a,b,c){this._layer=a;this._support=b;this._options=c}d.prototype.queryExtent=function(a){var b=this;return this._rejectUnsupported(a).then(function(){var c=0,h=b._support.createExtentBuilder();b._forAllQueried(a,function(a){c++;h.add(a)});return{count:c,extent:0===
c?null:h.getExtent()}})};d.prototype.queryFeatureCount=function(a){var b=this;return this._rejectUnsupported(a).then(function(){var c=0;b._forAllQueried(a,function(){return c++});return c})};d.prototype.queryFeatures=function(a){var b=this;return this._rejectUnsupported(a).then(function(){var c=[],h=a&&a.outFields,e=[];if(0<b._forAllQueried(a,function(a){return e.push(b._support.createGraphic(a))},function(a){h&&(c.push(b._support.requestFields(a,e,h)),e=[])})&&!a.num)return f.reject(new k("Unsupported Query",
"Large feature query, use Query.num and Query.start to batch"));h||c.push(f.resolve(e));return l(c)}).then(function(a){for(var c=[],e=0;e<a.length;++e)for(var d=a[e],g=0;g<d.length;++g)c.push(m.hydrateGraphic(d[g],b._layer));a=new n;a.features=c;return a})};d.prototype.queryObjectIds=function(a){var b=this;return this._rejectUnsupported(a).then(function(){var c=[];b._forAllQueried(a,function(a){return c.push(a.id)});return c})};d.defaultExtentBuilder=function(a){var b=null;return{add:function(c){(c=
a(c))&&(b=null!=b?b.union(c):c.clone())},getExtent:function(){return b}}};d.prototype._forAllQueried=function(a,b,c){var d=[];if(a&&a.objectIds){var e=a.objectIds;d.push(function(a){return 0<=e.indexOf(a.id)})}var f=a&&a.start||0,g=a&&a.num||1E4;d.push(function(){if(0>=g)return--g,!1;if(0<f)return--f,!1;--g;return!0});this._support.forAll(function(a){for(var c=0;c<d.length;c++)if(!(0,d[c])(a))return;b(a)},c);return Math.max(0,-g)};d.prototype._rejectUnsupported=function(a){if(null==a)return f.resolve();
var b=function(a){return f.reject(new k("Unsupported Query","Unsupported property '"+a+"'"))};return null!=a.distance?b("distance"):null!=a.geometryPrecision?b("geometryPrecision"):a.groupByFieldsForStatistics&&a.groupByFieldsForStatistics.length?b("groupByFieldsForStatistics"):null!=a.maxAllowableOffset?b("maxAllowableOffset"):a.multipatchOption?b("multipatchOption"):a.orderByFields&&a.orderByFields.length?b("orderByFields"):a.outSpatialReference?b("outSpatialReference"):a.outStatistics&&a.outStatistics.length?
b("outStatistics"):a.pixelSize?b("pixelSize"):a.quantizationParameters?b("quantizationParameters"):a.relationParameter?b("relationParameter"):a.returnDistinctValues?b("returnDistinctValues"):a.text?b("text"):a.timeExtent?b("timeExtent"):a.where?b("where"):a.geometry?b("geometry"):!this._options.enableOutFields&&a.outFields&&a.outFields.length?b("outFields"):!this._options.enableObjectId&&a.objectIds&&a.objectIds.length?b("objectIds"):f.resolve()};return d}()});