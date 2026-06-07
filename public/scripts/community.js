
(function(){
  var coarse=window.matchMedia('(pointer:coarse)').matches;
  var cursorEl=document.getElementById('cursor');
  function attachCursor(el){ if(coarse||!cursorEl) return;
    el.addEventListener('mouseenter',function(){cursorEl.classList.add('is-hovering');});
    el.addEventListener('mouseleave',function(){cursorEl.classList.remove('is-hovering');}); }

  /* reveal */
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); },{threshold:0.1,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* cursor */
  var mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
  if(!coarse){
    addEventListener('mousemove',function(e){ mx=e.clientX; my=e.clientY; },{passive:true});
    document.querySelectorAll('[data-cursor]').forEach(attachCursor);
    (function loop(){ cx+=(mx-cx)*.18; cy+=(my-cy)*.18; cursorEl.style.transform='translate('+cx.toFixed(2)+'px,'+cy.toFixed(2)+'px)'; requestAnimationFrame(loop); })();
  }

  /* RSVP */
  document.querySelectorAll('.rsvp').forEach(function(btn){
    var count=btn.closest('.event__foot').querySelector('.event__count');
    var base=parseInt(count.dataset.base,10);
    btn.addEventListener('click',function(){
      var going=btn.classList.toggle('is-going');
      btn.textContent=going?'Hadir \u2713':'RSVP';
      count.textContent=(base+(going?1:0))+' hadir';
    });
  });

  /* Mentor filter (4 selects, AND) */
  var selects=[].slice.call(document.querySelectorAll('#mfilter select'));
  var mentors=[].slice.call(document.querySelectorAll('#mentorGrid .mentor'));
  var mCount=document.getElementById('mentorCount'), mEmpty=document.getElementById('mentorEmpty');
  function applyMentor(){
    var f={}; selects.forEach(function(s){ f[s.dataset.key]=s.value; });
    var n=0;
    mentors.forEach(function(m){
      var show=Object.keys(f).every(function(k){ return f[k]==='all'||m.dataset[k]===f[k]; });
      m.classList.toggle('is-hidden',!show); if(show)n++;
    });
    mCount.textContent='Menampilkan '+n+' mentor';
    mEmpty.style.display=n?'none':'block';
  }
  selects.forEach(function(s){ s.addEventListener('change',applyMentor); });

  /* EcoPulse markers */
  var markers=[].slice.call(document.querySelectorAll('.marker'));
  var mapName=document.getElementById('mapName'), mapInfo=document.getElementById('mapInfo');
  markers.forEach(function(mk){
    mk.addEventListener('click',function(){
      markers.forEach(function(x){ x.classList.remove('is-active'); });
      mk.classList.add('is-active');
      mapName.textContent=mk.dataset.name;
      mapInfo.textContent=mk.dataset.info;
    });
  });

  /* Action tabs */
  var tabBtns=[].slice.call(document.querySelectorAll('#actionTabs button'));
  tabBtns.forEach(function(b){
    b.addEventListener('click',function(){
      tabBtns.forEach(function(x){ x.classList.toggle('is-on',x===b); });
      document.getElementById('pane-lapor').classList.toggle('is-hidden',b.dataset.tab!=='lapor');
      document.getElementById('pane-catat').classList.toggle('is-hidden',b.dataset.tab!=='catat');
    });
  });

  /* Action forms */
  document.querySelectorAll('[data-form]').forEach(function(form){
    form.addEventListener('submit',function(e){ e.preventDefault();
      var key=form.dataset.form;
      form.style.display='none';
      var ok=document.querySelector('[data-success="'+key+'"]'); if(ok) ok.style.display='block';
    });
  });
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
