import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import { HomeLogosBand } from '@/components/home/HomeLogosBand'
import { ServiceSessionExpressHero } from '@/components/services/session/ServiceSessionExpressHero'
import { ServiceSessionExpressMainColumn } from '@/components/services/session/ServiceSessionExpressMainColumn'
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

/** Sesión exprés — Figma node 1042:5639 (MCP `get_design_context`). */
export function ServiceSessionExpressPage() {
  return (
    <div
      className={cn(
        'relative flex w-screen max-w-none shrink-0 flex-col bg-canvas',
        'ml-[calc(50%-50vw)]',
      )}
    >
      <ServiceSectionReveal>
        <ServiceSessionExpressHero />
      </ServiceSectionReveal>
      <ServiceSectionReveal>
        <HomeLogosBand />
      </ServiceSectionReveal>
      <ServiceSectionReveal threshold={0.06} rootMargin="0px 0px 16% 0px">
        <ServiceSessionExpressMainColumn />
      </ServiceSectionReveal>
    </div>
  )
}
