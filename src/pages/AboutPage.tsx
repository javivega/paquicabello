import { AboutHero } from '@/components/about/AboutHero'
import { AboutMethodSection } from '@/components/about/AboutMethodSection'
import { AboutPrinciplesSection } from '@/components/about/AboutPrinciplesSection'
import { AboutTrajectorySection } from '@/components/about/AboutTrajectorySection'
import { AboutTurnSection } from '@/components/about/AboutTurnSection'
import { cn } from '@/lib/utils'

/** “Sobre mí” — Figma node 1042:6846 (layout + copy; assets from `src/img`). */
export function AboutPage() {
  return (
    <div
      className={cn(
        'relative flex w-screen max-w-none shrink-0 flex-col bg-canvas',
        'ml-[calc(50%-50vw)]',
      )}
    >
      <AboutHero />
      <AboutTrajectorySection />
      <AboutTurnSection />
      <AboutMethodSection />
      <AboutPrinciplesSection />
    </div>
  )
}
