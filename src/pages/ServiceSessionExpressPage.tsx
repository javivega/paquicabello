import { HomeLogosBand } from '@/components/home/HomeLogosBand'
import { FullBleedPage } from '@/components/layout/FullBleedPage'
import { SectionReveal } from '@/components/layout/SectionReveal'
import { ServiceSessionExpressHero } from '@/components/services/session/ServiceSessionExpressHero'
import { ServiceSessionExpressMainColumn } from '@/components/services/session/ServiceSessionExpressMainColumn'

/** Sesión exprés — hero 1103:6083, content 1103:6115. */
export function ServiceSessionExpressPage() {
  return (
    <FullBleedPage className="flex flex-col">
      <SectionReveal>
        <ServiceSessionExpressHero />
      </SectionReveal>
      <SectionReveal>
        <HomeLogosBand />
      </SectionReveal>
      <ServiceSessionExpressMainColumn />
    </FullBleedPage>
  )
}
