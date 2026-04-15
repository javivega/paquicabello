import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import { AboutHero } from '@/components/about/AboutHero'
import { AboutMethodSection } from '@/components/about/AboutMethodSection'
import { AboutPrinciplesSection } from '@/components/about/AboutPrinciplesSection'
import { AboutTrajectorySection } from '@/components/about/AboutTrajectorySection'
import { AboutTurnSection } from '@/components/about/AboutTurnSection'
import { cn } from '@/lib/utils'

function AboutSectionReveal({ children }: { children: ReactNode }) {
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
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="home-section-reveal" data-inview={inView}>
      {children}
    </div>
  )
}

/** “Sobre mí” — Figma node 1042:6846 (layout + copy; assets from `src/img`). */
export function AboutPage() {
  return (
    <div
      className={cn(
        'relative flex w-screen max-w-none shrink-0 flex-col bg-canvas',
        'ml-[calc(50%-50vw)]',
      )}
    >
      <AboutSectionReveal>
        <AboutHero />
      </AboutSectionReveal>
      <AboutSectionReveal>
        <AboutTrajectorySection />
      </AboutSectionReveal>
      <AboutSectionReveal>
        <AboutTurnSection />
      </AboutSectionReveal>
      <AboutSectionReveal>
        <AboutMethodSection />
      </AboutSectionReveal>
      <AboutSectionReveal>
        <AboutPrinciplesSection />
      </AboutSectionReveal>
    </div>
  )
}
