
(function(){
  var coarse = window.matchMedia('(pointer:coarse)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* nav solid on scroll */
  var nav = document.getElementById('nav');
  function onScroll(){
    if(window.scrollY > window.innerHeight*0.7 - 60){ nav.classList.add('is-solid'); }
    else { nav.classList.remove('is-solid'); }
  }
  addEventListener('scroll', onScroll, {passive:true}); onScroll();

  /* reveal on scroll */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* hero bg parallax + custom cursor */
  var bg = document.querySelector('.hero__bg');
  var cursorEl = document.getElementById('cursor');
  var mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my,px=0,py=0,tx=0,ty=0;
  if(!coarse){
    addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; }, {passive:true});
    document.querySelectorAll('[data-cursor]').forEach(function(el){
      el.addEventListener('mouseenter', function(){ cursorEl.classList.add('is-hovering'); });
      el.addEventListener('mouseleave', function(){ cursorEl.classList.remove('is-hovering'); });
    });
  }
  function loop(){
    if(bg && !reduce){
      tx = -(mx/innerWidth - .5)*24; ty = -(my/innerHeight - .5)*16;
      px += (tx-px)*.08; py += (ty-py)*.08;
      bg.style.transform = 'translate('+px.toFixed(2)+'px,'+py.toFixed(2)+'px)';
    }
    if(!coarse){
      cx += (mx-cx)*.18; cy += (my-cy)*.18;
      cursorEl.style.transform = 'translate('+cx.toFixed(2)+'px,'+cy.toFixed(2)+'px)';
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();


(function(){
  var coarse=window.matchMedia('(pointer:coarse)').matches;
  var cursorEl=document.getElementById('cursor');
  function attachCursor(el){ if(coarse||!cursorEl) return;
    el.addEventListener('mouseenter',function(){cursorEl.classList.add('is-hovering');});
    el.addEventListener('mouseleave',function(){cursorEl.classList.remove('is-hovering');}); }

  var CHECK='<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ARR=' <span class="arr">\u2192</span>';

  var JALUR={
    energi:{name:'Energi Terbarukan',desc:'Merancang dan mengoperasikan sistem surya, angin, dan panas bumi \u2014 dari studi kelayakan hingga operasi lapangan.',skills:['Sistem PV','Manajemen proyek','K3 lapangan','Analisis energi']},
    pertanian:{name:'Pertanian Regeneratif',desc:'Memulihkan tanah dan pangan melalui agroekologi, rantai pasok, dan pendampingan petani.',skills:['Agroekologi','Pendampingan','Rantai pasok','Tanah & kompos']},
    sirkular:{name:'Ekonomi Sirkular',desc:'Mengubah limbah menjadi nilai lewat desain produk, daur ulang, dan model bisnis baru.',skills:['Desain produk','Material','Model bisnis','Daur ulang']},
    konservasi:{name:'Konservasi & Ekowisata',desc:'Menjaga alam sambil menghidupinya \u2014 restorasi, edukasi, dan wisata berbasis komunitas.',skills:['Restorasi','Edukasi','Ekowisata','Komunitas']},
    pendanaan:{name:'Pendanaan Hijau',desc:'Mengalirkan modal ke dampak melalui investasi berkelanjutan, ESG, dan kebijakan iklim.',skills:['Analisis ESG','Keuangan','Kebijakan','Riset dampak']},
    teknologi:{name:'Teknologi Iklim',desc:'Membangun solusi berbasis data untuk memantau emisi dan memangkas jejak karbon.',skills:['Data & analitik','Perangkat lunak','Sensor & IoT','MRV emisi']}
  };

  var Q=[
    {q:'Hal yang paling memantik rasa ingin tahu?',opts:[
      {t:'Sistem energi dan teknologi',w:{energi:2,teknologi:1}},
      {t:'Alam, tanah, dan pangan',w:{pertanian:2,konservasi:1}},
      {t:'Angka, dampak, dan kebijakan',w:{pendanaan:2,teknologi:1}},
      {t:'Desain dan inovasi produk',w:{sirkular:2,energi:1}} ]},
    {q:'Cara berkontribusi yang paling terasa pas?',opts:[
      {t:'Turun langsung ke lapangan',w:{energi:2,konservasi:1}},
      {t:'Menganalisis data dan pola',w:{teknologi:2,pendanaan:1}},
      {t:'Mendampingi orang dan komunitas',w:{pertanian:2,konservasi:1}},
      {t:'Merancang solusi baru',w:{sirkular:2,teknologi:1}} ]},
    {q:'Keterampilan yang ingin diperdalam?',opts:[
      {t:'Teknis dan rekayasa',w:{energi:2,teknologi:1}},
      {t:'Riset dan keuangan',w:{pendanaan:2,sirkular:1}},
      {t:'Komunikasi dan fasilitasi',w:{konservasi:2,pertanian:1}},
      {t:'Kreativitas dan desain',w:{sirkular:2,energi:1}} ]},
    {q:'Dampak yang paling ingin diwujudkan?',opts:[
      {t:'Energi bersih yang meluas',w:{energi:2,teknologi:1}},
      {t:'Tanah dan pangan yang pulih',w:{pertanian:2,konservasi:1}},
      {t:'Limbah yang berubah jadi nilai',w:{sirkular:2,pendanaan:1}},
      {t:'Alam dan habitat yang terjaga',w:{konservasi:2,pertanian:1}} ]}
  ];

  var qi=0, answers=[];
  var qBar=document.getElementById('qBar'),qStep=document.getElementById('qStep'),qPct=document.getElementById('qPct'),
      qQ=document.getElementById('qQ'),qOpts=document.getElementById('qOpts'),qBack=document.getElementById('qBack'),qNext=document.getElementById('qNext');

  function renderQ(){
    var q=Q[qi];
    qStep.textContent='Pertanyaan '+(qi+1)+' / '+Q.length;
    qQ.textContent=q.q;
    qOpts.innerHTML='';
    q.opts.forEach(function(o,idx){
      var b=document.createElement('button');
      b.type='button'; b.className='quiz__opt'+(answers[qi]===idx?' is-sel':''); b.setAttribute('data-cursor','');
      b.innerHTML='<span class="quiz__tick">'+CHECK+'</span><span>'+o.t+'</span>';
      b.addEventListener('click',function(){ answers[qi]=idx; renderQ(); });
      attachCursor(b);
      qOpts.appendChild(b);
    });
    qBack.disabled=qi===0;
    qNext.disabled=answers[qi]==null;
    qNext.innerHTML=(qi===Q.length-1?'Lihat hasil':'Lanjut')+ARR;
    var answered=answers.filter(function(a){return a!=null;}).length;
    qBar.style.width=(answered/Q.length*100)+'%';
    qPct.textContent=Math.round(answered/Q.length*100)+'% selesai';
  }
  qNext.addEventListener('click',function(){ if(answers[qi]==null)return; if(qi<Q.length-1){qi++;renderQ();}else{finish();} });
  qBack.addEventListener('click',function(){ if(qi>0){qi--;renderQ();} });
  if(qQ) renderQ();

  var ringEl=document.querySelector('.ring');
  var rNum=document.getElementById('rNum'),rName=document.getElementById('rName'),rDesc=document.getElementById('rDesc'),rSkills=document.getElementById('rSkills');
  var a1Name=document.getElementById('a1Name'),a1Pct=document.getElementById('a1Pct'),a1Bar=document.getElementById('a1Bar');
  var a2Name=document.getElementById('a2Name'),a2Pct=document.getElementById('a2Pct'),a2Bar=document.getElementById('a2Bar');
  function skillsHTML(k){ return JALUR[k].skills.map(function(s){return '<span class="skill">'+s+'</span>';}).join(''); }
  if(rSkills) rSkills.innerHTML=skillsHTML('energi');

  function applyResult(order){
    var top=order[0];
    rNum.textContent=top.pct+'%';
    rName.textContent=JALUR[top.k].name;
    rDesc.textContent=JALUR[top.k].desc;
    rSkills.innerHTML=skillsHTML(top.k);
    ringEl.dataset.ring=top.pct; ringEl.style.setProperty('--p',top.pct);
    a1Name.textContent=JALUR[order[1].k].name; a1Pct.textContent=order[1].pct+'%'; a1Bar.dataset.fill=order[1].pct; a1Bar.style.width=order[1].pct+'%';
    a2Name.textContent=JALUR[order[2].k].name; a2Pct.textContent=order[2].pct+'%'; a2Bar.dataset.fill=order[2].pct; a2Bar.style.width=order[2].pct+'%';
  }
  function finish(){
    var score={energi:0,pertanian:0,sirkular:0,konservasi:0,pendanaan:0,teknologi:0};
    answers.forEach(function(ai,qx){ var w=Q[qx].opts[ai].w; for(var k in w){ score[k]+=w[k]; } });
    var order=Object.keys(score).map(function(k){return {k:k,v:score[k]};}).sort(function(a,b){return b.v-a.v;});
    var topv=order[0].v||1;
    order.forEach(function(o){ o.pct=Math.max(45,Math.min(97,Math.round(58+38*(o.v/topv)))); });
    applyResult(order);
    setFilter(order[0].k);
    applyGami(order);
    showGated();
    var el=document.getElementById('hasil');
    window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-80,behavior:'smooth'});
  }

  // ulangi kuis → reset & sembunyikan hasil lagi
  var retake=document.getElementById('retake');
  if(retake) retake.addEventListener('click',function(){
    answers=[]; qi=0; renderQ(); hideGated();
    var qz=document.getElementById('quiz');
    if(qz) window.scrollTo({top:qz.getBoundingClientRect().top+window.scrollY-80,behavior:'smooth'});
  });

  // jobs filter
  var chips=[].slice.call(document.querySelectorAll('.chip'));
  var jobs=[].slice.call(document.querySelectorAll('.job'));
  var empty=document.getElementById('jobsEmpty');

  // --- gating: hasil/jobs/kontribusi tampil hanya setelah kuis selesai ---
  var gatedSecs=['hasil','jobs','kontribusi'].map(function(id){return document.getElementById(id);});
  function showGated(){ gatedSecs.forEach(function(s){ if(!s)return; s.classList.remove('gated');
    s.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('is-visible'); });
    s.querySelectorAll('[data-ring]').forEach(function(el){ el.style.setProperty('--p', el.dataset.ring); });
    s.querySelectorAll('[data-fill]').forEach(function(el){ el.style.width=el.dataset.fill+'%'; });
  }); }
  function hideGated(){ gatedSecs.forEach(function(s){ if(s){ s.classList.add('gated');
    s.querySelectorAll('[data-fill]').forEach(function(el){ el.style.width='0%'; }); } }); }
  hideGated();

  // --- gamifikasi: titik mulai yang menyesuaikan hasil kuis ---
  var LEVELS=[
    {name:'Pemula',xp:0,next:'Apprentice',nextAt:250},
    {name:'Apprentice',xp:250,next:'Practitioner',nextAt:750},
    {name:'Practitioner',xp:750,next:'Expert',nextAt:2000}
  ];
  function fmt(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,'.'); }
  function applyGami(order){
    var sec=document.getElementById('kontribusi'); if(!sec) return;
    var seed=answers.reduce(function(a,x){return a+(x||0);},0)+order[0].pct;
    var li=seed%3, lv=LEVELS[li], prog=(seed*37)%100;
    var xp=lv.xp+Math.round((lv.nextAt-lv.xp)*prog/100);
    var remain=lv.nextAt-xp, pctNext=Math.round((xp-lv.xp)/(lv.nextAt-lv.xp)*100);
    var pathName=JALUR[order[0].k].name;
    sec.querySelector('.status-card__eyebrow').textContent='Titik mulai \u00b7 '+pathName;
    sec.querySelector('.status-card__lvl').textContent=lv.name;
    sec.querySelector('.status-card__xp').innerHTML='<b>'+fmt(xp)+' XP</b> \u00b7 '+fmt(remain)+' XP menuju '+lv.next;
    sec.querySelector('.status-card__next').textContent=pctNext+'% perjalanan menuju level berikutnya.';
    sec.querySelector('.xpbar i').dataset.fill=pctNext;
    sec.querySelectorAll('.rung').forEach(function(r,idx){ r.classList.remove('done','current','todo');
      r.classList.add(idx<li?'done':(idx===li?'current':'todo')); });
    sec.querySelector('.ladder__fill').dataset.fill=Math.round((li/3 + (prog/100)/3)*75);
  }

  function setFilter(key){
    chips.forEach(function(c){ c.classList.toggle('is-on',c.dataset.filter===key); });
    var any=false;
    jobs.forEach(function(j){ var show=key==='all'||j.dataset.jalur===key; j.classList.toggle('is-hidden',!show); if(show)any=true; });
    if(empty) empty.style.display=any?'none':'block';
  }
  chips.forEach(function(c){ c.addEventListener('click',function(){ setFilter(c.dataset.filter); }); });

  // fill-on-view (rings + bars)
  var fio=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ var el=e.target;
    if(el.dataset.ring!=null){ el.style.setProperty('--p',el.dataset.ring); }
    else if(el.dataset.fill!=null){ el.style.width=el.dataset.fill+'%'; }
    fio.unobserve(el); } }); },{threshold:.35});
  document.querySelectorAll('[data-ring],[data-fill]').forEach(function(el){ fio.observe(el); });
})();

;(function(){
  var burger=document.querySelector('.nav__burger');
  var links=document.querySelector('.nav__links');
  if(burger&&links){
    if(!links.id) links.id='nav-links';
    burger.setAttribute('aria-controls',links.id);
    burger.setAttribute('aria-expanded','false');
    burger.addEventListener('click',function(){ var open=links.classList.toggle('is-open'); burger.setAttribute('aria-expanded',open?'true':'false'); });
    links.querySelectorAll('a').forEach(function(a){ a.addEventListener('click',function(){ links.classList.remove('is-open'); burger.setAttribute('aria-expanded','false'); }); });
  }
})();
