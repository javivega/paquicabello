import { useRef } from 'react'

import { BrandAnchorButton } from '@/components/ui/button'
import { useScrollEnter } from '@/hooks/useScrollEnter'
import { whatsappContactHref } from '@/lib/routes'
import { cn } from '@/lib/utils'

/** Closing CTA — Figma 1104:8977. */
export function AboutCtaSection({ className }: { className?: string }) {
  const rootRef = useRef<HTMLElement>(null)
  useScrollEnter(rootRef)

  return (
    <section
      ref={rootRef}
      className={cn('w-full bg-surface-subtle-1 py-10', className)}
      aria-labelledby="about-cta-heading"
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1440px] flex-col px-4',
          'sm:px-8',
          'lg:px-20',
        )}
      >
        <div className="flex max-w-[680px] flex-col gap-4">
          <h2
            id="about-cta-heading"
            data-scroll-enter
            className="scroll-enter text-balance text-[26px] font-semibold leading-8 text-foreground-brand"
          >
            Mejora la vida de tu compañero canino
          </h2>
          <p
            data-scroll-enter
            className="scroll-enter max-w-[784px] text-base leading-5 text-foreground-secondary"
          >
            Cuéntame qué os preocupa o qué os gustaría mejorar en vuestra
            convivencia. Puedes rellenar el formulario o escribirme por
            WhatsApp, y me pondré en contacto contigo lo antes posible para
            valorar vuestro caso y encontrar la mejor forma de ayudaros.
          </p>
          <BrandAnchorButton
            href={whatsappContactHref('general')}
            brandVariant="primary"
            brandSize="md"
            data-scroll-enter
            className="scroll-enter w-fit"
            leftSlot={null}
            rightSlot={null}
          >
            Contactar
          </BrandAnchorButton>
        </div>
      </div>
    </section>
  )
}
