var l=class{constructor(t){if(t.find((r,i)=>t[i-1]&&r.length!==t[i-1].length))throw new Error("\u77E9\u9635\u5217\u4E0D\u6B63\u786E");this.shape=[t.length,t[0].length],this.self=t}slice(t,e){return new l(this.self.slice(t,e))}connect(t){if(this.shape[1]!==t.shape[1])throw new Error("\u5217\u6570\u4E0D\u7EDF\u4E00");let e=this.dataSync().concat(t.dataSync());return new l(e)}zeroed(){return this.atomicOperation(t=>0)}clone(){return new l(this.dataSync())}getMeanOfRow(t){let e=this.getRow(t);return e.reduce((r,i)=>r+i)/e.length}columnSum(){let t=[];for(let e=0;e<this.shape[1];e++)t.push(this.getCol(e).reduce((r,i)=>r+i));return new l([t])}dataSync(){let t=[];for(let e=0;e<this.shape[0];e++){let r=[];for(let i=0;i<this.shape[1];i++)r.push(this.get(e,i));t.push(r)}return t}equalsShape(t){return this.shape[0]===t.shape[0]&&this.shape[1]===t.shape[1]}equals(t){if(!this.equalsShape(t))return!1;for(let e=0;e<this.shape[0];e++)for(let r=0;r<this.shape[1];r++)if(this.get(e,r)!==t.get(e,r))return!1;return!0}static generate(t,e,r){let i=[];for(let n=0;n<t;n++){let s=[];for(let a=0;a<e;a++)s.push(r||.5-Math.random());i.push(s)}return new l(i)}update(t,e,r,i){switch(i){case"+=":this.self[t][e]+=r;break;case"-=":this.self[t][e]-=r;break;case"*=":this.self[t][e]*=r;break;case"/=":this.self[t][e]/=r;break;default:this.self[t][e]=r}}expand(t,e){let r=[];for(let i=0;i<this.shape[0];i++)e==="L"?r.push([t,...this.getRow(i)]):r.push([...this.getRow(i),t]);return new l(r)}get(t,e){return this.self[t][e]}getRow(t){return[...this.self[t]]}getCol(t){let e=[];for(let r=0;r<this.shape[0];r++)for(let i=0;i<this.shape[1];i++)i===t&&e.push(this.get(r,i));return e}det(){if(this.shape[0]!==this.shape[1])throw new Error("\u53EA\u6709\u65B9\u9635\u624D\u80FD\u8BA1\u7B97\u884C\u5217\u5F0F");if(this.shape[0]===2&&this.shape[1]===2)return this.get(0,0)*this.get(1,1)-this.get(0,1)*this.get(1,0);{let t=0;for(let e=0;e<this.shape[1];e++)this.get(0,e)!==0&&(t+=this.get(0,e)*(-1)**(e+2)*this.cominor(0,e).det());return t}}cominor(t,e){if(this.shape[0]<2||this.shape[1]<2)throw new Error("\u6C42\u4F59\u5B50\u5F0F\u884C\u548C\u5217\u5FC5\u987B\u5927\u4E8E2\u624D\u6709\u610F\u4E49");let r=this.dataSync().map(i=>(i=i.filter((n,s)=>s!==e),i)).filter((i,n)=>n!==t);return new l(r)}atomicOperation(t){let e=[];for(let r=0;r<this.shape[0];r++){let i=[];for(let n=0;n<this.shape[1];n++)i.push(t(this.get(r,n),r,n));e.push(i)}return new l(e)}coLocationOperation(t,e){if(!this.equalsShape(t))throw new Error("\u5FC5\u987B\u6EE1\u8DB3\u4E24\u4E2A\u77E9\u9635\u662F\u540C\u5F62\u77E9\u9635");let r=[];for(let i=0;i<this.shape[0];i++){let n=[];for(let s=0;s<this.shape[1];s++){let a=e==="add"?this.get(i,s)+t.get(i,s):this.get(i,s)-t.get(i,s);n.push(a)}r.push(n)}return new l(r)}subtraction(t){return this.coLocationOperation(t,"sub")}addition(t){return this.coLocationOperation(t,"add")}numberMultiply(t){return this.atomicOperation(e=>e*t)}multiply(t){if(this.shape[1]!==t.shape[0])throw new Error("\u5F53\u77E9\u9635A\u7684\u5217\u6570\u7B49\u4E8E\u77E9\u9635B\u7684\u884C\u6570\uFF0CA\u4E0EB\u624D\u53EF\u4EE5\u76F8\u4E58");let e=this.shape[0],r=t.shape[1],i=t.T,n=[];for(let s=0;s<e;s++){let a=[];for(let h=0;h<r;h++){let o=this.getRow(s).reduce((u,m,c)=>u+m*i.get(h,c),0);a.push(o)}n.push(a)}return new l(n)}get T(){let t=[];for(let e=0;e<this.shape[1];e++){let r=[];for(let i=0;i<this.shape[0];i++)r.push(this.get(i,e));t.push(r)}return new l(t)}normalization(){let t=this.T,e=[];for(let r=0;r<t.shape[0];r++){let i=Math.max(...t.getRow(r)),n=Math.min(...t.getRow(r)),s=i-n,a=n+s/2;e.push([a,s]);for(let h=0;h<t.shape[1];h++){let o=s===0?0:(t.get(r,h)-a)/s;t.update(r,h,o)}}return[t.T,new l(e).T]}print(){console.log(`Matrix ${this.shape[0]}x${this.shape[1]} [`);for(let t=0;t<this.shape[0];t++){let e=" ";for(let r=0;r<this.shape[1];r++)e+=this.get(t,r)+", ";console.log(e)}console.log("]")}};var g=class{constructor(t,e){this.X=t;this.Y=e}contrast(t){return this.X===t.X&&this.Y===t.Y}},T=class{constructor(t,e){if(this.start=new g(t[0],t[1]),this.end=new g(e[0],e[1]),this.start.contrast(this.end))throw new Error("\u4E24\u4E2A\u70B9\u4E0D\u80FD\u76F8\u540C")}minXY(){let t=Math.min(this.start.X,this.end.X),e=Math.min(this.start.Y,this.end.Y);return new g(t,e)}maxXY(){let t=Math.max(this.start.X,this.end.X),e=Math.max(this.start.Y,this.end.Y);return new g(t,e)}testPointIn(t){if(t.contrast(this.start)||t.contrast(this.end))return!0;let e=t.X-this.start.X==0?Infinity:(t.Y-this.start.Y)/(t.X-this.start.X),r=t.X-this.end.X==0?Infinity:(t.Y-this.end.Y)/(t.X-this.end.X);return e===r}testPointInside(t){if(this.testPointIn(t)){let e=this.minXY(),r=this.maxXY();return t.X>=e.X&&t.X<=r.X&&t.Y>=e.Y&&t.Y<=r.Y}return!1}},P=class{constructor(t){this.pts=t;if(t.length<2)throw new Error("\u81F3\u5C11\u4E24\u4E2A\u70B9");if(t.find((r,i)=>{let n=t[i+1];return n?r.contrast(n):!1}))throw new Error("\u4E0D\u80FD\u6709\u8FDE\u7EED\u91CD\u5408\u7684\u70B9")}},R=class{constructor(t){this.points=[];for(let a=0;a<t.length;a++)this.points.push(new g(t[a][0],t[a][1]));if(this.points.length<3)throw new Error("\u81F3\u5C11\u4E09\u4E2A\u70B9");let e=this.points.map(a=>a.X.toString()+a.Y.toString()).sort();if(e.find((a,h)=>a===e[h+1]))throw new Error("\u4E0D\u80FD\u6709\u76F8\u540C\u7684\u70B9");let i=this.points[0],s=this.points.slice(1).map(a=>a.X===i.X?Infinity:(a.Y-i.Y)/(a.X-i.X));if(new Set(s).size===1)throw new Error("\u6240\u6709\u70B9\u4E0D\u80FD\u5728\u4E00\u6761\u7EBF\u4E0A")}testPointInsidePolygon(t){let e=this.points;var r=0,i=e.length;if(i<3)return 0;for(var n=e[0],s=1;s<=i;++s){var a=s===i?e[0]:e[s];if(a.Y===t.Y&&(a.X===t.X||n.Y===t.Y&&a.X>t.X==n.X<t.X))return-1;if(n.Y<t.Y!=a.Y<t.Y){if(n.X>=t.X)if(a.X>t.X)r=1-r;else{var h=(n.X-t.X)*(a.Y-t.Y)-(a.X-t.X)*(n.Y-t.Y);if(h===0)return-1;h>0==a.Y>n.Y&&(r=1-r)}else if(a.X>t.X){var h=(n.X-t.X)*(a.Y-t.Y)-(a.X-t.X)*(n.Y-t.Y);if(h===0)return-1;h>0==a.Y>n.Y&&(r=1-r)}}n=a}return r}};var x=class{constructor(t,e){this.shape=t;this.mode="sgd";this.rate=.01;if(this.hlayer=t.length-1,this.hlayer<1)throw new Error("The network has at least two layers");this.w=[],this.b=[];for(let r=0;r<this.hlayer;r++)this.w[r]=l.generate(this.unit(r),this.unit(r-1)),this.b[r]=l.generate(1,this.unit(r));e&&(e.mode&&(this.mode=e.mode),e.rate&&(this.rate=e.rate),e.w&&(this.w=e.w),e.b&&(this.b=e.b),e.scale&&(this.scale=e.scale))}unit(t){let e=this.shape[t+1];return Array.isArray(e)?e[0]:e}af(t){let e=this.shape[t+1];return Array.isArray(e)?e[1]:void 0}afn(t,e,r){switch(r){case"Sigmoid":return 1/(1+Math.exp(-t));case"Relu":return t>=0?t:0;case"Tanh":return(Math.exp(t)-Math.exp(-t))/(Math.exp(t)+Math.exp(-t));case"Softmax":let i=Math.max(...e);return Math.exp(t-i)/e.reduce((n,s)=>n+Math.exp(s-i),0);default:return t}}afd(t,e){switch(e){case"Sigmoid":return t*(1-t);case"Relu":return t>=0?1:0;case"Tanh":return 1-((Math.exp(t)-Math.exp(-t))/(Math.exp(t)+Math.exp(-t)))**2;case"Softmax":default:return 1}}toJSON(){return JSON.stringify({mode:this.mode,shape:this.shape,rate:this.rate,scale:this.scale?this.scale.dataSync():void 0,w:this.w.map(t=>t.dataSync()),b:this.b.map(t=>t.dataSync())})}calcnet(t){let e=[];for(let r=0;r<this.hlayer;r++){let i=r===0?t:e[r-1],n=this.af(r),s=i.multiply(this.w[r].T).atomicOperation((a,h,o)=>a+this.b[r].get(0,o));e[r]=s.atomicOperation((a,h)=>this.afn(a,s.getRow(h),n))}return e}scaled(t){return this.scale?t.atomicOperation((e,r,i)=>{let n=this.scale,s=n.get(1,i),a=n.get(0,i);return s===0?0:(e-a)/s}):t}predict(t){this.checkInput(t),t=this.scaled(t);let e=this.calcnet(t);return e[e.length-1]}calcDerivativeMultiple(t,e,r){let i=r.shape[0],n=this.w.map(o=>o.zeroed()),s=this.b.map(o=>o.zeroed());for(let o=0;o<i;o++){let u=t.map(f=>new l([f.getRow(o)])),m=new l([e.getRow(o)]),c=new l([r.getRow(o)]),{dw:b,dy:d}=this.calcDerivative(u,m,c);n=n.map((f,w)=>f.addition(b[w])),s=s.map((f,w)=>f.addition(d[w]))}let a=n.map(o=>o.atomicOperation(u=>u/i));return{dy:s.map(o=>o.atomicOperation(u=>u/i)),dw:a}}calcDerivative(t,e,r){let i=[],n=[];for(let s=this.hlayer-1;s>=0;s--){let a=t[s-1]?t[s-1]:e,h=this.af(s);s===this.hlayer-1?n[s]=t[s].atomicOperation((o,u,m)=>(o-r.get(u,m))*this.afd(o,h)):n[s]=n[s+1].multiply(this.w[s+1]).atomicOperation((o,u,m)=>o*this.afd(t[s].get(u,m),h)),i[s]=n[s].T.multiply(a)}return{dy:n,dw:i}}update(t,e){this.w=this.w.map((r,i)=>r.subtraction(e[i].numberMultiply(this.rate))),this.b=this.b.map((r,i)=>r.subtraction(t[i].numberMultiply(this.rate)))}cost(t,e){let r=e.shape[0],n=t.subtraction(e).atomicOperation(s=>s**2/2).columnSum().getRow(0).map(s=>s/r);return n.reduce((s,a)=>s+a)/n.length}calcLoss(t,e){this.checkSample(t,e);let r=this.predict(t);return this.cost(r,e)}async bgd(t,e,r){for(let i=0;i<r.epochs;i++){let n=this.calcnet(t),{dy:s,dw:a}=this.calcDerivativeMultiple(n,t,e);this.update(s,a),r.onEpoch&&(r.onEpoch(i,this.cost(n[n.length-1],e)),r.async&&await new Promise(h=>setTimeout(h))),r.onTrainEnd&&i===r.epochs-1&&r.onTrainEnd(this.cost(n[n.length-1],e))}}async sgd(t,e,r){let i=e.shape[0];for(let n=0;n<r.epochs;n++){let s=null;for(let a=0;a<i;a++){let h=new l([t.getRow(a)]),o=new l([e.getRow(a)]),u=this.calcnet(h),{dy:m,dw:c}=this.calcDerivative(u,h,o);this.update(m,c),s=s?s.connect(u[u.length-1]):u[u.length-1]}r.onEpoch&&(r.onEpoch(n,this.cost(s,e)),r.async&&await new Promise(a=>setTimeout(a))),r.onTrainEnd&&n===r.epochs-1&&r.onTrainEnd(this.cost(s,e))}}async mbgd(t,e,r){let i=e.shape[0],n=i<10?i:10,s=r.batchSize?r.batchSize:n,a=Math.ceil(i/s);for(let h=0;h<r.epochs;h++){let{xs:o,ys:u}=Y(t,e),m=0;for(let c=0;c<a;c++){let b=c*s,d=b+s;d=d>i?i:d;let f=d-b,w=o.slice(b,d),y=u.slice(b,d),M=this.calcnet(w),S=M[M.length-1],{dy:E,dw:v}=this.calcDerivativeMultiple(M,w,y);this.update(E,v);let X=this.cost(S,y);m+=X,r.onBatch&&r.onBatch(c,f,X)}r.onEpoch&&(r.onEpoch(h,m/a),r.async&&await new Promise(c=>setTimeout(c))),r.onTrainEnd&&h===r.epochs-1&&r.onTrainEnd(m/a)}}checkInput(t){if(t.shape[1]!==this.unit(-1))throw new Error(`Input matrix column number error, input shape -> ${this.unit(-1)}.`)}checkSample(t,e){if(this.checkInput(t),t.shape[0]!==e.shape[0])throw new Error("The row number of input and output matrix is not uniform.");if(e.shape[1]!==this.unit(this.hlayer-1))throw new Error(`Output matrix column number error, output shape -> ${this.unit(this.hlayer-1)}.`)}fit(t,e,r){if(this.checkSample(t,e),r.batchSize&&r.batchSize>e.shape[0])throw new Error("The batch size cannot be greater than the number of samples.");let[i,n]=t.normalization();switch(this.scale=n,t=i,this.mode){case"bgd":return this.bgd(t,e,r);case"mbgd":return this.mbgd(t,e,r);case"sgd":default:return this.sgd(t,e,r)}}};function j(p,t){let e=10**t;return~~(p*e)/e}function Y(p,t){let e=p.dataSync(),r=t.dataSync();for(let i=1;i<t.shape[0];i++){let n=Math.floor(Math.random()*(i+1));[e[i],e[n]]=[e[n],e[i]],[r[i],r[n]]=[r[n],r[i]]}return{xs:new l(e),ys:new l(r)}}function D(p){let t=JSON.parse(p),e=t.w.map(n=>new l(n)),r=t.b.map(n=>new l(n)),i=t.scale?new l(t.scale):void 0;return new x(t.shape,{mode:t.mode,rate:t.mode,w:e,b:r,scale:i})}export{x as BPNet,T as Edge,l as Matrix,P as Path,g as Point,R as Polygon,D as loadBPNet,j as toFixed,Y as upset};
