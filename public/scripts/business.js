
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
  /* toggle Keluarga / Bisnis */
  var segBtns=[].slice.call(document.querySelectorAll('.seg button'));
  var panels={keluarga:document.getElementById('panel-keluarga'),bisnis:document.getElementById('panel-bisnis')};
  var tb=document.querySelector('.toggle-bar');
  function setPanel(key){
    segBtns.forEach(function(b){ b.classList.toggle('is-on',b.dataset.panel===key); });
    Object.keys(panels).forEach(function(k){ panels[k].classList.toggle('is-hidden',k!==key); });
    panels[key].querySelectorAll('.reveal').forEach(function(el){ el.classList.add('is-visible'); });
    if(tb) window.scrollTo({top:tb.offsetTop,behavior:'auto'});
  }
  segBtns.forEach(function(b){ b.addEventListener('click',function(){ setPanel(b.dataset.panel); }); });

  /* waitlist form */
  var form=document.getElementById('waitForm');
  if(form){ form.addEventListener('submit',function(e){ e.preventDefault();
    form.style.display='none';
    var ok=document.getElementById('waitSuccess'); if(ok) ok.style.display='block'; }); }
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
