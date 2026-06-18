"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Palette ───────────────────────────────────────────── */
const C = {
  bg:"#FAFAF8", bgAlt:"#F4F3FF", bgCard:"#FFFFFF",
  indigo:"#4F46E5", indigoDk:"#3730A3", indigoLt:"#EEF2FF",
  gold:"#F59E0B", goldLt:"#FFFBEB",
  charcoal:"#1C1917", slate:"#44403C", muted:"#78716C", subtle:"#A8A29E",
  border:"#E7E5E4", borderLt:"#F5F5F4",
  success:"#059669", warn:"#D97706", danger:"#DC2626",
};

/* ─── Hooks ─────────────────────────────────────────────── */
const useInView=(t=0.12)=>{
  const r=useRef(null);const[v,sV]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)sV(true)},{threshold:t});
    if(r.current)o.observe(r.current);return()=>o.disconnect();
  },[]);return[r,v];
};
const useCount=(target,dur=1600,go=false)=>{
  const[n,sN]=useState(0);
  useEffect(()=>{
    if(!go)return;let s=null;
    const f=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/dur,1);sN(Math.round((1-Math.pow(1-p,3))*target));if(p<1)requestAnimationFrame(f);};
    requestAnimationFrame(f);
  },[go,target,dur]);return n;
};

/* ─── Fonts & Keyframes ─────────────────────────────────── */
const GFONT=`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap');`;

const KF=`
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes techScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes barGrow{from{width:0}}
@keyframes morphBlob{0%{border-radius:50%}25%{border-radius:58% 42% 32% 68%/60% 32% 68% 40%}50%{border-radius:32% 58% 68% 42%/48% 60% 32% 62%}75%{border-radius:42% 58% 58% 42%/68% 32% 52% 48%}100%{border-radius:50%}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes spinCCW{to{transform:rotate(-360deg)}}
@keyframes shimLine{0%,100%{opacity:.2}50%{opacity:1}}
@keyframes dotFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes gradTextAnim{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes letterIn{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}
@keyframes lineExpand{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes orb1{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.6}50%{transform:translate(-50%,-50%) scale(1.1);opacity:1}}
@keyframes orb2{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
@keyframes scanLine{0%{top:0}100%{top:100%}}
@keyframes pulseRing{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.6);opacity:0}}
@keyframes drawPath{from{stroke-dashoffset:300}to{stroke-dashoffset:0}}
@keyframes fadeSlideRight{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:none}}
@keyframes countUp{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:none}}
@keyframes wipeIn{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0% 0 0)}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 0 0 rgba(79,70,229,.35)}60%{box-shadow:0 0 0 8px rgba(79,70,229,0)}}
@keyframes checkDraw{to{stroke-dashoffset:0}}
@keyframes circDraw{to{stroke-dashoffset:0}}
@keyframes riseIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes ringExpand{0%{transform:scale(.85);opacity:.5}100%{transform:scale(1.7);opacity:0}}
`;

const GLOBAL=`
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#FAFAF8;color:#1C1917;overflow-x:hidden;font-family:'Poppins',sans-serif}
a{text-decoration:none;color:inherit}
button,input,select,textarea{font-family:inherit}
.dn-mob{display:flex}
.only-mob{display:none}
@media(max-width:900px){
  .svc-grid{grid-template-columns:repeat(2,1fr)!important}
  .ctc-grid{grid-template-columns:1fr!important}
  .ctc-side{display:none!important}
}
@media(min-width:901px){
  .ctc-grid{grid-template-columns:1.15fr .85fr!important}
}
@media(max-width:768px){
  .dn-mob{display:none!important}
  .only-mob{display:flex!important}
  .g1{grid-template-columns:1fr!important}
  .pad{padding-left:1.25rem!important;padding-right:1.25rem!important}
  .spy{padding-top:3.5rem!important;padding-bottom:3.5rem!important}
  .sub-w{max-width:100%!important}
  .pipe-g{grid-template-columns:1fr 1fr!important}
  .perf-g{grid-template-columns:1fr!important}
  .inv-row{flex-direction:column!important;align-items:flex-start!important}
  .inv-amt{font-size:1.4rem!important}
}
@media(max-width:560px){
  .svc-grid{grid-template-columns:1fr!important}
}
@media(max-width:480px){
  .pad{padding-left:1rem!important;padding-right:1rem!important}
  .frow{grid-template-columns:1fr!important}
  .pipe-g{grid-template-columns:1fr!important}
}
`;

/* ─── Atoms ─────────────────────────────────────────────── */
const FU=({children,d=0,s={}})=>{
  const[r,v]=useInView();
  return <div ref={r} style={{opacity:v?1:0,transform:v?"none":"translateY(26px)",transition:`opacity .7s ${d}s cubic-bezier(.22,1,.36,1),transform .7s ${d}s cubic-bezier(.22,1,.36,1)`,...s}}>{children}</div>;
};

const scrollToId=(e,href)=>{
  if(!href||!href.startsWith("#"))return;
  e.preventDefault();
  const el=document.querySelector(href);
  if(el){
    const y=el.getBoundingClientRect().top+window.pageYOffset-64;
    window.scrollTo({top:y,behavior:"smooth"});
  }
};

const Btn=({children,href,onClick,v="fill",s={}})=>{
  const[h,sH]=useState(false);
  const base={display:"inline-block",padding:".65rem 1.6rem",borderRadius:10,fontSize:".875rem",fontWeight:700,cursor:"pointer",textDecoration:"none",border:"none",fontFamily:"inherit",transition:"all .18s cubic-bezier(.22,1,.36,1)",letterSpacing:".2px",lineHeight:1};
  const fill={background:h?C.indigoDk:C.indigo,color:"#fff",boxShadow:h?"0 14px 32px rgba(79,70,229,.38)":"0 4px 14px rgba(79,70,229,.18)",transform:h?"translateY(-2px)":"none"};
  const out={background:h?C.indigoLt:"transparent",color:C.indigo,border:`1.5px solid ${C.indigo}`,transform:h?"translateY(-2px)":"none"};
  const Tag=href?"a":"button";
  const handleClick=e=>{ if(href&&href.startsWith("#"))scrollToId(e,href); if(onClick)onClick(e); };
  return <Tag href={href} onClick={handleClick} style={{...base,...(v==="fill"?fill:out),...s}} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)}>{children}</Tag>;
};

const Chip=({children})=>(
  <div style={{display:"inline-flex",alignItems:"center",gap:".4rem",background:C.indigoLt,color:C.indigo,padding:".28rem .9rem",borderRadius:100,fontSize:".7rem",fontWeight:700,letterSpacing:"1.5px",textTransform:"uppercase",marginBottom:".9rem"}}>
    <span style={{width:5,height:5,borderRadius:"50%",background:C.indigo,flexShrink:0}}/>
    {children}
  </div>
);
const H2=({children})=>(
  <h2 style={{fontFamily:"'Poppins',sans-serif",fontSize:"clamp(1.7rem,4vw,2.8rem)",fontWeight:800,color:C.charcoal,lineHeight:1.12,marginBottom:"1rem",letterSpacing:"-.5px"}}>{children}</h2>
);
const Sub=({children})=>(
  <p className="sub-w" style={{color:C.muted,fontSize:"1rem",lineHeight:1.8,maxWidth:540,marginBottom:"2.5rem"}}>{children}</p>
);

/* ─── Particle Canvas ────────────────────────────────────── */
const ParticleCanvas=()=>{
  const ref=useRef(null);
  useEffect(()=>{
    const c=ref.current;if(!c)return;
    const ctx=c.getContext("2d");let W,H,pts=[],raf;
    const resize=()=>{W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;};
    resize();window.addEventListener("resize",resize);
    for(let i=0;i<48;i++)pts.push({x:Math.random()*W||Math.random()*1200,y:Math.random()*H||Math.random()*700,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.6+.5});
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(79,70,229,.4)";ctx.fill();});
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<130){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(79,70,229,${.15*(1-d/130)})`;ctx.lineWidth=.7;ctx.stroke();}}
      raf=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
};

/* ─── Animated Title ─────────────────────────────────────── */
const AnimTitle=()=>{
  const lines=["Le site web qui transforme","vos visiteurs en clients."];
  const[shown,sS]=useState(false);
  useEffect(()=>{const t=setTimeout(()=>sS(true),180);return()=>clearTimeout(t);},[]);
  return(
    <h1 style={{fontFamily:"'Poppins',sans-serif",fontSize:"clamp(2.4rem,7.5vw,5.4rem)",fontWeight:800,lineHeight:1.08,color:C.charcoal,letterSpacing:"-2px",marginBottom:"1.5rem"}}>
      {lines.map((line,li)=>(
        <div key={li} style={{overflow:"hidden",display:"block"}}>
          {li===1
            ? <span style={{background:`linear-gradient(90deg,${C.indigo},${C.gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",display:"inline-block",opacity:shown?1:0,transform:shown?"none":"translateY(40px)",transition:`opacity .55s .28s cubic-bezier(.22,1,.36,1),transform .55s .28s cubic-bezier(.22,1,.36,1)`}}>{line}</span>
            : <span style={{display:"inline-block",opacity:shown?1:0,transform:shown?"none":"translateY(40px)",transition:`opacity .5s .04s cubic-bezier(.22,1,.36,1),transform .5s .04s cubic-bezier(.22,1,.36,1)`}}>{line}</span>
          }
        </div>
      ))}
    </h1>
  );
};

/* ─── Hero ───────────────────────────────────────────────── */
const ICONS={
  bolt:(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.indigo} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>),
  target:(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.indigo} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></svg>),
  handshake:(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.indigo} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>),
  lock:(<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.indigo} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>),
};
const HeroStats=()=>{
  const[r,v]=useInView(.2);
  const items=[
    {icon:ICONS.bolt,title:"Réponse 24h",sub:"Devis sous un jour"},
    {icon:ICONS.target,title:"100% sur mesure",sub:"Zéro template"},
    {icon:ICONS.handshake,title:"Suivi inclus",sub:"Après la livraison"},
    {icon:ICONS.lock,title:"Sans engagement",sub:"Premier échange offert"},
  ];
  return(
    <div ref={r} style={{display:"flex",gap:"clamp(.8rem,3vw,2.5rem)",flexWrap:"wrap",justifyContent:"center",paddingTop:"2.5rem",borderTop:`1px solid ${C.border}`}}>
      {items.map((it,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:".7rem",textAlign:"left",opacity:v?1:0,transform:v?"none":"translateY(14px)",transition:`opacity .6s ${i*.1}s ease,transform .6s ${i*.1}s ease`}}>
          <div style={{width:38,height:38,borderRadius:10,background:C.indigoLt,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{it.icon}</div>
          <div>
            <div style={{fontFamily:"'Poppins',sans-serif",fontSize:".9rem",fontWeight:800,color:C.charcoal,lineHeight:1.1}}>{it.title}</div>
            <div style={{fontSize:".7rem",color:C.subtle,marginTop:".15rem"}}>{it.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Hero=()=>{
  const targets=["artisans","commerçants","PME & TPE","indépendants"];
  const[wi,sWi]=useState(0);const[fade,sF]=useState(true);
  useEffect(()=>{const t=setInterval(()=>{sF(false);setTimeout(()=>{sWi(i=>(i+1)%targets.length);sF(true)},340)},2800);return()=>clearInterval(t);},[]);
  return(
    <section id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"7rem 1.5rem 4rem",position:"relative",overflow:"hidden",background:C.bg}}>
      <ParticleCanvas/>
      <div style={{position:"absolute",top:"50%",left:"50%",width:"min(600px,120vw)",height:"min(600px,120vw)",borderRadius:"50%",background:"radial-gradient(ellipse,rgba(79,70,229,.07) 0%,transparent 68%)",animation:"orb1 8s ease-in-out infinite",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:"12%",right:"6%",width:"min(180px,38vw)",height:"min(180px,38vw)",borderRadius:"50%",background:"radial-gradient(ellipse,rgba(245,158,11,.09) 0%,transparent 70%)",animation:"orb2 11s ease-in-out infinite",pointerEvents:"none"}}/>

      <div style={{position:"relative",zIndex:1,maxWidth:820,width:"100%"}}>
        {/* Accroche région — sobre et pro */}
        <div style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:"rgba(255,255,255,.88)",border:`1px solid ${C.border}`,padding:".35rem 1.1rem",borderRadius:100,fontSize:".75rem",color:C.slate,fontWeight:500,marginBottom:"2rem",boxShadow:"0 2px 16px rgba(0,0,0,.06)",animation:"floatY 4s ease-in-out infinite",backdropFilter:"blur(8px)"}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:C.success,flexShrink:0,animation:"glowPulse 2s ease-in-out infinite"}}/>
          Création de sites web & CRM sur mesure
        </div>

        <AnimTitle/>

        <p style={{fontSize:"clamp(.95rem,2.5vw,1.15rem)",color:C.muted,lineHeight:1.75,maxWidth:560,margin:"0 auto 2.5rem",animation:"letterIn .7s .7s both cubic-bezier(.22,1,.36,1)"}}>
          Stratégie, design et développement pour les{" "}
          <span style={{color:C.indigo,fontWeight:700,display:"inline-block",minWidth:140,opacity:fade?1:0,transition:"opacity .34s ease"}}>{targets[wi]}</span>
          {" "}qui veulent dominer leur marché local.
        </p>

        <div style={{display:"flex",gap:".9rem",justifyContent:"center",flexWrap:"wrap",marginBottom:"3.5rem",animation:"letterIn .7s .85s both cubic-bezier(.22,1,.36,1)"}}>
          <Btn href="#contact">Obtenir mon devis gratuit →</Btn>
          <Btn href="#services" v="out">Explorer les offres</Btn>
        </div>

        <div style={{animation:"letterIn .7s 1s both cubic-bezier(.22,1,.36,1)"}}>
          <HeroStats/>
        </div>
      </div>
    </section>
  );
};

/* ─── Services ───────────────────────────────────────────── */
// Toutes les cartes utilisent la même palette — pas de mise en avant bleue isolée.
// La carte vedette ("star") utilise charcoal profond, sobre et premium.
const SVCS=[
  {icon:"globe",name:"Site vitrine",desc:"Un site rapide, optimisé SEO et animé qui représente votre activité avec professionnalisme.",price:"À partir de 990 €"},
  {icon:"cart",name:"E-commerce",desc:"Boutique en ligne fluide avec tunnel d'achat optimisé, paiement sécurisé et back-office clair.",price:"À partir de 1 900 €"},
  {icon:"diamond",name:"Site + CRM intégré",desc:"Votre vitrine digitale et votre outil de pilotage réunis. Leads, devis, facturation : tout en un.",price:"À partir de 2 500 €",star:true},
  {icon:"refresh",name:"Refonte stratégique",desc:"Diagnostic complet, nouveau design, performances améliorées et référencement renforcé.",price:"À partir de 790 €"},
  {icon:"search",name:"Référencement local",desc:"Visibilité maximale sur votre territoire : Google, cartographie, citations locales.",price:"À partir de 390 €"},
  {icon:"gear",name:"Maintenance & évolution",desc:"Je reste partenaire après la mise en ligne. Votre site grandit avec votre activité.",price:"Dès 49 €/mois"},
];
const SvcIcon=({n})=>{
  const p={width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"};
  switch(n){
    case"globe":return<svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"/></svg>;
    case"cart":return<svg {...p}><circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none"/><circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none"/><path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21 7H6"/></svg>;
    case"diamond":return<svg {...p}><path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M2 9h20M9 3l1 6-2 12M15 3l-1 6 2 12"/></svg>;
    case"refresh":return<svg {...p}><path d="M21 12a9 9 0 0 1-15.5 6.4M3 12a9 9 0 0 1 15.5-6.4"/><path d="M21 4v5h-5M3 20v-5h5"/></svg>;
    case"search":return<svg {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
    case"gear":return<svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.6 7.6 0 0 0-1.7-1L15 3h-4l-.3 2.4a7.6 7.6 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7.6 7.6 0 0 0 1.7 1L11 21h4l.3-2.4a7.6 7.6 0 0 0 1.7-1l2.4 1 2-3.4Z"/></svg>;
    default:return null;
  }
};
const SC=({s,d})=>{
  const[r,v]=useInView();const[h,sH]=useState(false);
  return(
    <div ref={r} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)}
      style={{
        background: s.star ? `linear-gradient(135deg, ${C.indigoLt} 0%, #F0EFFE 100%)` : C.bgCard,
        border: s.star ? `1.5px solid ${C.indigo}` : `1px solid ${h ? C.indigo : C.border}`,
        borderRadius:16, padding:"1.75rem",
        opacity:v?1:0, transform:v?(h?"translateY(-5px)":"none"):"translateY(26px)",
        transition:`opacity .6s ${d}s ease,transform .6s ${d}s ease,box-shadow .2s,border-color .2s`,
        boxShadow:h
          ? (s.star?"0 20px 48px rgba(79,70,229,.22)":"0 14px 40px rgba(0,0,0,.1)")
          : (s.star?"0 6px 24px rgba(79,70,229,.14)":"0 2px 8px rgba(0,0,0,.04)"),
        cursor:"default", position:"relative", overflow:"hidden",
      }}>
      {s.star&&(
        <>
          <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${C.indigo},${C.gold})`}}/>
          <div style={{position:"absolute",top:12,right:14,background:C.indigo,color:"#fff",fontSize:".6rem",fontWeight:700,letterSpacing:"1px",padding:".18rem .55rem",borderRadius:100,textTransform:"uppercase"}}>Recommandé</div>
        </>
      )}
      <div style={{width:42,height:42,borderRadius:11,background:s.star?"rgba(79,70,229,.14)":C.indigoLt,color:C.indigo,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:".9rem"}}><SvcIcon n={s.icon}/></div>
      <div style={{fontSize:"1rem",fontWeight:700,fontFamily:"'Poppins',sans-serif",color:C.charcoal,marginBottom:".45rem"}}>{s.name}</div>
      <div style={{fontSize:".85rem",color:C.muted,lineHeight:1.7}}>{s.desc}</div>
      <div style={{marginTop:"1.2rem",fontSize:".85rem",fontWeight:700,color:C.indigo}}>{s.price}</div>
    </div>
  );
};
const Services=()=>(
  <section id="services" style={{padding:"5rem 1.5rem",background:C.bgAlt}} className="spy pad">
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <FU><Chip>Offres</Chip></FU>
      <FU d={.05}><H2>Des prestations pensées <span style={{color:C.indigo}}>pour résoudre de vrais problèmes</span></H2></FU>
      <FU d={.1}><Sub>Pas de template générique. Chaque projet est construit autour de votre activité, de votre clientèle et de vos objectifs.</Sub></FU>
      <div className="svc-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.2rem"}}>
        {SVCS.map((s,i)=><SC key={i} s={s} d={i*.07}/>)}
      </div>
    </div>
  </section>
);

/* ─── Process ────────────────────────────────────────────── */
const STEPS=[
  {n:"01",t:"Cadrage stratégique",d:"On analyse votre marché, vos concurrents et vos objectifs. Je vous propose une approche sur mesure, pas un forfait clé en main."},
  {n:"02",t:"Design & direction artistique",d:"Maquette haute-fidélité validée avant développement. Votre identité visuelle au centre de chaque choix."},
  {n:"03",t:"Développement & intégration",d:"Code propre, animations soignées, SEO technique et performances optimisées dès le premier jour."},
  {n:"04",t:"Recette & ajustements",d:"Tests poussés sur tous les supports. Vous gardez la main jusqu'à satisfaction complète."},
  {n:"05",t:"Lancement & transmission",d:"Mise en ligne maîtrisée, formation à l'outil, documentation remise. Vous êtes autonomes."},
];
const PSt=({s,delay,last})=>{
  const[r,v]=useInView();
  return(
    <div ref={r} style={{display:"flex",gap:"1.4rem",alignItems:"flex-start",paddingBottom:last?0:"2rem",position:"relative",opacity:v?1:0,transform:v?"none":"translateX(-22px)",transition:`opacity .65s ${delay}s ease,transform .65s ${delay}s ease`}}>
      {!last&&<div style={{position:"absolute",left:19,top:42,bottom:0,width:2,background:`linear-gradient(180deg,${C.indigo},${C.indigoLt})`}}/>}
      <div style={{width:40,height:40,borderRadius:"50%",background:C.indigo,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Poppins',sans-serif",fontSize:".75rem",fontWeight:800,flexShrink:0,zIndex:1,boxShadow:"0 4px 16px rgba(79,70,229,.32)"}}>{s.n}</div>
      <div><h3 style={{fontSize:"1rem",fontWeight:700,fontFamily:"'Poppins',sans-serif",color:C.charcoal,marginBottom:".3rem"}}>{s.t}</h3><p style={{fontSize:".875rem",color:C.muted,lineHeight:1.7}}>{s.d}</p></div>
    </div>
  );
};
const Process=()=>(
  <section id="process" style={{padding:"5rem 1.5rem",background:C.bg}} className="spy pad">
    <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,300px),1fr))",gap:"3.5rem",alignItems:"center"}} className="g1">
      <div>
        <FU><Chip>Méthode</Chip></FU>
        <FU d={.05}><H2>Cinq étapes. <span style={{color:C.indigo}}>Zéro surprise.</span></H2></FU>
        <FU d={.1}><Sub>Un processus structuré qui protège votre investissement et garantit un résultat à la hauteur de vos attentes.</Sub></FU>
      </div>
      <div>{STEPS.map((s,i)=><PSt key={i} s={s} delay={i*.1} last={i===STEPS.length-1}/>)}</div>
    </div>
  </section>
);

/* ─── Tech Scroll ────────────────────────────────────────── */
const TECHS=["React.js","Next.js","TypeScript","Tailwind CSS","Node.js","Framer Motion","GSAP","Three.js","Prisma","PostgreSQL","Stripe","Vercel","Figma","WordPress","SEO technique","Google Analytics"];
const TechScroll=()=>(
  <div style={{overflow:"hidden",padding:"2.5rem 0",background:C.bgAlt,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
    <div style={{display:"flex",gap:"1.4rem",animation:"techScroll 28s linear infinite",width:"max-content"}}>
      {[...TECHS,...TECHS].map((t,i)=>(
        <span key={i} style={{background:C.bgCard,border:`1px solid ${C.border}`,padding:".42rem 1.2rem",borderRadius:100,fontSize:".8rem",color:C.slate,whiteSpace:"nowrap",fontWeight:500}}>{t}</span>
      ))}
    </div>
  </div>
);

/* ─── ANIM SHOWCASE ──────────────────────────────────────── */

/* Demo A — Scroll Reveal : vrai wireframe animé */
const DemoScrollReveal=({vis})=>(
  <div style={{display:"flex",flexDirection:"column",gap:8,width:"100%"}}>
    {[
      {w:"100%",h:12,bg:C.indigo,r:5,d:.05},
      {w:"68%",h:8,bg:"rgba(79,70,229,.2)",r:4,d:.16},
      {w:"85%",h:8,bg:"rgba(79,70,229,.12)",r:4,d:.27},
      {w:"100%",h:44,bg:"linear-gradient(135deg,#EEF2FF,#F4F3FF)",r:8,d:.38,isImg:true},
      {w:110,h:26,bg:C.indigo,r:7,d:.5,lbl:"Démarrer →"},
    ].map((b,i)=>(
      <div key={i} style={{height:b.h,borderRadius:b.r,background:b.bg,width:b.w,opacity:vis?1:0,transform:vis?"none":`translateY(${10+i*7}px)`,transition:`all .55s ${b.d}s cubic-bezier(.22,1,.36,1)`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",flexShrink:0}}>
        {b.isImg&&<div style={{width:"100%",height:"100%",background:`repeating-linear-gradient(45deg,rgba(79,70,229,.06) 0px,rgba(79,70,229,.06) 4px,transparent 4px,transparent 12px)`,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:9,color:C.indigo,fontWeight:600,letterSpacing:1}}>HERO IMAGE</span></div>}
        {b.lbl&&<span style={{color:"#fff",fontSize:10,fontWeight:700,fontFamily:"'Poppins',sans-serif"}}>{b.lbl}</span>}
      </div>
    ))}
  </div>
);

/* Demo B — SVG Path Drawing */
const DemoSVGPath=({vis})=>(
  <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:80}}>
    <svg viewBox="0 0 200 80" style={{width:"100%",maxWidth:200,height:80}} fill="none">
      <path d="M10 60 C 40 60, 60 20, 100 20 S 160 60, 190 60" stroke={C.border} strokeWidth="2" fill="none"/>
      <path d="M10 60 C 40 60, 60 20, 100 20 S 160 60, 190 60"
        stroke={C.indigo} strokeWidth="2.5" fill="none" strokeLinecap="round"
        strokeDasharray="300" strokeDashoffset={vis?"0":"300"}
        style={{transition:vis?"stroke-dashoffset 1.2s .1s cubic-bezier(.22,1,.36,1)":"none"}}/>
      {vis&&<circle cx="100" cy="20" r="5" fill={C.gold} style={{animation:"glowPulse 2s ease-in-out infinite"}}/>}
      <text x="10" y="76" fill={C.subtle} fontSize="8" fontFamily="'Fira Code',monospace">performance</text>
      <text x="155" y="76" fill={C.subtle} fontSize="8" fontFamily="'Fira Code',monospace">résultats</text>
    </svg>
  </div>
);

/* Demo C — Morphing + concentric rings */
const DemoMorphRings=()=>(
  <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:80,position:"relative"}}>
    <div style={{position:"relative",width:64,height:64,display:"flex",alignItems:"center",justifyContent:"center"}}>
      {[52,40,28].map((sz,i)=>(
        <div key={i} style={{position:"absolute",width:sz,height:sz,borderRadius:"50%",border:`${i===2?2:1}px solid ${i===0?"rgba(79,70,229,.12)":i===1?"rgba(79,70,229,.22)":C.indigo}`,animation:i%2===0?"spin "+(6+i*2)+"s linear infinite":"spinCCW "+(5+i*2)+"s linear infinite"}}/>
      ))}
      <div style={{width:16,height:16,background:`linear-gradient(135deg,${C.indigo},${C.gold})`,animation:"morphBlob 4s ease-in-out infinite",borderRadius:"50%"}}/>
    </div>
    <div style={{marginLeft:16,display:"flex",flexDirection:"column",gap:6}}>
      {[1,2,3].map(i=>(
        <div key={i} style={{width:i===2?44:30,height:6,borderRadius:3,background:i===1?C.indigo:i===2?C.gold:"rgba(79,70,229,.18)",animation:`shimLine ${1.2+i*.3}s ${i*.18}s ease-in-out infinite`}}/>
      ))}
    </div>
  </div>
);

/* Demo D — Compteur live avec progress ring */
const DemoCounter=({vis})=>{
  const val=useCount(94,1800,vis);
  const r=26, circ=2*Math.PI*r;
  const offset=circ-(val/100)*circ;
  return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:18,width:"100%",height:80}}>
      <div style={{position:"relative",width:64,height:64}}>
        <svg width="64" height="64" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} fill="none" stroke={C.borderLt} strokeWidth="4"/>
          <circle cx="32" cy="32" r={r} fill="none" stroke={C.indigo} strokeWidth="4"
            strokeDasharray={circ} strokeDashoffset={vis?offset:circ} strokeLinecap="round"
            style={{transition:"stroke-dashoffset 1.8s .1s cubic-bezier(.22,1,.36,1)",transformOrigin:"50% 50%",transform:"rotate(-90deg)"}}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Poppins',sans-serif",fontSize:".9rem",fontWeight:800,color:C.indigo}}>{val}%</div>
      </div>
      <div>
        <div style={{fontSize:".8rem",fontWeight:700,color:C.charcoal,fontFamily:"'Poppins',sans-serif"}}>Satisfaction</div>
        <div style={{fontSize:".72rem",color:C.subtle,marginTop:".15rem"}}>clients 2024</div>
      </div>
    </div>
  );
};

/* Demo E — Micro-interactions réelles */
const DemoMicro=()=>{
  const[h,sH]=useState(null);const[active,sA]=useState(false);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:8,width:"100%"}}>
      {[{l:"Planifier un appel",fill:true},{l:"Voir les réalisations",fill:false}].map((b,i)=>(
        <div key={i} onMouseEnter={()=>sH(i)} onMouseLeave={()=>sH(null)} onClick={()=>i===0&&sA(v=>!v)}
          style={{padding:"9px 14px",borderRadius:9,background:h===i?(b.fill?C.indigo:C.indigoLt):(b.fill?"transparent":C.bgAlt),border:`1.5px solid ${(h===i||b.fill)?C.indigo:C.border}`,color:h===i?(b.fill?"#fff":C.indigo):(b.fill?C.indigo:C.muted),fontSize:11,fontWeight:700,textAlign:"center",cursor:"pointer",transition:"all .18s cubic-bezier(.22,1,.36,1)",transform:h===i?"translateY(-2px)":"none",boxShadow:h===i&&b.fill?"0 8px 22px rgba(79,70,229,.28)":"none",fontFamily:"'Poppins',sans-serif",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
          {i===0&&<span style={{width:6,height:6,borderRadius:"50%",background:h===0?"#fff":C.success,flexShrink:0,transition:".2s"}}/>}
          {i===0&&active?"Envoi en cours…":b.l}
        </div>
      ))}
    </div>
  );
};

/* Demo F — Gradient typographie animé */
const DemoGradText=()=>(
  <div style={{textAlign:"center",width:"100%"}}>
    <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:"clamp(1.1rem,3vw,1.5rem)",background:`linear-gradient(270deg,${C.indigo},${C.gold},#EC4899,${C.indigo})`,backgroundSize:"300% 100%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"gradTextAnim 3.5s ease infinite",letterSpacing:"-1px",lineHeight:1.1}}>
      Webaly
    </div>
    <div style={{marginTop:8,height:2,background:`linear-gradient(90deg,${C.indigo},${C.gold},#EC4899)`,borderRadius:100,transformOrigin:"left",animation:"lineExpand 2s ease-in-out infinite alternate"}}/>
    <div style={{marginTop:10,display:"flex",justifyContent:"center",gap:8}}>
      {[C.indigo,C.gold,"#10B981","#EC4899"].map((col,i)=>(
        <div key={i} style={{width:7,height:7,borderRadius:"50%",background:col,animation:`dotFloat ${1.4+i*.28}s ${i*.18}s ease-in-out infinite`}}/>
      ))}
    </div>
  </div>
);

const DEMOS=[
  {id:"scroll",label:"Scroll Reveal",sub:"Éléments orchestrés à l'entrée dans le viewport",demo:(v)=><DemoScrollReveal vis={v}/>},
  {id:"svg",label:"Animation SVG & tracé",sub:"Courbes, chemins et graphiques animés au pixel",demo:(v)=><DemoSVGPath vis={v}/>},
  {id:"morph",label:"Morphing & anneaux",sub:"Formes organiques et rotations concentriques",demo:()=><DemoMorphRings/>},
  {id:"counter",label:"Données en mouvement",sub:"Compteurs, progress rings et dashboards",demo:(v)=><DemoCounter vis={v}/>},
  {id:"micro",label:"Interactions pilotées",sub:"Hover, états, feedback visuel temps réel",demo:()=><DemoMicro/>},
  {id:"grad",label:"Typographie cinétique",sub:"Dégradés animés, reveals et effets texte",demo:()=><DemoGradText/>},
];

const DCard=({card,i})=>{
  const[r,v]=useInView(.08);const[h,sH]=useState(false);
  return(
    <div ref={r} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)}
      style={{background:C.bgCard,border:`1.5px solid ${h?C.indigo:C.border}`,borderRadius:16,padding:"1.5rem",opacity:v?1:0,transform:v?(h?"translateY(-6px)":"none"):"translateY(26px)",transition:`opacity .6s ${i*.08}s ease,transform .6s ${i*.08}s ease,border-color .2s,box-shadow .2s`,boxShadow:h?"0 16px 44px rgba(79,70,229,.11)":"0 2px 8px rgba(0,0,0,.04)",cursor:"default",display:"flex",flexDirection:"column",gap:"1rem"}}>
      <div style={{minHeight:90,display:"flex",alignItems:"center"}}>{card.demo(v)}</div>
      <div>
        <div style={{fontSize:".875rem",fontWeight:700,color:C.charcoal,fontFamily:"'Poppins',sans-serif",marginBottom:".2rem"}}>{card.label}</div>
        <div style={{fontSize:".78rem",color:C.subtle}}>{card.sub}</div>
      </div>
    </div>
  );
};

const AnimShowcase=()=>(
  <section id="animations" style={{padding:"5rem 1.5rem",background:C.bg}} className="spy pad">
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <FU><Chip>Motion design</Chip></FU>
      <FU d={.05}><H2>Des animations qui <span style={{background:`linear-gradient(135deg,${C.indigo},${C.gold})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>servent votre objectif</span></H2></FU>
      <FU d={.1}><Sub>Chaque effet est justifié par un objectif UX : retenir l'attention, confirmer une action ou guider le regard vers le CTA.</Sub></FU>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,290px),1fr))",gap:"1.1rem"}}>
        {DEMOS.map((card,i)=><DCard key={card.id} card={card} i={i}/>)}
      </div>
      <FU d={.35}>
        <div style={{marginTop:"2.5rem",background:C.indigoLt,border:`1.5px solid rgba(79,70,229,.18)`,borderRadius:16,padding:"clamp(1.4rem,4vw,2rem) clamp(1.4rem,5vw,2.5rem)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"1rem"}}>
          <div>
            <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:"clamp(.95rem,2.5vw,1.15rem)",color:C.charcoal,marginBottom:".4rem"}}>Prêt à avoir un site qui travaille pour vous&nbsp;?</div>
            <div style={{fontSize:".875rem",color:C.muted,maxWidth:420}}>Chaque animation, chaque interaction est développée sur mesure — pour votre identité, votre audience, vos objectifs.</div>
          </div>
          <Btn href="#contact" s={{flexShrink:0}}>Démarrer mon projet →</Btn>
        </div>
      </FU>
    </div>
  </section>
);

/* ─── Local ──────────────────────────────────────────────── */
const CITIES=["📍 Montval-sur-Loir","Le Mans","Tours","La Flèche","Sablé-sur-Sarthe","Château-du-Loir","Vendôme","Sarthe (72)","Indre-et-Loire (37)"];
const Local=()=>(
  <section style={{padding:"5rem 1.5rem",background:C.bgAlt}} className="spy pad">
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <FU><Chip>Territoire</Chip></FU>
      <FU d={.05}><H2>Un partenaire <span style={{color:C.indigo}}>ancré dans votre région</span></H2></FU>
      <FU d={.1}><Sub>Basé à Montval-sur-Loir, j'accompagne les entreprises de la Sarthe et de la Touraine, du Mans à Tours, dans leur développement digital.</Sub></FU>
      <FU d={.15}>
        <div style={{display:"flex",flexWrap:"wrap",gap:".6rem"}}>
          {CITIES.map((c,i)=>{
            const[h,sH]=useState(false);
            return(
              <span key={i} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)}
                style={{background:h?C.indigoLt:C.bgCard,border:`1px solid ${h?C.indigo:C.border}`,padding:".4rem 1rem",borderRadius:100,fontSize:".82rem",color:h?C.indigo:C.slate,fontWeight:i===0?700:400,transition:"all .18s",cursor:"default"}}>{c}</span>
            );
          })}
        </div>
      </FU>
    </div>
  </section>
);

/* ─── CRM ─────────────────────────────────────────────────── */
const TabIcon=({n})=>{
  const p={width:15,height:15,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",style:{flexShrink:0}};
  switch(n){
    case"dash":return <svg {...p}><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>;
    case"pipe":return <svg {...p}><rect x="3" y="5" width="5" height="14" rx="1"/><rect x="9.5" y="5" width="5" height="9" rx="1"/><rect x="16" y="5" width="5" height="11" rx="1"/></svg>;
    case"leads":return <svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="3.5"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.5a4 4 0 0 1 0 7"/></svg>;
    case"fact":return <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/></svg>;
    case"perf":return <svg {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
    case"bell":return <svg {...p}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>;
    default:return null;
  }
};
const TABS=[{ico:"dash",label:"Dashboard"},{ico:"pipe",label:"Pipeline"},{ico:"leads",label:"Leads"},{ico:"fact",label:"Facturation"},{ico:"perf",label:"Perfs"},{ico:"bell",label:"Relances"}];
const PIPE=[
  {title:"Leads",items:[{name:"Boulangerie Martin",val:"1 200 €",badge:"Nouveau",bg:"#EFF6FF",tc:"#2563EB"},{name:"Garage Lefort",val:"990 €",badge:"Nouveau",bg:"#EFF6FF",tc:"#2563EB"}]},
  {title:"Contacté",items:[{name:"Cabinet Durand",val:"2 500 €",badge:"Contacté",bg:"#F5F3FF",tc:"#7C3AED"}]},
  {title:"Devis",items:[{name:"Resto Le Vallon",val:"1 900 €",badge:"Envoyé",bg:"#FFFBEB",tc:"#D97706"},{name:"Plombier Roux",val:"790 €",badge:"Envoyé",bg:"#FFFBEB",tc:"#D97706"}]},
  {title:"Signé",items:[{name:"Agence Immo Loire",val:"3 200 €",badge:"Signé ✓",bg:"#F0FDF4",tc:"#16A34A"}]},
  {title:"Prod.",items:[{name:"Menuiserie Petit",val:"1 500 €",badge:"En cours",bg:"#FFF7ED",tc:"#EA580C"}]},
  {title:"Livré",items:[{name:"Pharmacie Vidal",val:"2 100 €",badge:"Livré",bg:"#F9FAFB",tc:"#6B7280"}]},
];
const LEADS=[
  {name:"Boulangerie Martin",city:"Le Mans",svc:"Site vitrine",bud:"1 200 €",status:"Nouveau",dc:"#2563EB",date:"Auj."},
  {name:"Garage Lefort",city:"La Flèche",svc:"Refonte",bud:"990 €",status:"Nouveau",dc:"#2563EB",date:"Hier"},
  {name:"Cabinet Durand",city:"Tours",svc:"Site + CRM",bud:"2 500 €",status:"Contacté",dc:"#7C3AED",date:"03/06"},
  {name:"Resto Le Vallon",city:"Tours",svc:"E-commerce",bud:"1 900 €",status:"Devis",dc:"#D97706",date:"01/06"},
  {name:"Agence Immo Loire",city:"Le Mans",svc:"Site + CRM",bud:"3 200 €",status:"Signé",dc:"#16A34A",date:"28/05"},
];
// Facturation redesignée — montants centrés, présentation carte soignée
const INVS=[
  {num:"FAC-2024-018",cl:"Pharmacie Vidal",svc:"Site vitrine",amt:"2 100",st:"Payée",sc:"#059669",sbg:"#ECFDF5",date:"15/05"},
  {num:"FAC-2024-019",cl:"Agence Immo Loire",svc:"Site + CRM (acompte)",amt:"1 600",st:"Payée",sc:"#059669",sbg:"#ECFDF5",date:"02/06"},
  {num:"FAC-2024-020",cl:"Resto Le Vallon",svc:"E-commerce",amt:"1 900",st:"En attente",sc:"#D97706",sbg:"#FFFBEB",date:"08/06"},
  {num:"FAC-2024-021",cl:"Plombier Roux",svc:"Site vitrine",amt:"790",st:"En retard",sc:"#DC2626",sbg:"#FEF2F2",date:"28/05"},
];
const PERFS=[
  {lbl:"Taux de conversion",val:"67 %",pct:67},
  {lbl:"CA mensuel moyen",val:"7 200 €",pct:75},
  {lbl:"Panier moyen",val:"1 880 €",pct:55},
  {lbl:"Satisfaction",val:"95 %",pct:95},
];
const RELS=[
  {name:"Plombier Roux",sub:"Devis 790 € · envoyé le 28/05",days:"🔴 19j sans réponse",label:"19j sans réponse",col:"#DC2626"},
  {name:"Resto Le Vallon",sub:"Devis 1 900 € · envoyé le 01/06",days:"🟡 15j sans réponse",label:"15j sans réponse",col:"#D97706"},
  {name:"Cabinet Durand",sub:"1er contact effectué · Tours",days:"🟡 10j sans suite",label:"10j sans suite",col:"#D97706"},
  {name:"Garage Lefort",sub:"Lead entrant · La Flèche",days:"🔵 À contacter",label:"À contacter",col:"#2563EB"},
];

const CRM=()=>{
  const[tab,sT]=useState(0);
  return(
    <section id="crm" style={{padding:"5rem 1.5rem",background:C.bg}} className="spy pad">
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <FU><Chip>Espace de gestion intégré</Chip></FU>
        <FU d={.05}><H2>Votre cockpit <span style={{color:C.indigo}}>de pilotage commercial</span></H2></FU>
        <FU d={.1}><Sub>Leads entrants, pipeline de vente, facturation et relances — tout ce dont vous avez besoin pour ne jamais laisser une opportunité filer.</Sub></FU>
        <FU d={.15}>
          <div style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:20,overflow:"hidden",boxShadow:"0 8px 40px rgba(0,0,0,.08)"}}>
            <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
              {TABS.map((t,i)=>(
                <button key={i} onClick={()=>sT(i)} style={{display:"flex",alignItems:"center",gap:".4rem",padding:".8rem 1rem",fontSize:".78rem",border:"none",cursor:"pointer",background:"transparent",whiteSpace:"nowrap",flexShrink:0,color:tab===i?C.indigo:C.muted,fontWeight:tab===i?700:500,borderBottom:tab===i?`2px solid ${C.indigo}`:"2px solid transparent",transition:"color .2s"}}><TabIcon n={t.ico}/>{t.label}</button>
              ))}
            </div>
            <div style={{padding:"1.5rem",overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
              {tab===0&&(
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:"1rem",marginBottom:"1.25rem"}}>
                    {[{v:"12",l:"Leads ce mois",t:"↑ +4 vs mois dernier",tc:C.success},{v:"3",l:"Devis en attente",t:"→ À relancer",tc:C.warn},{v:"8 400 €",l:"CA ce mois",t:"↑ +22%",tc:C.success},{v:"67 %",l:"Conversion",t:"↑ +5 pts",tc:C.success}].map((k,i)=>(
                      <div key={i} style={{background:C.bgAlt,border:`1px solid ${C.border}`,borderRadius:12,padding:"1rem"}}>
                        <div style={{fontFamily:"'Poppins',sans-serif",fontSize:"clamp(1.2rem,3vw,1.5rem)",fontWeight:800,color:C.indigo}}>{k.v}</div>
                        <div style={{fontSize:".7rem",color:C.subtle,marginTop:".2rem"}}>{k.l}</div>
                        <div style={{fontSize:".7rem",color:k.tc,marginTop:".2rem",fontWeight:600}}>{k.t}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{fontSize:".78rem",color:C.subtle,textAlign:"center"}}>Naviguez dans les onglets pour explorer toutes les fonctionnalités</p>
                </div>
              )}
              {tab===1&&(
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(105px,1fr))",gap:".75rem"}} className="pipe-g">
                  {PIPE.map((col,ci)=>(
                    <div key={ci} style={{background:C.bgAlt,border:`1px solid ${C.border}`,borderRadius:10,padding:".75rem"}}>
                      <div style={{fontSize:".62rem",fontWeight:700,letterSpacing:"1px",color:C.subtle,marginBottom:".65rem",textTransform:"uppercase"}}>{col.title}</div>
                      {col.items.map((it,ii)=>(
                        <div key={ii} style={{background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:8,padding:".55rem .65rem",marginBottom:".4rem"}}>
                          <div style={{fontSize:".72rem",fontWeight:600,color:C.charcoal,marginBottom:".1rem"}}>{it.name}</div>
                          <div style={{fontSize:".65rem",color:C.indigo,fontFamily:"monospace",marginBottom:".2rem"}}>{it.val}</div>
                          <span style={{fontSize:".58rem",fontWeight:700,padding:".12rem .38rem",borderRadius:4,background:it.bg,color:it.tc}}>{it.badge}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
              {tab===2&&(
                <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",fontSize:".78rem",minWidth:440}}>
                    <thead><tr>{["Contact","Ville","Service","Budget","Statut","Date"].map((h,i)=><th key={i} style={{textAlign:"left",padding:".6rem .7rem",color:C.subtle,fontWeight:600,borderBottom:`1px solid ${C.border}`,fontSize:".7rem",letterSpacing:".4px"}}>{h}</th>)}</tr></thead>
                    <tbody>{LEADS.map((l,i)=>(
                      <tr key={i} style={{borderBottom:`1px solid ${C.borderLt}`}}>
                        <td style={{padding:".7rem",fontWeight:600,color:C.charcoal}}>{l.name}</td>
                        <td style={{padding:".7rem",color:C.muted}}>{l.city}</td>
                        <td style={{padding:".7rem",color:C.muted}}>{l.svc}</td>
                        <td style={{padding:".7rem",color:C.indigo,fontFamily:"monospace",fontWeight:600}}>{l.bud}</td>
                        <td style={{padding:".7rem"}}><span style={{display:"inline-flex",alignItems:"center",gap:".3rem",fontSize:".74rem",fontWeight:600}}><span style={{width:6,height:6,borderRadius:"50%",background:l.dc,flexShrink:0}}/>{l.status}</span></td>
                        <td style={{padding:".7rem",color:C.subtle}}>{l.date}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              )}
              {/* FACTURATION — nouvelle présentation centrée, carte premium */}
              {tab===3&&(
                <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
                  {/* En-tête total */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:".5rem"}}>
                    {[{lbl:"Total encaissé",val:"3 700 €",c:C.success,bg:"#ECFDF5"},{lbl:"En attente",val:"2 690 €",c:C.warn,bg:"#FFFBEB"}].map((k,i)=>(
                      <div key={i} style={{background:k.bg,borderRadius:12,padding:"1rem 1.25rem",textAlign:"center"}}>
                        <div style={{fontSize:".7rem",color:C.subtle,marginBottom:".3rem",letterSpacing:".5px",textTransform:"uppercase"}}>{k.lbl}</div>
                        <div style={{fontFamily:"'Poppins',sans-serif",fontSize:"1.5rem",fontWeight:800,color:k.c}}>{k.val}</div>
                      </div>
                    ))}
                  </div>
                  {/* Lignes factures */}
                  {INVS.map((inv,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",background:C.bgAlt,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden"}}>
                      <div style={{width:4,alignSelf:"stretch",flexShrink:0,background:inv.sc}}/>
                      <div style={{flex:1,padding:".8rem .9rem",minWidth:0}}>
                        <div style={{fontSize:".62rem",fontFamily:"'Fira Code',monospace",color:C.subtle,marginBottom:".12rem"}}>{inv.num} · {inv.date}</div>
                        <div style={{fontSize:".85rem",fontWeight:700,color:C.charcoal,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{inv.cl}</div>
                        <div style={{fontSize:".72rem",color:C.muted,marginTop:".08rem"}}>{inv.svc}</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:".6rem",padding:".8rem .9rem",borderLeft:`1px solid ${C.border}`,flexShrink:0,minWidth:0}}>
                        <span style={{fontFamily:"'Poppins',sans-serif",fontSize:"1.05rem",fontWeight:800,color:C.charcoal,whiteSpace:"nowrap"}}>{inv.amt} €</span>
                        <span style={{fontSize:".68rem",fontWeight:700,padding:".22rem .55rem",borderRadius:6,background:inv.sbg,color:inv.sc,whiteSpace:"nowrap",flexShrink:0}}>{inv.st}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab===4&&(
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"1rem"}} className="perf-g">
                  {PERFS.map((p,i)=>(
                    <div key={i} style={{background:C.bgAlt,border:`1px solid ${C.border}`,borderRadius:12,padding:"1rem"}}>
                      <div style={{fontSize:".7rem",color:C.subtle,marginBottom:".5rem"}}>{p.lbl}</div>
                      <div style={{background:C.borderLt,borderRadius:100,height:6,overflow:"hidden"}}>
                        <div style={{height:"100%",borderRadius:100,background:`linear-gradient(90deg,${C.indigo},${C.gold})`,width:`${p.pct}%`,animation:"barGrow 1.1s ease both"}}/>
                      </div>
                      <div style={{fontFamily:"'Poppins',sans-serif",fontSize:"1.1rem",fontWeight:800,color:C.indigo,marginTop:".5rem"}}>{p.val}</div>
                    </div>
                  ))}
                </div>
              )}
              {tab===5&&(
                <div style={{display:"flex",flexDirection:"column",gap:".7rem"}}>
                  {RELS.map((r,i)=>(
                    <div key={i} style={{display:"grid",gridTemplateColumns:"1fr auto",alignItems:"center",gap:"1rem",background:C.bgAlt,border:`1px solid ${C.border}`,borderRadius:12,padding:".9rem 1.1rem"}}>
                      <div style={{minWidth:0}}>
                        <div style={{fontSize:".875rem",fontWeight:700,color:C.charcoal,marginBottom:".15rem"}}>{r.name}</div>
                        <div style={{fontSize:".75rem",color:C.subtle}}>{r.sub}</div>
                      </div>
                      <div style={{display:"inline-flex",alignItems:"center",gap:".4rem",background:r.col+"18",border:`1px solid ${r.col}33`,padding:".3rem .75rem",borderRadius:100,flexShrink:0}}>
                        <span style={{width:6,height:6,borderRadius:"50%",background:r.col,flexShrink:0}}/>
                        <span style={{fontSize:".75rem",fontWeight:700,color:r.col,whiteSpace:"nowrap"}}>{r.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </FU>
      </div>
    </section>
  );
};

/* ─── IA ──────────────────────────────────────────────────── */
const AIIcon=({n})=>{
  const p={width:22,height:22,viewBox:"0 0 24 24",fill:"none",stroke:C.indigo,strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"};
  switch(n){
    case"chat":return <svg {...p}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.6-.7L3 21l1.5-4.4A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></svg>;
    case"reco":return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6M8 11h6"/></svg>;
    case"content":return <svg {...p}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/></svg>;
    case"sort":return <svg {...p}><path d="M11 5h10M11 9h7M11 13h10M11 17h7"/><path d="m3 8 3-3 3 3M6 5v14"/></svg>;
    case"mail":return <svg {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>;
    case"chart":return <svg {...p}><path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6"/><rect x="12" y="7" width="3" height="10"/><rect x="17" y="13" width="3" height="4"/></svg>;
    default:return null;
  }
};
const Spark=({s={}})=>(
  <svg width="14" height="14" viewBox="0 0 24 24" fill={C.gold} style={s}><path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z"/></svg>
);
const AI_USES=[
  {ico:"chat",t:"Assistant intelligent 24/7",d:"Un chatbot entraîné sur votre activité qui répond aux visiteurs, oriente vers la bonne offre et qualifie les demandes — même la nuit.",tags:["Vitrine","E-commerce"]},
  {ico:"reco",t:"Recherche & recommandations",d:"Recherche en langage naturel et suggestions de produits personnalisées pour augmenter le panier moyen.",tags:["E-commerce"]},
  {ico:"content",t:"Génération de contenu",d:"Fiches produits, articles de blog optimisés SEO et textes de pages rédigés dans votre ton, en quelques secondes.",tags:["Vitrine","E-commerce"]},
  {ico:"sort",t:"Tri & priorisation des leads",d:"L'IA résume chaque demande entrante, détecte l'intention et fait remonter les leads les plus chauds en haut de votre pipeline.",tags:["CRM"]},
  {ico:"mail",t:"Réponses & relances assistées",d:"Des brouillons d'emails personnalisés et des relances suggérées au bon moment — vous validez, l'IA prépare.",tags:["CRM"]},
  {ico:"chart",t:"Synthèse & reporting",d:"Vos chiffres traduits en résumés clairs : tendances, points d'attention et prochaines actions, sans tableur à décrypter.",tags:["CRM"]},
];
const AICard=({u,d})=>{
  const[r,v]=useInView();const[h,sH]=useState(false);
  return(
    <div ref={r} onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)}
      style={{background:C.bgCard,border:`1px solid ${h?C.indigo:C.border}`,borderRadius:16,padding:"1.6rem",
        opacity:v?1:0,transform:v?(h?"translateY(-5px)":"none"):"translateY(26px)",
        transition:`opacity .6s ${d}s ease,transform .6s ${d}s ease,box-shadow .2s,border-color .2s`,
        boxShadow:h?"0 14px 40px rgba(79,70,229,.12)":"0 2px 8px rgba(0,0,0,.04)",position:"relative",overflow:"hidden"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:46,height:46,borderRadius:12,background:C.indigoLt,marginBottom:"1rem",position:"relative"}}>
        <AIIcon n={u.ico}/>
        <Spark s={{position:"absolute",top:-3,right:-3,filter:`drop-shadow(0 0 3px ${C.gold}88)`}}/>
      </div>
      <div style={{fontSize:"1rem",fontWeight:700,fontFamily:"'Poppins',sans-serif",color:C.charcoal,marginBottom:".45rem"}}>{u.t}</div>
      <div style={{fontSize:".85rem",color:C.muted,lineHeight:1.7,marginBottom:"1rem"}}>{u.d}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:".4rem"}}>
        {u.tags.map(tag=>(
          <span key={tag} style={{fontSize:".66rem",fontWeight:700,letterSpacing:".3px",color:C.slate,background:C.bgAlt,border:`1px solid ${C.border}`,padding:".18rem .55rem",borderRadius:100}}>{tag}</span>
        ))}
      </div>
    </div>
  );
};
const AIShowcase=()=>(
  <section id="ia" style={{padding:"5rem 1.5rem",background:C.bg}} className="spy pad">
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <FU><Chip>Intelligence artificielle</Chip></FU>
      <FU d={.05}><H2>L'IA intégrée <span style={{color:C.indigo}}>là où elle vous fait gagner du temps</span></H2></FU>
      <FU d={.1}><Sub>Pas de gadget. J'intègre l'intelligence artificielle de façon concrète et mesurée — sur une vitrine, une boutique ou un CRM — pour automatiser ce qui vous coûte des heures.</Sub></FU>
      <div className="svc-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.2rem"}}>
        {AI_USES.map((u,i)=><AICard key={i} u={u} d={i*.07}/>)}
      </div>
      <FU d={.1}>
        <p style={{marginTop:"2rem",textAlign:"center",fontSize:".85rem",color:C.subtle,lineHeight:1.7}}>
          Chaque intégration reste <strong style={{color:C.slate}}>simple à utiliser</strong>, respectueuse de vos données et adaptée à votre budget. On commence petit, on fait grandir si ça apporte de la valeur.
        </p>
      </FU>
    </div>
  </section>
);

/* ─── Contact ─────────────────────────────────────────────── */
// Formulaire connecté à Google Apps Script (enregistre dans Google Sheet + envoie un email)
const SCRIPT_URL="https://script.google.com/macros/s/AKfycbyhnW2nVRFZbJf2-V6xJ_Sd43_xHwVrWy3agKv7ePLMcblLt-m7VtxRWgy2JTpyBlFT/exec";

const SideIcon=({n})=>{
  const p={width:17,height:17,viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};
  switch(n){
    case"bolt":return <svg {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>;
    case"target":return <svg {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>;
    case"shield":return <svg {...p}><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></svg>;
    default:return null;
  }
};
const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const Contact=()=>{
  const[status,sStatus]=useState("idle"); // idle | sending | sent | error
  const[form,sForm]=useState({prenom:"",nom:"",email:"",tel:"",projet:"",message:""});
  const[errs,sErrs]=useState({}); // {prenom,email,tel}
  const[focus,sFocus]=useState("");
  const iS={width:"100%",background:C.bgAlt,border:`1.5px solid ${C.border}`,borderRadius:8,padding:".7rem 1rem",fontSize:".9rem",color:C.charcoal,outline:"none",transition:"border-color .15s"};
  const lS={display:"block",fontSize:".8rem",fontWeight:600,color:C.slate,marginBottom:".4rem"};
  // Bordure : bleu si focus, rouge si erreur, gris sinon
  const fS=k=>({...iS,borderColor:focus===k?C.indigo:(errs[k]?C.danger:C.border)});
  const fp=k=>({onFocus:()=>sFocus(k),onBlur:()=>sFocus("")});
  // À chaque frappe : on met à jour, on efface l'erreur du champ et le message global
  const upd=k=>e=>{const v=e.target.value;sForm(f=>({...f,[k]:v}));if(errs[k])sErrs(x=>({...x,[k]:false}));if(status==="error")sStatus("idle");};

  const submit=async()=>{
    // Validation : prénom requis, email et téléphone obligatoires + format vérifié
    const telDigits=form.tel.replace(/\D/g,"");
    const e={
      prenom:!form.prenom.trim(),
      email:!EMAIL_RE.test(form.email.trim()),
      tel:telDigits.length<8||telDigits.length>15,
    };
    if(e.prenom||e.email||e.tel){sErrs(e);sStatus("error");return;}
    sStatus("sending");
    try{
      await fetch(SCRIPT_URL,{
        method:"POST",
        mode:"no-cors",
        headers:{"Content-Type":"text/plain;charset=utf-8"},
        body:JSON.stringify({
          prenom:form.prenom, nom:form.nom, email:form.email,
          tel:form.tel, projet:form.projet, message:form.message,
        }),
      });
      // En mode no-cors la réponse n'est pas lisible, mais l'envoi part bien.
      // On considère donc que c'est envoyé.
      sStatus("sent");
    }catch(err){
      sStatus("error");
    }
  };

  return(
    <section id="contact" style={{padding:"5rem 1.5rem",background:C.bgAlt}} className="spy pad">
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <FU><Chip>Travaillons ensemble</Chip></FU>
        <FU d={.05}><H2>Parlons de ce que <span style={{color:C.indigo}}>vous voulez vraiment accomplir</span></H2></FU>
        <FU d={.1}><Sub>Pas de formulaire standardisé, pas de réponse automatique. Je vous lis personnellement et vous réponds sous 24h.</Sub></FU>
        <FU d={.15}>
          <div className="ctc-grid" style={{display:"grid",gridTemplateColumns:"1.15fr .85fr",gap:0,maxWidth:980,borderRadius:22,overflow:"hidden",boxShadow:"0 12px 50px rgba(28,25,23,.1)",border:`1px solid ${C.border}`}}>
            <div style={{background:C.bgCard,padding:"clamp(1.5rem,5vw,2.75rem)",position:"relative"}}>
            {status==="sent"?(
              <div style={{textAlign:"center",padding:"2rem .5rem"}}>
                <div style={{position:"relative",width:84,height:84,margin:"0 auto 1.5rem"}}>
                  <span style={{position:"absolute",inset:0,borderRadius:"50%",border:`1.5px solid ${C.indigo}`,animation:"ringExpand 2s ease-out infinite"}}/>
                  <svg width="84" height="84" viewBox="0 0 84 84" fill="none">
                    <circle cx="42" cy="42" r="38" stroke={C.indigo} strokeWidth="3" strokeLinecap="round" style={{strokeDasharray:239,strokeDashoffset:239,animation:"circDraw .7s cubic-bezier(.65,0,.35,1) both"}}/>
                    <path d="M26 43 37 54 59 31" stroke={C.indigo} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{strokeDasharray:48,strokeDashoffset:48,animation:"checkDraw .4s .55s cubic-bezier(.65,0,.35,1) both"}}/>
                  </svg>
                </div>
                <h3 style={{fontFamily:"'Poppins',sans-serif",fontSize:"1.5rem",fontWeight:800,color:C.charcoal,marginBottom:".5rem",animation:"riseIn .5s .3s both"}}>Demande envoyée, {form.prenom}.</h3>
                <p style={{color:C.muted,lineHeight:1.7,maxWidth:400,margin:"0 auto 1.75rem",animation:"riseIn .5s .42s both"}}>
                  Je l'étudie personnellement et je reviens vers vous <strong style={{color:C.indigo}}>sous 24h</strong> — souvent bien avant.
                </p>
                <div style={{display:"flex",flexDirection:"column",gap:".6rem",maxWidth:330,margin:"0 auto",textAlign:"left"}}>
                  {["Votre demande est bien enregistrée","Une réponse adaptée à votre projet","Pensez à vérifier vos spams au cas où"].map((t,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:".6rem",fontSize:".84rem",color:C.slate,animation:`riseIn .5s ${.6+i*.12}s both`}}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={C.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}><path d="M20 6 9 17l-5-5"/></svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            ):(
              <div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,190px),1fr))",gap:"1rem",marginBottom:"1rem"}} className="frow">
                  <div><label style={lS}>Prénom *</label><input value={form.prenom} onChange={upd("prenom")} placeholder="Jean" style={fS("prenom")} {...fp("prenom")}/></div>
                  <div><label style={lS}>Nom</label><input value={form.nom} onChange={upd("nom")} placeholder="Dupont" style={fS("nom")} {...fp("nom")}/></div>
                </div>
                <div style={{marginBottom:"1rem"}}><label style={lS}>Email *</label><input type="email" value={form.email} onChange={upd("email")} placeholder="vous@votreentreprise.fr" style={fS("email")} {...fp("email")}/></div>
                <div style={{marginBottom:"1rem"}}><label style={lS}>Téléphone *</label><input type="tel" value={form.tel} onChange={upd("tel")} placeholder="06 00 00 00 00" style={fS("tel")} {...fp("tel")}/></div>
                <div style={{marginBottom:"1rem"}}>
                  <label style={lS}>Type de projet</label>
                  <select value={form.projet} onChange={upd("projet")} style={{...fS("projet"),cursor:"pointer"}} {...fp("projet")}>
                    <option value="">Quel est votre besoin ?</option>
                    {["Création de site vitrine","Boutique e-commerce","Site + CRM sur mesure","Refonte stratégique","Référencement local","Autre (maintenance, SEO…)"].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:"1.25rem"}}>
                  <label style={lS}>Votre contexte</label>
                  <textarea value={form.message} onChange={upd("message")} placeholder="Décrivez votre activité, vos objectifs, ce qui bloque actuellement…" style={{...fS("message"),minHeight:100,resize:"vertical"}} {...fp("message")}/>
                </div>
                {status==="error"&&(
                  <div style={{marginBottom:"1rem",padding:".7rem 1rem",background:"#FEF2F2",border:`1px solid ${C.danger}33`,borderRadius:8,fontSize:".82rem",color:C.danger,fontWeight:600}}>
                    {errs.prenom||(!form.email||!form.tel)?"Merci de renseigner votre prénom, un email et un téléphone valides.":"Vérifiez le format de votre email et de votre numéro de téléphone."}
                  </div>
                )}
                <Btn s={{width:"100%",textAlign:"center",display:"block",opacity:status==="sending"?.7:1,pointerEvents:status==="sending"?"none":"auto"}} onClick={submit}>
                  {status==="sending"?"Envoi en cours…":"Envoyer ma demande →"}
                </Btn>
              </div>
            )}
            </div>
            <div className="ctc-side" style={{background:`linear-gradient(160deg,${C.indigoDk},${C.indigo})`,padding:"clamp(1.5rem,4vw,2.25rem)",color:"#fff",display:"flex",flexDirection:"column",justifyContent:"space-between",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-60,right:-60,width:180,height:180,borderRadius:"50%",background:"rgba(245,158,11,.18)",filter:"blur(10px)",animation:"floatY 5s ease-in-out infinite"}}/>
              <div style={{position:"relative",zIndex:1}}>
                <div style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:"1.15rem",marginBottom:"1.25rem"}}>Pourquoi me contacter ?</div>
                {[
                  {ico:"bolt",t:"Réponse rapide",d:"Sous 24h, parfois en quelques heures."},
                  {ico:"target",t:"Échange direct",d:"Pas d'intermédiaire, pas de formulaire robotisé."},
                  {ico:"shield",t:"Sans engagement",d:"On clarifie d'abord votre besoin réel."},
                ].map((it,i)=>(
                  <div key={i} style={{display:"flex",gap:".8rem",alignItems:"flex-start",marginBottom:"1.1rem"}}>
                    <span style={{flexShrink:0,width:34,height:34,borderRadius:9,background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center"}}><SideIcon n={it.ico}/></span>
                    <div>
                      <div style={{fontWeight:700,fontSize:".9rem",marginBottom:".15rem"}}>{it.t}</div>
                      <div style={{fontSize:".8rem",opacity:.78,lineHeight:1.5}}>{it.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{position:"relative",zIndex:1,paddingTop:"1.5rem",borderTop:"1px solid rgba(255,255,255,.18)",fontSize:".78rem",opacity:.85,lineHeight:1.6}}>
                « Réponse claire, sans jargon, sous 24h. »
              </div>
            </div>
          </div>
        </FU>
      </div>
    </section>
  );
};

/* ─── Nav ─────────────────────────────────────────────────── */
const Nav=()=>{
  const[open,sO]=useState(false);
  const links=[["Offres","#services"],["Méthode","#process"],["Motion","#animations"],["CRM","#crm"],["IA","#ia"],["Contact","#contact"]];
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:"rgba(250,250,248,.94)",backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:1140,margin:"0 auto",padding:"0 1.5rem",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <a href="#hero" onClick={e=>scrollToId(e,"#hero")} style={{fontFamily:"'Poppins',sans-serif",fontWeight:800,fontSize:"1.3rem",letterSpacing:"-.5px",color:C.charcoal,cursor:"pointer"}}>
          Web<span style={{color:C.indigo}}>aly</span>
        </a>
        <ul className="dn-mob" style={{gap:"1.75rem",listStyle:"none"}}>
          {links.map(([l,h])=>(
            <li key={l}><a href={h} onClick={e=>scrollToId(e,h)} style={{color:C.muted,fontSize:".875rem",fontWeight:500,transition:"color .2s",cursor:"pointer"}} onMouseEnter={e=>e.target.style.color=C.charcoal} onMouseLeave={e=>e.target.style.color=C.muted}>{l}</a></li>
          ))}
        </ul>
        <a href="#contact" onClick={e=>scrollToId(e,"#contact")} className="dn-mob" style={{display:"inline-block",padding:".65rem 1.6rem",borderRadius:10,fontSize:".875rem",fontWeight:700,cursor:"pointer",background:C.indigo,color:"#fff",boxShadow:"0 4px 14px rgba(79,70,229,.18)",transition:"all .18s",lineHeight:1}} onMouseEnter={e=>{e.currentTarget.style.background=C.indigoDk;e.currentTarget.style.transform="translateY(-2px)"}} onMouseLeave={e=>{e.currentTarget.style.background=C.indigo;e.currentTarget.style.transform="none"}}>Démarrer un projet</a>
        <button className="only-mob" onClick={()=>sO(!open)} style={{background:"none",border:"none",cursor:"pointer",padding:".25rem",flexDirection:"column",gap:5,alignItems:"center",justifyContent:"center"}}>
          {[0,1,2].map(i=>(
            <span key={i} style={{display:"block",width:22,height:2,background:C.charcoal,borderRadius:2,transition:".25s",transform:open?(i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"none"):"none",opacity:open&&i===1?0:1}}/>
          ))}
        </button>
      </div>
      {open&&(
        <div style={{background:C.bgCard,borderTop:`1px solid ${C.border}`,padding:"1rem 1.5rem"}}>
          {links.map(([l,h])=>(
            <a key={l} href={h} onClick={e=>{scrollToId(e,h);sO(false)}} style={{display:"block",padding:".75rem 0",color:C.slate,fontWeight:500,borderBottom:`1px solid ${C.borderLt}`,fontSize:".95rem",cursor:"pointer"}}>{l}</a>
          ))}
          <a href="#contact" onClick={e=>{scrollToId(e,"#contact");sO(false)}} style={{display:"block",marginTop:"1rem",padding:".7rem",textAlign:"center",borderRadius:10,background:C.indigo,color:"#fff",fontWeight:700,fontSize:".875rem",cursor:"pointer"}}>Démarrer un projet</a>
        </div>
      )}
    </nav>
  );
};

/* ─── Footer ──────────────────────────────────────────────── */
const Footer=()=>{
  const[modal,sM]=useState(null);
  const links=[["Offres","#services"],["Méthode","#process"],["Motion","#animations"],["CRM","#crm"],["IA","#ia"],["Contact","#contact"]];
  return(
    <>
      <footer style={{background:C.charcoal,padding:"3rem 1.5rem",textAlign:"center"}}>
        <div style={{fontFamily:"'Poppins',sans-serif",fontSize:"1.35rem",fontWeight:800,color:"#fff",marginBottom:".75rem",letterSpacing:"-.5px"}}>
          Web<span style={{color:"#A5B4FC"}}>aly</span>
        </div>
        <p style={{fontSize:".82rem",color:"rgba(255,255,255,.42)",lineHeight:1.8}}>
          Création de sites web & CRM sur mesure<br/>
          Sarthe · Le Mans · Tours · Touraine
        </p>
        <div style={{display:"flex",gap:"1.25rem",justifyContent:"center",marginTop:"1.5rem",flexWrap:"wrap"}}>
          {links.map(([l,h])=>(
            <a key={l} href={h} onClick={e=>scrollToId(e,h)} style={{fontSize:".78rem",color:"rgba(255,255,255,.38)",transition:"color .2s",cursor:"pointer"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.38)"}>{l}</a>
          ))}
          <span onClick={()=>sM("legal")} style={{fontSize:".78rem",color:"rgba(255,255,255,.38)",transition:"color .2s",cursor:"pointer"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.38)"}>Mentions légales</span>
          <span onClick={()=>sM("privacy")} style={{fontSize:".78rem",color:"rgba(255,255,255,.38)",transition:"color .2s",cursor:"pointer"}} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.38)"}>Confidentialité</span>
        </div>
        <p style={{fontSize:".7rem",color:"rgba(255,255,255,.18)",marginTop:"1.5rem"}}>© 2024 Webaly — Tous droits réservés</p>
      </footer>

      {modal&&(
        <div onClick={()=>sM(null)} style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(28,25,23,.55)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1.5rem"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:C.bgCard,borderRadius:18,maxWidth:560,width:"100%",maxHeight:"82vh",overflowY:"auto",boxShadow:"0 24px 80px rgba(0,0,0,.3)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1.5rem 1.75rem",borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,background:C.bgCard}}>
              <h3 style={{fontFamily:"'Poppins',sans-serif",fontSize:"1.1rem",fontWeight:800,color:C.charcoal}}>{modal==="legal"?"Mentions légales":"Politique de confidentialité"}</h3>
              <button onClick={()=>sM(null)} style={{background:C.bgAlt,border:"none",width:30,height:30,borderRadius:8,cursor:"pointer",fontSize:"1rem",color:C.muted,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
            </div>
            <div style={{padding:"1.75rem",fontSize:".85rem",color:C.slate,lineHeight:1.8}}>
              {modal==="legal"?(
                <>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Éditeur du site</p>
                  <p style={{marginBottom:"1rem"}}>Webaly — entreprise individuelle (auto-entrepreneur)<br/>Immatriculation en cours (SIRET à venir)<br/>Email : contact@webaly.fr<br/>Téléphone : 07 71 55 53 38</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Directeur de la publication</p>
                  <p style={{marginBottom:"1rem"}}>Le représentant légal de Webaly.</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Hébergement</p>
                  <p style={{marginBottom:"1rem"}}>Netlify, Inc.<br/>512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis<br/>netlify.com</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Propriété intellectuelle</p>
                  <p style={{marginBottom:"1rem"}}>L'ensemble des contenus de ce site (textes, visuels, code, identité graphique) est la propriété exclusive de Webaly, sauf mention contraire. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite et constitue une contrefaçon.</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Responsabilité</p>
                  <p style={{marginBottom:"1rem"}}>Webaly s'efforce d'assurer l'exactitude des informations diffusées sur ce site, sans pouvoir en garantir l'exhaustivité. La responsabilité de Webaly ne saurait être engagée en cas d'indisponibilité temporaire du site ou de dommages résultant de son utilisation.</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Liens hypertextes</p>
                  <p style={{marginBottom:"1rem"}}>Ce site peut contenir des liens vers des sites tiers. Webaly n'exerce aucun contrôle sur ces ressources externes et décline toute responsabilité quant à leur contenu.</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Droit applicable</p>
                  <p>Les présentes mentions sont régies par le droit français. Tout litige relève de la compétence des tribunaux français.</p>
                </>
              ):(
                <>
                  <p style={{marginBottom:"1.25rem"}}>Webaly accorde une grande importance à la protection de vos données personnelles. La présente politique décrit, conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi « Informatique et Libertés », la manière dont vos données sont collectées et traitées.</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Responsable du traitement</p>
                  <p style={{marginBottom:"1rem"}}>Webaly — entreprise individuelle. Contact : contact@webaly.fr · 07 71 55 53 38.</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Données collectées</p>
                  <p style={{marginBottom:"1rem"}}>Via le formulaire de contact : prénom, nom, adresse email, numéro de téléphone, type de projet et message. Aucune donnée sensible n'est demandée. Les champs marqués d'un astérisque sont obligatoires pour traiter votre demande.</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Finalités &amp; base légale</p>
                  <p style={{marginBottom:"1rem"}}>Vos données sont utilisées uniquement pour répondre à votre demande, établir un devis et assurer le suivi de notre relation commerciale. La base légale est votre consentement (envoi du formulaire) et l'intérêt légitime de Webaly à répondre aux sollicitations.</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Destinataires</p>
                  <p style={{marginBottom:"1rem"}}>Vos données sont destinées au seul responsable du traitement. Elles ne sont ni vendues, ni louées, ni cédées à des tiers à des fins commerciales. Elles peuvent transiter par nos prestataires techniques (hébergement, traitement du formulaire via Google) agissant comme sous-traitants.</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Durée de conservation</p>
                  <p style={{marginBottom:"1rem"}}>Vos données sont conservées le temps nécessaire au traitement de votre demande, puis pendant une durée maximale de 3 ans à compter de notre dernier contact, avant suppression. Les données liées à une relation contractuelle sont conservées selon les obligations légales applicables.</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Cookies</p>
                  <p style={{marginBottom:"1rem"}}>Ce site ne dépose pas de cookies publicitaires ni de traceurs de suivi à des fins marketing. Seuls les cookies strictement nécessaires au fonctionnement du site peuvent être utilisés.</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Vos droits</p>
                  <p style={{marginBottom:"1rem"}}>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données. Vous pouvez exercer ces droits à tout moment en écrivant à <strong style={{color:C.indigo}}>contact@webaly.fr</strong>. Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).</p>
                  <p style={{fontWeight:700,color:C.charcoal,marginBottom:".25rem"}}>Sécurité</p>
                  <p>Webaly met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès, altération ou divulgation non autorisés.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ─── App ─────────────────────────────────────────────────── */
export default function WeblyLanding(){
  return(
    <>
      <style>{GFONT+KF+GLOBAL}</style>
      <Nav/>
      <Hero/>
      <Services/>
      <Process/>
      <TechScroll/>
      <AnimShowcase/>
      <Local/>
      <CRM/>
      <AIShowcase/>
      <Contact/>
      <Footer/>
    </>
  );
}