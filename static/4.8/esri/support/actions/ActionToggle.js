// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ./ActionBase".split(" "),function(h,k,f,c,b,g){return function(e){function a(a){a=e.call(this)||this;a.image=null;a.type="toggle";a.value=!1;return a}f(a,e);d=a;a.prototype.clone=function(){return new d({active:this.active,className:this.className,disabled:this.disabled,id:this.id,indicator:this.indicator,title:this.title,visible:this.visible,image:this.image,
value:this.value})};var d;c([b.property()],a.prototype,"image",void 0);c([b.property()],a.prototype,"value",void 0);return a=d=c([b.subclass("esri.support.Action.ActionToggle")],a)}(b.declared(g))});