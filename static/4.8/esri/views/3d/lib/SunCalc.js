// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.8/esri/copyright.txt for details.
//>>built
define([],function(){function q(a){return new Date(864E5*(a+.5-2440588))}function n(a,b){return k(c(a)*f(h)-l(b)*c(h),f(a))}function v(a,b){return p(c(b)*f(h)+f(b)*c(h)*c(a))}function z(a,b,d){return k(c(a),f(a)*c(b)-l(d)*f(b))}function A(a,b,d){return p(c(b)*c(d)+f(b)*f(d)*f(a))}function B(a){return e*(1.9148*c(a)+.02*c(2*a)+3E-4*c(3*a))}function C(a,b){a=e*(357.5291+.98560028*a);var d=B(a);a=a+d+102.9372*e+m;b||(b={dec:0,ra:0});b.dec=v(a,0);b.ra=n(a,0);return b}function D(a,b,d){return 2451545+
a+.0053*c(b)-.0069*c(2*d)}function E(a){var b=e*(134.963+13.064993*a),d=e*(93.272+13.22935*a);a=e*(218.316+13.176396*a)+6.289*e*c(b);d=5.128*e*c(d);b=385001-20905*f(b);return{ra:n(a,d),dec:v(a,d),dist:b}}var m=Math.PI,c=Math.sin,f=Math.cos,l=Math.tan,p=Math.asin,k=Math.atan2,F=Math.acos,e=m/180,G={dec:0,ra:0},h=23.4397*e,g={POLAR_EXCEPTION:{NORMAL:0,MIDNIGHT_SUN:1,POLAR_NIGHT:2},getPosition:function(a,b,d,c){d=e*-d;b*=e;var f=a.valueOf()/864E5-.5+2440588-2451545;a=C(f,G);d=e*(280.16+360.9856235*f)-
d-a.ra;c||(c={azimuth:0,altitude:0});c.azimuth=z(d,b,a.dec);c.altitude=A(d,b,a.dec);return c}},r=[[-.83,"sunrise","sunset"]];g.addTime=function(a,b,d){r.push([a,b,d])};g.getTimes=function(a,b,d){function H(a){var b=k,d=w;a=F((c(a)-c(b)*c(d))/(f(b)*f(d)));return D(9E-4+(a+h)/(2*m)+l,t,x)}var h=e*-d,k=e*b,l=Math.round(a.valueOf()/864E5-.5+2440588-2451545-9E-4-h/(2*m));a=9E-4+(0+h)/(2*m)+l;var t=e*(357.5291+.98560028*a);b=B(t);var x=t+b+102.9372*e+m,w=v(x,0);a=D(a,t,x);b={solarNoon:q(a),nadir:q(a-.5),
polarException:g.POLAR_EXCEPTION.NORMAL};var n,u,y,p;d=0;for(n=r.length;d<n;d+=1)u=r[d],y=H(u[0]*e),p=a-(y-a),b[u[1]]=q(p),b[u[2]]=q(y);b.polarException=function(a){a=(c(a)-c(k)*c(w))/(f(k)*f(w));return-1>a?g.POLAR_EXCEPTION.MIDNIGHT_SUN:1<a?g.POLAR_EXCEPTION.POLAR_NIGHT:g.POLAR_EXCEPTION.NORMAL}(r[0][0]*e);return b};g.getMoonPosition=function(a,b,d){d=e*-d;b*=e;var c=a.valueOf()/864E5-.5+2440588-2451545;a=E(c);d=e*(280.16+360.9856235*c)-d-a.ra;c=A(d,b,a.dec);c+=.017*e/l(c+10.26*e/(c+5.1*e));return{azimuth:z(d,
b,a.dec),altitude:c,distance:a.dist}};g.getMoonFraction=function(a){var b=a.valueOf()/864E5-.5+2440588-2451545;a=C(b);b=E(b);a=F(c(a.dec)*c(b.dec)+f(a.dec)*f(b.dec)*f(a.ra-b.ra));a=k(149598E3*c(a),b.dist-149598E3*f(a));return(1+f(a))/2};return g});