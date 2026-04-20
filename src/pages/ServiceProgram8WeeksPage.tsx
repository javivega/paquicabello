import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import { HomeLogosBand } from '@/components/home/HomeLogosBand'
import { ServiceProgramHero } from '@/components/services/program/ServiceProgramHero'
import { ServiceProgramMainColumn } from '@/components/services/program/ServiceProgramMainColumn'
import { cn } from '@/lib/utils'

function ServiceSectionReveal({
  children,
  threshold = 0.12,
  rootMargin = '0px 0px -12% 0px',
}: {
  children: ReactNode
  threshold?: number
  rootMargin?: string
}) {
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

/** Programa 8 semanas — Figma node 1042:5779. */
export function ServiceProgram8WeeksPage() {
  return (
    <div
      className={cn(
        'relative flex w-screen max-w-none shrink-0 flex-col bg-canvas',
        'ml-[calc(50%-50vw)]',
      )}
    >
      <ServiceSectionReveal>
        <ServiceProgramHero />
      </ServiceSectionReveal>
      <ServiceSectionReveal>
        <HomeLogosBand />
      </ServiceSectionReveal>
      <ServiceSectionReveal threshold={0.06} rootMargin="0px 0px 16% 0px">
        <ServiceProgramMainColumn />
      </ServiceSectionReveal>
    </div>
  )
}
