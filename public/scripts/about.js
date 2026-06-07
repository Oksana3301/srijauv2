
(function(){
  var coarse=window.matchMedia('(pointer:coarse)').matches;
  var cursorEl=document.getElementById('cursor');
  var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); } }); },{threshold:0.1,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  var mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
  if(!coarse){
    addEventListener('mousemove',function(e){ mx=e.clientX; my=e.clientY; },{passive:true});
    document.querySelectorAll('[data-cursor]').forEach(function(el){
      el.addEventListener('mouseenter',function(){ cursorEl.classList.add('is-hovering'); });
      el.addEventListener('mouseleave',function(){ cursorEl.classList.remove('is-hovering'); });
    });
    (function loop(){ cx+=(mx-cx)*.18; cy+=(my-cy)*.18; cursorEl.style.transform='translate('+cx.toFixed(2)+'px,'+cy.toFixed(2)+'px)'; requestAnimationFrame(loop); })();
  }
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
