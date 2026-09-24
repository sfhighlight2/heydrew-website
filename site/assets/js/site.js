/* =============================================================================
   HeyDrew shared behaviour (every page). No GSAP dependency; motion is optional.

   Page contract (set on <body>):
     data-page="<slug>"  analytics slug (page_slug on every event, ?src= on TaxLand links)
                         and nav-active key. Defaults to "home".
     data-root="../"     path back to the site root ("" at the root).

   Exposed as window.HD:
     HD.page, HD.root         the two body attributes
     HD.track(event, params)  pushes to dataLayer (also window.hdTrack)
     HD.$, HD.$$              query helpers (null-safe callers are expected)
     HD.store(key[, value])   sessionStorage JSON get/set (never throws)
     HD.tlURL(pos, extra)     TaxLand URL with src, pos, UTMs and estimator answers
     HD.state / HD.setState   estimator answers {entity, rev, count} for this session
     HD.refreshLinks()        rewrites every a[data-pos] to its TaxLand URL
     HD.updateSticky()        recomputes the sticky mobile CTA (also window.hdUpdateSticky)
     HD.inertPage(on)         marks page regions inert while a modal is open
     HD.RULES                 estimator fit table (also window.HD_RULES)

   Every block below guards its own elements, so a page can omit any of them.
   ============================================================================= */
(function(){
  'use strict';
  var d=document, html=d.documentElement, body=d.body;
  window.dataLayer=window.dataLayer||[];
  var REDUCE=false; try{ REDUCE=window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
  var PAGE=(body&&body.getAttribute('data-page'))||'home';
  var ROOT=(body&&body.getAttribute('data-root'))||'';

  function track(event,params){ var o={event:event,page_variant:'redesign-proto',page_slug:PAGE,device:innerWidth<768?'mobile':'desktop'}; if(params){for(var k in params)o[k]=params[k];} window.dataLayer.push(o); }
  function $(s,c){return (c||d).querySelector(s)} function $$(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))}
  function store(k,v){ try{ if(v===undefined){ return JSON.parse(sessionStorage.getItem(k)||'null'); } sessionStorage.setItem(k,JSON.stringify(v)); }catch(e){ return null; } }

  /* ---- Estimator rules (CPA-editable) [CONFIRM: HeyDrew CPA sign-off] ----
     Shared because the exit sheet personalizes from them on every page. */
  var RULES={
    order:['kids','augusta','solo401k','accountable','hsa','hra','ira','s529'],
    fit:{
      sole:   {kids:1,augusta:0,solo401k:1,accountable:0,hsa:1,hra:1,ira:1,s529:1},
      scorp:  {kids:1,augusta:1,solo401k:1,accountable:1,hsa:1,hra:1,ira:1,s529:1},
      partner:{kids:1,augusta:1,solo401k:1,accountable:1,hsa:1,hra:1,ira:1,s529:1},
      multi:  {kids:1,augusta:1,solo401k:1,accountable:1,hsa:1,hra:1,ira:1,s529:1},
      unsure: {kids:1,augusta:1,solo401k:1,accountable:1,hsa:1,hra:1,ira:1,s529:1}
    },
    labels:{sole:'Sole prop / 1-member LLC',scorp:'S-Corp',partner:'Partnership',multi:'2+ businesses',unsure:'Not sure yet'},
    revLabels:{'lt100k':'Under $100K','100-250k':'$100K-$250K','250k-1m':'$250K-$1M','1-5m':'$1M-$5M','5m-plus':'$5M+'},
    captions:{sole:'Got it. One more question.',scorp:'Nice. One more question.',partner:'Got it. One more question.',multi:'Ooh, busy. One more question.',unsure:"No problem. We'll sort that out."},
    revNotes:{'lt100k':'Some moves make more sense as you grow. TaxLand will show which.','5m-plus':'Bigger businesses usually get a deeper review on the call.'}
  };
  window.HD_RULES=RULES;

  /* ---- TaxLand URLs with passthrough ---- */
  var qs=new URLSearchParams(location.search), UTM={};
  qs.forEach(function(v,k){ if(/^utm_/.test(k)) UTM[k]=v; });
  var HD={page:PAGE,root:ROOT,REDUCE:REDUCE,RULES:RULES,qs:qs,$:$,$$:$$,store:store,track:track,state:store('hd_est')||{}};
  window.HD=HD; window.hdTrack=track;
  HD.setState=function(s){ HD.state=s||{}; store('hd_est',HD.state); };
  function tlURL(pos,extra){
    var u=new URL('https://taxland.heydrew.com/');
    extra=extra||{};
    if(extra.entity) u.searchParams.set('entity',extra.entity);
    if(extra.rev) u.searchParams.set('rev',extra.rev);
    u.searchParams.set('src',PAGE); u.searchParams.set('pos',pos);
    for(var k in UTM) u.searchParams.set(k,UTM[k]);
    /* GA4 cross-domain linker (_gl) is appended by gtag's linker config on click in production. */
    return u.toString();
  }
  HD.tlURL=tlURL;
  function refreshLinks(){
    $$('a[data-pos]').forEach(function(a){
      var pos=a.getAttribute('data-pos');
      var extra=(pos==='deadline')?{}:HD.state;
      a.href=tlURL(pos,extra);
    });
  }
  HD.refreshLinks=refreshLinks;
  refreshLinks();
  d.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a,button'); if(!a) return;
    /* Remember any TaxLand handoff this session: the exit sheet never shows after one. */
    if(a.tagName==='A'&&/taxland\.heydrew\.com/.test(a.href||'')) store('hd_tl_clicked',1);
    if(a.hasAttribute('data-cta')) track('cta_click',{cta_id:a.getAttribute('data-cta'),cta_type:'primary',label:a.textContent.trim(),prefilled:/[?&]entity=/.test(a.href||'')});
    if(a.hasAttribute('data-call')) track('cta_click',{cta_id:a.getAttribute('data-call'),cta_type:'secondary',label:a.textContent.trim()});
    if(a.hasAttribute('data-nav')) track('nav_click',{target:a.getAttribute('data-nav')});
    if(a.hasAttribute('data-signin')) track('signin_click');
    if(a.hasAttribute('data-foot')) track('footer_link_click',{target:a.getAttribute('data-foot')});
    if(a.id==='sticky') track('sticky_cta_click',{state:a.getAttribute('data-state')||'default'});
  });

  /* ---- Deadline bar (flag: Oct 1 to Dec 31, America/New_York). Optional per page. ---- */
  (function(){
    var bar=$('#deadline'); if(!bar) return;
    var dismissed=false; try{ dismissed=localStorage.getItem('hd_deadline_dismissed')==='1'; }catch(e){}
    var ny=new Date(new Date().toLocaleString('en-US',{timeZone:'America/New_York'}));
    var inWindow=ny.getMonth()>=9; var force=qs.get('deadline')==='1';
    if(dismissed&&!force) return; if(!inWindow&&!force) return;
    /* Count Dec 31 itself as a usable day: on Dec 31 there is 1 day left, never 0. */
    var today=new Date(ny.getFullYear(),ny.getMonth(),ny.getDate()), end=new Date(ny.getFullYear(),11,31);
    var n=Math.max(1,Math.round((end-today)/864e5)+1), yr=ny.getFullYear();
    var mob=innerWidth<768, msg;
    if(n===1) msg='<span class="n">Last day</span> for '+yr+' tax moves. ';
    else msg=mob?'<span class="n">'+n+' days</span> left for '+yr+' tax moves. ':'<span class="n">'+n+' days left</span> to make '+yr+' tax moves. Most strategies need to be in place by Dec 31. ';
    var t=$('#dl-text'); if(t) t.innerHTML=msg+'<a href="'+tlURL('deadline')+'" data-cta="deadline">See yours</a>';
    bar.hidden=false; track('deadline_bar_view');
    var x=$('#dl-x'); if(x) x.addEventListener('click',function(){ bar.hidden=true; try{localStorage.setItem('hd_deadline_dismissed','1')}catch(e){} track('deadline_bar_dismiss'); });
  })();

  /* ---- Anchor scrolling (JS so ScrollTrigger measurements stay exact) ---- */
  d.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]'); if(!a) return; var id=a.getAttribute('href'); if(id.length<2) return;
    var t=null; try{ t=d.querySelector(id); }catch(err){ return; } if(!t) return; e.preventDefault();
    var y=t.getBoundingClientRect().top+scrollY-(id==='#plan'?120:80);
    window.scrollTo({top:y,behavior:REDUCE?'auto':'smooth'}); history.replaceState(null,'',id);
  });

  /* ---- Header state ---- */
  var hdr=$('#hdr'), sheet=$('#sheet'), mo=$('#menu-open');
  if(hdr&&'IntersectionObserver' in window){
    var topSentinel=d.createElement('div'); topSentinel.style.cssText='position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none'; body.prepend(topSentinel);
    new IntersectionObserver(function(en){ hdr.classList.toggle('scrolled',!en[0].isIntersecting); }).observe(topSentinel);
  }
  function inertPage(on){ ['#main','#hdr','#foot','#deadline','#sticky'].forEach(function(sel){ var el=$(sel); if(!el) return; if(on) el.setAttribute('inert',''); else el.removeAttribute('inert'); }); }
  HD.inertPage=inertPage;
  function sheetOpen(){ return !!(sheet&&!sheet.hidden); }

  /* ---- Current page: aria-current on the matching links, .is-current on its group trigger ---- */
  $$('[data-slug]').forEach(function(a){
    if(a.getAttribute('data-slug')!==PAGE){ if(a.getAttribute('aria-current')==='page') a.removeAttribute('aria-current'); return; }
    a.setAttribute('aria-current','page');
    var item=a.closest('.nav-item,.sm-group'); if(!item) return;
    var top=$('.nav-top,.sm-top',item); if(top&&top!==a) top.classList.add('is-current');
  });

  /* ---- Desktop dropdowns ----
     Disclosure buttons (aria-expanded/aria-controls), not ARIA menus: the panels hold plain links.
     Mouse: open after 120ms of hover intent, close 200ms after leaving; switching between open
     panels is instant. Click toggles (touch and pen never use hover). Keyboard: Enter/Space/ArrowDown
     open and focus the first link; ArrowUp/Down/Home/End move inside; ArrowLeft/Right move between
     top-level items; Esc closes and returns focus; tabbing out closes. One panel at a time. */
  var nav=$('#nav'), openItem=null, tOpen=0, tClose=0;
  var DESK=window.matchMedia?window.matchMedia('(min-width: 1024px)'):{matches:true};
  function trigOf(item){ return $('.nav-top',item); }
  function panelOf(item){ var b=trigOf(item); return b&&d.getElementById(b.getAttribute('aria-controls')); }
  function placePanel(item){
    var b=trigOf(item), p=panelOf(item); if(!b||!p||!hdr) return;
    var hr=hdr.getBoundingClientRect(), br=b.getBoundingClientRect(), w=p.offsetWidth, vw=d.documentElement.clientWidth, gut=Math.max(16,Math.min(64,vw*.04));
    var x=br.left+br.width/2-w/2; x=Math.max(gut,Math.min(x,vw-gut-w));
    p.style.setProperty('--x',Math.round(x-hr.left)+'px');
  }
  function closePanel(focusTrigger){
    clearTimeout(tOpen); clearTimeout(tClose);
    if(!openItem) return; var it=openItem, b=trigOf(it), p=panelOf(it); openItem=null;
    if(b) b.setAttribute('aria-expanded','false'); if(p) p.classList.remove('is-open');
    if(hdr) hdr.classList.remove('has-panel');
    if(focusTrigger&&b) b.focus();
  }
  function openPanel(item,how){
    clearTimeout(tOpen); clearTimeout(tClose);
    if(openItem===item) return;
    if(openItem) closePanel(false);
    var b=trigOf(item), p=panelOf(item); if(!b||!p) return;
    placePanel(item); openItem=item;
    b.setAttribute('aria-expanded','true'); p.classList.add('is-open');
    if(hdr) hdr.classList.add('has-panel');
    track('nav_dropdown_open',{group:item.getAttribute('data-group'),method:how||'click'});
  }
  function panelLinks(item){ var p=panelOf(item); return p?$$('a[href]',p):[]; }
  if(nav){
    var items=$$('.nav-item[data-group]',nav), tops=$$('.nav-top',nav);
    items.forEach(function(item){
      var b=trigOf(item), p=panelOf(item); if(!b||!p) return;
      b.addEventListener('click',function(){ if(openItem===item) closePanel(false); else openPanel(item,'click'); });
      item.addEventListener('pointerenter',function(e){
        if(e.pointerType!=='mouse') return; clearTimeout(tClose);
        if(openItem===item) return;
        clearTimeout(tOpen); tOpen=setTimeout(function(){ openPanel(item,'hover'); },openItem?0:120);
      });
      item.addEventListener('pointerleave',function(e){
        if(e.pointerType!=='mouse') return; clearTimeout(tOpen);
        if(openItem!==item) return;
        clearTimeout(tClose); tClose=setTimeout(function(){ if(openItem===item&&!item.contains(d.activeElement)) closePanel(false); else if(openItem===item&&!item.matches(':hover')) closePanel(false); },200);
      });
      b.addEventListener('keydown',function(e){
        if(e.key==='ArrowDown'||((e.key==='Enter'||e.key===' ')&&openItem!==item)){
          e.preventDefault(); openPanel(item,'keyboard'); var l=panelLinks(item); if(l[0]) l[0].focus();
        }
      });
      p.addEventListener('keydown',function(e){
        var l=panelLinks(item), i=l.indexOf(d.activeElement); if(i<0) return;
        var n=null;
        if(e.key==='ArrowDown') n=(i+1)%l.length;
        else if(e.key==='ArrowUp') n=(i-1+l.length)%l.length;
        else if(e.key==='Home') n=0;
        else if(e.key==='End') n=l.length-1;
        if(n!==null){ e.preventDefault(); l[n].focus(); }
      });
    });
    /* Left/Right between top-level items */
    tops.forEach(function(t,i){
      t.addEventListener('keydown',function(e){
        if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft') return;
        e.preventDefault(); var n=tops[(i+(e.key==='ArrowRight'?1:-1)+tops.length)%tops.length];
        var wasOpen=!!openItem; closePanel(false); n.focus();
        var it=n.closest('.nav-item[data-group]'); if(wasOpen&&it) openPanel(it,'keyboard');
      });
    });
    d.addEventListener('keydown',function(e){ if(e.key==='Escape'&&openItem){ var inside=openItem.contains(d.activeElement); closePanel(inside||d.activeElement===body); } });
    nav.addEventListener('focusout',function(e){ if(openItem&&e.relatedTarget&&!openItem.contains(e.relatedTarget)) closePanel(false); });
    d.addEventListener('pointerdown',function(e){ if(openItem&&!openItem.contains(e.target)) closePanel(false); });
    window.addEventListener('resize',function(){ if(!openItem) return; if(!DESK.matches) closePanel(false); else placePanel(openItem); },{passive:true});
    window.addEventListener('scroll',function(){ if(openItem&&scrollY>0&&!openItem.contains(d.activeElement)&&!openItem.matches(':hover')) closePanel(false); },{passive:true});
  }

  /* ---- Mobile menu sheet: accordions + focus trap ---- */
  function menu(open,noFocus){
    if(!sheet||!mo) return;
    sheet.hidden=!open; mo.setAttribute('aria-expanded',open); body.style.overflow=open?'hidden':''; inertPage(open);
    if(open){ closePanel(false); var c=$('#menu-close'); c&&c.focus(); } else if(!noFocus){ mo.focus(); }
    updateSticky();
  }
  HD.menu=menu;
  if(sheet&&mo){
    mo.addEventListener('click',function(){ menu(true); track('menu_open'); });
    var mc=$('#menu-close'); if(mc) mc.addEventListener('click',function(){ menu(false); });
    $$('#sheet a[href]').forEach(function(a){ a.addEventListener('click',function(){ if(a.getAttribute('href').charAt(0)==='#'||/#/.test(a.getAttribute('href'))) menu(false,true); }); });
    $$('.sm-top[aria-controls]',sheet).forEach(function(b){
      var body_=d.getElementById(b.getAttribute('aria-controls')); if(!body_) return;
      b.addEventListener('click',function(){ var o=b.getAttribute('aria-expanded')!=='true'; b.setAttribute('aria-expanded',o); body_.classList.toggle('open',o); if(o) track('menu_group_open',{group:b.getAttribute('data-group')}); });
      /* The group holding the current page starts open */
      if(b.classList.contains('is-current')){ b.setAttribute('aria-expanded','true'); body_.classList.add('open'); }
    });
    d.addEventListener('keydown',function(e){
      if(sheet.hidden) return;
      if(e.key==='Escape'){ menu(false); return; }
      if(e.key==='Tab'){ var f=$$('a[href],button',sheet).filter(function(el){ return el.offsetParent!==null&&getComputedStyle(el).visibility!=='hidden'; }), first=f[0], last=f[f.length-1];
        if(!first) return;
        if(e.shiftKey&&d.activeElement===first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey&&d.activeElement===last){ e.preventDefault(); first.focus(); } }
    });
    window.addEventListener('resize',function(){ if(!sheet.hidden&&DESK.matches) menu(false,true); },{passive:true});
  }

  /* ---- Sticky mobile CTA ----
     Hidden while any [data-sticky-hide] element or the footer is on screen, while a field has focus,
     while the menu or a modal is open. data-sticky-hide="hero" counts as visible from the first paint. */
  var sticky=$('#sticky'), vis=[], focusIn=false, shownOnce=false;
  function updateSticky(){
    if(!sticky) return;
    var st='default', b='See what you can keep', s='Free. A few minutes.', S=HD.state||{};
    if(S.entity&&!S.rev){ st='resume'; b='Finish your plan'; s='1 question left'; sticky.setAttribute('href',$('#plan')?'#plan':ROOT+(ROOT==='/'?'':'index.html')+'#plan'); }
    else if(S.entity&&S.rev){ st='continue'; b='Continue in TaxLand'; s='Your answers carry over'; sticky.href=tlURL('sticky',S); }
    else sticky.href=tlURL('sticky',{});
    sticky.setAttribute('data-state',st);
    var sb=$('#st-b'), ss=$('#st-s'); if(sb) sb.textContent=b; if(ss) ss.textContent=s;
    var anyVis=vis.some(function(v){ return v.on; });
    var show=!anyVis&&!focusIn&&!sheetOpen()&&!window.__hdModal;
    sticky.classList.toggle('show',show); sticky.setAttribute('aria-hidden',show?'false':'true'); sticky.tabIndex=show?0:-1;
    if(show&&!shownOnce&&innerWidth<768){ shownOnce=true; track('sticky_cta_shown',{scroll_depth:Math.round(scrollY/(d.documentElement.scrollHeight-innerHeight)*100)}); }
  }
  HD.updateSticky=updateSticky; window.hdUpdateSticky=updateSticky;
  if(sticky){
    sticky.addEventListener('click',function(e){
      var plan=$('#plan');
      if(sticky.getAttribute('data-state')==='resume'&&plan){ e.preventDefault(); plan.scrollIntoView({behavior:REDUCE?'auto':'smooth',block:'center'}); setTimeout(function(){ var f=$('.step[data-step="2"] .chip'); f&&f.focus({preventScroll:true}); },500); }
    });
    var watch=$$('[data-sticky-hide]'); var foot=$('#foot'); if(foot&&watch.indexOf(foot)<0) watch.push(foot);
    vis=watch.map(function(el){ return {el:el,on:el.getAttribute('data-sticky-hide')==='hero'}; });
    if('IntersectionObserver' in window){
      var sio=new IntersectionObserver(function(en){ en.forEach(function(e){ vis.forEach(function(v){ if(v.el===e.target) v.on=e.isIntersecting; }); }); updateSticky(); });
      vis.forEach(function(v){ sio.observe(v.el); });
    }
    d.addEventListener('focusin',function(e){ focusIn=/INPUT|TEXTAREA|SELECT/.test(e.target.tagName); updateSticky(); });
    updateSticky();
  }

  /* ---- FAQ accordions (.acc .qa: button + .ans) ---- */
  $$('.acc .qa').forEach(function(q,ix){
    var b=$('button',q), a=$('.ans',q); if(!b||!a) return;
    var id='ans-'+(q.getAttribute('data-q')||('q'+(ix+1)));
    a.id=id; b.setAttribute('aria-controls',id);
    b.addEventListener('click',function(){ var o=!q.classList.contains('open'); q.classList.toggle('open',o); b.setAttribute('aria-expanded',o); if(o) track('faq_open',{question_id:q.getAttribute('data-q')||id}); });
  });

  /* ---- Exit intent ----
     Desktop: pointer leaves through the top edge (clientY <= 0) after >= 8s on page.
     Touch: (a) a fast upward fling of >= 1.2 viewports within 600ms, after reading past 50% and >= 20s on page,
            or (b) 45s with no scroll/touch/key after reaching 50% depth (tab must be visible).
     Never: twice per session, after any TaxLand click, mid-estimator, with the menu open or a field focused.
     ?exit=1 forces it open immediately (preview; guards and the session cap are skipped). */
  (function(){
    var xi=$('#xi'); if(!xi) return;
    var dlg=$('.xi-dlg',xi), form=$('#xi-form'), email=$('#xi-email'), err=$('#xi-err'), thanks=$('#xi-thanks');
    if(!dlg) return;
    var KEY='hd_exit_shown', t0=Date.now(), isOpen=false, shownMem=false, lastFocus=null, ignoreUntil=0;
    var TOUCH=window.matchMedia('(hover: none), (pointer: coarse)').matches;
    function midEstimator(){ var S=HD.state||{}, plan=$('#plan'); var done=!!(S.entity&&S.rev); return !!(S.entity&&!S.rev)||(!done&&!!plan&&plan.contains(d.activeElement)); }
    function eligible(){
      if(shownMem||store(KEY)||store('hd_tl_clicked')) return false;
      if(midEstimator()||sheetOpen()) return false;
      var ae=d.activeElement; if(ae&&/INPUT|TEXTAREA|SELECT/.test(ae.tagName)) return false;
      return true;
    }
    function setText(sel,t){ var el=$(sel); if(el) el.textContent=t; }
    function fill(){
      var S=HD.state||{}, done=!!(S.entity&&S.rev);
      xi.classList.toggle('is-plan',done);
      setText('#xi-t',done?'Before you go, your plan is still open.':'Before you go, see which strategies you might be missing.');
      setText('#xi-p',done?'Strategies like these may fit a business like yours. TaxLand picks up right where you left off.':'Most owners never hear about these. A few minutes in TaxLand shows which ones fit your business.');
      setText('#xi-stamp',done?'May fit':'Unchecked');
      /* Rows: the four headline moves, or (after the estimator) the first four that may fit */
      var NAMES={kids:'Hire Your Kids',augusta:'Augusta Rule',solo401k:'Solo 401(k)',accountable:'Accountable Plan',hsa:'Health Savings Account',hra:'Health Reimbursement Arrangement',ira:'Traditional & Roth IRA',s529:'529 Education Plan'};
      var fit=RULES.fit[S.entity]||RULES.fit.unsure;
      var keys=done?RULES.order.filter(function(k){ return fit[k]; }):['kids','augusta','accountable','solo401k'];
      var total=done?keys.length:RULES.order.length, lis=$$('#xi-rows li'), shown=Math.min(innerWidth<768?3:4,keys.length);
      lis.forEach(function(li,i){ li.hidden=i>=shown; if(i<shown){ var nm=$('.nm',li), bx=$('.box',li); if(nm) nm.textContent=NAMES[keys[i]]; if(bx) bx.classList.toggle('on',done); } });
      var go=$('#xi-go'); if(go){ if(go.firstChild) go.firstChild.nodeValue=done?'Continue in TaxLand':'See what you can keep'; go.href=tlURL('exit',S); }
      var more=total-shown, xm=$('#xi-more'); if(xm){ xm.textContent=more>0?'+ more in your full plan':''; xm.hidden=more<=0; }
    }
    function focusables(){ return $$('a[href],button:not([disabled]),input:not([disabled]),[tabindex="0"]',dlg).filter(function(el){ return el.offsetParent!==null; }); }
    function open(trigger){
      if(isOpen) return; isOpen=true; shownMem=true;
      if(trigger!=='preview') store(KEY,1);
      lastFocus=d.activeElement; fill(); closePanel(false);
      xi.hidden=false; window.__hdModal=true; inertPage(true); body.style.overflow='hidden'; updateSticky();
      void xi.offsetWidth; xi.classList.add('in');
      html.classList.add('xi-open');
      setTimeout(function(){ dlg.focus({preventScroll:true}); },REDUCE?0:80);
      track('exit_intent_shown',{trigger:trigger,personalized:xi.classList.contains('is-plan'),seconds_on_page:Math.round((Date.now()-t0)/1000)});
    }
    function close(method){
      if(!isOpen) return; isOpen=false;
      xi.classList.remove('in');
      if(method!=='cta') track('exit_intent_dismiss',{method:method});
      setTimeout(function(){ xi.hidden=true; },REDUCE?0:220);
      html.classList.remove('xi-open'); window.__hdModal=false; inertPage(false); body.style.overflow=''; updateSticky();
      if(lastFocus&&lastFocus.focus&&d.contains(lastFocus)) lastFocus.focus({preventScroll:true});
    }
    window.hdExitIntent={open:open,close:close}; HD.exitIntent=window.hdExitIntent;
    xi.addEventListener('click',function(e){ var c=e.target.closest('[data-xi-close]'); if(c){ close(c.getAttribute('data-xi-close')); return; } if(e.target===xi||e.target===dlg) close('backdrop'); });
    var go=$('#xi-go'); if(go) go.addEventListener('click',function(){ track('exit_intent_cta',{personalized:xi.classList.contains('is-plan')}); close('cta'); });
    d.addEventListener('keydown',function(e){
      if(!isOpen) return;
      if(e.key==='Escape'){ e.preventDefault(); close('escape'); return; }
      if(e.key==='Tab'){ var f=focusables(); if(!f.length) return; var first=f[0], last=f[f.length-1];
        if(!dlg.contains(d.activeElement)){ e.preventDefault(); first.focus(); }
        else if(e.shiftKey&&d.activeElement===first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey&&d.activeElement===last){ e.preventDefault(); first.focus(); } }
    });
    if(email&&err) email.addEventListener('input',function(){ if(email.getAttribute('aria-invalid')){ email.removeAttribute('aria-invalid'); err.textContent=''; } });
    if(form&&email&&err) form.addEventListener('submit',function(e){
      e.preventDefault();
      var v=email.value.trim();
      if(!v||!email.checkValidity()){ email.setAttribute('aria-invalid','true'); err.textContent=v?'That email looks incomplete. Try name@business.com.':'Add your email and we\'ll send the checklist.'; email.focus(); return; }
      /* TODO(ESP): send {email:v, list:'strategy-checklist', source:PAGE+'_exit_intent', entity, rev}
         to the ESP (Klaviyo/HubSpot form endpoint) here. Never push the address itself into dataLayer. */
      track('exit_intent_email_submit',{list:'strategy-checklist',prefilled:!!(HD.state&&HD.state.entity)});
      form.hidden=true; if(thanks){ thanks.hidden=false; thanks.focus(); }
    });

    if(qs.get('exit')==='1'){ setTimeout(function(){ open('preview'); },REDUCE?0:300); return; }

    /* Desktop: leaving through the top edge (tab strip / address bar) */
    d.addEventListener('mouseout',function(e){
      if(e.relatedTarget||e.toElement) return; if(e.clientY>0) return;
      if(Date.now()-t0<8000) return; if(eligible()) open('mouse_top');
    });
    if(!TOUCH) return;

    /* Touch: fast upward fling after real reading, or a long idle past the midpoint */
    var maxDepth=0, lastY=scrollY, upStart=0, upAcc=0, idleT=0;
    d.addEventListener('click',function(e){ if(e.target.closest&&e.target.closest('a[href^="#"],#sticky')) ignoreUntil=Date.now()+1500; },true);
    function depth(){ var h=d.documentElement.scrollHeight; return h?(scrollY+innerHeight)/h:0; }
    function armIdle(){ clearTimeout(idleT); if(maxDepth<.5||isOpen||shownMem) return;
      idleT=setTimeout(function(){ if(d.visibilityState==='visible'&&eligible()) open('idle'); },45000); }
    window.addEventListener('scroll',function(){
      var y=scrollY, now=Date.now(), dy=y-lastY; lastY=y;
      maxDepth=Math.max(maxDepth,depth());
      if(dy<0){ if(!upAcc) upStart=now; upAcc+=-dy;
        if(upAcc>=innerHeight*1.2&&now-upStart<=600&&maxDepth>=.5&&now-t0>=20000&&now>ignoreUntil&&eligible()) open('scroll_up_fast');
      } else if(dy>0){ upAcc=0; }
      if(now-upStart>600) { upAcc=dy<0?-dy:0; upStart=now; }
      armIdle();
    },{passive:true});
    ['touchstart','keydown'].forEach(function(t){ d.addEventListener(t,armIdle,{passive:true}); });
  })();

  /* ---- Scroll depth ---- */
  if('IntersectionObserver' in window){
    [25,50,75,90].forEach(function(p){
      var s=d.createElement('div'); s.style.cssText='position:absolute;left:0;width:1px;height:1px;pointer-events:none;top:'+p+'%'; s.setAttribute('aria-hidden','true'); body.appendChild(s);
      var o=new IntersectionObserver(function(en){ if(en[0].isIntersecting){ track('scroll_depth',{percent:p}); o.disconnect(); } }); o.observe(s);
    });
    body.style.position='relative';
  }

  /* ---- Reveal utilities (GSAP optional) ----
     [data-reveal]            fades up 16px once, when it enters the viewport
     [data-reveal="stagger"]  its children fade up in sequence
     .hl inside [data-reveal] the highlighter bar draws after the block lands
     Created at runtime with gsap.from(), so without JS or without GSAP everything is simply visible.
     The homepage runs its own choreography (assets/js/home.js) and has no [data-reveal]. */
  window.addEventListener('DOMContentLoaded',function(){
    var els=$$('[data-reveal]'); if(!els.length) return;
    var gsap=window.gsap, ST=window.ScrollTrigger;
    if(!gsap||!ST||REDUCE) return;
    try{
      gsap.registerPlugin(ST);
      els.forEach(function(el){
        var stag=el.getAttribute('data-reveal')==='stagger', targets=stag?Array.prototype.slice.call(el.children):[el];
        var hl=$$('.hl',el);
        if(hl.length) gsap.set(hl,{'--hl':0});
        var tl=gsap.timeline({scrollTrigger:{trigger:el,start:'top 88%',once:true}});
        tl.from(targets,{opacity:0,y:16,duration:.6,ease:'power3.out',stagger:stag?.07:0,clearProps:'opacity,transform'});
        if(hl.length) tl.to(hl,{'--hl':1,duration:.6,ease:'power2.inOut'},.25);
      });
      var refresh=function(){ ST.refresh(); };
      if(d.fonts&&d.fonts.ready) d.fonts.ready.then(refresh);
      window.addEventListener('load',refresh);
    }catch(err){ if(window.console) console.warn('reveal disabled',err); }
  });
})();
