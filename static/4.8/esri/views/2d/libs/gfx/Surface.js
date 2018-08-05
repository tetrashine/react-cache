// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper dojo/dom-construct dojo/has dojox/gfx/_base ./Circle ./Container ./Group ./Image ./Path ./Rect ./svg ./Text".split(" "),function(e,f,k,g,l,c,m,n,p,q,r,t,h,u){Object.defineProperty(f,"__esModule",{value:!0});var v=navigator.userAgent,w=534<function(){var c=/WebKit\/(\d*)/.exec(v);return c?parseInt(c[1],10):0}();e=function(d){function b(){var a=null!==d&&d.apply(this,arguments)||this;a.rawNode=null;a._parent=null;a._nodes=[];a._events=
[];return a}k(b,d);b.prototype.destroy=function(){this._nodes.forEach(g.destroy);this._nodes=[];this._events.forEach(function(a){a&&a.remove()});this._events=[];this.rawNode=null;if(l("ie"))for(;this._parent.lastChild;)g.destroy(this._parent.lastChild);else this._parent.innerHTML="";this.defNode=this._parent=null};b.prototype.setDimensions=function(a,b){if(!this.rawNode)return this;a=0>a?0:a;b=0>b?0:b;this.rawNode.setAttribute("width",a);this.rawNode.setAttribute("height",b);w&&(this.rawNode.style.width=
a,this.rawNode.style.height=b);return this};b.prototype.getDimensions=function(){return this.rawNode?{width:c.normalizedLength(this.rawNode.getAttribute("width")),height:c.normalizedLength(this.rawNode.getAttribute("height"))}:null};b.prototype.getEventSource=function(){return this.rawNode};b.prototype._getRealMatrix=function(){return null};b.prototype.createShape=function(a){switch(a.type){case c.defaultPath.type:return this.createPath(a);case c.defaultRect.type:return this.createRect(a);case c.defaultCircle.type:return this.createCircle(a);
case c.defaultImage.type:return this.createImage(a);case c.defaultText.type:return this.createText(a)}console.error("[gfx] unknown shape",a);return null};b.prototype.createGroup=function(){return this.createObject(p.default)};b.prototype.createRect=function(a){return this.createObject(t.default,a)};b.prototype.createCircle=function(a){return this.createObject(m.default,a)};b.prototype.createImage=function(a){return this.createObject(q.default,a)};b.prototype.createText=function(a){return this.createObject(u.default,
a)};b.prototype.createPath=function(a){return this.createObject(r.default,a)};b.prototype.createObject=function(a,b){if(!this.rawNode)return null;var c=new a;a=h._createElementNS(h.xmlns.svg,a.nodeType);c.setRawNode(a);c.setShape(b);this.add(c);return c};return b}(n.default);f.default=e});