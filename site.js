(function(){
const BASE=document.currentScript.src.replace(/[^\/]*$/,''),K='student_v2';
const G=[['10','الصف الأول الثانوي'],['11','الصف الثاني الثانوي'],['12','الصف الثالث الثانوي']];
const F={register:['name','phone','grade','gradeLabel'],results:['name','phone','grade','gradeLabel','examId','title','branch','skill','score','total','secs','minutes']};
let C={};const ready=fetch(BASE+'site.config.json').then(r=>r.json()).then(c=>{C=c}).catch(function(){});
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sha=async t=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t)))].map(b=>b.toString(16).padStart(2,'0')).join('');
window.SITE={BASE,G,ready,esc,cfg:()=>C,BR:{quant:'كمي',verbal:'لفظي'},
 hash(p){return sha((C.salt||'')+String(p).trim())},
 async guard(){await ready;const H=C.accessHashes||[];if(!H.length){document.body.style.visibility='visible';return true}
  let a=null;try{a=localStorage.getItem('auth_v1')}catch(e){}
  if(a&&H.includes(a)){document.body.style.visibility='visible';return true}
  location.replace('login.html?next='+encodeURIComponent(location.pathname.split('/').pop()+location.search));return false},
 login(h){try{localStorage.setItem('auth_v1',h)}catch(e){}},
 logout(){try{localStorage.removeItem('auth_v1')}catch(e){}location.href='index.html'},
 get(){try{return JSON.parse(localStorage.getItem(K))}catch(e){return null}},
 set(s){try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}},
 q:k=>new URLSearchParams(location.search).get(k),
 send(p){const f=p.type==='result'?'results':'register',b=new URLSearchParams({'form-name':f});F[f].forEach(k=>b.append(k,p[k]==null?'':p[k]));
  return ready.then(function(){if(!C.sheetUrl)return;return fetch(C.sheetUrl,{method:'POST',mode:'no-cors',keepalive:true,body:b}).catch(function(){})})},
 shell(page){return ready.then(function(){const t=document.getElementById('top'),f=document.getElementById('foot');
  if(t)t.innerHTML='<div class="top"><a class="tbrand" href="index.html"><img src="'+BASE+esc(C.logo||'logo.jpeg')+'" alt=""><b>'+esc(C.name||'')+'</b></a><nav><a href="index.html"'+(page==='home'?' class="on"':'')+'>الرئيسية</a><a href="exams.html"'+(page==='exams'?' class="on"':'')+'>الاختبارات</a>'+((C.accessHashes||[]).length&&localStorage.getItem('auth_v1')?'<a href="#" id="lo">خروج</a>':'')+'</nav></div>';
  var lo=document.getElementById('lo');if(lo)lo.onclick=function(ev){ev.preventDefault();SITE.logout()};if(f)f.textContent=C.footer||'';if(C.name)document.title=C.name+' — '+document.title})}};
})();
