// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../geometry ../../../Graphic ../../../core/Accessor ../../../core/Handles ../../../core/accessorSupport/decorators ../../../symbols/SimpleMarkerSymbol".split(" "),function(y,z,p,h,q,r,t,u,e,l){var n=function(){return function(f){this.selectedGraphics=f;this.type="vertex-select"}}(),m=function(){return function(f){this.selectedGraphics=f;this.type="vertex-deselect"}}(),v=function(){return function(f,
d,b,c,a){this.vertices=f;this.graphics=d;this.graphicIndex=b;this.native=c;this.screenPoint=a;this.type="vertex-move-start"}}(),w=function(){return function(f,d,b,c,a){this.vertices=f;this.graphics=d;this.graphicIndex=b;this.native=c;this.screenPoint=a;this.type="vertex-move"}}(),x=function(){return function(f,d,b,c,a){this.vertices=f;this.graphics=d;this.graphicIndex=b;this.native=c;this.screenPoint=a;this.type="vertex-move-stop"}}();return function(f){function d(b){b=f.call(this,b)||this;b.view=
null;b._activeGraphic=null;b._handles=new u;b._hoverGraphic=null;b._pointerDownEvent=null;b._selectedGraphics=[];b.layer=null;b.graphics=[];b.pointSymbol=new l({type:"simple-marker",style:"circle",size:6,color:[33,205,255],outline:{color:[0,12,255],width:1}});b.pointHoverSymbol=new l({type:"simple-marker",style:"circle",size:8,color:[33,205,255],outline:{color:[0,12,255],width:1}});b.selectedPointSymbol=new l({type:"simple-marker",style:"circle",size:8,color:[255,255,255],outline:{color:[0,12,255],
width:1}});b.vertices=[];return b}p(d,f);d.prototype.destroy=function(){this.reset();this._handles.removeAll()};d.prototype.update=function(b){var c=this;this.reset();b.layer&&(this.layer=b.layer);b.vertices&&(this.vertices=b.vertices);b.view&&(this.view=b.view);this.graphics=this._createVertexGraphics(this.vertices);this.layer&&this.layer.addMany(this.graphics);return this._handles.add([this.view.on("click",function(a){return c._clickHandler(a)}),this.view.on("immediate-click",function(a){return c._immediateClickHandler(a,
b.handles)}),this.view.on("pointer-down",function(a){return c._pointerDownHandler(a)}),this.view.on("pointer-move",function(a){return c._pointerMoveHandler(a)}),this.view.on("pointer-up",function(a){return c._pointerUpHandler(a)}),this.view.on("drag",function(a){return c._dragHandler(a,b.handles)})])};d.prototype.refresh=function(){this.reset();this.graphics=this._createVertexGraphics(this.vertices);this.layer&&this.layer.addMany(this.graphics)};d.prototype.reset=function(){this.layer&&this.layer.removeMany(this.graphics);
this.graphics=[];this.layer&&this.layer.removeMany(this._selectedGraphics);this._selectedGraphics=[];this.layer&&this.layer.remove(this._activeGraphic);this._activeGraphic=null};d.prototype._createVertexGraphics=function(b){var c=this,a=[];(b||this.vertices).forEach(function(b,d){b.forEach(function(b,k){b=new q.Point({x:b[0],y:b[1],spatialReference:c.view.spatialReference});a.push(new r({attributes:{pathIndex:d,vertexIndex:k,handleIndex:a.length},geometry:b,symbol:c.pointSymbol}))})});a.forEach(function(b,
c){var d=[],k=b.geometry;a.forEach(function(a,b){c!==b&&(a=a.geometry,k.x===a.x&&k.y===a.y&&d.push(b))});b.attributes.relatedGraphicIndices=d});return a};d.prototype._updateGraphic=function(b,c){var a=b.attributes,d=a.pathIndex,a=a.vertexIndex;b.set("geometry",c);this.vertices[d][a]=[c.x,c.y]};d.prototype._clickHandler=function(b){};d.prototype._immediateClickHandler=function(b,c){var a=this;this.view.hitTest(b).then(function(d){var g=d.results;d=b.native.shiftKey;if(g.length&&g[0].graphic&&(g=g[0].graphic,
-1<a.graphics.indexOf(g))){d||(a._selectedGraphics.forEach(function(b){b.set("symbol",a.pointSymbol)}),a._selectedGraphics=[],c.onDeselect(new m(a._selectedGraphics)));-1===a._selectedGraphics.indexOf(g)?(a._selectedGraphics.push(g),g.set("symbol",a.selectedPointSymbol),c.onSelect(new n(a._selectedGraphics))):(d=a._selectedGraphics.indexOf(g),a._selectedGraphics.splice(d,1),g.set("symbol",a.pointHoverSymbol),c.onDeselect(new m(a._selectedGraphics)));return}a._selectedGraphics.forEach(function(b){b.set("symbol",
a.pointSymbol)});a._selectedGraphics=[];c.onDeselect(new m(a._selectedGraphics))})};d.prototype._pointerDownHandler=function(b){var c=this;this._pointerDownEvent=b;this.view.hitTest(b).then(function(a){a=a.results;a.length&&a[0].graphic?(a=a[0].graphic,-1<c.graphics.indexOf(a)?c._activeGraphic=a:a!==c._activeGraphic&&(c._pointerDownEvent=null,c._activeGraphic=null)):(c._pointerDownEvent=null,c._activeGraphic=null)})};d.prototype._pointerUpHandler=function(b){this._activeGraphic=this._pointerDownEvent=
null};d.prototype._pointerMoveHandler=function(b){var c=this;this.view.hitTest(b).then(function(a){a=a.results;if(a.length&&a[0].graphic){a=a[0].graphic;if(a===c._hoverGraphic)return;if(-1<c.graphics.indexOf(a)){if(c._hoverGraphic){var b=c.graphics.indexOf(c._hoverGraphic),b=c.graphics[b],d=-1<c._selectedGraphics.indexOf(c._hoverGraphic)?c.selectedPointSymbol:c.pointSymbol;b.set("symbol",d);c._hoverGraphic=null}c._hoverGraphic=a;d=-1<c._selectedGraphics.indexOf(a)?c.selectedPointSymbol:c.pointHoverSymbol;
a.set("symbol",d);return}}c._hoverGraphic&&(b=c.graphics.indexOf(c._hoverGraphic),b=c.graphics[b],d=-1<c._selectedGraphics.indexOf(c._hoverGraphic)?c.selectedPointSymbol:c.pointSymbol,b.set("symbol",d),c._hoverGraphic=null)})};d.prototype._dragHandler=function(b,c){var a=this;this._pointerDownEvent&&b.stopPropagation();this.view.hitTest(b).then(function(d){if(a._pointerDownEvent&&a._activeGraphic){var g=a.graphics.indexOf(a._activeGraphic);-1===a._selectedGraphics.indexOf(a._activeGraphic)&&(a._selectedGraphics.forEach(function(b){b.set("symbol",
a.pointSymbol)}),a._selectedGraphics=[],a._selectedGraphics.push(a._activeGraphic),a._activeGraphic.set("symbol",a.selectedPointSymbol),c.onSelect(new n(a._selectedGraphics)));var f=a.view.toMap(d.screenPoint),e=a._activeGraphic.attributes.relatedGraphicIndices;e.length&&e.forEach(function(b){a._updateGraphic(a.graphics[b],f)});if(1<a._selectedGraphics.length){var e=a.view.toScreen(a._activeGraphic.geometry),h=Math.round(b.x-e.x),k=Math.round(b.y-e.y);a._selectedGraphics.forEach(function(b,c){b!==
a._activeGraphic&&(c=a.view.toScreen(b.geometry),a._updateGraphic(b,a.view.toMap(c.x+h,c.y+k)))})}a._updateGraphic(a._activeGraphic,f);if("start"===b.action)c.onMoveStart(new v(a.vertices,a.graphics,g,b,d.screenPoint));else if("end"===b.action)c.onMoveStop(new x(a.vertices,a.graphics,g,b,d.screenPoint));else c.onMove(new w(a.vertices,a.graphics,g,b,d.screenPoint))}})};h([e.property()],d.prototype,"view",void 0);h([e.property()],d.prototype,"layer",void 0);h([e.property()],d.prototype,"graphics",void 0);
h([e.property()],d.prototype,"pointSymbol",void 0);h([e.property()],d.prototype,"pointHoverSymbol",void 0);h([e.property()],d.prototype,"selectedPointSymbol",void 0);h([e.property()],d.prototype,"vertices",void 0);return d=h([e.subclass("esri.views.2d.VertexMover")],d)}(e.declared(t))});