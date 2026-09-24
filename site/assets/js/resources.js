/* =============================================================================
   Resources section behaviour (resources.html + resources/*.html). Loaded after site.js.
   Every block guards its own elements. Without JS every page is complete: all text is
   in the markup, all binder pages show, every FAQ answer can be opened natively.
   ============================================================================= */
(function(){
  'use strict';
  var d=document, HD=window.HD||{}, track=HD.track||function(){};
  var REDUCE=false; try{ REDUCE=window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
  function $(s,c){ return (c||d).querySelector(s); }
  function $$(s,c){ return [].slice.call((c||d).querySelectorAll(s)); }
  function store(k,v){ try{ if(v===undefined) return JSON.parse(localStorage.getItem(k)||'null'); localStorage.setItem(k,JSON.stringify(v)); }catch(e){ return null; } }

  /* ---- Downloads ---- */
  $$('[data-dl]').forEach(function(a){ a.addEventListener('click',function(){ track('resource_download',{doc:a.getAttribute('data-dl')}); }); });

  /* ---- Reading progress (CSS scroll timeline where supported, rAF fallback) ---- */
  var rp=$('.rp i');
  if(rp){
    var native=false; try{ native=CSS.supports('animation-timeline','scroll()'); }catch(e){}
    if(!native){
      var ticking=false, paint=function(){ ticking=false; var h=d.documentElement, max=h.scrollHeight-h.clientHeight; rp.style.setProperty('--p',max>0?Math.min(1,Math.max(0,h.scrollTop/max)).toFixed(4):0); };
      window.addEventListener('scroll',function(){ if(!ticking){ ticking=true; requestAnimationFrame(paint); } },{passive:true});
      window.addEventListener('resize',paint,{passive:true}); paint();
    }
  }

  /* ---- Scrollspy: [data-spy] holds a[href="#id"] links; the section in view gets aria-current ---- */
  $$('[data-spy]').forEach(function(nav){
    if(!('IntersectionObserver' in window)) return;
    var links=$$('a[href^="#"]',nav), ids=links.map(function(a){ return a.getAttribute('href').slice(1); }), vis={};
    var targets=ids.map(function(id){ return d.getElementById(id); });
    var paint=function(){
      var cur=null; ids.forEach(function(id,i){ if(!cur&&vis[id]&&targets[i]&&!targets[i].hidden) cur=id; });
      if(!cur) return;
      links.forEach(function(a){ var on=a.getAttribute('href')==='#'+cur; if(on){ a.setAttribute('aria-current','true');
        var sc=a.closest('[data-spy-scroll]'); if(sc&&sc.scrollWidth>sc.clientWidth) sc.scrollTo({left:a.offsetLeft-16,behavior:REDUCE?'auto':'smooth'}); }
        else a.removeAttribute('aria-current'); });
    };
    var io=new IntersectionObserver(function(en){ en.forEach(function(e){ vis[e.target.id]=e.isIntersecting; }); paint(); },{rootMargin:'-20% 0px -65% 0px'});
    targets.forEach(function(t){ if(t) io.observe(t); });
  });

  /* ---- Overview binder: divider tabs switch the page on desktop; all pages show without JS and below 1024px ---- */
  var bx=$('.bx');
  if(bx){
    var tabs=$$('.bx-tabs a',bx), pages=tabs.map(function(a){ return d.getElementById(a.getAttribute('href').slice(1)); });
    if(tabs.length&&pages.every(Boolean)){
      bx.classList.add('bx--tabs');
      var tl=$('.bx-tabs',bx); tl.setAttribute('role','tablist'); tl.setAttribute('aria-label','Resources in the binder');
      var DESK=window.matchMedia('(min-width:1024px)');
      var sel=function(i,focus){
        tabs.forEach(function(a,j){ var on=i===j; a.setAttribute('aria-selected',on); a.tabIndex=on?0:-1; pages[j].classList.toggle('is-off',!on); });
        if(focus) tabs[i].focus();
      };
      tabs.forEach(function(a,i){
        a.setAttribute('role','tab'); a.setAttribute('aria-controls',pages[i].id); pages[i].setAttribute('role','tabpanel'); pages[i].setAttribute('aria-labelledby',a.id);
        a.addEventListener('click',function(e){ if(!DESK.matches) return; e.preventDefault(); sel(i); track('binder_tab',{section:pages[i].id}); });
        a.addEventListener('keydown',function(e){ var k=e.key, n=tabs.length, j=null;
          if(k==='ArrowDown'||k==='ArrowRight') j=(i+1)%n; else if(k==='ArrowUp'||k==='ArrowLeft') j=(i-1+n)%n; else if(k==='Home') j=0; else if(k==='End') j=n-1;
          if(j!==null){ e.preventDefault(); sel(j,true); } });
      });
      /* Land on the tab an old link points at (resources.html#faq etc.) */
      var fromHash=function(){ var h=location.hash.slice(1); var i=pages.findIndex(function(p){ return p.id===h||(h&&!!p.querySelector('#'+CSS.escape(h))); }); sel(i<0?0:i); return i; };
      fromHash(); window.addEventListener('hashchange',fromHash);
    }
  }

  /* ---- First-call checklist: ticks persist in this browser only ---- */
  var ck=$('#ck');
  if(ck){
    var boxes=$$('input[data-ck]',ck), cnt=$('#ck-count'), saved=store('hd_first_call')||{};
    var upd=function(){ var n=boxes.filter(function(b){ return b.checked; }).length; if(cnt) cnt.textContent=n+' of '+boxes.length+' gathered'; };
    boxes.forEach(function(b){ b.checked=!!saved[b.getAttribute('data-ck')]; b.addEventListener('change',function(){ saved[b.getAttribute('data-ck')]=b.checked; store('hd_first_call',saved); upd(); if(b.checked) track('checklist_tick',{item:b.getAttribute('data-ck')}); }); });
    var rs=$('#ck-reset'); if(rs) rs.addEventListener('click',function(){ boxes.forEach(function(b){ b.checked=false; }); saved={}; store('hd_first_call',saved); upd(); });
    var pr=$('#ck-print'); if(pr) pr.addEventListener('click',function(){ track('checklist_print'); window.print(); });
    upd();
  }

  /* ---- Highlight helper: wraps matches in text nodes with <mark class="hit"> ---- */
  function unmark(root){ $$('mark.hit',root).forEach(function(m){ var t=d.createTextNode(m.textContent); m.parentNode.replaceChild(t,m); t.parentNode.normalize(); }); }
  function mark(root,q){
    if(!q) return; var w=d.createTreeWalker(root,NodeFilter.SHOW_TEXT,null), nodes=[], n;
    while((n=w.nextNode())) if(n.nodeValue.toLowerCase().indexOf(q)>-1) nodes.push(n);
    nodes.forEach(function(t){
      var v=t.nodeValue, lv=v.toLowerCase(), i=0, j, frag=d.createDocumentFragment();
      while((j=lv.indexOf(q,i))>-1){ if(j>i) frag.appendChild(d.createTextNode(v.slice(i,j))); var m=d.createElement('mark'); m.className='hit'; m.textContent=v.slice(j,j+q.length); frag.appendChild(m); i=j+q.length; }
      if(i<v.length) frag.appendChild(d.createTextNode(v.slice(i)));
      t.parentNode.replaceChild(frag,t);
    });
  }

  /* ---- FAQ: search across questions and answers; open the matches ---- */
  var fq=$('#fq-q'), fqList=$('#fq-list');
  if(fq&&fqList){
    var qas=$$('.fqa',fqList), cats=$$('.fq-cat',fqList), fEmpty=$('#fq-empty'), fSt=$('#fq-status'), fT, wasOpen=null;
    qas.forEach(function(q){ q._t=q.textContent.replace(/\s+/g,' ').toLowerCase(); });
    fq.addEventListener('input',function(){
      var v=fq.value.trim().toLowerCase(), n=0;
      if(v&&!wasOpen) wasOpen=qas.map(function(q){ return q.open; });
      qas.forEach(function(q){ unmark(q); var hit=!v||q._t.indexOf(v)>-1; q.hidden=!hit; if(hit) n++; if(v){ q.open=hit; if(hit) mark(q,v); } });
      if(!v&&wasOpen){ qas.forEach(function(q,i){ q.open=wasOpen[i]; }); wasOpen=null; }
      cats.forEach(function(c){ c.hidden=!$$('.fqa',c).some(function(q){ return !q.hidden; }); });
      if(fEmpty) fEmpty.hidden=n>0;
      if(fSt) fSt.textContent=v?(n+(n===1?' answer':' answers')+' found'):'';
      clearTimeout(fT); if(v) fT=setTimeout(function(){ track('faq_search',{q_len:v.length,results:n}); },800);
    });
    qas.forEach(function(q){ q.addEventListener('toggle',function(){ if(q.open&&!fq.value) track('faq_open',{q:q.id}); }); });
    var openHash=function(){ var h=location.hash.slice(1); if(!h) return; var t=d.getElementById(h); if(t&&t.classList.contains('fqa')){ t.open=true; } };
    openHash(); window.addEventListener('hashchange',openHash);
  }

  /* ---- Motion: the sheets are dealt onto the desk (GSAP optional, never for reduced motion) ---- */
  window.addEventListener('DOMContentLoaded',function(){
    var g=window.gsap, ST=window.ScrollTrigger; if(!g||!ST||REDUCE) return;
    try{
      g.registerPlugin(ST);
      $$('[data-deal]').forEach(function(set){
        var sheets=$$('.dsheet',set); if(!sheets.length) return;
        g.from(sheets,{y:36,rotation:function(i){ return i%2?5:-5; },opacity:0,duration:.8,ease:'power3.out',stagger:.09,clearProps:'transform,opacity',scrollTrigger:{trigger:set,start:'top 85%',once:true}});
      });
    }catch(e){ if(window.console) console.warn('resources motion disabled',e); }
  });
})();
