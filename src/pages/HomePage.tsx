import { HomeFaqSection } from '@/components/home/HomeFaqSection'
import { HomeHelpSection } from '@/components/home/HomeHelpSection'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeLogosBand } from '@/components/home/HomeLogosBand'
import { HomeMethodologySection } from '@/components/home/HomeMethodologySection'
import { HomePricingSection } from '@/components/home/HomePricingSection'
import { cn } from '@/lib/utils'

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
      <HomeHero />
      <HomeLogosBand />
      <HomeHelpSection />
      <HomeMethodologySection />
      <HomePricingSection />
      <HomeFaqSection />
    </div>
  )
}
