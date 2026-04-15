import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import { HomeFaqSection } from '@/components/home/HomeFaqSection'
import { HomeHelpSection } from '@/components/home/HomeHelpSection'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeLogosBand } from '@/components/home/HomeLogosBand'
import { HomeMethodologySection } from '@/components/home/HomeMethodologySection'
import { HomePricingSection } from '@/components/home/HomePricingSection'
import { cn } from '@/lib/utils'

function HomeSectionReveal({ children }: { children: ReactNode }) {
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

/** Home layout from Figma node 1038:2593 (structure + spacing; interactions later). */
export function HomePage() {
  return (
    <div
      className={cn(
        'relative flex w-screen max-w-none shrink-0 flex-col bg-canvas',
        /* Same full-bleed escape as HomeHero had — entire page spans viewport inside SiteShell */
        'ml-[calc(50%-50vw)]',
      )}
    >
      <HomeSectionReveal>
        <HomeHero />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <HomeLogosBand />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <HomeHelpSection />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <HomeMethodologySection />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <HomePricingSection />
      </HomeSectionReveal>
      <HomeSectionReveal>
        <HomeFaqSection />
      </HomeSectionReveal>
    </div>
  )
}
