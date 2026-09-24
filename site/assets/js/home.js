/* =============================================================================
   HeyDrew homepage behaviour: estimator, rail, strategy tiles, swipe rails, and the
   GSAP choreography. Needs assets/js/site.js first (window.HD).
   ============================================================================= */
(function(){
  'use strict';
  var HD=window.HD; if(!HD) return;
  var d=document, $=HD.$, $$=HD.$$, track=HD.track, store=HD.store, RULES=HD.RULES, REDUCE=HD.REDUCE;
  var refreshLinks=HD.refreshLinks, updateSticky=HD.updateSticky, tlURL=HD.tlURL;
  if(!$('#plan')) return;
  /* ---- Estimator ---- */
  var plan=$('#plan'), steps=$$('.step',plan), cap=$('#cap'), live=$('#live');
  var capT;
  function caption(t){ if(!t) return; cap.textContent=t; cap.classList.add('show'); clearTimeout(capT); capT=setTimeout(function(){cap.classList.remove('show')},1600); }
  function show(n){ steps.forEach(function(s){ s.hidden=(+s.getAttribute('data-step')!==n); }); }
  function setProg(n,label){ $$('#prog-bar i').forEach(function(i,ix){ i.classList.toggle('on',ix<n); }); $('#prog-bar').setAttribute('aria-valuenow',n); $('#prog-t').textContent=label; }
  function maxRows(){ return innerWidth<768?3:4; }
  function resetRows(){
    plan.classList.remove('is-result');
    var rows=$('#rows'), M=maxRows();
    RULES.order.forEach(function(k,ix){ var r=$('.row[data-s="'+k+'"]',rows); rows.appendChild(r); r.classList.toggle('x-hide',ix>=M); $('.box',r).classList.remove('on'); $('.st',r).textContent=', not yet checked'; });
    $('#more').textContent='+ more in your full plan'; $('#more').style.display='';
  }
  function renderResult(animate){
    var state=HD.state, fit=RULES.fit[state.entity]||RULES.fit.unsure, rows=$('#rows'), yes=[], no=[];
    RULES.order.forEach(function(k){ (fit[k]?yes:no).push(k); });
    var M=maxRows();
    yes.concat(no).forEach(function(k,ix){ var r=$('.row[data-s="'+k+'"]',rows); rows.appendChild(r); var ok=!!fit[k]; r.classList.toggle('x-hide',!ok||ix>=M); $('.st',r).textContent=ok?', may fit':', not a likely fit'; });
    plan.classList.add('is-result');
    var N=yes.length, more=N-M; $('#more').textContent=more>0?'+ more in your full plan':''; $('#more').style.display=more>0?'':'none';
    $('#res-sum').textContent=RULES.labels[state.entity]+'  /  '+RULES.revLabels[state.rev];
    var note=RULES.revNotes[state.rev], rn=$('#res-note'); rn.hidden=!note; rn.textContent=note||'';
    var visible=$$('.row:not(.x-hide) .box',rows);
    visible.forEach(function(b,i){ if(animate&&!REDUCE){ setTimeout(function(){b.classList.add('on')},120+i*60);} else b.classList.add('on'); });
    /* Client rule: never state a number of strategies. The result is qualitative; the rows carry the matches. */
    live.textContent='Good news: strategies like these may fit a business like yours.';
    setProg(3,"You're ~30% done");
    HD.state.count=N; HD.setState(HD.state); refreshLinks(); updateSticky();
    if(animate) track('estimator_result_view',{entity:state.entity,revenue_band:state.rev,strategy_count:N});
  }
  function select(group,btn){
    $$('.chip',group).forEach(function(c){ c.setAttribute('aria-checked',c===btn?'true':'false'); c.tabIndex=c===btn?0:-1; });
    var q=group.getAttribute('data-q'), v=btn.getAttribute('data-v');
    if(q==='entity'){
      HD.setState({entity:v}); refreshLinks(); caption(RULES.captions[v]);
      track('estimator_q1_answer',{entity:v});
      setTimeout(function(){ show(2); setProg(1,'1 question left'); var f=$('.step[data-step="2"] .chip'); f&&f.focus({preventScroll:true}); updateSticky(); },350);
    } else {
      HD.state.rev=v; HD.setState(HD.state); track('estimator_q2_answer',{revenue_band:v});
      setTimeout(function(){ show(3); renderResult(true); var e=$('#edit'); e&&e.focus({preventScroll:true});
        /* Mobile: bring the handoff button into view at peak intent */
        if(innerWidth<768){ var pc=$('#plan-cta'); if(pc&&pc.getBoundingClientRect().bottom>innerHeight-8){ setTimeout(function(){ pc.scrollIntoView({block:'end',behavior:REDUCE?'auto':'smooth'}); },REDUCE?0:450); } }
      },350);
    }
  }
  $$('.chips[role="radiogroup"]',plan).forEach(function(g){
    var chips=$$('.chip',g); chips.forEach(function(c,i){ c.tabIndex=i===0?0:-1; });
    g.addEventListener('click',function(e){ var b=e.target.closest('.chip'); if(b) select(g,b); });
    g.addEventListener('keydown',function(e){
      var i=chips.indexOf(d.activeElement); if(i<0) return;
      var k=e.key, n=null;
      if(k==='ArrowRight'||k==='ArrowDown') n=(i+1)%chips.length;
      if(k==='ArrowLeft'||k==='ArrowUp') n=(i-1+chips.length)%chips.length;
      if(n!==null){ e.preventDefault(); chips.forEach(function(c){c.tabIndex=-1}); chips[n].tabIndex=0; chips[n].focus(); }
    });
  });
  $('#back').addEventListener('click',function(){ show(1); setProg(0,'2 quick questions'); track('estimator_back'); updateSticky(); });
  $('#edit').addEventListener('click',function(){ HD.setState({}); $$('.chip',plan).forEach(function(c){c.setAttribute('aria-checked','false')}); resetRows(); show(1); setProg(0,'2 quick questions'); refreshLinks(); updateSticky(); var f=$('.chip',plan); f&&f.focus(); });
  // Resume
  var state=HD.state;
  if(!(state&&state.rev)) resetRows();
  if(state&&state.entity){
    var c1=$('.chips[data-q="entity"] .chip[data-v="'+state.entity+'"]'); c1&&c1.setAttribute('aria-checked','true');
    if(state.rev){ var c2=$('.chips[data-q="rev"] .chip[data-v="'+state.rev+'"]'); c2&&c2.setAttribute('aria-checked','true'); show(3); renderResult(false); }
    else { show(2); setProg(1,'1 question left'); }
  }

  /* ---- Rail nodes (HeyDrew row) ---- */
  var HD=[['Jan','Plan','Jan: Strategy plan built'],['Feb','','Feb: Payroll for kids set up'],['Mar','Augusta days','Mar: Augusta Rule days scheduled'],['Apr','File','Apr: Return filed from the plan'],['May','',"May: Documentation checked"],['Jun','Check-in','Jun: Mid-year check-in'],['Jul','','Jul: Retirement contributions reviewed'],['Aug','','Aug: Accountable Plan reimbursements'],['Sep','','Sep: Q3 estimates reviewed'],['Oct','Last call','Oct: Last call for Q4 moves'],['Nov','','Nov: Year-end moves confirmed'],['Dec','Moves locked','Dec: Moves in place before the deadline']];
  var hdTrack=$('.t-hd');
  HD.forEach(function(m,i){
    var b=d.createElement('button'); b.type='button'; b.className='node is-on'; b.style.setProperty('--c',i+2); b.style.setProperty('--r',i+2);
    b.setAttribute('aria-label',m[2]); b.setAttribute('data-m',m[0]);
    b.innerHTML='<i></i>'+(m[1]?'<span class="nl">'+m[1]+(i===11?' ✓':'')+'</span>':'')+'<span class="tip" role="tooltip" aria-hidden="true">'+m[2]+'</span>';
    b.addEventListener('mouseenter',function(){track('rail_tooltip_open',{month:m[0]})});
    b.addEventListener('focus',function(){track('rail_tooltip_open',{month:m[0]})});
    hdTrack.appendChild(b);
  });

  /* ---- Strategy tiles expand (desktop/tablet; on phones the fit line is always shown) ---- */
  var MOB=window.matchMedia('(max-width: 767px)');
  $$('#bento .tile[data-strategy]').forEach(function(t){
    var b=$('.tg',t), f=$('.fitx',t), id='fit-'+t.getAttribute('data-strategy');
    f.id=id; b.setAttribute('aria-controls',id);
    function tog(){ var o=!t.classList.contains('open'); t.classList.toggle('open',o); b.setAttribute('aria-expanded',o); if(o) track('strategy_card_open',{strategy:t.getAttribute('data-strategy')}); }
    b.addEventListener('click',tog);
    /* A click anywhere on the card is a convenience that delegates to the real button */
    t.addEventListener('click',function(e){ if(MOB.matches) return; if(e.target.closest('a,button')) return; var sel=window.getSelection&&String(window.getSelection()); if(sel) return; tog(); });
  });
  /* ---- Founder note (mobile clamp) ---- */
  var nm=$('#note-more'); if(nm) nm.addEventListener('click',function(){ $('#note').classList.remove('clamp'); nm.setAttribute('aria-expanded','true'); track('founder_note_expand'); });

  /* FAQ accordions live in site.js (.acc .qa). */

  /* ---- Testimonials: show all (mobile) ---- */
  $('#showall').addEventListener('click',function(){ $('#tcols').classList.add('all'); track('testimonial_expand'); });

  /* ---- HIW mobile counter + vignette views ---- */
  var hiwSeen={};
  var hio=new IntersectionObserver(function(en){ en.forEach(function(e){ if(e.intersectionRatio>=.6){ var s=e.target.getAttribute('data-step'); if(!hiwSeen[s]){ hiwSeen[s]=1; track('hiw_card_view',{step:+s}); d.dispatchEvent(new CustomEvent('hiw:view',{detail:+s})); } } }); },{threshold:[.6]});
  $$('.hiw-col').forEach(function(c){ hio.observe(c); });

  /* ---- Swipe rails (phones): strategies + testimonials ---- */
  function snapNav(sc,label,evt){
    if(!sc) return;
    var nav=d.createElement('div'); nav.className='snap-nav';
    nav.innerHTML='<button type="button" class="snap-b" data-d="-1" aria-label="Previous '+label+'"><svg aria-hidden="true"><use href="#arr"/></svg></button><span class="snap-track" aria-hidden="true"><i></i></span><button type="button" class="snap-b" data-d="1" aria-label="Next '+label+'"><svg aria-hidden="true"><use href="#arr"/></svg></button>';
    sc.parentNode.insertBefore(nav,sc.nextSibling);
    var th=$('.snap-track i',nav), bs=$$('.snap-b',nav), raf=0, moved=false;
    function upd(){ raf=0; var max=sc.scrollWidth-sc.clientWidth, w=sc.scrollWidth?sc.clientWidth/sc.scrollWidth:1, p=max>0?sc.scrollLeft/max:0;
      th.style.width=(w*100)+'%'; th.style.transform='translateX('+(p*(1-w)/w*100)+'%)';
      bs[0].disabled=sc.scrollLeft<=4; bs[1].disabled=sc.scrollLeft>=max-4; }
    sc.addEventListener('scroll',function(){ if(!raf) raf=requestAnimationFrame(upd); if(!moved&&MOB.matches){ moved=true; track(evt); } },{passive:true});
    bs.forEach(function(b){ b.addEventListener('click',function(){ var kid=sc.querySelector('.tile,.tq'); var step=kid?kid.getBoundingClientRect().width+12:sc.clientWidth*.8; sc.scrollBy({left:step*(+b.getAttribute('data-d')),behavior:REDUCE?'auto':'smooth'}); }); });
    window.addEventListener('resize',upd,{passive:true}); upd();
  }
  snapNav($('#bento'),'strategy','strategy_rail_swipe');
  snapNav($('#tcols'),'testimonial','testimonial_rail_swipe');

  var pv=new IntersectionObserver(function(en){ if(en[0].isIntersecting){ track('portal_view'); pv.disconnect(); } },{threshold:.3}); pv.observe($('#portal'));
  try{ new PerformanceObserver(function(l){ var e=l.getEntries(); var last=e[e.length-1]; if(last&&!window.__heroViewSent){ window.__heroViewSent=1; track('hero_view',{lcp_ms:Math.round(last.startTime)}); } }).observe({type:'largest-contentful-paint',buffered:true}); }catch(e){ track('hero_view',{}); }

  /* Mobile/no-motion counter completion event */
  window.hdCounterDone=function(){ if(!window.__ctrDone){ window.__ctrDone=1; track('example_counter_complete'); } };
})();

/* ================= Motion choreography (GSAP + ScrollTrigger) ================= */
window.addEventListener('DOMContentLoaded',function(){
  var html=document.documentElement;
  function bail(){ html.classList.remove('js-motion'); }
  /* How long after the head script GSAP became usable. A late library never replays the hero. */
  var lag=((window.performance&&performance.now())||0)-(window.__t0||0);
  var late=!!window.__motionLate||!html.classList.contains('js-motion');
  window.__motionRan=true;
  if(!window.gsap||!window.ScrollTrigger){ bail(); return; }
  clearTimeout(window.__motionFailsafe);
  try{ run(); }catch(err){ bail(); if(window.console) console.warn('motion disabled',err); }

  function run(){
    var gsap=window.gsap, ST=window.ScrollTrigger; gsap.registerPlugin(ST);
    var q=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))}, $=function(s){return document.querySelector(s)};
    var E={enter:'power3.out',mask:'expo.out',draw:'power2.inOut',settle:'power4.out'};
    var mm=gsap.matchMedia();

    mm.add({
      desk:'(prefers-reduced-motion: no-preference) and (min-width: 1024px)',
      mob:'(prefers-reduced-motion: no-preference) and (max-width: 1023px)',
      reduce:'(prefers-reduced-motion: reduce)'
    },function(ctx){
      var c=ctx.conditions;
      if(c.reduce){ html.classList.remove('js-motion'); if(window.hdCounterDone) window.hdCounterDone(); return; }
      var desk=c.desk;

      /* ---------- 3.1 Hero entrance ----------
         The H1, lead, CTA and card are visible in CSS from first paint (LCP-safe).
         Full choreography only when GSAP was ready within ~350ms, i.e. before the first paint had a chance to show them;
         otherwise only the decorative layer (tab, highlight, rules, Drew, stamp, checks) plays. Never replays. */
      var card=$('#plan');
      if(!window.__heroDone&&!late){
        window.__heroDone=true;
        var full=lag<=350, o=full?0:-.5;
        var tl=gsap.timeline({defaults:{ease:E.enter}});
        tl.fromTo('[data-h="tab"]',{opacity:0,y:8},{opacity:1,y:0,duration:.4},0);
        if(full){
          tl.from('.hero .h1 .line>span',{yPercent:108,duration:.76,ease:E.mask,stagger:.09},.06)
            .from(card,{opacity:0,y:48,rotate:desk?-2.4:0,duration:.82,ease:E.settle},.24)
            .from('[data-h="lead"]',{opacity:0,y:12,duration:.52},.42)
            .from('[data-h="cta"]',{opacity:0,y:12,duration:.48,stagger:.06},.5)
            .from('#plan [data-h="inner"]',{opacity:0,y:6,duration:.36,stagger:.04},.62);
        }
        tl.fromTo('#rows .rule',{scaleX:0},{scaleX:1,duration:.42,ease:E.draw,stagger:.05},Math.max(.1,.7+o))
          .fromTo('.hero .hl',{'--hl':0},{'--hl':1,duration:.6,ease:E.draw},Math.max(.15,.78+o))
          .fromTo('[data-h="drew"]',{opacity:0,x:desk?-40:0},{opacity:1,x:0,duration:.7},Math.max(.2,.86+o))
          .fromTo('[data-h="stamp"]',{opacity:0,scale:1.35,rotate:-10},{opacity:1,scale:1,rotate:-4,duration:.26,ease:E.settle},Math.max(.4,1.18+o))
          .fromTo('[data-h="check"]',{opacity:0},{opacity:1,duration:.4},Math.max(.45,1.24+o));
        tl.eventCallback('onComplete',function(){ html.classList.remove('js-motion'); gsap.set('[data-h], .hero .h1 .line>span',{clearProps:'opacity,transform'}); gsap.set('.hero .hl',{'--hl':1}); if(desk) gsap.set(card,{rotate:-.6}); });
      } else { html.classList.remove('js-motion'); }

      // Drew idle breathing (the one loop), paused off-screen
      var idle=gsap.to('#drew1 img',{y:-4,duration:2.2,ease:'sine.inOut',yoyo:true,repeat:-1,delay:1.45});
      ST.create({trigger:'#hero-stage',start:'top bottom',end:'bottom top',onToggle:function(s){ s.isActive?idle.resume():idle.pause(); }});

      if(desk){
        gsap.to('#drew1',{y:-60,ease:'none',scrollTrigger:{trigger:'#hero-stage',start:'top top',end:'bottom top',scrub:.4}});
        gsap.to('#plan-col',{y:-24,ease:'none',scrollTrigger:{trigger:'#hero-stage',start:'top top',end:'bottom top',scrub:.4}});
      }

      /* ---------- 3.2 Proof strip ---------- */
      gsap.timeline({scrollTrigger:{trigger:'#proof',start:'top 85%',once:true}})
        .from('.proof-rule',{scaleX:0,duration:.6,ease:E.draw})
        .from('.proof-cell',{opacity:0,y:8,duration:.5,stagger:.07,ease:E.enter},.2)
        .from('.proof-cell img',{scale:.85,duration:.5,ease:E.enter},.27);

      /* ---------- 3.3 Problem ---------- */
      gsap.timeline({scrollTrigger:{trigger:'#problem-h',start:'top 82%',once:true}})
        .from('#problem-h .l1',{opacity:0,y:16,duration:.6,ease:E.enter})
        .from('#problem-h .l2',{opacity:0,x:-12,duration:.6,ease:E.enter},.12)
        .from('.problem-body',{opacity:0,y:12,duration:.6,ease:E.enter},.2);
      gsap.timeline({scrollTrigger:{trigger:'#pull',start:'top 85%',once:true}})
        .fromTo('#pull',{'--rule':0},{'--rule':1,duration:.5,ease:E.draw})
        .from('#pull',{opacity:0,x:-8,duration:.4,ease:E.enter,clearProps:'opacity,transform'},.35);
      var nodes=q('.t-hd .node'), miss=$('#miss'), stamped=false;
      nodes.forEach(function(n){ n.classList.remove('is-on'); });
      gsap.set(miss,{opacity:0});
      gsap.fromTo('#rail-fill',{'--fill':0},{'--fill':1,ease:'none',scrollTrigger:{trigger:'#rail',start:'top 75%',end:'bottom 45%',scrub:.5,
        onUpdate:function(s){ var p=s.progress; nodes.forEach(function(n,i){ n.classList.toggle('is-on',p>=i/11-0.001&&p>0.01); });
          if(p>.98&&!stamped){ stamped=true; gsap.fromTo(miss,{opacity:0,scale:1.35,rotate:-10},{opacity:1,scale:1,rotate:-4,duration:.26,ease:E.settle}); } }}});
      gsap.from('#rail-key p',{opacity:0,y:8,duration:.5,stagger:.1,ease:E.enter,scrollTrigger:{trigger:'#rail-key',start:'top 88%',once:true}});

      /* ---------- 3.4 How it works ---------- */
      var bub=$('.v2 .bub'), chip2=$('.v1 .vchip.sel'), v3boxes=q('.v3 .box.on');
      function vig(step){
        if(step===1){ chip2.classList.remove('sel'); setTimeout(function(){chip2.classList.add('sel')},500); }
        if(step===2){ bub.classList.add('is-typing'); gsap.fromTo(bub,{scale:.92,opacity:0},{scale:1,opacity:1,duration:.32,ease:E.settle}); setTimeout(function(){ bub.classList.remove('is-typing'); gsap.from('.v2 .msg',{opacity:0,duration:.3}); },700); }
        if(step===3){ v3boxes.forEach(function(b){b.classList.remove('on')}); v3boxes.forEach(function(b,i){ setTimeout(function(){b.classList.add('on')},200+i*180); }); }
      }
      gsap.from('#hiw-sheet',{y:40,rotate:.6,duration:.8,ease:E.settle,scrollTrigger:{trigger:'#hiw-sheet',start:'top 88%',once:true}});
      if(desk){
        gsap.from('.hiw-col',{opacity:0,x:-24,duration:.6,stagger:.12,ease:E.enter,scrollTrigger:{trigger:'#hiw-grid',start:'top 90%',once:true}});
        ST.create({trigger:'#hiw-grid',start:'top 80%',once:true,onEnter:function(){ [1,2,3].forEach(function(s,i){ setTimeout(function(){vig(s)},600+i*120); }); }});
      } else {
        document.addEventListener('hiw:view',function(e){ vig(e.detail); });
      }

      /* ---------- 3.5 Strategies ---------- */
      gsap.from('#strat-h .l1',{opacity:0,y:16,duration:.6,ease:E.enter,scrollTrigger:{trigger:'#strat-h',start:'top 85%',once:true}});
      gsap.from('#strat-h .l2',{opacity:0,x:-12,duration:.6,delay:.12,ease:E.enter,scrollTrigger:{trigger:'#strat-h',start:'top 85%',once:true}});
      var order=['.t-kids','.t-drew','.t-aug','.t-solo','.t-acc','.t-hsa','.t-hra','.t-ira','.t-529'].map($);
      gsap.set(order,{opacity:0,y:20,scale:.98});
      ST.batch(order,{start:'top 88%',once:true,onEnter:function(batch){
        batch.sort(function(a,b){return order.indexOf(a)-order.indexOf(b)});
        gsap.to(batch,{opacity:1,y:0,scale:1,duration:.52,ease:E.enter,stagger:.06,clearProps:'transform'});
        batch.forEach(function(t,i){ var ci=t.querySelector('.cite'); if(ci) gsap.from(ci,{yPercent:100,duration:.48,ease:E.mask,delay:.12+i*.06,clearProps:'transform'}); });
      }});
      /* Scrubbed parallax is desktop-only: phones get once-only reveals, nothing tied to the scroll wheel. */
      if(desk) q('.t-kids .doc, .t-acc .doc').forEach(function(a){ gsap.fromTo(a,{y:26},{y:-14,ease:'none',scrollTrigger:{trigger:a.parentNode,start:'top bottom',end:'bottom top',scrub:.6}}); });
      if(desk) gsap.fromTo('.t-drew img',{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:'#t-drew',start:'top bottom',end:'bottom top',scrub:.6}});
      gsap.timeline({scrollTrigger:{trigger:'#t-drew',start:'top 60%',once:true}})
        .from('.t-drew .capcard',{y:16,opacity:0,duration:.5,ease:E.enter},.2)
        .from('.t-drew .bubble',{scale:.9,opacity:0,duration:.24,ease:E.settle},.5);
      gsap.timeline({scrollTrigger:{trigger:'#stub',start:'top 88%',once:true}})
        .fromTo('.stub-cover',{scaleX:1},{scaleX:0,duration:.5,ease:E.draw})
        .from('#stub .btn',{opacity:0,duration:.4},.35);

      /* ---------- 3.6 Illustrative example (the one pin) ---------- */
      /* The total is never tied to scroll position: it counts once (1.2s) and holds. The ILLUSTRATIVE stamp lands first. */
      var rows=q('.lg-row'), num=$('#ex-num'), proxy={v:0}, counted=false;
      function fmt(v){ return (Math.round(v/100)*100).toLocaleString('en-US'); }
      function count(){
        if(counted) return; counted=true;
        gsap.fromTo('#ill-stamp',{scale:1.35,rotate:-8},{scale:1,rotate:-3,duration:.26,ease:E.settle});
        gsap.fromTo(proxy,{v:0},{v:135000,duration:1.2,delay:.2,ease:'power2.out',onUpdate:function(){num.textContent=fmt(proxy.v)},onComplete:function(){
          num.textContent='135,000'; gsap.to('.dbl.a',{scaleX:1,duration:.3,ease:E.draw}); gsap.to('.dbl.b',{scaleX:1,duration:.3,delay:.04,ease:E.draw});
          window.hdCounterDone&&window.hdCounterDone(); }});
      }
      gsap.set('.dbl',{scaleX:0});
      if(desk&&innerHeight>=720){
        var ptl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:'#ex-pin',start:'top 72px',end:'+=70%',pin:true,scrub:.6,anticipatePin:1,onEnter:count}});
        rows.forEach(function(r,i){ var at=i*.16;
          ptl.fromTo(r,{opacity:0,x:-12},{opacity:1,x:0,duration:.14},at).fromTo(r.querySelector('.hair'),{scaleX:0},{scaleX:1,duration:.14},at); });
        ptl.to({},{duration:.2});
        ST.create({trigger:'#ex-pin',start:'top 60%',once:true,onEnter:count});
      } else {
        gsap.set(rows,{opacity:0});
        ST.create({trigger:'#ledger',start:'top 50%',once:true,onEnter:function(){
          gsap.to(rows,{opacity:1,duration:.4,stagger:.09}); count();
        }});
      }
      gsap.timeline({scrollTrigger:{trigger:'#honest',start:'top 82%',once:true}})
        .from('#honest .qm',{scale:.6,opacity:0,duration:.4,ease:E.settle})
        .from('#honest blockquote',{opacity:0,duration:.5},.15);

      /* ---------- 3.7 Portal diorama ---------- */
      if(desk){
        var ptr={trigger:'#p-stage',start:'top bottom',end:'bottom top',scrub:.8};
        gsap.fromTo('#p-back img',{yPercent:-7,xPercent:-1},{yPercent:7,xPercent:1,ease:'none',scrollTrigger:ptr});
        gsap.fromTo('#p-drew',{y:70},{y:-40,ease:'none',scrollTrigger:Object.assign({},ptr)});
        gsap.fromTo('#p-fg',{y:90},{y:-90,ease:'none',scrollTrigger:Object.assign({},ptr)});
      }
      var pc=gsap.timeline({scrollTrigger:{trigger:'.p-copy',start:'top 78%',once:true}});
      pc.fromTo('.p-copy .h2 .line>span',{yPercent:108},{yPercent:0,duration:.76,ease:E.mask,stagger:.09});
      q('.p-list li').forEach(function(li,i){ pc.from(li.querySelector('.ck'),{scale:0,duration:.3,ease:E.settle},.4+i*.11).from(li.querySelector('.tx'),{opacity:0,duration:.3},.48+i*.11); });
      pc.from('.p-copy .cta-row',{opacity:0,y:10,duration:.4,ease:E.enter},.8);

      /* ---------- 3.8 Testimonials ---------- */
      var jq=$('#jess-q');
      if(!desk){ gsap.from('#jess',{opacity:0,y:12,duration:.6,ease:E.enter,scrollTrigger:{trigger:'#jess',start:'top 85%',once:true}}); }
      else if(!jq.querySelector('.w')){ jq.innerHTML=jq.textContent.split(' ').map(function(w){return '<span class="w">'+w+'</span>'}).join(' '); }
      if(desk) ST.create({trigger:'#jess',start:'top 80%',once:true,onEnter:function(){
        var ws=q('.w',jq), tops=[], idx=ws.map(function(w){ var t=w.offsetTop; var i=tops.indexOf(t); if(i<0){tops.push(t); i=tops.length-1;} return i; });
        gsap.fromTo(ws,{opacity:0,y:10},{opacity:1,y:0,duration:.52,ease:E.enter,delay:function(i){return idx[i]*.07}});
        gsap.from('#jess .who',{opacity:0,y:8,duration:.5,delay:tops.length*.07+.2});
      }});
      if(desk) q('#tcols .tq').forEach(function(t){ gsap.from(t,{opacity:0,y:10,duration:.5,ease:E.enter,scrollTrigger:{trigger:t,start:'top 88%',once:true}}); });
      if(desk) gsap.fromTo('#tcol-r',{y:48},{y:-48,ease:'none',scrollTrigger:{trigger:'#tcols',start:'top bottom',end:'bottom top',scrub:.6}});

      /* ---------- 3.9 Team ---------- */
      gsap.timeline({scrollTrigger:{trigger:'#photo',start:'top 75%',once:true}})
        .fromTo('#photo .wipe',{scaleY:1},{scaleY:0,duration:.9,ease:'power4.inOut'},0)
        .fromTo('#photo img',{scale:1.08},{scale:1,duration:1.2,ease:E.enter},0);
      gsap.timeline({scrollTrigger:{trigger:'.note',start:'top 82%',once:true}})
        .from('.note p:first-child',{opacity:0,y:12,duration:.6,ease:E.enter})
        .from('.sig',{opacity:0,duration:.5},.2);
      gsap.timeline({scrollTrigger:{trigger:'.split2',start:'top 82%',once:true}})
        .from('.s-ai',{opacity:0,y:14,duration:.56,ease:E.enter},0)
        .from('.s-team',{opacity:0,y:14,duration:.56,ease:E.enter},.1)
        .from('.team-cta',{opacity:0,duration:.5},.3);

      /* ---------- 3.10 Pricing ---------- */
      gsap.timeline({scrollTrigger:{trigger:'#terms',start:'top 82%',once:true}})
        .from('#terms',{opacity:0,y:24,duration:.56,ease:E.settle})
        .from('#terms .clause',{opacity:0,duration:.4,stagger:.06},.2)
        .from('#terms .sec-n',{x:-6,duration:.4,stagger:.06,ease:E.enter},.2);
      gsap.from('#secure .ck',{scale:0,duration:.3,stagger:.1,ease:E.settle,scrollTrigger:{trigger:'#secure',start:'top 90%',once:true}});

      /* ---------- 3.11 FAQ ---------- */
      gsap.from('#faq-l',{opacity:0,duration:.6,scrollTrigger:{trigger:'#faq',start:'top 80%',once:true}});
      gsap.from('#acc',{opacity:0,y:24,duration:.6,ease:E.settle,scrollTrigger:{trigger:'#acc',start:'top 85%',once:true}});

      /* ---------- 3.12 Final CTA ---------- */
      gsap.set('#final-hl',{'--hl':0});
      var ft=gsap.timeline({scrollTrigger:{trigger:'#final',start:'top 70%',once:true}});
      ft.from('#final-h',{opacity:0,y:16,duration:.6,ease:E.enter},0)
        .to('#final-hl',{'--hl':1,duration:.6,ease:E.draw},.3)
        .to('#f-img',{y:-12,duration:.2,ease:'power2.out'},.1).to('#f-img',{y:0,duration:.32,ease:'back.out(2.2)'},.3)
        .to('#f-shadow',{scale:.82,duration:.2,ease:'power2.out'},.1).to('#f-shadow',{scale:1,duration:.32,ease:'back.out(2.2)'},.3)
        .from('#f-bub',{scale:.88,opacity:0,duration:.26,ease:E.settle},.84)
        .from('#final-cta .btn',{opacity:0,y:10,duration:.4,stagger:.06,ease:E.enter},.4);

      return function(){ idle.kill(); };
    });

    var refresh=function(){ ST.refresh(); };
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(refresh);
    var pimg=document.querySelector('#p-back img'); if(pimg&&pimg.decode) pimg.decode().then(refresh).catch(function(){});
    window.addEventListener('load',refresh);
  }
});
