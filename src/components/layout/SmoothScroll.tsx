import { useEffect, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis, useLenis } from 'lenis/react'

gsap.registerPlugin(ScrollTrigger)

const LENIS_OPTIONS = {
  autoRaf: false,
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
} as const

/** Drive Lenis from GSAP’s ticker so ScrollTrigger scrub stays frame-synced. */
function LenisGsapSync() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    lenis.on('scroll', ScrollTrigger.update)

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(update)
    }
  }, [lenis])

  return null
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Site-wide Lenis smooth scroll. Skipped when the user prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(prefersReducedMotion)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduceMotion(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  if (reduceMotion) {
    return children
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisGsapSync />
      {children}
    </ReactLenis>
  )
}
