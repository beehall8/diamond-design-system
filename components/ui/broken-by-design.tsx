import { useEffect, useState } from 'react'

export interface BrokenByDesignProps {
  title?: string
  height?: string
  className?: string
}

const shards = [
  'polygon(0 5%, 42% 0, 35% 44%, 4% 53%)',
  'polygon(43% 0, 78% 4%, 65% 43%, 36% 44%)',
  'polygon(79% 4%, 100% 10%, 96% 48%, 66% 43%)',
  'polygon(4% 54%, 35% 45%, 44% 78%, 0 94%)',
  'polygon(36% 45%, 65% 44%, 70% 82%, 45% 78%)',
  'polygon(66% 44%, 96% 49%, 100% 92%, 71% 82%)',
  'polygon(0 95%, 44% 79%, 52% 100%, 5% 100%)',
  'polygon(45% 79%, 70% 83%, 94% 100%, 53% 100%)',
]

export default function BrokenByDesign({ title = 'diamond by design.', height = '92dvh', className = '' }: BrokenByDesignProps) {
  const [active, setActive] = useState(-1)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className={`relative isolate overflow-hidden bg-[#030407] ${className}`} style={{ height }} aria-label={title}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(65,120,255,.22),transparent_28%),radial-gradient(circle_at_50%_120%,rgba(40,70,160,.18),transparent_40%)]" />
      <div className="absolute inset-[7%_3%] sm:inset-[7%_5%]">
        <div className="absolute inset-0 grid place-items-center">
          <span className="select-none text-center text-[14vw] font-black uppercase leading-[.8] tracking-[-.08em] text-white/[.12] sm:text-[10vw]">{title}</span>
        </div>
        {shards.map((shape, i) => (
          <div
            key={shape}
            onPointerEnter={() => setActive(i)}
            onPointerLeave={() => setActive(-1)}
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              clipPath: shape,
              opacity: mounted ? 1 : 0,
              transform: mounted ? `translate3d(${active === i ? (i % 3 - 1) * 18 : 0}px, ${active === i ? -12 : 0}px, 0) scale(${active === i ? 1.035 : 1})` : `translate3d(${(i % 3 - 1) * 80}px, ${i % 2 ? 60 : -60}px, 0)`,
              background: 'linear-gradient(135deg, rgba(210,230,255,.25), rgba(80,130,220,.05) 42%, rgba(150,190,255,.18))',
              border: '1px solid rgba(190,220,255,.32)',
              boxShadow: active === i ? '0 30px 80px rgba(40,100,255,.25), inset 0 0 45px rgba(210,230,255,.12)' : 'inset 0 0 30px rgba(210,230,255,.07)',
              backdropFilter: 'blur(3px)',
            }}
          >
            <div className="grid h-full place-items-center">
              <span className="select-none text-center text-[14vw] font-black uppercase leading-[.8] tracking-[-.08em] text-white/55 mix-blend-screen sm:text-[10vw]">{title}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,.04)_48%,transparent_55%)]" />
    </section>
  )
}
