// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/Error ../../../../core/lang ../../../../core/Logger ./LEPCC".split(" "),function(B,h,l,n,z,u){function A(b,a,d){for(var e="",g=0;g<d;){var f=b[a+g];if(128>f)e+=String.fromCharCode(f),g++;else if(192<=f&&224>f){if(g+1>=d)throw new l("utf8-decode-error","UTF-8 Decode failed. Two byte character was truncated.");var c=b[a+g+1],f=(f&31)<<6|c&63,e=e+String.fromCharCode(f),g=g+2}else if(224<=f&&240>f){if(g+2>=d)throw new l("utf8-decode-error","UTF-8 Decode failed. Multi byte character was truncated.");
var c=b[a+g+1],k=b[a+g+2],f=(f&15)<<12|(c&63)<<6|k&63,e=e+String.fromCharCode(f),g=g+3}else if(240<=f&&248>f){if(g+3>=d)throw new l("utf8-decode-error","UTF-8 Decode failed. Multi byte character was truncated.");c=b[a+g+1];k=b[a+g+2];f=(f&7)<<18|(c&63)<<12|(k&63)<<6|b[a+g+3]&63;e=65536<=f?e+String.fromCharCode((f-65536>>10)+55296,(f&1023)+56320):e+String.fromCharCode(f);g+=4}else throw new l("utf8-decode-error","UTF-8 Decode failed. Invalid multi byte sequence.");}return e}function p(b,a){for(var d=
{byteOffset:0,byteCount:0,fields:Object.create(null)},e=0,g=0;g<a.length;g++){var f=a[g],c=f.valueType||f.type;d.fields[f.property]=(0,h.valueType2ArrayBufferReader[c])(b,e);e+=h.valueType2TypedArrayClassMap[c].BYTES_PER_ELEMENT}d.byteCount=e;return d}function v(b,a,d){var e=[],g,f=0,c;for(c=0;c<b;c+=1){g=a[c];if(0<g){if(e.push(A(d,f,g-1)),0!==d[f+g-1])throw new l("string-array-error","Invalid string array: missing null termination.");}else e.push(null);f+=g}return e}function q(b,a){return new h.valueType2TypedArrayClassMap[a.valueType](b,
a.byteOffset,a.count*a.valuesPerElement)}function w(b,a){return new Uint8Array(b,a.byteOffset,a.byteCount)}function x(b,a,d){b=null!=a.header?p(b,a.header):{byteOffset:0,byteCount:0,fields:{count:d}};d={header:b,byteOffset:b.byteCount,byteCount:0,entries:Object.create(null)};for(var e=b.byteCount,g=0;g<a.ordering.length;g++){var f=a.ordering[g],c=n.clone(a[f]);c.count=b.fields.count;if("String"===c.valueType){if(c.byteOffset=e,c.byteCount=b.fields[f+"ByteCount"],"UTF-8"!==c.encoding)throw new l("unsupported-encoding",
"Unsupported String encoding.",{encoding:c.encoding});}else if(r(c.valueType)){var k=m(c.valueType),e=e+(0!==e%k?k-e%k:0);c.byteOffset=e;c.byteCount=k*c.valuesPerElement*c.count}else throw new l("unsupported-value-type","Unsupported binary valueType",{valueType:c.valueType});e+=c.byteCount;d.entries[f]=c}d.byteCount=e-d.byteOffset;return d}function y(b,a,d){a!==b&&t.error("Invalid "+d+" buffer size\n expected: "+b+", actual: "+a+")");if(a<b)throw new l("buffer-too-small","Binary buffer is too small",
{expectedSize:b,actualSize:a});}function r(b){return h.valueType2TypedArrayClassMap.hasOwnProperty(b)}function m(b){return r(b)&&h.valueType2TypedArrayClassMap[b].BYTES_PER_ELEMENT}Object.defineProperty(h,"__esModule",{value:!0});var t=z.getLogger("esri.views.3d.layers.i3s.I3SBinaryReader");h.readHeader=p;h.readStringArray=v;h.createTypedView=q;h.createRawView=w;h.createAttributeDataIndex=x;h.createGeometryDataIndex=function(b,a,d){var e=p(b,a&&a.header),g=e.byteCount,f={header:e,byteOffset:e.byteCount,
byteCount:0,vertexAttributes:n.clone(a.vertexAttributes)},c=f.vertexAttributes;d||null==c.region||delete c.region;var e=e.fields,k=null!=e.vertexCount?e.vertexCount:e.count;for(d=0;d<a.ordering.length;d++){var h=a.ordering[d];null!=c[h]&&(c[h].byteOffset=g,c[h].count=k,g+=m(c[h].valueType)*c[h].valuesPerElement*k)}c=e.faceCount;if(a.faces&&c)for(f.faces=n.clone(a.faces),k=f.faces,d=0;d<a.ordering.length;d++)h=a.ordering[d],null!=k[h]&&(k[h].byteOffset=g,k[h].count=c,g+=m(k[h].valueType)*k[h].valuesPerElement*
c);e=e.featureCount;if(a.featureAttributes&&a.featureAttributeOrder&&e)for(f.featureAttributes=n.clone(a.featureAttributes),c=f.featureAttributes,d=0;d<a.featureAttributeOrder.length;d++)k=a.featureAttributeOrder[d],c[k].byteOffset=g,c[k].count=e,h=m(c[k].valueType),"UInt64"===c[k].valueType&&(h=8),g+=h*c[k].valuesPerElement*e;y(g,b.byteLength,"geometry");f.byteCount=g-f.byteOffset;return f};h.readBinaryAttribute=function(b,a,d){if("lepcc-rgb"===b.encoding)return u.decodeRGB(a);if("lepcc-intensity"===
b.encoding)return u.decodeIntensity(a);if(null!=b.encoding&&""!==b.encoding)throw new l("unknown-attribute-storage-info-encoding","Unknown Attribute Storage Info Encoding");b["attributeByteCounts "]&&!b.attributeByteCounts&&(t.warn("Warning: Trailing space in 'attributeByteCounts '."),b.attributeByteCounts=b["attributeByteCounts "]);"ObjectIds"===b.ordering[0]&&b.hasOwnProperty("objectIds")&&(t.warn("Warning: Case error in objectIds"),b.ordering[0]="objectIds");d=x(a,b,d);y(d.byteOffset+d.byteCount,
a.byteLength,"attribute");if(b=d.entries.attributeValues||d.entries.objectIds){if("String"===b.valueType){d=d.entries.attributeByteCounts;var e=q(a,d);a=w(a,b);return v(d.count,e,a)}return q(a,b)}throw new l("bad-attribute-storage-info","Bad attributeStorageInfo specification.");};h.valueType2TypedArrayClassMap={Float32:Float32Array,Float64:Float64Array,UInt8:Uint8Array,Int8:Int8Array,UInt16:Uint16Array,Int16:Int16Array,UInt32:Uint32Array,Int32:Int32Array};h.valueType2ArrayBufferReader={Float32:function(b,
a){return(new DataView(b,0)).getFloat32(a,!0)},Float64:function(b,a){return(new DataView(b,0)).getFloat64(a,!0)},UInt8:function(b,a){return(new DataView(b,0)).getUint8(a)},Int8:function(b,a){return(new DataView(b,0)).getInt8(a)},UInt16:function(b,a){return(new DataView(b,0)).getUint16(a,!0)},Int16:function(b,a){return(new DataView(b,0)).getInt16(a,!0)},UInt32:function(b,a){return(new DataView(b,0)).getUint32(a,!0)},Int32:function(b,a){return(new DataView(b,0)).getInt32(a,!0)}};h.isValueType=r;h.getBytesPerValue=
m});