// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../../input/DragEventSeparator ../../../input/InputHandler ../../../input/handlers/support".split(" "),function(c,f,h,k,l,m){Object.defineProperty(f,"__esModule",{value:!0});c=function(c){function d(d,n,f){var a=c.call(this,!0)||this;a.view=d;a.pointerAction=n;a.registerIncoming("drag",f,function(e){return a._handleDrag(e)});a.registerIncoming("pointer-down",function(e){return a.stopMomentumNavigation()});var g=a.view.navigation;
a.dragEventSeparator=new k.DragEventSeparator({start:function(e,b){g.pan.begin(a.view,b.data);b.stopPropagation()},update:function(e,b){g.pan.update(a.view,b.data);b.stopPropagation()},end:function(e,b){g.pan.end(a.view,b.data);b.stopPropagation()},condition:function(e,b){return 1===e&&m.eventMatchesPointerAction(b.data,a.pointerAction)}});return a}h(d,c);d.prototype._handleDrag=function(d){var c=this.view.navigation;c.pinch.zoomMomentum||c.pinch.rotateMomentum?this.stopMomentumNavigation():this.dragEventSeparator.handle(d)};
d.prototype.stopMomentumNavigation=function(){this.view.navigation.pan.stopMomentumNavigation()};return d}(l.InputHandler);f.DragPan=c});