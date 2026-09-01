import type { ElementType, ReactNode } from 'react'

import affiliateBadge from '@/img/pricing-affiliate-badge.svg'
import tickCircle from '@/img/pricing-tick-circle.svg'
import verifyMark from '@/img/pricing-verify.svg'
import { BrandAnchorButton, BrandLinkButton } from '@/components/ui/button'
import {
  PROGRAM_4_WEEKS_PATH,
  SESSION_EXPRESS_PATH,
  whatsappContactHref,
} from '@/lib/routes'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

type Feature = {
  id: string
  label: ReactNode
  align?: 'center' | 'start'
}

const sessionFeatures: Feature[] = [
  {
    id: 'session-anywhere',
    align: 'center',
    label: (
      <>
        <span className="font-semibold">Cualquier lugar</span>
        <span> por videoconferencia.</span>
      </>
    ),
  },
  {
    id: 'session-presencial',
    label:
      'Presencial en Fuengirola, Mijas, Benalmádena, Torremolinos y Marbella',
  },
]

const programFeatures: Feature[] = [
  {
    id: 'program-anywhere',
    align: 'center',
    label: (
      <>
        <span className="font-semibold">Cualquier lugar</span>
        <span> por videoconferencia.</span>
      </>
    ),
  },
  {
    id: 'program-presencial',
    label:
      'Presencial en Fuengirola, Mijas, Benalmádena, Torremolinos y Marbella',
  },
  { id: 'program-whatsapp', label: 'Seguimiento personalizado por WhatsApp' },
  {
    id: 'program-videos',
    label: 'Revisión de vídeos para analizar interacciones',
  },
]

function Price({ amount }: { amount: string }) {
  const [euros, cents] = amount.split(',')
  return (
    <p className="font-semibold text-foreground-brand">
      <span className="text-[46px] leading-[56px]">{euros}</span>
      <span className="text-[20px] leading-6">,{cents}</span>
    </p>
  )
}

function FeatureList({ features }: { features: Feature[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {features.map((feature) => (
        <li
          key={feature.id}
          className={cn(
            'flex gap-2 text-left text-[14px] leading-4 text-foreground-secondary',
            feature.align === 'center' ? 'items-center' : 'items-start',
          )}
        >
          <img
            src={tickCircle}
            alt="Incluido"
            width={20}
            height={20}
            className="size-5 shrink-0"
            aria-hidden
          />
          <span className="min-w-0 flex-1">{feature.label}</span>
        </li>
      ))}
    </ul>
  )
}

export type PaywallProps = {
  className?: string
  headingId: string
  /** Page landmark heading on Servicios; section heading on Home. */
  headingAs?: 'h1' | 'h2'
  chip?: string
  title: ReactNode
  description: ReactNode
  /** Clears the fixed navbar when the paywall is the page hero. */
  withNavOffset?: boolean
  sessionTitleId?: string
  programTitleId?: string
}

export function Paywall({
  className,
  headingId,
  headingAs = 'h2',
  chip = 'Servicios',
  title,
  description,
  withNavOffset = false,
  sessionTitleId = 'paywall-session-title',
  programTitleId = 'paywall-program-title',
}: PaywallProps) {
  const Heading = headingAs as ElementType

  return (
    <section
      className={cn(
        'w-full bg-surface-subtle-1',
        withNavOffset
          ? 'pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-20'
          : 'py-16 sm:py-20 lg:py-20',
        className,
      )}
      aria-labelledby={headingId}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 sm:px-6 lg:gap-12 lg:px-8">
        <header className="flex w-full max-w-[880px] flex-col items-center gap-4 text-center">
          <p
            style={sectionEnterStyle(50)}
            className="section-enter inline-flex rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
          >
            {chip}
          </p>
          <Heading
            id={headingId}
            style={sectionEnterStyle(120)}
            className="section-enter text-balance text-[clamp(1.75rem,3vw+1rem,2.875rem)] font-semibold leading-tight text-foreground-brand sm:text-[46px] sm:leading-[56px]"
          >
            {title}
          </Heading>
          <p
            style={sectionEnterStyle(200)}
            className="section-enter max-w-[784px] text-lg leading-6 text-foreground-secondary"
          >
            {description}
          </p>
        </header>

        <div className="flex w-full flex-col items-stretch justify-center gap-6 lg:flex-row lg:items-stretch">
          <article
            style={sectionEnterStyle(260)}
            aria-labelledby={sessionTitleId}
            className="section-enter flex w-full max-w-[420px] flex-col gap-6 self-center rounded-3xl border-2 border-border-subtle-0 bg-canvas px-0.5 pb-6 lg:self-stretch"
          >
            <header className="flex flex-col gap-4 border-b border-border-subtle-0 px-[22px] pb-4 pt-6">
              <Price amount="60,00€" />
              <div className="flex flex-col gap-1 text-foreground-secondary">
                <h3 id={sessionTitleId} className="paragraph-md-bold">
                  Sesión exprés de 60 minutos.
                </h3>
                <div className="space-y-2 text-[14px] leading-4">
                  <p>
                    Si tienes una duda concreta o te preocupa
                    una situación específica, esta sesión es para ti.
                  </p>
                  <p>
                    Pondremos en contexto lo que está ocurriendo, resolveremos tus dudas y
                    veremos qué puedes tener en cuenta para acompañar mejor
                    a tu perro en vuestro día a día.
                  </p>
                </div>
              </div>
            </header>

            <div className="flex flex-1 flex-col px-6">
              <FeatureList features={sessionFeatures} />
            </div>

            <div className="flex flex-col gap-2 px-6">
              <BrandAnchorButton
                href={whatsappContactHref('session')}
                brandVariant="secondary"
                brandSize="md"
                className="w-full"
                leftSlot={null}
                rightSlot={null}
              >
                Contactar
              </BrandAnchorButton>
              <BrandLinkButton
                to={SESSION_EXPRESS_PATH}
                brandVariant="secondary"
                brandSize="md"
                className="w-full"
                leftSlot={null}
                rightSlot={null}
              >
                Más información
              </BrandLinkButton>
            </div>
          </article>

          <article
            style={sectionEnterStyle(340)}
            aria-labelledby={programTitleId}
            className="section-enter relative flex w-full max-w-[420px] flex-col gap-6 self-center rounded-3xl border-2 border-[var(--Semantictokens-Color-Background-Strong-0-default)] bg-canvas px-0.5 pb-6 lg:self-stretch"
          >
            <p className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[var(--Primitive-color-blue-blue-600)] bg-foreground-accent px-2 py-1 text-[14px] leading-4 text-on-strong">
              Recomendado
            </p>

            <header className="flex flex-col gap-4 border-b border-border-subtle-0 px-[22px] pb-4 pt-6">
              <Price amount="180,00€" />
              <div className="flex flex-col gap-1 text-foreground-secondary">
                <h3 id={programTitleId} className="paragraph-md-bold">
                  Programa personalizado de 4 semanas
                </h3>
                <p className="text-[14px] leading-4">
                  Te acompaño paso a paso para mejorar la convivencia con tu
                  perro desde la comprensión y el respeto mutuo. Cada sesión se
                  adapta a sus necesidades y a las tuyas, con estrategias
                  prácticas para que el cambio sea duradero y real.
                </p>
              </div>
            </header>

            <div className="flex flex-col px-6">
              <FeatureList features={programFeatures} />
            </div>

            <div className="flex flex-col gap-2 px-6">
              <BrandAnchorButton
                href={whatsappContactHref('program')}
                brandVariant="primary"
                brandSize="md"
                className="w-full"
                leftSlot={null}
                rightSlot={null}
              >
                Contactar
              </BrandAnchorButton>
              <BrandLinkButton
                to={PROGRAM_4_WEEKS_PATH}
                brandVariant="secondary"
                brandSize="md"
                className="w-full"
                leftSlot={null}
                rightSlot={null}
              >
                Más información
              </BrandLinkButton>
            </div>
          </article>
        </div>

        <div
          style={sectionEnterStyle(420)}
          className="section-enter relative flex w-full max-w-[880px] flex-col gap-1 px-4 sm:px-12 lg:px-20"
        >
          <div
            className="pointer-events-none absolute -left-1 -top-7 size-[172px] -rotate-15 opacity-30"
            aria-hidden
          >
            <img
              src={verifyMark}
              alt="Marca de verificación"
              width={172}
              height={172}
              className="size-full"
            />
          </div>
          <img
            src={affiliateBadge}
            alt="Insignia de afiliada de Crianza Multiespecie"
            width={44}
            height={44}
            className="relative size-11"
          />
          <div className="relative text-lg leading-6 text-foreground-secondary">
            <p>Profesional Miembro Autorizado de la Red de Expertos de</p>
            <p className="font-semibold">
              Crianza Multiespecie by creciendo entre perros
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
