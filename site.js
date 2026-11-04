(function(){
const BASE=document.currentScript.src.replace(/[^\/]*$/,''),K='student_v2';
const G=[['10','الصف الأول الثانوي'],['11','الصف الثاني الثانوي'],['12','الصف الثالث الثانوي']];
const F={register:['name','phone','grade','gradeLabel'],results:['name','phone','grade','gradeLabel','examId','title','branch','skill','score','total','secs','minutes']};
let C={};const ready=fetch(BASE+'site.config.json').then(r=>r.json()).then(c=>{C=c}).catch(function(){});
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
window.SITE={BASE,G,ready,esc,cfg:()=>C,BR:{quant:'كمي',verbal:'لفظي'},
 get(){try{return JSON.parse(localStorage.getItem(K))}catch(e){return null}},
 set(s){try{localStorage.setItem(K,JSON.stringify(s))}catch(e){}},
 q:k=>new URLSearchParams(location.search).get(k),
 send(p){const f=p.type==='result'?'results':'register',b=new URLSearchParams({'form-name':f});F[f].forEach(k=>b.append(k,p[k]==null?'':p[k]));
  return ready.then(function(){if(!C.sheetUrl)return;return fetch(C.sheetUrl,{method:'POST',mode:'no-cors',keepalive:true,body:b}).catch(function(){})})},
 shell(page){return ready.then(function(){const t=document.getElementById('top'),f=document.getElementById('foot');
  if(t)t.innerHTML='<div class="top"><a class="tbrand" href="index.html"><img src="'+BASE+esc(C.logo||'logo.jpeg')+'" alt=""><b>'+esc(C.name||'')+'</b></a><nav><a href="index.html"'+(page==='home'?' class="on"':'')+'>الرئيسية</a><a href="exams.html"'+(page==='exams'?' class="on"':'')+'>الاختبارات</a></nav></div>';
  if(f)f.textContent=C.footer||'';if(C.name)document.title=C.name+' — '+document.title})}};
})();
