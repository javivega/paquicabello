import { AboutMethodSection } from '@/components/about/AboutMethodSection'
import { HomeFaqSection } from '@/components/home/HomeFaqSection'
import { HomeHelpSection } from '@/components/home/HomeHelpSection'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeLogosBand } from '@/components/home/HomeLogosBand'
import { HomeMethodologySection } from '@/components/home/HomeMethodologySection'
import { HomePricingSection } from '@/components/home/HomePricingSection'
import { FullBleedPage } from '@/components/layout/FullBleedPage'
import { SectionReveal } from '@/components/layout/SectionReveal'

/** Home layout; hero from Figma node 1100:12979. */
export function HomePage() {
  return (
    <FullBleedPage className="flex flex-col">
      <SectionReveal>
        <HomeHero />
        <HomeLogosBand />
      </SectionReveal>
      <SectionReveal>
        <HomeHelpSection />
      </SectionReveal>
      <SectionReveal>
        <HomeMethodologySection />
      </SectionReveal>
      <SectionReveal>
        <HomePricingSection />
      </SectionReveal>
      <SectionReveal>
        <AboutMethodSection />
      </SectionReveal>
      <SectionReveal>
        <HomeFaqSection />
      </SectionReveal>
    </FullBleedPage>
  )
}
