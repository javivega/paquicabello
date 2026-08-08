import { HomeFaqSection } from '@/components/home/HomeFaqSection'
import { FullBleedPage } from '@/components/layout/FullBleedPage'
import { SectionReveal } from '@/components/layout/SectionReveal'
import { Paywall } from '@/components/paywall/Paywall'

/** Servicios — Figma frame 1042:5303 */
export function ServicesPage() {
  return (
    <FullBleedPage className="flex flex-col">
      <Paywall
        headingAs="h1"
        headingId="services-page-heading"
        withNavOffset
        sessionTitleId="services-pricing-session-title"
        programTitleId="services-pricing-program-title"
        title="Elige la forma que mejor encaje con tu momento y tu perro"
        description="La convivencia con tu perro no tiene por qué ser complicada. Con la guía adecuada, podrás comprender sus señales, anticipar conflictos y crear un vínculo seguro y respetuoso. Estoy aquí para acompañarte en cada paso."
      />
      <SectionReveal>
        <HomeFaqSection />
      </SectionReveal>
    </FullBleedPage>
  )
}
