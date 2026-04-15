import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import { ContactMainSection } from '@/components/contact/ContactMainSection'
import { cn } from '@/lib/utils'

function ContactSectionReveal({ children }: { children: ReactNode }) {
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

/** Contacto — Figma node 1042:6959. */
export function ContactPage() {
  return (
    <div
      className={cn(
        'relative flex min-h-full w-screen max-w-none flex-1 shrink-0 flex-col bg-canvas',
        'ml-[calc(50%-50vw)]',
      )}
    >
      <ContactSectionReveal>
        <ContactMainSection />
      </ContactSectionReveal>
    </div>
  )
}
