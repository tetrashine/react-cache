// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define(["require","exports","../doublePrecisionUtils","../RenderPass"],function(l,g,k,d){Object.defineProperty(g,"__esModule",{value:!0});g.acquireGLMaterials=function(a,b){var c={};c[d.MATERIAL]=b.aquire(a);c[d.MATERIAL_DEPTH_SHADOWMAP]=b.aquireDepthShadowMap(a);c[d.MATERIAL_NORMAL]=b.aquireNormal(a);c[d.MATERIAL_DEPTH]=b.aquireDepth(a);c[d.MATERIAL_HIGHLIGHT]=b.aquireHighlight(a);return c};g.releaseGLMaterials=function(a,b){b.release(a.id);b.releaseDepthShadowMap(a.id);b.releaseNormal(a.id);b.releaseDepth(a.id);
b.releaseHighlight(a.id)};g.encodeDoubleVec3=function(a,b,c,d,f){h[0]=a.get(b,0);h[1]=a.get(b,1);h[2]=a.get(b,2);k.encodeDoubleArray(h,e,3);c.set(f,0,e[0]);d.set(f,0,e[1]);c.set(f,1,e[2]);d.set(f,1,e[3]);c.set(f,2,e[4]);d.set(f,2,e[5])};var h=new Float64Array(3),e=new Float32Array(6)});