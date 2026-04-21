import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

import avatarImage from '@/img/avatar.png'
import { BrandLinkButton } from '@/components/ui/button'
import { CONTACT_PATH } from '@/lib/routes'
import { cn } from '@/lib/utils'

export type ServicePricingAsideProps = {
  className?: string
  cardId?: string
  ariaLabel: string
  price: string
  subtitle: string
  features: readonly ReactNode[]
  avatarLine1: string
  avatarLine2: string
}

/** Props bundle for `<ServicePricingAside {...servicePricingAsideSessionExpress} />` etc. */
export type ServicePricingAsideContentProps = Omit<ServicePricingAsideProps, 'className'>

const sessionFeatures: readonly ReactNode[] = [
  <>
    <span className="font-semibold">Cualquier lugar</span>
    <span> por videoconferencia.</span>
  </>,
  'Presencial en Fuengirola, Mijas, Benalmádena, Torremolinos y Marbella',
]

const programFeatures: readonly ReactNode[] = [
  <>
    <span className="font-semibold">Cualquier lugar</span>
    <span> por videoconferencia.</span>
  </>,
  'Presencial en Fuengirola, Mijas, Benalmádena, Torremolinos y Marbella',
  'Seguimiento personalizado por WhatsApp',
  'Revisión de vídeos para analizar interacciones',
]

/** Sesión exprés — same card shell, session-specific copy. */
export const servicePricingAsideSessionExpress = {
  cardId: 'session-pricing-card',
  ariaLabel: 'Precio sesión exprés',
  price: '60,00€',
  subtitle: 'Sesión exprés de 90 minutos',
  features: sessionFeatures,
  avatarLine1: 'Una sesión con',
  avatarLine2: 'Paqui Cabello',
} satisfies ServicePricingAsideContentProps

/** Programa 8 semanas — same card shell, program-specific copy. */
export const servicePricingAsideProgram8Weeks = {
  cardId: 'program-8-pricing-card',
  ariaLabel: 'Precio programa de 8 semanas',
  price: '150,00€',
  subtitle: 'Programa personalizado de 8 semanas',
  features: programFeatures,
  avatarLine1: 'Tu educadora:',
  avatarLine2: 'Paqui Cabello',
} satisfies ServicePricingAsideContentProps

/** Tarifa lateral sticky — Figma; content via props or `servicePricingAside*` presets. */
export function ServicePricingAside({
  className,
  cardId,
  ariaLabel,
  price,
  subtitle,
  features,
  avatarLine1,
  avatarLine2,
}: ServicePricingAsideProps) {
  return (
    <aside
      className={cn(
        'w-full max-w-full shrink-0 sm:max-w-[min(100%,36rem)] lg:max-w-[341px]',
        'lg:sticky lg:top-24 lg:self-start lg:pt-6',
        className,
      )}
      aria-label={ariaLabel}
    >
      <div
        id={cardId}
        className="flex w-full flex-col gap-5 rounded-3xl border-2 border-border-subtle-0 bg-canvas px-0.5 pb-6 shadow-[6px_6px_0px_0px_rgba(255,78,0,0.12)] sm:gap-6 sm:pb-8"
      >
        <header className="flex flex-col gap-3 border-b border-border-subtle-0 px-5 pb-4 pt-6 sm:gap-4 sm:px-6 sm:pb-4 sm:pt-7 lg:px-[22px] lg:pt-8">
          <p className="text-[clamp(1.75rem,4.2vw+0.6rem,2.25rem)] font-semibold leading-none tracking-tight text-foreground-brand sm:text-[2rem] sm:leading-none lg:text-[36px] lg:leading-10">
            {price}
          </p>
          <p className="text-base font-semibold leading-snug text-foreground sm:text-lg sm:leading-6">
            {subtitle}
          </p>
        </header>
        <ul className="flex flex-col gap-2.5 px-5 sm:px-6">
          {features.map((line, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-left text-[15px] leading-snug text-foreground-secondary sm:text-sm sm:leading-5"
            >
              <Check
                className="mt-0.5 size-5 shrink-0 text-foreground-brand"
                strokeWidth={2}
                aria-hidden
              />
              <span className="min-w-0">{line}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 px-5 sm:px-6">
          <img
            src={avatarImage}
            alt="Retrato de Paqui Cabello"
            width={60}
            height={60}
            decoding="async"
            className="size-[56px] shrink-0 rounded-full border border-border-subtle-0 object-cover ring-1 ring-border-subtle-0 sm:size-[60px]"
          />
          <p className="min-w-0 text-[14px] leading-snug text-foreground sm:leading-5">
            <span className="font-normal">{avatarLine1}</span>
            <br />
            <span className="font-semibold">{avatarLine2}</span>
          </p>
        </div>
        <div className="flex flex-col gap-2 px-5 sm:flex-row sm:flex-wrap sm:px-6 sm:gap-2">
          <BrandLinkButton
            to={CONTACT_PATH}
            brandVariant="primary"
            brandSize="md"
            className="w-full sm:w-auto"
            leftSlot={null}
            rightSlot={null}
          >
            Contactar
          </BrandLinkButton>
          <BrandLinkButton
            to={CONTACT_PATH}
            brandVariant="secondary"
            brandSize="md"
            className="w-full sm:w-auto"
            leftSlot={null}
            rightSlot={null}
          >
            Tengo más dudas
          </BrandLinkButton>
        </div>
      </div>
    </aside>
  )
}
