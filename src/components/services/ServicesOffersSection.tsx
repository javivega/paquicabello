import { Check } from 'lucide-react'

import { BrandLinkButton } from '@/components/ui/button'
import {
  CONTACT_PATH,
  PROGRAM_8_WEEKS_PATH,
  SESSION_EXPRESS_PATH,
} from '@/lib/routes'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

const basicFeatures = [
  <>
    <span className="font-semibold">Cualquier lugar</span>
    <span> por videoconferencia.</span>
  </>,
  'Presencial en Fuengirola, Mijas, Benalmádena, Torremolinos y Marbella',
] as const

const premiumFeatures = [
  <>
    <span className="font-semibold">Cualquier lugar</span>
    <span> por videoconferencia.</span>
  </>,
  'Presencial en Fuengirola, Mijas, Benalmádena, Torremolinos y Marbella',
  'Seguimiento personalizado por WhatsApp',
  'Revisión de vídeos para analizar interacciones',
] as const

/** Servicios page — Figma node 1042:5303 (hero + tiers + social proof). */
export function ServicesOffersSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'relative w-full overflow-hidden bg-surface-subtle-0',
        /* Extra top inside this surface so content clears fixed navbar — no canvas gap */
        'pt-24 pb-0 sm:pt-28 lg:pt-32',
        className,
      )}
      aria-labelledby="services-page-heading"
    >
      <div
        className="pointer-events-none absolute -right-40 -top-24 size-[28rem] rounded-full bg-[rgba(255,78,0,0.1)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-48 bottom-0 size-[32rem] rounded-full bg-[rgba(104,66,255,0.08)] blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-[1152px] flex-col items-center gap-12 px-4 pb-8 sm:px-8 sm:pb-10 lg:gap-16 lg:px-16 lg:pb-12">
        <div className="flex max-w-[880px] flex-col gap-4 text-center">
          <p
            style={sectionEnterStyle(50)}
            className="section-enter inline-flex w-fit self-center rounded-lg border border-border-subtle-1 bg-canvas px-2 py-1 text-[14px] leading-4 text-foreground-accent"
          >
            Servicios
          </p>
          <h1
            id="services-page-heading"
            style={sectionEnterStyle(120)}
            className="section-enter text-balance text-[clamp(1.75rem,3vw+1rem,2.875rem)] font-semibold leading-tight text-foreground-brand sm:text-[46px] sm:leading-[56px]"
          >
            Elige la forma que mejor encaje con tu momento y tu perro
          </h1>
          <p
            style={sectionEnterStyle(190)}
            className="section-enter max-w-[784px] text-lg leading-6 text-foreground-secondary"
          >
            La convivencia con tu perro no tiene por qué ser complicada. Con la
            guía adecuada, podrás comprender sus señales, anticipar conflictos y
            crear un vínculo seguro y respetuoso. Estoy aquí para acompañarte en
            cada paso.
          </p>
        </div>

        <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-2">
          <article
            style={sectionEnterStyle(260)}
            className="section-enter relative flex flex-col gap-6 rounded-3xl border-2 border-border-subtle-0 bg-canvas px-0.5 pb-6 shadow-[6px_6px_0px_0px_rgba(255,78,0,0.12)]"
          >
            <header className="flex flex-col gap-4 border-b border-border-subtle-0 px-5 pb-4 pt-6 sm:px-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground-brand">
                Descubre
              </p>
              <p className="text-[46px] font-semibold leading-[56px] text-foreground-brand">
                60,00€
              </p>
              <div className="space-y-1 text-foreground-secondary">
                <p className="paragraph-md-bold">Sesión exprés de 60 minutos</p>
                <p className="text-[14px] leading-4">
                  Si algo te preocupa de la relación con tu perro, no tienes por
                  qué enfrentarlo sola. En esta sesión resolvemos tus dudas de
                  forma práctica, para que sepas cómo actuar y acompañarlo de
                  manera efectiva desde hoy.
                </p>
              </div>
            </header>
            <ul className="flex flex-1 flex-col gap-2 px-6">
              {basicFeatures.map((line, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-left text-[14px] leading-4 text-foreground-secondary"
                >
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-foreground-brand"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 px-6">
              <BrandLinkButton
                to={CONTACT_PATH}
                brandVariant="secondary"
                brandSize="md"
                className="w-full"
                leftSlot={null}
                rightSlot={null}
              >
                Contactar
              </BrandLinkButton>
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
            className="section-enter relative flex flex-col gap-6 rounded-3xl border-2 border-btn-primary bg-canvas px-0.5 pb-6 shadow-[4px_4px_0px_0px_rgba(104,66,255,0.2)]"
          >
            <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[var(--Primitive-color-blue-blue-600)] bg-foreground-accent px-2 py-1 text-[14px] leading-4 text-on-strong">
              Recomendado
            </div>
            <header className="flex flex-col gap-4 border-b border-border-subtle-0 px-5 pb-4 pt-8 sm:px-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground-brand">
                Transforma
              </p>
              <p className="text-[46px] font-semibold leading-[56px] text-foreground-brand">
                150,00€
              </p>
              <div className="space-y-1 text-foreground-secondary">
                <p className="paragraph-md-bold">
                  Programa personalizado 8 semanas
                </p>
                <p className="text-[14px] leading-4">
                  Te acompaño paso a paso para mejorar la convivencia con tu perro
                  desde la comprensión y el respeto mutuo. Cada sesión se adapta a
                  sus necesidades y a las tuyas, con estrategias prácticas para que
                  el cambio sea duradero y real.
                </p>
              </div>
            </header>
            <ul className="flex flex-col gap-2 px-6">
              {premiumFeatures.map((line, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-left text-[14px] leading-4 text-foreground-secondary"
                >
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-foreground-brand"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 px-6">
              <BrandLinkButton
                to={CONTACT_PATH}
                brandVariant="primary"
                brandSize="md"
                className="w-full"
                leftSlot={null}
                rightSlot={null}
              >
                Contactar
              </BrandLinkButton>
              <BrandLinkButton
                to={PROGRAM_8_WEEKS_PATH}
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
          style={sectionEnterStyle(430)}
          className="section-enter flex max-w-[880px] flex-col gap-2 border-t border-border-divider px-4 pt-4 text-foreground-secondary sm:px-12"
        >
          <p className="text-lg leading-6">
            Profesional Miembro Autorizado de la Red de Expertos de{' '}
            <span className="font-semibold">
              Crianza Multiespecie by creciendo entre perros
            </span>
          </p>
          <p className="text-[14px] leading-4">
            <span>Número de Afiliada: </span>
            <span className="font-semibold">2025003</span>
          </p>
        </div>
      </div>
    </section>
  )
}
