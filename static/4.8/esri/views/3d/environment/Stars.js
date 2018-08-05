// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/views/3d/environment/materials/StarMaterial.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\r\n\r\n\x3csnippets\x3e\r\n\r\n\x3csnippet name\x3d"vertexShaderStar"\x3e\x3c![CDATA[\r\n  $vsprecisionf\r\n\r\n\tuniform mat4 proj;\r\n\tuniform mat4 view;\r\n\tuniform mat4 model;\r\n\tuniform vec4 viewport;\r\n\r\n\tattribute vec3 $position;\r\n\tattribute vec4 $color;\r\n  attribute float $size;\r\n\r\n\tvarying vec4 vcolor;\r\n\tvarying float vsize;\r\n\r\n\t$alignToPixelCenter\r\n\r\n\tvoid main(void) {\r\n\t\tvec4 posProj \x3d proj * view * model*vec4($position*1.0e25,1.0);//move infinitely far away\r\n\t\tgl_Position \x3d alignToPixelCenter(posProj, viewport.zw); //pixel align position\r\n    gl_Position.z \x3d gl_Position.w; // project atmosphere onto the far plane\r\n\t\tvcolor \x3d $color/1.2;\r\n\t\tvsize \x3d size*5.0;\r\n\t\tgl_PointSize \x3d vsize;\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fragmentShaderStar"\x3e\x3c![CDATA[\r\n\t$fsprecisionf\r\n\r\n\tvarying vec4 vcolor;\r\n\tvarying float vsize;\r\n\r\n\tvoid main() {\r\n\t\tfloat cap \x3d 0.7;\r\n\t\tfloat scale \x3d 1.0/cap;\r\n\t\tfloat helper \x3d clamp(length(abs(gl_PointCoord-vec2(0.5))),0.0,cap);\r\n\t\tfloat alpha \x3d clamp((cap-helper)*scale,0.0,1.0);\r\n\t\tfloat intensity \x3d alpha*alpha*alpha;\r\n\t\tif (vsize \x3c 3.0)\r\n\t\t\tintensity *\x3d 0.5;\r\n\t\tgl_FragColor \x3d vec4(1.0,1.0,1.0,intensity);\r\n\t\tgl_FragColor.xyz *\x3d vcolor.xyz;\r\n\t}\r\n]]\x3e\x3c/snippet\x3e\r\n\x3c/snippets\x3e\r\n'}});
define("require exports dojo/text!./materials/StarMaterial.xml ../../../request ../../../core/Error ../../../core/Logger ../../../core/promiseUtils ../../../core/watchUtils ../lib/glMatrix ../webgl-engine/lib/DefaultVertexAttributeLocations ../webgl-engine/lib/GeometryRenderer ../webgl-engine/lib/RenderPass ../webgl-engine/lib/RenderSlot ../webgl-engine/lib/Util ../webgl-engine/materials/internal/MaterialUtil ../../webgl/Program ../../webgl/Util".split(" "),function(u,K,v,w,r,x,y,z,e,A,B,C,D,E,t,
F,p){var k=E.VertexAttrConstants,G="9bb2ff;9eb5ff;aabfff;bbccff;ccd8ff ;dae2ff;e4e9ff;eeefff;f8f6ff;fff9fb;fff5ef;fff1e5;ffeddb;ffe9d2;ffe6ca;ffe3c3;ffe0bb;ffddb4;ffdaad;ffd6a5;ffd29c;ffcc8f;ffc178;ffa94b;ff7b00".split(";"),H=x.getLogger("esri.views.3d.environment.Stars"),I=e.mat3d.toMat4(e.mat3d.createFrom(1,0,0,0,.9174771405229186,.39778850739794974,0,-.39778850739794974,.9174771405229186)),J=e.mat3d.toMat4(e.mat3d.createFrom(1,0,0,0,.9174771405229186,-.39778850739794974,0,.39778850739794974,.9174771405229186)),
l=null;return function(){function f(a){this.view=null;this.slot=D.POSTPROCESSING_ATMOSPHERE_OPAQUE;this.numBinaryFloats=2;this.numBinaryUInt8=1;this.bytesPerStar=9;this.needsRender=!1;this.didRender=!0;this._renderData={model:e.mat4d.identity()};this._program=this._renderer=null;this._vertexBufferLayout=[{name:"position",count:3,type:5126,offset:0,stride:20,normalized:!1},{name:"color",count:4,type:5121,offset:12,stride:20,normalized:!1},{name:"size",count:1,type:5126,offset:16,stride:20,normalized:!1}];
this._loadDataPromise=null;this._numStars=0;this._dateHandle=this._starData=null;this.view=a;this._loadDataPromise=this._loadBrightStarCatalogue()}f.prototype.destroy=function(){this._loadDataPromise.isFulfilled()||this._loadDataPromise.cancel();this._dateHandle&&(this._dateHandle.remove(),this._dateHandle=null);this._program&&(this._program.dispose(),this._program=null)};f.prototype.initializeRenderContext=function(a){var b=this;a.shaderSnippets.vertexShaderStar||a.shaderSnippets._parse(v);this._program=
new F(a.rctx,a.shaderSnippets.vertexShaderStar,a.shaderSnippets.fragmentShaderStar,A.Default3D);this._dateHandle=z.init(this.view,"environment.lighting.date",function(a){return b._update(a)});this._loadDataPromise.then(function(){b._numStars=b._starData.byteLength/b.bytesPerStar;var c=new Float32Array(b._starData,0,b._numStars*b.numBinaryFloats),d=new Uint8Array(b._starData,b._numStars*b.numBinaryFloats*4,b._numStars*b.numBinaryUInt8),c=b._createStarGeometryData(c,d);b._renderer=new B(c,b._vertexBufferLayout,
b._fillInterleaved,a.rctx);b._renderer.enablePointRendering(!0);b.needsRender=!0})};f.prototype.uninitializeRenderContext=function(a){this.destroy()};f.prototype.render=function(a){if(a.slot!==this.slot||a.pass!==C.MATERIAL||null==this._starData)return!1;var b=a.rctx,c=b.gl,d=this._program;b.bindProgram(d);d.setUniformMatrix4fv("view",a.camera.viewMatrix);d.setUniformMatrix4fv("proj",a.camera.projectionMatrix);d.setUniform4fv("viewport",a.camera.fullViewport);d.setUniformMatrix4fv("model",this._renderData.model);
b.setDepthTestEnabled(!0);b.setDepthFunction(c.LEQUAL);b.setBlendingEnabled(!0);b.setBlendFunctionSeparate(c.SRC_ALPHA,c.ONE_MINUS_SRC_ALPHA,c.ONE,c.ONE_MINUS_SRC_ALPHA);b.setDepthWriteEnabled(!1);this._renderer.render(d);b.setBlendingEnabled(!1);b.setDepthWriteEnabled(!0);b.setDepthFunction(c.LESS);this.needsRender=!1;return!0};f.prototype._fillInterleaved=function(a,b,c,d,f,h,q){var m=p.getStride(f);c=m/4;var n=a.indices[k.POSITION],e=a.vertexAttr[k.POSITION].data;d=q+p.findAttribute(f,"position").offset/
4;for(var g=0;g<n.length;++g){var l=3*n[g];t.fill(e,l,h,d,b,3);d+=c}b=a.indices[k.COLOR];n=a.vertexAttr[k.COLOR].data;d=q+p.findAttribute(f,"color").offset;e=new Uint8Array(h.buffer);for(g=0;g<b.length;++g)l=4*b[g],t.fillColor(n,l,e,d,4),d+=m;m=a.indices[k.SIZE];a=a.vertexAttr[k.SIZE].data;d=q+p.findAttribute(f,"size").offset/4;for(g=0;g<m.length;++g)h[d]=a[m[g]],d+=c};f.prototype._computeDayDuration=function(a){var b=new Date(a.getFullYear(),0,1,11,58,56),c=new Date(a.getFullYear()+1,0,1,11,58,55);
return(+a-+b)/(+c-+b)};f.prototype._update=function(a){if(a){var b=a.getHours()/12,c=a.getMinutes()/60*(2/24),d=a.getSeconds()/60*(2/1440),b=(b+c+d-.9972222)%2;a=2*this._computeDayDuration(a);c=e.mat4d.create(J);e.mat4d.rotateZ(c,-a*Math.PI);e.mat4d.multiply(I,c,c);e.mat4d.rotateZ(c,-b*Math.PI);this._renderData.model=c;this.needsRender=!0}};f.prototype._hexToRGB=function(a){return[parseInt(a.substring(0,2),16),parseInt(a.substring(2,4),16),parseInt(a.substring(4,6),16)]};f.prototype._unpackUint8Attributes=
function(a){return 192<=a?[2.9,a-192]:160<=a?[2.5,a-160]:128<=a?[2,a-128]:96<=a?[1.5,a-96]:64<=a?[1,a-64]:32<=a?[.7,a-32]:[.4,a]};f.prototype._createStarGeometryData=function(a,b){for(var c=new Float32Array(3*this._numStars),d=new Uint8Array(4*this._numStars),f=new Float32Array(this._numStars),h=new Uint32Array(this._numStars),e=0;e<this._numStars;e++){var m=2*e,n=3*e,l=4*e,g=a[m+0],m=a[m+1];c[n+0]=-Math.cos(g)*Math.sin(m);c[n+1]=-Math.sin(g)*Math.sin(m);c[n+2]=-Math.cos(m);n=this._unpackUint8Attributes(b[e]);
g=this._hexToRGB(G[n[1]]);d[l+0]=255*g[0];d[l+1]=255*g[1];d[l+2]=255*g[2];d[l+3]=255;f[e]=n[0];h[e]=e}a={};a[k.POSITION]=h;a[k.NORMAL]=h;a[k.UV0]=h;a[k.COLOR]=h;a[k.SIZE]=h;h={};h[k.POSITION]={size:3,data:c};h[k.COLOR]={size:4,data:d};h[k.SIZE]={size:1,data:f};return{id:"stardata",indices:a,vertexAttr:h,preinterleaved:!1}};f.prototype._verifyStartData=function(a){if(!a)throw new r("stars:no-data-received","Failed to create stars because star catalogue is missing");a=a.byteLength/this.bytesPerStar;
if(0!==a%1||5E4<a||5E3>a)throw new r("stars:invalid-data","Failed to create stars because star catalogue data is invalid");};f.prototype._loadBrightStarCatalogue=function(){var a=this;return l?(this._starData=l,y.resolve()):w(u.toUrl("./resources/stars.wsv"),{responseType:"array-buffer"}).then(function(b){b=b.data;a._verifyStartData(b);l=b;a._starData=b}).catch(function(a){a&&"cancel"!==a.dojoType&&H.error("loadBrightStarCatalogue",a.message);throw a;})};return f}()});