(function(){
const S=SITE,$=s=>document.querySelector(s),e=S.esc,id=S.q('e')||'',st=S.get();
if(!st){location.replace('register.html'+(id?'?e='+encodeURIComponent(id):''));return}
const L='أبجد';
const fail=m=>{$('#app').innerHTML=`<div class="wrap"><div class="panel res"><h2>${m}</h2><div class="acts"><a class="btn pri" href="exams.html">العودة إلى الاختبارات</a></div></div></div>`};
if(!/^[\w-]+$/.test(id))return fail('الاختبار غير موجود');
Promise.all([fetch(S.BASE+'data/exams/'+id+'.json').then(r=>r.ok?r.json():null).catch(()=>null),S.ready]).then(([E])=>{
 if(!E||!Array.isArray(E.questions)||!E.questions.length)return fail('هذا الاختبار غير متاح حاليًا');run(E)});
const fc=(f,p)=>f?(f[p+'s']?`font-size:${f[p+'s']}px;`:'')+(f[p+'f']?`font-family:'${f[p+'f']}',Cairo,sans-serif;`:'')+(f[p+'a']?`text-align:${f[p+'a']};`:''):'';
const GF=['Tajawal','Almarai','Amiri','Noto Naskh Arabic','Noto Kufi Arabic'];
function loadFonts(Q){const u=new Set();Q.forEach(q=>q.fm&&['qf','of'].forEach(k=>{if(GF.includes(q.fm[k]))u.add(q.fm[k])}));if(u.size){const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?'+[...u].map(f=>'family='+f.replace(/ /g,'+')+':wght@400;700').join('&')+'&display=swap';document.head.appendChild(l)}}
function run(E){
 const C=S.cfg(),sec=Array.isArray(E.sections)&&E.sections.reduce((a,s)=>a+s.n,0)===E.questions.length?E.sections.flatMap(s=>Array(s.n).fill(s.title)):null;
 const items=E.questions.map((q,i)=>({q,i,l:q.skill||q.section||(sec&&sec[i])||E.skill||'المهارة'})),names=[];
 items.forEach(x=>{if(!names.includes(x.l))names.push(x.l)});
 items.sort((a,b)=>names.indexOf(a.l)-names.indexOf(b.l)||a.i-b.i);
 const Q=items.map(x=>x.q),SI=items.map(x=>names.indexOf(x.l)),N=Q.length,NS=names.length,SB=names.map((_,k)=>SI.indexOf(k));
 loadFonts(Q);document.title=E.title||'اختبار';
 const ans=Array(N).fill(null),flag=Array(N).fill(false),total=(E.minutes||30)*60;let cur=0,left=total,tm,done=false;
 const mmss=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
 const secRes=k=>{let c=0,t=0;Q.forEach((q,i)=>{if(SI[i]===k){t++;if(ans[i]===q.ans)c++}});return[c,t]};
 const img=(s,m)=>`<img class="qi" src="${S.BASE}${e(s)}" alt="" style="max-width:100%;${m?'max-height:'+m+'px;':''}height:auto">`;
 const opt=o=>typeof o==='object'?(o.t?`<span>${o.t}</span>`:'')+(o.img?`<div style="margin-top:6px">${img(o.img,180)}</div>`:''):/^img:/.test(o)?img(o.slice(4),180):o;
 function qbody(q){const t=`<div class="qar" style="font-size:1.1em;${fc(q.fm,'q')}">${q.q||''}</div>`;if(!q.img)return t;const p=q.ipos||'below',al={start:'flex-start',center:'center',end:'flex-end'}[q.ialign]||'center';
  if(p==='left'||p==='right'){const i=`<div style="flex:0 1 42%">${img(q.img)}</div>`,x=`<div style="flex:1 1 110px">${t}</div>`;return `<div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;direction:ltr">${p==='left'?i+x:x+i}</div>`}
  const i=`<div style="display:flex;justify-content:${al};margin:12px 0;direction:ltr">${img(q.img)}</div>`;return p==='above'?i+t:t+i}
 $('#app').innerHTML=`<div class="bar"><div class="brand"><img class="mini" src="${S.BASE}${e(C.logo||'logo.jpeg')}" alt=""><div class="bt"><b id="bt1"></b><small id="bt2"></small></div></div><div class="timer"><small>الوقت المتبقي</small><b id="tm"></b></div></div>
<div class="exam" id="ex"><main><div class="head"><span class="cnt">السؤال <b id="n"></b> من ${N}</span><button class="flag" id="fl">علّم للمراجعة</button></div><div class="panel" id="q"></div><div class="nav"><button class="btn pri" id="nx">التالي</button><button class="btn" id="pv">السابق</button></div></main>
<aside class="panel side"><div class="t"><h2>الأسئلة</h2><div class="lg"><span><i style="background:var(--ind)"></i>مُجاب</span><span><i style="border:2px solid var(--amber)"></i>معلّم</span><span><i style="border:2px solid var(--line)"></i>غير مُجاب</span></div></div><div class="grid" id="gr"></div><button class="sub-btn" id="sb">تسليم الاختبار</button></aside></div><footer>${e(C.footer||'')}</footer>`;
 function draw(){const q=Q[cur],k=SI[cur];$('#n').textContent=cur+1;$('#fl').classList.toggle('on',flag[cur]);
  $('#bt1').textContent=names[k];$('#bt2').textContent=(E.title||'')+(NS>1?` · المهارة ${k+1} من ${NS}`:'');
  $('#q').innerHTML=`${qbody(q)}<div class="opts">${q.opts.map((o,i)=>`<button class="opt ${ans[cur]===i?'sel':''}" data-i="${i}"><i>${L[i]}</i><span style="${fc(q.fm,'o')}">${opt(o)}</span></button>`).join('')}</div>`;
  $('#pv').disabled=cur===0;$('#nx').disabled=cur===N-1;$('#nx').textContent=cur<N-1&&SI[cur+1]!==k?'المهارة التالية':'التالي';
  $('#gr').innerHTML=Q.map((_,i)=>(NS>1&&SB.includes(i)?`<div style="grid-column:1/-1;font-weight:700;font-size:.85em;margin-top:6px">${e(names[SI[i]])}</div>`:'')+`<button class="g ${flag[i]?'f':ans[i]!==null?'a':''} ${i===cur?'cur':''}" data-g="${i}">${i+1}</button>`).join('')}
 $('#q').onclick=ev=>{const b=ev.target.closest('.opt');if(!b||done)return;const i=+b.dataset.i;ans[cur]=ans[cur]===i?null:i;draw()};
 $('#gr').onclick=ev=>{const b=ev.target.closest('.g');if(b){cur=+b.dataset.g;draw()}};
 $('#nx').onclick=()=>{cur++;draw()};$('#pv').onclick=()=>{cur--;draw()};$('#fl').onclick=()=>{flag[cur]=!flag[cur];draw()};
 $('#sb').onclick=()=>{const un=ans.filter(a=>a===null).length;if(confirm(un?`لديك ${un} سؤالًا بلا إجابة. هل تريد التسليم؟`:'هل تريد تسليم الاختبار؟'))finish()};
 function finish(){if(done)return;done=true;clearInterval(tm);let s=0;Q.forEach((q,i)=>{if(ans[i]===q.ans)s++});
  const secs=names.map((n,k)=>n+': '+secRes(k).join('/')).join(' | ');
  S.send({type:'result',name:st.name,phone:st.phone,grade:st.grade,gradeLabel:st.gradeLabel,examId:id,title:E.title,branch:E.branch||'',skill:names.join(' + '),score:s,total:N,secs,minutes:Math.round((total-left)/60*10)/10});
  const pc=(a,b)=>b?Math.round(a/b*100)+'%':'—';
  const table=NS>1?`<table class="st"><tr><th>المهارة</th><th>الدرجة</th><th>النسبة</th></tr>${names.map((n,k)=>{const[c,t]=secRes(k);return `<tr><td>${e(n)}</td><td><b>${c} / ${t}</b></td><td>${pc(c,t)}</td></tr>`}).join('')}</table>`:'';
  const rv=Q.map((q,i)=>(NS>1&&SB.includes(i)?`<h3 style="margin:14px 0 6px">${e(names[SI[i]])}</h3>`:'')+`<div class="${ans[i]===q.ans?'y':'n'}"><b>${i+1}.</b> ${qbody(q)}<p>إجابتك: ${ans[i]===null?'—':L[ans[i]]} — الصحيحة: ${L[q.ans]} ${opt(q.opts[q.ans])}</p>${q.sol||q.solimg?`<p><b>شرح الحل:</b> ${q.sol||''}</p>${q.solimg?img(q.solimg,260):''}`:''}</div>`).join('');
  $('#ex').outerHTML=`<div class="wrap"><div class="panel res"><h2>نتيجتك يا ${e(st.name)}</h2><div class="score">${s} / ${N}</div><p>${pc(s,N)}</p>${table}<div class="acts"><a class="btn pri" href="exams.html">العودة إلى الاختبارات</a><a class="btn" href="register.html">تعديل البيانات</a><a class="btn" href="exam.html?e=${encodeURIComponent(id)}">إعادة الاختبار</a></div><div class="rv">${rv}</div></div></div>`;scrollTo(0,0)}
 function tick(){$('#tm').textContent=mmss(left);if(left--<=0)finish()}
 tick();tm=setInterval(tick,1000);draw();
}
})();
