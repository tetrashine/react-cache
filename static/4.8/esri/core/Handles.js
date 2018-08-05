// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ./Accessor ./Collection ./accessorSupport/decorators".split(" "),function(l,m,h,e,k,d,c){return function(f){function b(a){a=f.call(this)||this;a._groups=new Map;return a}h(b,f);b.prototype.destroy=function(){this.removeAll()};Object.defineProperty(b.prototype,"size",{get:function(){var a=0;this._groups.forEach(function(b){a+=b.length});return a},enumerable:!0,configurable:!0});b.prototype.add=function(a,
b){if(!this._isHandle(a)&&!Array.isArray(a)&&!d.isCollection(a))return this;var g=this._getOrCreateGroup(b);Array.isArray(a)||d.isCollection(a)?a.forEach(function(a){return g.push(a)}):g.push(a);this.notifyChange("size");return this};b.prototype.has=function(a){return this._groups.has(this._ensureGroupKey(a))};b.prototype.remove=function(a){if(Array.isArray(a)||d.isCollection(a))return a.forEach(this.remove,this),this;if(!this.has(a))return this;for(var b=this._getGroup(a),c=0;c<b.length;c++)b[c].remove();
this._deleteGroup(a);this.notifyChange("size");return this};b.prototype.removeAll=function(){this._groups.forEach(function(a){for(var b=0;b<a.length;b++)a[b].remove()});this._groups.clear();this.notifyChange("size");return this};b.prototype._isHandle=function(a){return a&&!!a.remove};b.prototype._getOrCreateGroup=function(a){if(this.has(a))return this._getGroup(a);var b=[];this._groups.set(this._ensureGroupKey(a),b);return b};b.prototype._getGroup=function(a){return this._groups.get(this._ensureGroupKey(a))};
b.prototype._deleteGroup=function(a){return this._groups.delete(this._ensureGroupKey(a))};b.prototype._ensureGroupKey=function(a){return a||"_default_"};e([c.property({readOnly:!0})],b.prototype,"size",null);return b=e([c.subclass("esri.core.Handles")],b)}(c.declared(k))});