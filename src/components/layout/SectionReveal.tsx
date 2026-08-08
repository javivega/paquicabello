import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

type SectionRevealProps = {
  children: ReactNode
  threshold?: number
  rootMargin?: string
}

/** One-shot IntersectionObserver reveal for marketing sections (`home-section-reveal`). */
export function SectionReveal({
  children,
  threshold = 0.12,
  rootMargin = '0px 0px -12% 0px',
}: SectionRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          observer.unobserve(node)
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return (
    <div ref={sectionRef} className="home-section-reveal" data-inview={inView}>
      {children}
    </div>
  )
}
