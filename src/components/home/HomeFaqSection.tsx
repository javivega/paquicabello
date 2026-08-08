import type { ReactNode } from 'react'

import { BrandLinkButton } from '@/components/ui/button'
import { FaqAccordion, FaqSectionIntro } from '@/components/faq/FaqAccordion'
import { CONTACT_PATH } from '@/lib/routes'
import { cn } from '@/lib/utils'

type HomeFaqSectionProps = {
  className?: string
  /** Accessible heading id — unique per page. */
  headingId?: string
  /**
   * Secondary CTA under the intro. Pass `null` to hide (e.g. on Contacto,
   * where linking back to `/contacto` is redundant).
   */
  footer?: ReactNode | null
}

const defaultFooter = (
  <BrandLinkButton
    to={CONTACT_PATH}
    brandVariant="secondary"
    brandSize="md"
    className="w-fit"
    leftSlot={null}
    rightSlot={null}
  >
    Tengo más dudas
  </BrandLinkButton>
)

export function HomeFaqSection({
  className,
  headingId = 'home-faq-heading',
  footer = defaultFooter,
}: HomeFaqSectionProps) {
  return (
    <section
      className={cn(
        'w-full bg-canvas py-16 sm:py-20 lg:py-24',
        className,
      )}
      aria-labelledby={headingId}
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
        <FaqSectionIntro
          animated
          headingId={headingId}
          className="lg:sticky lg:top-24 lg:shrink-0 lg:pl-8 xl:pl-20"
          footer={footer ?? undefined}
        />
        <FaqAccordion animated className="min-w-0 flex-1 lg:pr-6" />
      </div>
    </section>
  )
}
