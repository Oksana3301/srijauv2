
(function(){
  var coarse=window.matchMedia('(pointer:coarse)').matches;
  var cursorEl=document.getElementById('cursor');

  /* reveal on scroll */
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  },{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  /* custom cursor */
  var mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
  if(!coarse){
    addEventListener('mousemove',function(e){ mx=e.clientX; my=e.clientY; },{passive:true});
    document.querySelectorAll('[data-cursor]').forEach(function(el){
      el.addEventListener('mouseenter',function(){ cursorEl.classList.add('is-hovering'); });
      el.addEventListener('mouseleave',function(){ cursorEl.classList.remove('is-hovering'); });
    });
    (function loop(){ cx+=(mx-cx)*.18; cy+=(my-cy)*.18;
      cursorEl.style.transform='translate('+cx.toFixed(2)+'px,'+cy.toFixed(2)+'px)'; requestAnimationFrame(loop); })();
  }

  /* generic chip filter */
  function wireFilter(containerId, attr, items, emptyEl){
    var cont=document.getElementById(containerId); if(!cont) return;
    var chips=[].slice.call(cont.querySelectorAll('.chip'));
    chips.forEach(function(c){ c.addEventListener('click',function(){
      var key=c.dataset[attr];
      chips.forEach(function(x){ x.classList.toggle('is-on',x===c); });
      var any=false;
      items.forEach(function(it){ var show=key==='all'||it.dataset[attr]===key;
        it.classList.toggle('is-hidden',!show); if(show)any=true; });
      if(emptyEl) emptyEl.style.display=any?'none':'block';
    }); });
  }
  wireFilter('catFilters','cat',[].slice.call(document.querySelectorAll('#genGrid .art')),document.getElementById('genEmpty'));
  wireFilter('expertFilters','topic',[].slice.call(document.querySelectorAll('#expertList .expert-row')),null);

  /* fill-on-view bars */
  var fio=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){
    e.target.style.width=e.target.dataset.fill+'%'; fio.unobserve(e.target); } }); },{threshold:.4});
  document.querySelectorAll('[data-fill]').forEach(function(el){ fio.observe(el); });
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
