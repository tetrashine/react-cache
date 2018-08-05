// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define(["require","exports","dojo/has","../../core/libs/gl-matrix/mat4","../../core/libs/gl-matrix/vec3"],function(w,x,u,q,m){var v={extent:{xmin:0,ymin:0,xmax:0,ymax:0,spatialReference:{wkid:102100,isWrappable:!0},intersects:function(a){return!1}},center:[0,0],scale:1,resolution:1,rotation:0,width:1,height:1,pixelRatio:1,size:[256,256],spatialReference:{wkid:102100,isWrappable:!0},worldScreenWidth:1,viewpoint:{},toMap:function(a,b,c){return null},toScreen:function(a,b,c){return null},clone:function(){return null},
copy:function(a){return this},toJSON:function(){return null}},r=m.create();return function(a,b,c,n,d,e,h,p,f,g,t,m,k){f=[b[0],b[1],b[2]];for(var l=g;1>l;l*=2)f[0]--,f[1]>>=1,f[2]>>=1;b={context:a,drawPhase:0,state:v,stationary:!0,pixelRatio:1,displayLevel:d.adjustLevel(e),requiredLevel:d.adjustLevel(b[0]),drawphase:0,renderer:n,layerOpacity:k,painter:null};if(h!==p)throw Error("It is expected that tiles are square!");e=1/g;k=d.getSchemaShift(f,e);l=k[1];c.tileTransform.displayCoord[0]=-1-2*e*t[0]-
k[0];c.tileTransform.displayCoord[1]=1+2*e*(1-t[1]-g)+l;g=c.tileTransform.transform;q.identity(g);d.isWGS84&&512===d.lockedSchemaPixelSize&&(e*=2);0===m&&(e/=2);d=.25*e/h;r.set([d,-d,1]);q.scale(g,g,r);a.setBlendFunctionSeparate(1,771,1,771);a.setClearDepth(1);a.clear(a.gl.DEPTH_BUFFER_BIT);b.state.size=[h,p];b.state.width=h;b.state.height=p;n.setStateParams(b.state,b.pixelRatio,f[0]);c.attach(b);a.setFaceCullingEnabled(!1);a.setDepthFunction(515);a.setBlendingEnabled(!1);a.setDepthTestEnabled(!0);
a.setDepthWriteEnabled(!0);c.processRender(b);a.setDepthWriteEnabled(!1);a.setBlendingEnabled(!0);b.drawphase=1;c.processRender(b);b.drawphase=2;c.processRender(b);u("esri-vector-tiles-debug")&&n.renderTileInfo(a,c);a.setDepthWriteEnabled(!0);a.setDepthTestEnabled(!1);a.setFaceCullingEnabled(!0)}});