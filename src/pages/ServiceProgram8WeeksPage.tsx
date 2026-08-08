import { HomeLogosBand } from '@/components/home/HomeLogosBand'
import { FullBleedPage } from '@/components/layout/FullBleedPage'
import { SectionReveal } from '@/components/layout/SectionReveal'
import { ServiceProgramHero } from '@/components/services/program/ServiceProgramHero'
import { ServiceProgramMainColumn } from '@/components/services/program/ServiceProgramMainColumn'

/** Programa 4 semanas — hero Figma node 1042:5781. */
export function ServiceProgram8WeeksPage() {
  return (
    <FullBleedPage className="flex flex-col">
      <SectionReveal>
        <ServiceProgramHero />
      </SectionReveal>
      <SectionReveal>
        <HomeLogosBand />
      </SectionReveal>
      <ServiceProgramMainColumn />
    </FullBleedPage>
  )
}
