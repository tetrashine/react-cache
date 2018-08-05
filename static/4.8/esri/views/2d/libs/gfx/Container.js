// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper dojox/gfx/matrix ./Shape ./svg".split(" "),function(f,g,h,k,l,m){Object.defineProperty(g,"__esModule",{value:!0});f=function(e){function d(){var a=null!==e&&e.apply(this,arguments)||this;a.children=[];a._batch=0;return a}h(d,e);d.prototype.openBatch=function(){this._batch||(this.fragment=m._createFragment());++this._batch;return this};d.prototype.closeBatch=function(){this._batch=0<this._batch?--this._batch:0;this.fragment&&!this._batch&&
(this.rawNode.appendChild(this.fragment),this.fragment=null);return this};d.prototype.add=function(a){if(this===a.getParent())return this;this.fragment?this.fragment.appendChild(a.rawNode):this.rawNode.appendChild(a.rawNode);var b=a.getParent();b&&b.remove(a,!0);this.children.push(a);a._setParent(this,this._getRealMatrix());return this};d.prototype.remove=function(a,b){void 0===b&&(b=!1);if(this!==a.getParent())return this;this.rawNode===a.rawNode.parentNode&&this.rawNode.removeChild(a.rawNode);this.fragment&&
this.fragment===a.rawNode.parentNode&&this.fragment.removeChild(a.rawNode);for(var c=0;c<this.children.length;++c)if(this.children[c]===a){b||(a.parent=null,a.parentMatrix=null);this.children.splice(c,1);break}return this};d.prototype.clear=function(a){void 0===a&&(a=!1);for(var b=this.rawNode;b.lastChild;)b.removeChild(b.lastChild);var c=this.defNode;if(c){for(;c.lastChild;)c.removeChild(c.lastChild);b.appendChild(c)}for(c=0;c<this.children.length;++c)b=this.children[c],b.parent=null,b.parentMatrix=
null,a&&b.destroy();this.children=[];return this};d.prototype.getBoundingBox=function(){if(!this.children)return null;var a=null;this.children.forEach(function(b){var c=b.getBoundingBox();c&&((b=b.getTransform())&&(c=k.multiplyRectangle(b,c)),a?(a.x=Math.min(a.x,c.x),a.y=Math.min(a.y,c.y),a.endX=Math.max(a.endX,c.x+c.width),a.endY=Math.max(a.endY,c.y+c.height)):a={x:c.x,y:c.y,endX:c.x+c.width,endY:c.y+c.height,width:0,height:0})});a&&(a.width=a.endX-a.x,a.height=a.endY-a.y);return a};d.prototype._moveChildToFront=
function(a){for(var b=0;b<this.children.length;++b)if(this.children[b]===a){this.children.splice(b,1);this.children.push(a);break}return this};d.prototype._moveChildToBack=function(a){for(var b=0;b<this.children.length;++b)if(this.children[b]===a){this.children.splice(b,1);this.children.unshift(a);break}return this};return d}(l.default);g.default=f});