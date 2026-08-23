import { useEffect, useMemo, useState } from 'react'

export interface BrokenByDesignProps {
  assetsBase?: string
  title?: string
  height?: string
  interactive?: boolean
  className?: string
}

type Piece = { id: string; x: number; y: number; w: number; h: number; cx: number; cy: number; ring: number }

const DESKTOP: Piece[] = [
  { id:'desktop-01a',x:80.214,y:5.299,w:15.445,h:72.943,cx:87.96,cy:41.83,ring:2 },
  { id:'desktop-01b',x:92.39,y:31.004,w:6.144,h:52.762,cx:95.32,cy:58.4,ring:2 },
  { id:'desktop-02a',x:31.285,y:7.44,w:15.614,h:40.023,cx:38.98,cy:27.34,ring:1 },
  { id:'desktop-02b',x:5.073,y:6.313,w:31.567,h:39.572,cx:20.94,cy:26.04,ring:1 },
  { id:'desktop-02c',x:4.791,y:9.808,w:19.786,h:25.93,cx:14.63,cy:22.6,ring:1 },
  { id:'desktop-03a',x:18.771,y:38.444,w:28.636,h:52.649,cx:32.92,cy:64.66,ring:1 },
  { id:'desktop-03b',x:4.735,y:35.964,w:15.558,h:11.612,cx:12.63,cy:41.88,ring:1 },
  { id:'desktop-03c',x:3.044,y:46.111,w:26.719,h:45.547,cx:16.52,cy:68.43,ring:1 },
  { id:'desktop-04a',x:42.785,y:7.892,w:25.536,h:36.077,cx:55.55,cy:25.82,ring:0 },
  { id:'desktop-04b',x:50.057,y:7.554,w:34.16,h:29.876,cx:67.08,cy:22.55,ring:0 },
  { id:'desktop-05a',x:37.655,y:46.786,w:14.149,h:18.489,cx:44.79,cy:55.86,ring:0 },
  { id:'desktop-05b',x:46.11,y:37.88,w:34.611,h:26.945,cx:63.28,cy:51.24,ring:0 },
  { id:'desktop-06a',x:44.645,y:68.659,w:32.694,h:24.464,cx:60.94,cy:80.5,ring:0 },
  { id:'desktop-06b',x:47.238,y:66.404,w:26.945,h:12.852,cx:60.85,cy:72.55,ring:0 },
  { id:'desktop-07a',x:74.972,y:57.61,w:12.12,h:34.498,cx:81.14,cy:74.69,ring:2 },
  { id:'desktop-07b',x:84.273,y:66.855,w:10.654,h:25.028,cx:89.54,cy:79.65,ring:2 },
]

const MOBILE: Piece[] = [
  { id:'mobile-01a',x:51.817,y:3.633,w:39.625,h:22.343,cx:71.45,cy:14.78,ring:2 },
  { id:'mobile-01b',x:7.972,y:4.338,w:60.258,h:19.469,cx:38.39,cy:14.13,ring:2 },
  { id:'mobile-01c',x:59.789,y:3.958,w:13.013,h:5.369,cx:66.3,cy:6.81,ring:2 },
  { id:'mobile-02a',x:7.034,y:19.36,w:36.811,h:34.111,cx:25.44,cy:36.36,ring:0 },
  { id:'mobile-02b',x:10.082,y:18.872,w:48.886,h:24.024,cx:34.23,cy:30.99,ring:0 },
  { id:'mobile-03a',x:10.316,y:69.685,w:35.287,h:13.178,cx:27.84,cy:76.36,ring:1 },
  { id:'mobile-03b',x:9.144,y:73.59,w:60.844,h:22.397,cx:39.62,cy:84.6,ring:1 },
  { id:'mobile-04a',x:8.91,y:55.965,w:67.057,h:22.56,cx:42.38,cy:67.14,ring:0 },
  { id:'mobile-04b',x:13.834,y:52.603,w:56.389,h:11.714,cx:41.79,cy:58.6,ring:0 },
  { id:'mobile-04c',x:42.556,y:56.508,w:47.831,h:13.503,cx:66,cy:63.31,ring:0 },
  { id:'mobile-05a',x:63.54,y:11.985,w:29.426,h:14.479,cx:78.43,cy:19.28,ring:1 },
  { id:'mobile-05b',x:57.796,y:16.595,w:34.584,h:28.145,cx:75.03,cy:30.56,ring:1 },
  { id:'mobile-06a',x:61.313,y:71.529,w:26.495,h:24.403,cx:74.68,cy:83.73,ring:2 },
  { id:'mobile-06b',x:76.905,y:67.462,w:14.42,h:18.113,cx:83.76,cy:76.57,ring:2 },
  { id:'mobile-07a',x:32.474,y:46.312,w:54.396,h:10.521,cx:58.97,cy:51.44,ring:0 },
  { id:'mobile-07b',x:43.494,y:37.961,w:48.3,h:18.872,cx:67.53,cy:47.37,ring:0 },
]

const ATLAS = { desktop:{ url:'atlas-desktop.png',w:900,h:2807 }, mobile:{ url:'atlas-mobile.png',w:900,h:3287 } }
const RECTS: Record<'desktop'|'mobile',Record<string,[number,number,number,number]>> = {
  desktop:{'desktop-01a':[2,2,274,647],'desktop-01b':[278,2,109,468],'desktop-02a':[478,651,277,355],'desktop-02b':[2,1057,560,351],'desktop-02c':[2,2240,351,230],'desktop-03a':[389,2,508,467],'desktop-03b':[482,2691,276,103],'desktop-03c':[2,651,474,404],'desktop-04a':[2,1410,453,320],'desktop-04b':[2,1732,606,265],'desktop-05a':[584,2472,251,164],'desktop-05b':[2,1999,614,239],'desktop-06a':[2,2472,580,217],'desktop-06b':[2,2691,478,114],'desktop-07a':[457,1410,215,306],'desktop-07b':[355,2240,189,222]},
  mobile:{'mobile-01a':[523,1496,338,412],'mobile-01b':[2,1911,514,359],'mobile-01c':[468,3091,111,99],'mobile-02a':[2,2,314,629],'mobile-02b':[2,633,417,443],'mobile-03a':[412,2622,301,243],'mobile-03b':[2,1496,519,413],'mobile-04a':[2,1078,572,416],'mobile-04b':[2,2873,481,216],'mobile-04c':[2,2622,408,249],'mobile-05a':[541,2272,251,267],'mobile-05b':[318,2,295,519],'mobile-06a':[615,2,226,450],'mobile-06b':[416,2272,123,334],'mobile-07a':[2,3091,464,194],'mobile-07b':[2,2272,412,348]}
}
function spriteStyle(setKey:'desktop'|'mobile',id:string){const sheet=ATLAS[setKey],r=RECTS[setKey][id];const [sx,sy,fw,fh]=r;return{backgroundSize:`${(sheet.w/fw*100).toFixed(3)}% ${(sheet.h/fh*100).toFixed(3)}%`,backgroundPosition:`${(sheet.w>fw?sx/(sheet.w-fw)*100:0).toFixed(3)}% ${(sheet.h>fh?sy/(sheet.h-fh)*100:0).toFixed(3)}%`}}

function Wordmark({title}:{title:string}){
  const words=title.replace(/\.$/,'').split(/\s+/)
  return <span className="flex flex-col items-center justify-center text-center font-black uppercase leading-[.78] tracking-[-.075em] text-white/70 [text-shadow:0_0_22px_rgba(125,175,255,.26)]">
    {words.map((w,i)=><em key={i} className={`${i===1?'text-[.52em] self-center text-[#9db7ff]':''} not-italic`}>{w}</em>)}
  </span>
}

export default function BrokenByDesign({assetsBase='https://cdn.jsdelivr.net/gh/gughigug/broken-by-design-assets@main',title='broken by design.',height='100%',interactive=true,className=''}:BrokenByDesignProps){
  const [portrait,setPortrait]=useState(false),[active,setActive]=useState<string|null>(null),[ready,setReady]=useState(false)
  useEffect(()=>{const mq=window.matchMedia('(max-aspect-ratio: 1/1)');const apply=()=>setPortrait(mq.matches);apply();mq.addEventListener('change',apply);return()=>mq.removeEventListener('change',apply)},[])
  const setKey=portrait?'mobile':'desktop',pieces=portrait?MOBILE:DESKTOP,atlasUrl=`${assetsBase}/${ATLAS[setKey].url}`
  const poses=useMemo(()=>pieces.map((p,i)=>({rx:((i%5)-2)*.65,ry:((i%4)-1.5)*.8,z:(2-p.ring)*5})),[pieces])
  useEffect(()=>{setReady(false);const img=new Image();img.onload=()=>setReady(true);img.onerror=()=>setReady(true);img.src=atlasUrl},[atlasUrl])
  return <section className={`relative isolate overflow-hidden bg-[#030407] [perspective:1200px] ${className}`} style={{height}} aria-label={title}>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_48%_48%,rgba(79,125,255,.22),transparent_28%),radial-gradient(ellipse_at_60%_85%,rgba(28,61,160,.22),transparent_46%)]" />
    <div className="absolute inset-[5%_2%] sm:inset-[5%_3%]">
      <div className="absolute inset-0 grid place-items-center text-[clamp(58px,8.7vw,170px)] opacity-20"><Wordmark title={title}/></div>
      <div className="absolute inset-0 [transform-style:preserve-3d]">
        {ready&&pieces.map((p,i)=>{const sprite=spriteStyle(setKey,p.id),hot=active===p.id,pose=poses[i],dx=(p.cx-50)*.22,dy=(p.cy-50)*.18;return <div key={p.id} onPointerEnter={()=>interactive&&setActive(p.id)} onPointerLeave={()=>setActive(null)} className="absolute transition-[transform,filter] duration-500 ease-out" style={{left:`${p.x}%`,top:`${p.y}%`,width:`${p.w}%`,height:`${p.h}%`,zIndex:10+(2-p.ring),transform:`translate3d(${hot?dx:0}px,${hot?dy:0}px,${hot?82:pose.z}px) rotateX(${hot?-5+pose.rx:pose.rx}deg) rotateY(${hot?7+pose.ry:pose.ry}deg) scale(${hot?1.035:1})`,filter:hot?'brightness(1.3) drop-shadow(0 28px 45px rgba(0,0,0,.72)) drop-shadow(0 0 24px rgba(93,144,255,.38))':'brightness(1.04)'}}>
          <div className="absolute inset-0 overflow-hidden" style={{WebkitMaskImage:`url(${atlasUrl})`,maskImage:`url(${atlasUrl})`,WebkitMaskRepeat:'no-repeat',maskRepeat:'no-repeat',WebkitMaskSize:sprite.backgroundSize,maskSize:sprite.backgroundSize,WebkitMaskPosition:sprite.backgroundPosition,maskPosition:sprite.backgroundPosition}}>
            <div className="absolute inset-0" style={{backgroundImage:`url(${atlasUrl})`,backgroundSize:sprite.backgroundSize,backgroundPosition:sprite.backgroundPosition,backgroundRepeat:'no-repeat'}}/><div className="absolute inset-0 bg-[linear-gradient(132deg,rgba(144,194,255,.22),rgba(59,105,255,.03)_37%,transparent_55%,rgba(67,106,255,.18))] mix-blend-screen"/>
            <div className="absolute" style={{width:`${10000/p.w}%`,height:`${10000/p.h}%`,left:`${-(p.x/p.w)*100}%`,top:`${-(p.y/p.h)*100}%`}}><div className="grid h-full w-full place-items-center text-[clamp(58px,8.7vw,170px)]"><Wordmark title={title}/></div></div>{hot&&<div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(195,225,255,.34),rgba(93,144,255,.08)_38%,transparent_72%)] mix-blend-screen"/>}
          </div></div>})}
      </div>
    </div><div className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,transparent_26%,rgba(71,122,255,.06)_50%,transparent_70%)]"/>
  </section>
}
