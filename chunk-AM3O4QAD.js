var l=Object.defineProperty,o=Object.defineProperties;var p=Object.getOwnPropertyDescriptors;var j=Object.getOwnPropertySymbols;var q=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;var k=(c,a,b)=>a in c?l(c,a,{enumerable:!0,configurable:!0,writable:!0,value:b}):c[a]=b,u=(c,a)=>{for(var b in a||={})q.call(a,b)&&k(c,b,a[b]);if(j)for(var b of j(a))r.call(a,b)&&k(c,b,a[b]);return c},v=(c,a)=>o(c,p(a));var w=(c,a)=>{for(var b in a)l(c,b,{get:a[b],enumerable:!0})};var i=(c,a,b)=>{if(!a.has(c))throw TypeError("Cannot "+b)};var s=(c,a,b)=>(i(c,a,"read from private field"),b?b.call(c):a.get(c)),x=(c,a,b)=>{if(a.has(c))throw TypeError("Cannot add the same private member more than once");a instanceof WeakSet?a.add(c):a.set(c,b)},t=(c,a,b,e)=>(i(c,a,"write to private field"),e?e.call(c,b):a.set(c,b),b);var y=(c,a,b,e)=>({set _(f){t(c,a,f,b)},get _(){return s(c,a,e)}}),z=(c,a,b)=>(i(c,a,"access private method"),b);var A=(c,a,b)=>new Promise((e,f)=>{var m=d=>{try{g(b.next(d))}catch(h){f(h)}},n=d=>{try{g(b.throw(d))}catch(h){f(h)}},g=d=>d.done?e(d.value):Promise.resolve(d.value).then(m,n);g((b=b.apply(c,a)).next())});export{u as a,v as b,w as c,s as d,x as e,t as f,y as g,z as h,A as i};