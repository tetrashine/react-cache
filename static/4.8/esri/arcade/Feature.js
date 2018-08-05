// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/assignHelper ./Dictionary ./ImmutableArray ./languageUtils ../geometry/Geometry ../geometry/Point ../geometry/support/jsonUtils".split(" "),function(r,t,q,k,l,g,m,p,n){return function(){function d(){this.declaredClass="esri.arcade.Feature";this._layer=this.attributes=this._geometry=null;this.immutable=this.immutable=this._datesfixed=!0}d.createFromGraphic=function(a){var b=new d;b._geometry=a.geometry;b.attributes=void 0===a.attributes?{}:null===a.attributes?
{}:a.attributes;a._sourceLayer?(b._layer=a._sourceLayer,b._datesfixed=!1):a._layer?(b._layer=a._layer,b._datesfixed=!1):a.layer&&(b._layer=a.layer,b._datesfixed=!1);return b};d.createFromArcadeFeature=function(a){var b=new d;b._datesfixed=a._datesfixed;b.attributes=a.attributes;b._geometry=a._geometry;a._layer&&(b._layer=a._layer);return b};d.createFromArcadeDictionary=function(a){var b=new d;b.attributes=a.field("attributes");null!==b.attributes?b.attributes instanceof k?(b.attributes=b.attributes.attributes,
null===b.attributes&&(b.attributes={})):b.attributes={}:b.attributes={};b._geometry=a.field("geometry");null!==b._geometry&&(b._geometry instanceof k?b._geometry=d.parseGeometryFromDictionary(b._geometry):b._geometry instanceof m||(b._geometry=null));return b};d.createFromGraphicLikeObject=function(a,b,c){void 0===c&&(c=null);var e=new d;null===b&&(b={});e.attributes=b;e._geometry=a;e._layer=c;e._layer&&(e._datesfixed=!1);return e};d.prototype.repurposeFromGraphicLikeObject=function(a,b,c){void 0===
c&&(c=null);null===b&&(b={});this.attributes=b;this._geometry=a;this._datesfixed=(this._layer=c)?!1:!0};d.prototype.castToText=function(){var a="",b;for(b in this.attributes){""!==a&&(a+=",");var c=this.attributes[b];null==c?a+=JSON.stringify(b)+":null":g.isBoolean(c)||g.isNumber(c)||g.isString(c)?a+=JSON.stringify(b)+":"+JSON.stringify(c):c instanceof m?a+=JSON.stringify(b)+":"+g.toStringExplicit(c):c instanceof l?a+=JSON.stringify(b)+":"+g.toStringExplicit(c):c instanceof Array?a+=JSON.stringify(b)+
":"+g.toStringExplicit(c):c instanceof Date?a+=JSON.stringify(b)+":"+JSON.stringify(c):null!==c&&"object"===typeof c&&void 0!==c.castToText&&(a+=JSON.stringify(b)+":"+c.castToText())}return'{"geometry":'+(null===this.geometry()?"null":g.toStringExplicit(this.geometry()))+',"attributes":{'+a+"}}"};d.prototype._fixDates=function(){for(var a=[],b=0;b<this._layer.fields.length;b++){var c=this._layer.fields[b];"date"!==c.type&&"esriFieldTypeDate"!==c.type||a.push(c.name)}0<a.length&&this._fixDateFields(a);
this._datesfixed=!0};d.prototype._fixDateFields=function(a){this.attributes=q({},this.attributes);for(var b=0;b<a.length;b++){var c=this.attributes[a[b]];if(null!==c)if(void 0===c)for(var e in this.attributes){if(e.toLowerCase()===a[b]){c=this.attributes[e];null===c||c instanceof Date||(this.attributes[e]=new Date(c));break}}else c instanceof Date||(this.attributes[a[b]]=new Date(c))}};d.prototype.geometry=function(){return null===this._geometry||this._geometry instanceof m?this._geometry:this._geometry=
n.fromJSON(this._geometry)};d.prototype.field=function(a){!1===this._datesfixed&&this._fixDates();var b=a.toLowerCase();a=this.attributes[a];if(void 0!==a)return a;for(var c in this.attributes)if(c.toLowerCase()===b)return this.attributes[c];if(this._hasFieldDefinition(b))return null;throw Error("Field not Found");};d.prototype._hasFieldDefinition=function(a){if(null===this._layer)return!1;for(var b=0;b<this._layer.fields.length;b++)if(this._layer.fields[b].name.toLowerCase()===a)return!0;return!1};
d.prototype._field=function(a){!1===this._datesfixed&&this._fixDates();var b=a.toLowerCase();a=this.attributes[a];if(void 0!==a)return a;for(var c in this.attributes)if(c.toLowerCase()===b)return this.attributes[c];return null};d.prototype.setField=function(a,b){if(this.immutable)throw Error("Feature is Immutable");if(!1===g.isSimpleType(b))throw Error("Illegal Value Assignment to Feature");var c=a.toLowerCase();if(void 0===this.attributes[a])for(var e in this.attributes)if(e.toLowerCase()===c){this.attributes[e]=
b;return}this.attributes[a]=b};d.prototype.hasField=function(a){var b=a.toLowerCase();if(void 0!==this.attributes[a])return!0;for(var c in this.attributes)if(c.toLowerCase()===b)return!0;return this._hasFieldDefinition(b)?!0:!1};d.prototype.keys=function(){var a=[],b={},c;for(c in this.attributes)a.push(c),b[c.toLowerCase()]=1;if(null!==this._layer)for(c=0;c<this._layer.fields.length;c++){var e=this._layer.fields[c];1!==b[e.name.toLowerCase()]&&a.push(e.name)}return a=a.sort()};d.parseGeometryFromDictionary=
function(a){a=d.convertDictionaryToJson(a,!0);void 0!==a.spatialreference&&(a.spatialReference=a.spatialreference,delete a.spatialreference);void 0!==a.rings&&(a.rings=this.fixPathArrays(a.rings,!0===a.hasZ,!0===a.hasM));void 0!==a.paths&&(a.paths=this.fixPathArrays(a.paths,!0===a.hasZ,!0===a.hasM));void 0!==a.points&&(a.points=this.fixPointArrays(a.points,!0===a.hasZ,!0===a.hasM));return n.fromJSON(a)};d.fixPathArrays=function(a,b,c){var e=[];if(a instanceof Array)for(var d=0;d<a.length;d++)e.push(this.fixPointArrays(a[d],
b,c));else if(a instanceof l)for(d=0;d<a.length();d++)e.push(this.fixPointArrays(a.get(d),b,c));return e};d.fixPointArrays=function(a,b,c){var e=[];if(a instanceof Array)for(var d=0;d<a.length;d++){var f=a[d];f instanceof p?b&&c?e.push([f.x,f.y,f.z,f.m]):b?e.push([f.x,f.y,f.z]):c?e.push([f.x,f.y,f.m]):e.push([f.x,f.y]):e.push(f)}else if(a instanceof l)for(d=0;d<a.length();d++)f=a.get(d),f instanceof p?b&&c?e.push([f.x,f.y,f.z,f.m]):b?e.push([f.x,f.y,f.z]):c?e.push([f.x,f.y,f.m]):e.push([f.x,f.y]):
e.push(f);return e};d.convertDictionaryToJson=function(a,b){void 0===b&&(b=!1);var c={},e;for(e in a.attributes){var g=a.attributes[e];g instanceof k&&(g=d.convertDictionaryToJson(g));b?c[e.toLowerCase()]=g:c[e]=g}return c};d.parseAttributesFromDictionary=function(a){var b={},c;for(c in a.attributes){var d=a.attributes[c];if(g.isSimpleType(d))b[c]=d;else throw Error("Illegal Argument");}return b};d.fromJson=function(a){var b=null;null!==a.geometry&&void 0!==a.geometry&&(b=n.fromJSON(a.geometry));
var c={};if(null!==a.attributes&&void 0!==a.attributes)for(var e in a.attributes){var h=a.attributes[e];if(g.isString(h)||g.isNumber(h)||g.isBoolean(h)||g.isDate(h))c[e]=h;else throw Error("Illegal Argument");}return d.createFromGraphicLikeObject(b,c,null)};d.prototype.domainValueLookup=function(a,b,c){if(null===this._layer||!this._layer.fields)return null;c=g.getDomain(a,this._layer,this,c);if(void 0===b)try{b=this.field(a)}catch(e){return null}return g.getDomainValue(c,b)};d.prototype.domainCodeLookup=
function(a,b,c){if(null===this._layer||!this._layer.fields)return null;a=g.getDomain(a,this._layer,this,c);return g.getDomainCode(a,b)};return d}()});