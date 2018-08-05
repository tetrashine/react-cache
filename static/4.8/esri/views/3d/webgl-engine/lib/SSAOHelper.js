// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/views/3d/webgl-engine/materials/internal/ssao.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\r\n\r\n\x3csnippets\x3e\r\n\r\n  \x3csnippet name\x3d"createFsSSAOSrc"\x3e\x3c![CDATA[\r\n\r\n  $fsprecisionf\r\n\r\n  uniform sampler2D rnm;\r\n  uniform sampler2D normalMap;\r\n  uniform sampler2D depthMap;\r\n  uniform float   ssaoAtt;\r\n  uniform vec2    rnmScale;\r\n  uniform float   radius;\r\n  uniform vec2    nearFar;\r\n  uniform vec3    pSphere[64];\r\n\r\n  varying vec2    uv;\r\n\r\n  const float   strength \x3d .07;\r\n  const float   falloff \x3d .000002;\r\n\r\n  $rgba2float\r\n  void main(void) {\r\n    vec3 fres \x3d normalize((texture2D(rnm, uv * rnmScale).xyz * 2.0) - vec3(1.0));\r\n    float currentPixelDepth \x3d rgba2float(texture2D(depthMap, uv));\r\n    vec3 ep \x3d vec3(uv.xy, currentPixelDepth);\r\n    vec3 norm \x3d vec3(-1.0) + 2.0 * texture2D(normalMap, uv).xyz;\r\n    float bl \x3d .0;\r\n    float f \x3d mix(nearFar.x, nearFar.y, currentPixelDepth) / nearFar.x;\r\n    float radD \x3d radius / f;\r\n    radD \x3d min(radD, .5);\r\n    float depthDifference;\r\n    vec3 ray;\r\n\r\n    for(int i \x3d 0; i \x3c NUM_TAP_SAMPLES; ++i) {\r\n      ray \x3d radD*reflect(pSphere[i], fres);\r\n      vec2 tc \x3d ep.xy + sign(dot(ray, norm) ) * ray.xy;\r\n      if (tc.x \x3e\x3d .0 \x26\x26 tc.y \x3e\x3d .0 \x26\x26 tc.x \x3c\x3d 1.0 \x26\x26 tc.y \x3c\x3d 1.0) {\r\n        float occluderDepth \x3d rgba2float(texture2D(depthMap, tc));\r\n        vec3 occluderNormal \x3d vec3(-1.0) + 2.0 * texture2D(normalMap, tc).xyz;\r\n        depthDifference \x3d currentPixelDepth - occluderDepth;\r\n        bl +\x3d step(falloff, depthDifference) * (1.0 - dot(occluderNormal, norm)) * (1.0 - smoothstep(falloff, strength, depthDifference));\r\n      }\r\n    }\r\n\r\n    float ao \x3d 1.0 + bl * (-1.38 / float(NUM_TAP_SAMPLES)) * ssaoAtt;\r\n    gl_FragColor.a \x3d ao;\r\n  }\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n  \x3csnippet name\x3d"getDepthLinear"\x3e\x3c![CDATA[\r\n  float getDepthLinear(vec2 ssC) {\r\n    return -(rgba2float(texture2D(depthMap, ssC))*(nearFar[1] - nearFar[0])+nearFar[0]);\r\n  }\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"createFsSSAOSrcObscurance"\x3e\x3c![CDATA[\r\n  $fsprecisionf\r\n\r\n  uniform mat4 projMatrixInv;\r\n\r\n  uniform sampler2D normalMap;\r\n  uniform sampler2D depthMap;\r\n\r\n  uniform float     intensity;\r\n\r\n  uniform float projScale;\r\n  uniform float     radius;\r\n  uniform vec2      nearFar;\r\n\r\n  uniform vec4      projInfo;\r\n\r\n  uniform vec2    screenDimensions;\r\n\r\n  //noise texture lookup could be replaced with hash function if WebGL gets XOR functionality\r\n  uniform vec3    pSphere[NUM_TAP_SAMPLES]; //tap position\r\n  uniform vec2    rnmScale;\r\n  uniform sampler2D rnm; //noise texture\r\n\r\n  //set z scaling, used to prevent division in ortho mode\r\n  uniform vec2 zScale;\r\n\r\n  varying vec2  uv;\r\n  varying vec4  camPos;\r\n\r\n  $rgba2float\r\n  $getDepthLinear\r\n\r\n  /** Returns a unit vector and a screen-space radius for the tap on a unit disk (the caller should scale by the actual disk radius) */\r\n  /*uniform float numSpiralTurns;\r\n  vec2 tapLocation(int sampleNumber, float spinAngle, out float ssR){\r\n    // Radius relative to ssR\r\n    float alpha \x3d (float(sampleNumber) + 0.5) * (1.0 / float(NUM_TAP_SAMPLES));\r\n    float angle \x3d alpha * (numSpiralTurns * 6.28) + spinAngle;\r\n\r\n    ssR \x3d alpha;\r\n    return vec2(cos(angle), sin(angle));\r\n  }*/\r\n\r\n\r\n  float fallOffFunction(float vv, float vn, float bias) {\r\n    float radius2 \x3d radius * radius;\r\n\r\n    // A: From the HPG12 paper\r\n    // Note large epsilon to avoid overdarkening within cracks\r\n    // return float(vv \x3c radius2) * max((vn - bias) / (epsilon + vv), 0.0) * radius2 * 0.6;\r\n\r\n    // B: Smoother transition to zero (lowers contrast, smoothing out corners). [Recommended]\r\n    float f \x3d max(radius2 - vv, 0.0); return f * f * f * max(vn-bias, 0.0);\r\n\r\n    // C: Medium contrast (which looks better at high radii), no division.  Note that the\r\n    // contribution still falls off with radius^2, but we\'ve adjusted the rate in a way that is\r\n    // more computationally efficient and happens to be aesthetically pleasing.\r\n    // return 4.0 * max(1.0 - vv * invRadius2, 0.0) * max(vn - bias, 0.0);\r\n\r\n    // D: Low contrast, no division operation\r\n    // return 2.0 * float(vv \x3c radius * radius) * max(vn - bias, 0.0);\r\n  }\r\n\r\n\r\n  /** Compute the occlusion due to sample point \\a Q about camera-space point \\a C with unit normal \\a n_C */\r\n  float aoValueFromPositionsAndNormal(vec3 C, vec3 n_C, vec3 Q) {\r\n    vec3 v \x3d Q - C;\r\n    float vv \x3d dot(v, v);\r\n    float vn \x3d dot(normalize(v), n_C);\r\n    return fallOffFunction(vv, vn, 0.1);\r\n  }\r\n\r\n\r\n  /**\r\n   * Reconstruct camera-space P.xyz from screen-space S \x3d (x, y) in\r\n   * pixels and camera-space z \x3c 0.  Assumes that the upper-left pixel center\r\n   * is at (0.5, 0.5) [but that need not be the location at which the sample tap\r\n   * was placed!]\r\n   *\r\n   * Costs 3 MADD.  Error is on the order of 10^3 at the far plane, partly due to z precision.\r\n   */\r\n  vec3 reconstructCSPosition(vec2 S, float z) {\r\n    return vec3(( (S.xy) * projInfo.xy + projInfo.zw)*(z*zScale.x+zScale.y), z);\r\n  }\r\n\r\n  void main(void) {\r\n    //Hash function used in the HPG12 AlchemyAO paper\r\n    //Not supported in WebGL -\x3e using texture lookup as in old SSAO shader instead\r\n    //ivec2 ssC \x3d ivec2(gl_FragCoord.xy);\r\n    //float randomPatternRotationAngle \x3d float((3 * ssC.x ^ ssC.y + ssC.x * ssC.y) * 10);\r\n    vec3 fres \x3d normalize((texture2D(rnm, uv * rnmScale).xyz * 2.0) - vec3(1.0));\r\n\r\n    float currentPixelDepth \x3d getDepthLinear(uv);\r\n\r\n    if (-currentPixelDepth\x3enearFar.y || -currentPixelDepth\x3cnearFar.x) {\r\n      gl_FragColor \x3d vec4(0);\r\n      return;\r\n    }\r\n\r\n    vec3 currentPixelPos \x3d reconstructCSPosition(gl_FragCoord.xy,currentPixelDepth);\r\n\r\n    // get the normal of current fragment\r\n    vec4 norm4 \x3d texture2D(normalMap, uv);\r\n    vec3 norm \x3d vec3(-1.0) + 2.0 * norm4.xyz;\r\n    bool isTerrain \x3d norm4.w\x3c0.5;\r\n\r\n    float sum \x3d .0;\r\n\r\n    vec4 occluderFragment;\r\n    vec3 ray;\r\n\r\n    vec3 tapPixelPos;\r\n\r\n    // note: the factor 2.0 should not be necessary, but makes ssao much nicer.\r\n    // bug or deviation from CE somewhere else?\r\n    float ps \x3d projScale/(2.0*currentPixelPos.z*zScale.x+zScale.y);\r\n\r\n    for(int i \x3d 0; i \x3c NUM_TAP_SAMPLES; ++i)\r\n    {\r\n      // get a vector (randomized inside of a sphere with radius 1.0) from a texture and reflect it\r\n      //float ssR;\r\n      //vec2 unitOffset \x3d tapLocation(i, randomPatternRotationAngle, ssR);\r\n      // get the depth of the occluder fragment\r\n      //vec2 offset \x3d vec2(-unitOffset*radius*ssR*ps);\r\n\r\n      vec2 unitOffset \x3d reflect(pSphere[i], fres).xy;\r\n      vec2 offset \x3d vec2(-unitOffset*radius*ps);\r\n\r\n\r\n      //don\'t use current or very nearby samples\r\n      if ( abs(offset.x)\x3c2.0 || abs(offset.y)\x3c2.0) continue;\r\n\r\n\r\n      vec2 tc \x3d vec2(gl_FragCoord.xy + offset);\r\n      if (tc.x \x3c 0.0 || tc.y \x3c 0.0 || tc.x \x3e screenDimensions.x || tc.y \x3e screenDimensions.y) continue;\r\n      vec2 tcTap \x3d tc/screenDimensions;\r\n      float occluderFragmentDepth \x3d getDepthLinear(tcTap);\r\n\r\n      if (isTerrain) {\r\n        bool isTerrainTap \x3d texture2D(normalMap, tcTap).w\x3c0.5;\r\n        if (isTerrainTap) {\r\n          continue;\r\n        }\r\n      }\r\n\r\n      tapPixelPos \x3d reconstructCSPosition(tc, occluderFragmentDepth);\r\n\r\n      sum+\x3d aoValueFromPositionsAndNormal(currentPixelPos, norm, tapPixelPos);\r\n    }\r\n\r\n    // output the result\r\n\r\n    float A \x3d max(1.0-sum*intensity/float(NUM_TAP_SAMPLES),0.0);\r\n\r\n    // Anti-tone map to reduce contrast and drag dark region farther\r\n    // (x^0.2 + 1.2 * x^4)/2.2\r\n    A \x3d (pow(A, 0.2) + 1.2 * A*A*A*A) / 2.2;\r\n\r\n\r\n    //gl_FragColor \x3d vec4(norm/2.0+0.5, 1.0);\r\n    //gl_FragColor \x3d vec4(-currentPixelDepth/1000.0);\r\n    //gl_FragColor \x3d vec4(tapPixelPos.x/100.0);\r\n    gl_FragColor \x3d vec4(A);\r\n\r\n\r\n  }\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3csnippet name\x3d"fsBlurEdgeAware"\x3e\x3c![CDATA[\r\n  $fsprecisionf\r\n\r\n  uniform sampler2D normalMap;\r\n  uniform sampler2D depthMap;\r\n  uniform sampler2D tex;\r\n\r\n\r\n  uniform vec2 blurSize;\r\n\r\n\r\n  uniform float g_BlurFalloff;\r\n  uniform float projScale;\r\n\r\n\r\n  varying vec2 uv;\r\n\r\n  uniform vec2    nearFar;\r\n\r\n  //set z scaling, used to prevent division in ortho mode\r\n  uniform vec2 zScale;\r\n\r\n  $rgba2float\r\n  $getDepthLinear\r\n\r\n  float BlurFunction(vec2 uv, float r, float center_d, inout float w_total, float sharpness)\r\n  {\r\n    float c \x3d texture2D(tex, uv).r;\r\n    float d \x3d getDepthLinear(uv);\r\n\r\n    float ddiff \x3d d - center_d;\r\n\r\n    float w \x3d exp(-r*r*g_BlurFalloff - ddiff*ddiff*sharpness);\r\n\r\n    w_total +\x3d w;\r\n\r\n    return w*c;\r\n  }\r\n\r\n  void main(void)\r\n  {\r\n\r\n    float b \x3d 0.0;\r\n    float w_total \x3d 0.0;\r\n\r\n    float center_d \x3d  getDepthLinear(uv);\r\n\r\n    float sharpness \x3d -0.05*projScale/(center_d*zScale.x+zScale.y);\r\n    for (int r \x3d -RADIUS; r \x3c\x3d RADIUS; ++r)\r\n    {\r\n      float rf \x3d float(r);\r\n      vec2 uvOffset \x3d uv + rf*blurSize;\r\n      b +\x3d BlurFunction(uvOffset, rf, center_d, w_total, sharpness);\r\n    }\r\n\r\n    gl_FragColor \x3d vec4(b/w_total);\r\n  }\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\r\n  \x3csnippet name\x3d"fsBlurSrc0"\x3e\x3c![CDATA[\r\n  $fsprecisionf\r\n\r\n  uniform sampler2D tex;\r\n  uniform float blurSize;\r\n  varying vec2 uv;\r\n\r\n  void main() {\r\n    int rad \x3d RADIUS - 1;\r\n\r\n    vec4 sum \x3d vec4(0.0);\r\n    for (int k \x3d -RADIUS; k \x3c\x3d RADIUS; ++k) {     // NOTE for-variable-init must be a const expression\r\n      float fi \x3d float(k);\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n  \x3csnippet name\x3d"fsBlurSrc1"\x3e\x3c![CDATA[\r\n    }\r\n\r\n    gl_FragColor \x3d sum / float(RADIUS * RADIUS);\r\n  }\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n  \x3csnippet name\x3d"fsBlurH"\x3e\x3c![CDATA[\r\n  $fsBlurSrc0\r\n      sum +\x3d texture2D(tex, vec2(uv.x + fi * blurSize, uv.y)) * (float(rad) - abs(fi) + 1.0);\r\n  $fsBlurSrc1\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n  \x3csnippet name\x3d"fsBlurV"\x3e\x3c![CDATA[\r\n  $fsBlurSrc0\r\n      sum +\x3d texture2D(tex, vec2(uv.x, uv.y + fi * blurSize)) * (float(rad) - abs(fi) + 1.0);\r\n  $fsBlurSrc1\r\n]]\x3e\x3c/snippet\x3e\r\n\r\n\x3c/snippets\x3e\r\n'}});
define("require exports dojo/text!../materials/internal/ssao.xml ../../../../core/Logger ../../support/imageUtils ./DefaultVertexAttributeLocations ./DefaultVertexBufferLayouts ./gl-matrix ./glUtil3D ./Util ../../../webgl/BufferObject ../../../webgl/FramebufferObject ../../../webgl/Program ../../../webgl/Texture ../../../webgl/Util ../../../webgl/VertexArrayObject".split(" "),function(w,u,x,y,z,g,A,p,v,q,B,t,l,C,r,D){var E=y.getLogger("esri.views.3d.webgl-engine.lib.SSAOHelper");u=function(){function e(a,
c,b,e){this._enabled=!1;this._BLUR_F=2;this._attenuation=.5;this._radius=3;this._samples=16;this._viewportToRestore=p.vec4d.create();this._rctx=b;this._programRep=a;this._requestRender=e;this._emptyTexture=v.createEmptyTexture(b)}e.prototype.dispose=function(){this._emptyTexture.dispose();this._emptyTexture=null};Object.defineProperty(e.prototype,"isSupported",{get:function(){var a=this._rctx,c=-1!==a.parameters.versionString.indexOf("WebGL 0.93"),b=-1!==a.parameters.versionString.indexOf("WebGL 0.94");
return a.capabilities.standardDerivatives&&!(c||b)},enumerable:!0,configurable:!0});Object.defineProperty(e.prototype,"enabled",{get:function(){return this._enabled},set:function(a){a?this.enable():this.disable()},enumerable:!0,configurable:!0});Object.defineProperty(e.prototype,"attenuation",{get:function(){return this._attenuation},set:function(a){this._attenuation=a},enumerable:!0,configurable:!0});Object.defineProperty(e.prototype,"radius",{get:function(){return this._radius},set:function(a){this._radius=
a},enumerable:!0,configurable:!0});Object.defineProperty(e.prototype,"filterRadius",{get:function(){return 4},enumerable:!0,configurable:!0});Object.defineProperty(e.prototype,"samples",{get:function(){return this._samples},set:function(a){this._samples=a},enumerable:!0,configurable:!0});e.prototype.computeSSAO=function(a,c,b,e){if(this._noiseTexture){q.assert(this.enabled);var d=this._rctx,f=b.width,h=b.height,n=f/this._BLUR_F,g=h/this._BLUR_F;this._ssaoFBO.resize(f,h);this._blur0FBO.resize(n,g);
this._blur1FBO.resize(n,g);n=1*f;g=1*h;d.bindFramebuffer(this._ssaoFBO);p.vec4d.set(a.fullViewport,this._viewportToRestore);d.setViewport(0,0,f,h);var k=this._programRep.get(8>=this._samples?"ssao8":16>=this._samples?"ssao16":32>=this._samples?"ssao32":"ssao64"),m=this._programRep.get("blur");k.setUniform2f("rnmScale",f/this._noiseTexture.descriptor.width,h/this._noiseTexture.descriptor.height);k.setUniform3fv("pSphere",8>=this._samples?this._data.random8:16>=this._samples?this._data.random16:32>=
this._samples?this._data.random32:this._data.random64);d.bindProgram(k);f=this._data.minDiscrepancy;k.setUniform1f("numSpiralTurns",this._samples<f.length?f[this._samples]:5779);f=F;h=G;q.inverseProjectionInfo(a.projectionMatrix,a.fullWidth,a.fullHeight,f,h);k.setUniform4fv("projInfo",f);k.setUniform2fv("zScale",h);k.setUniform2f("nearFar",a.near,a.far);f=1/a.computePixelSizeAtDist(1);k.setUniform1f("projScale",1*f);k.setUniform2f("screenDimensions",n,g);var l=2*this._radius,h=p.vec3d.dist(a.eye,
a.center),l=20*a.computePixelSizeAtDist(h),l=Math.max(.1,l);k.setUniform1f("radius",l);k.setUniform1f("intensity",4*this._attenuation/Math.pow(l,6));k.setUniform1i("rnm",0);k.setUniform1i("normalMap",1);k.setUniform1i("depthMap",2);d.bindTexture(this._noiseTexture,0);d.bindTexture(e.colorTexture,1);d.bindTexture(b.colorTexture,2);b=v.createQuadVAO(this._rctx);d.bindVAO(b);d.drawArrays(5,0,r.vertexCount(b,"geometry"));d.bindTexture(this._ssaoFBO.colorTexture,0);d.setViewport(0,0,n/this._BLUR_F,g/this._BLUR_F);
d.bindFramebuffer(this._blur0FBO);m.setUniform2f("screenDimensions",n,g);m.setUniform1i("tex",0);m.setUniform1i("normalMap",1);m.setUniform1i("depthMap",2);m.setUniform2f("blurSize",0,1*this._BLUR_F/g);m.setUniform1i("radius",4);m.setUniform1f("g_BlurFalloff",.08);m.setUniform2f("nearFar",a.near,a.far);5E4<h&&(f=Math.max(0,f-(h-5E4)));m.setUniform1f("projScale",f);m.setUniform2f("zScale",1,0);d.drawArrays(5,0,r.vertexCount(b,"geometry"));m.setUniform2f("blurSize",1*this._BLUR_F/n,0);d.bindFramebuffer(this._blur1FBO);
d.bindTexture(this._blur0FBO.colorTexture,0);d.drawArrays(5,0,r.vertexCount(b,"geometry"));d.bindFramebuffer(c);d.setViewport(this._viewportToRestore[0],this._viewportToRestore[1],this._viewportToRestore[2],this._viewportToRestore[3])}};e.prototype.setUniforms=function(a){var c=this.enabled&&this._noiseTexture,b=this._rctx;b.bindTexture(c?this._blur1FBO.colorTexture:this._emptyTexture,6);b.setActiveTexture(0);a.setUniform1i("ssaoTex",6);c?a.setUniform4f("viewportPixelSz",this._viewportToRestore[0],
this._viewportToRestore[1],1/this._ssaoFBO.width,1/this._ssaoFBO.height):a.setUniform4f("viewportPixelSz",-1,-1,-1,-1)};e.prototype.bindAll=function(a){a=a.getProgramsUsingUniform("viewportPixelSz");for(var c=0;c<a.length;c++)this.setUniforms(a[c])};e.prototype.drawQuad=function(a){q.assert(this.enabled);var c=this._programRep.get("showDepth");this._debugQuadVAO||(this._debugQuadVAO=new D(this._rctx,g.Default3D,{geometry:A.Pos2Tex},{geometry:B.createVertex(this._rctx,35044,H)}));var b=this._rctx;
b.setDepthTestEnabled(!1);c.setUniformMatrix4fv("proj",new Float32Array(a));c.setUniform1i("depthTex",0);b.bindTexture(this._ssaoFBO.colorTexture,0);b.bindVAO(this._debugQuadVAO);b.drawArrays(5,0,r.vertexCount(this._debugQuadVAO,"geometry"));b.setDepthTestEnabled(!0)};e.prototype.enable=function(){var a=this;this.enabled||(this.isSupported?(this._enabled=!0,this.loadResources(function(){a._enabled&&a.initialize()})):E.warn("SSAO is not supported for this browser or hardware"))};e.prototype.loadResources=
function(a){var c=this;this._data?a():w(["./SSAOHelperData"],function(b){c._data=b;a()})};e.prototype.initialize=function(){var a=this,c={target:3553,pixelFormat:6408,dataType:5121,samplingMode:9729,wrapMode:33071,width:0,height:0},b={colorTarget:0,depthStencilTarget:0};this._ssaoFBO=t.createWithAttachments(this._rctx,c,b);this._blur0FBO=t.createWithAttachments(this._rctx,c,b);this._blur1FBO=t.createWithAttachments(this._rctx,c,b);z.requestImage(this._data.noiseTexture).then(function(b){a._enabled&&
(a._noiseTexture=new C(a._rctx,{target:3553,pixelFormat:6408,dataType:5121,hasMipmap:!0,width:b.width,height:b.height},b),a._requestRender())})};e.prototype.disable=function(){this.enabled&&(this._enabled=!1,this._quadVAO&&(this._quadVAO.dispose(!0),this._quadVAO=null),this._noiseTexture&&(this._noiseTexture.dispose(),this._noiseTexture=null),this._blur1FBO&&(this._blur1FBO.dispose(),this._blur1FBO=null),this._blur0FBO&&(this._blur0FBO.dispose(),this._blur0FBO=null),this._ssaoFBO&&(this._ssaoFBO.dispose(),
this._ssaoFBO=null))};e.loadShaders=function(a,c,b){q.assert(null==a.samples);a._parse(x);var e=new l(b,a.vertexShaderShowDepth,a.fragmentShaderShowDepth,g.Default3D),d=a.createFsSSAOSrcObscurance,f=new l(b,a.vsUVQuad,d,g.Default3D,{NUM_TAP_SAMPLES:"8"}),h=new l(b,a.vsUVQuad,d,g.Default3D,{NUM_TAP_SAMPLES:"16"}),n=new l(b,a.vsUVQuad,d,g.Default3D,{NUM_TAP_SAMPLES:"32"}),d=new l(b,a.vsUVQuad,d,g.Default3D,{NUM_TAP_SAMPLES:"64"});a=new l(b,a.vsUVQuad,a.fsBlurEdgeAware,g.Default3D,{RADIUS:(4).toString()});
c.add("showDepth",e);c.add("ssao8",f);c.add("ssao16",h);c.add("ssao32",n);c.add("ssao64",d);c.add("blur",a)};return e}();var G=p.vec2d.create(),F=p.vec4d.create(),H=new Float32Array([0,0,0,0,512,0,1,0,0,512,0,1,512,512,1,1]);return u});