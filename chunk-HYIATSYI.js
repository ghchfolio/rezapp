import{d as R,e as H,f as J,h as K}from"./chunk-A4CLFJPE.js";import{a as q}from"./chunk-5XJISNF7.js";import{i as z}from"./chunk-CMEKHUNI.js";import{Aa as u,Cb as A,Db as U,Ia as _,Ka as g,Na as $,Pa as j,Qa as k,R as O,Ra as d,Sa as f,Ta as C,Ua as D,Wa as E,X as m,Xa as b,Ya as T,_ as h,bb as y,cb as G,da as P,db as B,ea as I,g as w,ib as x,kb as V,lb as N,sa as F}from"./chunk-OEHI7TKP.js";import{d as r,e as a,f as l}from"./chunk-AM3O4QAD.js";var M=(()=>{var e;let t=class t{constructor(){a(this,e,void 0);l(this,e,new w(null)),this.toast$=r(this,e).asObservable()}setToast(i){r(this,e).next(i)}clearToast(){r(this,e).next(null)}};e=new WeakMap,t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=O({token:t,factory:t.\u0275fac,providedIn:"root"});let n=t;return n})();function X(n,e){if(n&1){let t=D();d(0,"figure",1)(1,"a",2),E("click",function(){P(t);let i=b();return I(i.onClick(i.sample.id))}),C(2,"img",3),d(3,"figcaption"),y(4),f()()()}if(n&2){let t=b();u(2),T("src",t.sample.src,F),T("alt",t.sample.caption),T("title",t.sample.caption),g("ngClass",t.sample.url===null&&t.sample.images===null?"unavailable":""),u(2),G(t.sample.caption)}}var L=(()=>{var e;let t=class t{constructor(){a(this,e,m(z))}onClick(i){r(this,e).navigate(["gallery/details/"+i])}};e=new WeakMap,t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=h({type:t,selectors:[["app-gallery-thumbnails"]],inputs:{sample:"sample"},standalone:!0,features:[x],decls:1,vars:1,consts:[["class","text-center"],[1,"text-center"],[3,"click"],[1,"thumbs",3,"src","alt","title","ngClass"]],template:function(o,W){o&1&&_(0,X,5,5,"figure",0),o&2&&$(0,W.sample?0:-1)},dependencies:[A],styles:["figure[_ngcontent-%COMP%]:hover{cursor:pointer}"]});let n=t;return n})();function Y(n,e){if(n&1&&(d(0,"div",1)(1,"div",2)(2,"div",3),y(3),f()()()),n&2){let t=b();u(3),B(" ",t.toastContent.body," ")}}var Q=(()=>{var e,t,s,i;let o=class o{constructor(){a(this,e,void 0);a(this,t,void 0);a(this,s,void 0);a(this,i,void 0);l(this,e,m(M)),l(this,t,r(this,e).toast$),this.toastContent={body:""},this.sub=r(this,t).subscribe(c=>{c&&(this.toastContent.body=c.body)})}ngAfterViewInit(){l(this,s,document.getElementById("myToast")),l(this,i,K.getOrCreateInstance(r(this,s))),r(this,i).show()}ngOnDestroy(){this.sub.unsubscribe()}};e=new WeakMap,t=new WeakMap,s=new WeakMap,i=new WeakMap,o.\u0275fac=function(p){return new(p||o)},o.\u0275cmp=h({type:o,selectors:[["app-toast"]],standalone:!0,features:[x],decls:1,vars:1,consts:[["id","myToast","class","toast align-items-center","role","alert","aria-live","assertive","aria-atomic","true",4,"ngIf"],["id","myToast","role","alert","aria-live","assertive","aria-atomic","true",1,"toast","align-items-center"],[1,"d-flex"],[1,"toast-body"]],template:function(p,v){p&1&&_(0,Y,4,1,"div",0),p&2&&g("ngIf",v.toastContent)},dependencies:[U],styles:[".toast[_ngcontent-%COMP%]{color:#000;position:fixed;bottom:1rem;right:1rem}"]});let n=o;return n})();var Z=(n,e)=>e.id;function tt(n,e){if(n&1&&C(0,"app-gallery-thumbnails",1),n&2){let t=e.$implicit;g("sample",t)}}function et(n,e){n&1&&(d(0,"h2"),y(1,"No samples found..."),f())}var $t=(()=>{var e,t,s,i;let o=class o{constructor(){a(this,e,void 0);a(this,t,void 0);a(this,s,void 0);a(this,i,void 0);l(this,e,m(q)),l(this,t,m(M)),l(this,s,m(H)),l(this,i,r(this,s).getSearchTerm().subscribe(c=>this.term=c)),this.samples$$=r(this,e).samples$$,this.term=""}ngOnInit(){r(this,t).setToast({body:"Samples are sorted from latest to earliest."})}ngOnDestroy(){r(this,i).unsubscribe()}};e=new WeakMap,t=new WeakMap,s=new WeakMap,i=new WeakMap,o.\u0275fac=function(p){return new(p||o)},o.\u0275cmp=h({type:o,selectors:[["app-gallery"]],standalone:!0,features:[x],decls:6,vars:4,consts:[["id","gallery"],[3,"sample"]],template:function(p,v){p&1&&(C(0,"app-toast"),d(1,"div",0),j(2,tt,1,1,"app-gallery-thumbnails",1,Z,!1,et,2,0,"h2"),V(5,"searchFilter"),f()),p&2&&(u(2),k(N(5,1,v.samples$$(),v.term)))},dependencies:[L,Q,R,J],styles:["#search[_ngcontent-%COMP%]{background:#009eb3;position:fixed;top:50px;left:0;width:100%;padding:.7em 0;text-align:center}#search[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{width:70%;margin:0 auto;padding:.7em;border:none;border-radius:4px;text-align:center}#gallery[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:2rem;justify-content:center;align-content:center}.thumbs[_ngcontent-%COMP%]{border-radius:500px;border:5px solid #009eb3;width:130px;height:130px}figure[_ngcontent-%COMP%]{width:130px;text-align:center}figure[_ngcontent-%COMP%]:hover{cursor:pointer}figure[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}@media screen and (min-width: 768px){#search[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{width:40%}}@media screen and (min-width: 1024px){#search[_ngcontent-%COMP%]{top:50px}}@media screen and (min-width: 1440px){#search[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{width:20%}}"]});let n=o;return n})();export{$t as GalleryComponent};