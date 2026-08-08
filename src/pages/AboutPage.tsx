import { AboutCtaSection } from '@/components/about/AboutCtaSection'
import { AboutHero } from '@/components/about/AboutHero'
import { AboutMethodSection } from '@/components/about/AboutMethodSection'
import { AboutPrinciplesSection } from '@/components/about/AboutPrinciplesSection'
import { AboutTrajectorySection } from '@/components/about/AboutTrajectorySection'
import { AboutTurnSection } from '@/components/about/AboutTurnSection'
import { FullBleedPage } from '@/components/layout/FullBleedPage'

/** “Sobre mí” — Figma node 1104:8563. */
export function AboutPage() {
  return (
    <FullBleedPage className="flex flex-col gap-40 lg:gap-52">
      <AboutHero />
      <AboutTrajectorySection />
      <AboutTurnSection />
      <AboutMethodSection />
      <AboutPrinciplesSection />
      <AboutCtaSection />
    </FullBleedPage>
  )
}
