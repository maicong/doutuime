parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"OUiy":[function(require,module,exports) {
module.exports={musicCDN:"",musicList:["Auvic - Starships (Original Mix).mp3","Rudebrat - Whiskey Dream VIP (Original Mix).mp3","Tobu - Catch It.mp3"]};
},{}],"epB2":[function(require,module,exports) {
"use strict";var _config=require("../config.json");!function(){var t,i,n,e,a,o,s,d,r,l,c,h,u,y=1024,f=[],x=[],g=[],m="#000011",v="#060D1F",p="#02243F",w="#465677",b="#B5BFD4",C="#F451BA",D=.05,M="rgba(29, 36, 57, 0.05)",S="rgba(0,0,0,0)",L="rgba(157, 242, 157, 0.11)",q="rgba(157, 242, 157, 0.8)",T=.001,_="rgba(29, 36, 57, 0.1)",k="rgba(29, 36, 57, 0.05)",E="rgba(77, 218, 248, 1)",P="rgba(77, 218, 248, 1)",A=Math.sin,B=Math.cos,z=Math.random,F=window.AudioContext||window.webkitAudioContext,G=document.querySelector("#loading .msg"),N=1500,R=140,W=y/2,H=64,I=100,O=!0,U=!0,j=!0,X=Math.PI,Z=2*X,J=X/180,K=0,Q=0,V=0,Y=0,$=0,tt=!1,it=!1,nt=!1;function et(t){return document.getElementById(t)}function at(){if(!F)return ot(),et("no-audio").style.display="block";e||(e=document.createElement("canvas").getContext("2d"),document.body.appendChild(e.canvas)),a=new F,ut(),function(){if(tt)return;if(u=Math.floor(Math.random()*_config.musicList.length),!_config.musicList[u])return void(G.textContent="- Failed to load -");tt=!0;var n=new window.XMLHttpRequest,e="".concat(_config.musicCDN?_config.musicCDN:"music/").concat(_config.musicList[u]);n.open("GET",e,!0),n.responseType="arraybuffer",n.onprogress=function(t){t.lengthComputable&&(et("control").classList.remove("active"),et("loading").classList.remove("hide"),G.textContent="- ".concat(Math.round(t.loaded/t.total*100)," % -"))},n.onload=function(n){et("control").classList.add("active"),et("loading").classList.add("hide"),tt=!1,(d=a.createAnalyser()).fftSize=y,d.minDecibels=-100,d.maxDecibels=-30,d.smoothingTimeConstant=.8,a.decodeAudioData(this.response,function(n){var e;G.textContent="- Ready -",h=n,(s=a.createGain()).connect(d),d.connect(a.destination),l=d.frequencyBinCount,r=new Uint8Array(l),c=new Uint8Array(l),function(){var t=-1;for(;++t<N;)f.push(new lt);t=null}(),function(){var t;t=-1;for(;++t<W;)x.push(new ct({index:t+1}));t=-1;for(;++t<H;)g.push(new ht({index:t+1}));t=null}(),(e=et("control")).addEventListener("click",function(n){n.preventDefault(),nt?(nt=!1,it=!0,i=Date.now()-t,o.stop()):st()}),e.classList.add("active"),it=!1,st(),ot()},function(t){window.alert(t)})},n.send()}()}function ot(){return et("loading").className="hide"}function st(){nt=!0,t=i?Date.now()-i:Date.now(),o=null,(o=a.createBufferSource()).buffer=h,o.loop=!1,o.onended=function(){it||(nt=!1,it=!0,i=null,o.stop(),dt(),at())},o.connect(s),i?o.start(0,i/1e3):o.start(),_config.musicList[u]&&(document.title="\u6296\u817f\u4e48: ".concat(_config.musicList[u].replace(".mp3",""))),rt()}function dt(){var t=e.createLinearGradient(0,0,0,Q);t.addColorStop(0,m),t.addColorStop(.96,v),t.addColorStop(1,p),e.beginPath(),e.globalCompositeOperation="source-over",e.fillStyle=t,e.fillRect(0,0,K,Q),e.fill(),e.closePath(),t=null}function rt(){var t,i;nt&&(window.requestAnimationFrame(rt),d.getByteFrequencyData(r),d.getByteTimeDomainData(c),t=[].slice.call(r),i=0,t.forEach(function(t){i+=t}),n=i/t.length*s.gain.value,dt(),O&&function(){var t,i,a,o;for(t=0,i=f.length;t<i;t++)a=f[t],o=n>I?n/20:n/50,a.x+=a.dx*o,a.y+=a.dy*o,a.z+=a.dz,a.dx+=a.ddx,a.dy+=a.ddy,a.radius=.2+.1*(a.max_depth-a.z),a.x<-V||a.x>V||a.y<-Y||a.y>Y?f[t]=new lt:(e.beginPath(),e.globalCompositeOperation="lighter",e.fillStyle=a.color,e.arc(a.x+V,a.y+Y,a.radius,Z,!1),e.fill(),e.closePath());t=i=a=o=null}(),j&&function(){var t,i,a,o,s,d;n>I?($+=-T,o=n+10*z(),e.strokeStyle=P,e.fillStyle=k):($+=T,o=n,e.strokeStyle=E,e.fillStyle=_);var r=(o||100)-100;for(et("control").style.transform="translateZ(0) scale(".concat(o/100*1.5,")"),et("control").style.filter="drop-shadow(0 0 ".concat((r<0?0:r)+5,"px #fff)"),e.beginPath(),e.lineWidth=1,e.lineCap="round",e.save(),e.translate(V,Y),e.rotate($),e.translate(-V,-Y),e.moveTo(g[0].dx,g[0].dy),t=0,i=H;t<i-1;t++)(a=g[t]).dx=a.x+o*A(J*a.angle),a.dy=a.y+o*B(J*a.angle),s=(a.dx+g[t+1].dx)/2,d=(a.dy+g[t+1].dy)/2,e.quadraticCurveTo(a.dx,a.dy,s,d);(a=g[t]).dx=a.x+o*A(J*a.angle),a.dy=a.y+o*B(J*a.angle),s=(a.dx+g[0].dx)/2,d=(a.dy+g[0].dy)/2,e.quadraticCurveTo(a.dx,a.dy,s,d),e.quadraticCurveTo(s,d,g[0].dx,g[0].dy),e.stroke(),e.fill(),e.restore(),e.closePath(),t=i=a=o=s=d=null}(),U&&function(){var t,i,a,o,s,d;for(n>I?($+=D,e.strokeStyle=q,e.fillStyle=S):($+=-D,e.strokeStyle=L,e.fillStyle=M),e.beginPath(),e.lineWidth=1,e.lineCap="round",e.save(),e.translate(V,Y),e.rotate($),e.translate(-V,-Y),e.moveTo(x[0].dx,x[0].dy),t=0,i=W;t<i-1;t++)a=x[t],o=c[t],a.dx=a.x+o*A(J*a.angle),a.dy=a.y+o*B(J*a.angle),s=(a.dx+x[t+1].dx)/2,d=(a.dy+x[t+1].dy)/2,e.quadraticCurveTo(a.dx,a.dy,s,d);o=c[t],(a=x[t]).dx=a.x+o*A(J*a.angle),a.dy=a.y+o*B(J*a.angle),s=(a.dx+x[0].dx)/2,d=(a.dy+x[0].dy)/2,e.quadraticCurveTo(a.dx,a.dy,s,d),e.quadraticCurveTo(s,d,x[0].dx,x[0].dy),e.stroke(),e.fill(),e.restore(),e.closePath(),t=i=a=o=s=d=null}())}function lt(){var t,i;this.x=Math.random()*K-V,this.y=Math.random()*Q-Y,this.z=this.max_depth=Math.max(K/Q),this.radius=.2,t=this.x>0?1:-1,i=this.y>0?1:-1,Math.abs(this.x)>Math.abs(this.y)?(this.dx=1,this.dy=Math.abs(this.y/this.x)):(this.dx=Math.abs(this.x/this.y),this.dy=1),this.dx*=t,this.dy*=i,this.dz=-.1,this.ddx=.001*this.dx,this.ddy=.001*this.dy,this.y>Y/2?this.color=b:this.color=n>I+10?b:n>R?C:w,t=i=null}function ct(t){this.index=t.index,this.angle=360*this.index/W,this.updateDynamics=function(){this.radius=Math.abs(K,Q)/10,this.x=V+this.radius*A(J*this.angle),this.y=Y+this.radius*B(J*this.angle)},this.updateDynamics(),this.value=256*Math.random(),this.dx=this.x+this.value*A(J*this.angle),this.dy=this.y+this.value*B(J*this.angle)}function ht(t){this.index=t.index,this.angle=360*this.index/H,this.updateDynamics=function(){this.radius=Math.abs(K,Q)/10,this.x=V+this.radius*A(J*this.angle),this.y=Y+this.radius*B(J*this.angle)},this.updateDynamics(),this.value=256*Math.random(),this.dx=this.x+this.value*A(J*this.angle),this.dy=this.y+this.value*B(J*this.angle)}function ut(){K=window.innerWidth,Q=window.innerHeight,V=K/2,Y=Q/2,e.canvas.width=K,e.canvas.height=Q,x.forEach(function(t){t.updateDynamics()}),g.forEach(function(t){t.updateDynamics()})}window.addEventListener("load",at,!1),window.addEventListener("resize",ut,!1)}();
},{"../config.json":"OUiy"}]},{},["epB2"], null)