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

function HeroTitle({ muted = false }: { muted?: boolean }) {
  return (
    <span className={`select-none text-center font-black uppercase leading-[0.78] tracking-[-0.07em] ${muted ? 'text-white/[.12]' : 'text-white/70 mix-blend-screen'}`}>
      <span className="block text-[7.4vw] sm:text-[5.3vw]">Diamond</span>
      <span className={`block text-[8.5vw] sm:text-[6.15vw] ${muted ? '' : 'text-[#4f7dff] drop-shadow-[0_0_28px_rgba(78,121,255,.42)]'}`}>Design</span>
      <span className="block text-[7.4vw] sm:text-[5.3vw]">System</span>
    </span>
  )
}

export default function BrokenByDesign({ title = 'Diamond Design System', height = '92dvh', className = '' }: BrokenByDesignProps) {
  const [active, setActive] = useState(-1)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section className={`relative isolate overflow-hidden bg-[#030407] ${className}`} style={{ height }} aria-label={title}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(64,108,255,.42),transparent_20%),radial-gradient(circle_at_72%_52%,rgba(34,72,210,.26),transparent_35%),radial-gradient(circle_at_50%_120%,rgba(40,70,160,.20),transparent_44%)]" />
      <div className="absolute right-[3%] top-[8%] h-[64%] w-[54%] rounded-full bg-[#356dff]/10 blur-[90px] sm:right-[5%]" />

      <div className="absolute inset-[7%_3%] sm:inset-[7%_5%]">
        <div className="absolute left-[47%] top-1/2 z-[2] w-[48%] -translate-y-1/2 sm:left-[48%] sm:w-[46%]">
          <HeroTitle muted />
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
              background: 'linear-gradient(135deg, rgba(214,232,255,.22), rgba(38,78,170,.08) 42%, rgba(73,119,255,.20))',
              border: '1px solid rgba(117,161,255,.34)',
              boxShadow: active === i ? '0 30px 90px rgba(45,93,255,.34), inset 0 0 55px rgba(150,190,255,.18)' : 'inset 0 0 38px rgba(96,140,255,.11)',
              backdropFilter: 'blur(3px)',
            }}
          >
            <div className="relative h-full w-full">
              <div className="absolute left-[47%] top-1/2 w-[48%] -translate-y-1/2 sm:left-[48%] sm:w-[46%]">
                <HeroTitle />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_20%,rgba(100,145,255,.08)_48%,transparent_56%)]" />
    </section>
  )
}
