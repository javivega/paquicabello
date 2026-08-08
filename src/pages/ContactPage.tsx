import { ContactMainSection } from '@/components/contact/ContactMainSection'
import { HomeFaqSection } from '@/components/home/HomeFaqSection'
import { FullBleedPage } from '@/components/layout/FullBleedPage'
import { SectionReveal } from '@/components/layout/SectionReveal'

/** Contacto — Figma node 1042:6959. */
export function ContactPage() {
  return (
    <FullBleedPage className="flex min-h-full flex-1 flex-col">
      <SectionReveal>
        <ContactMainSection />
      </SectionReveal>
      <SectionReveal>
        <HomeFaqSection headingId="contact-faq-heading" footer={null} />
      </SectionReveal>
    </FullBleedPage>
  )
}
