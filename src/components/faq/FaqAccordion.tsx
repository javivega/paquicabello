import { Accordion } from '@base-ui/react'
import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

import { faqItems } from '@/data/faq-items'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

type FaqSectionIntroProps = {
  headingId: string
  className?: string
  /** e.g. “Tengo más dudas” on home */
  footer?: ReactNode
  /** Staggered entry (home). */
  animated?: boolean
}

export function FaqSectionIntro({
  headingId,
  className,
  footer,
  animated = false,
}: FaqSectionIntroProps) {
  return (
    <div className={cn('flex max-w-[680px] flex-col gap-4', className)}>
      <p
        style={animated ? sectionEnterStyle(40) : undefined}
        className={cn(
          'inline-flex w-fit rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent',
          animated && 'section-enter',
        )}
      >
        FAQs
      </p>
      <h2
        id={headingId}
        style={animated ? sectionEnterStyle(110) : undefined}
        className={cn(
          'text-balance text-[clamp(1.75rem,3vw+1rem,2.875rem)] font-semibold leading-tight text-foreground sm:text-[46px] sm:leading-[56px]',
          animated && 'section-enter',
        )}
      >
        Consulta las dudas más frecuentes
      </h2>
      <p
        style={animated ? sectionEnterStyle(180) : undefined}
        className={cn(
          'max-w-[784px] text-lg leading-7 text-foreground-secondary',
          animated && 'section-enter',
        )}
      >
        ¿Tienes algunas dudas? Aquí tienes respuesta a las preguntas que otras
        personas como tú suele tener.
      </p>
      {footer ? (
        <span
          style={animated ? sectionEnterStyle(250) : undefined}
          className={cn(animated && 'section-enter inline-flex w-fit')}
        >
          {footer}
        </span>
      ) : null}
    </div>
  )
}

type FaqAccordionProps = {
  className?: string
  /** Staggered entry for items (home). */
  animated?: boolean
}

/** Shared FAQ accordion (Base UI + tokens). Used on home and sesión exprés. */
export function FaqAccordion({ className, animated = false }: FaqAccordionProps) {
  return (
    <Accordion.Root
      className={cn('flex flex-col gap-3', className)}
      defaultValue={['faq-0']}
    >
      {faqItems.map((item, i) => (
        <Accordion.Item
          key={item.id}
          value={item.id}
          style={animated ? sectionEnterStyle(280 + i * 45) : undefined}
          className={cn(
            'overflow-hidden rounded-2xl border border-border-subtle-1 bg-canvas',
            'shadow-[0_1px_3px_0_rgb(0_0_0_/_0.05)]',
            'motion-safe:transition-[transform,box-shadow] motion-safe:duration-200 motion-safe:ease-[var(--ease-out)]',
            'data-[open]:shadow-[0_6px_24px_0_rgb(0_0_0_/_0.07)]',
            // Touch devices fire sticky :hover — gate lift to fine pointers only.
            '[@media(hover:hover)_and_(pointer:fine)]:motion-safe:hover:-translate-y-0.5',
            '[@media(hover:hover)_and_(pointer:fine)]:hover:shadow-[0_6px_24px_0_rgb(0_0_0_/_0.07)]',
            animated && 'section-enter',
          )}
        >
          <Accordion.Header className="m-0 border-0 p-0 font-[inherit]">
            <Accordion.Trigger
              className={(state) =>
                cn(
                  'flex w-full items-start gap-4 p-6 text-left',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--Semantictokens-Color-Icon-Accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
                  state.open && '[&>svg:last-child]:rotate-180',
                )
              }
            >
              <span
                className="mt-2 size-2 shrink-0 rounded-full bg-foreground-brand"
                aria-hidden
              />
              <span className="min-w-0 flex-1 text-xl font-semibold leading-snug text-foreground">
                {item.question}
              </span>
              <ChevronDown
                className="mt-0.5 size-5 shrink-0 text-foreground-secondary transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
                strokeWidth={2}
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel
            className={cn(
              'h-[var(--accordion-panel-height)] overflow-hidden',
              'motion-safe:transition-[height,opacity] motion-safe:duration-200 motion-safe:ease-[var(--ease-out)]',
              'data-[starting-style]:h-0 data-[starting-style]:opacity-0',
              'data-[ending-style]:h-0 data-[ending-style]:opacity-0',
              'motion-reduce:transition-none',
            )}
          >
            <div className="border-t border-border-subtle-1 px-6 pb-6 pt-4 text-[15px] leading-7 text-foreground-secondary">
              <p>{item.answer}</p>
            </div>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

type FaqStackedSectionProps = {
  headingId: string
  className?: string
}

/** Intro + acordeón en columna (páginas de detalle de servicio). */
export function FaqStackedSection({ headingId, className }: FaqStackedSectionProps) {
  return (
    <section
      className={cn('w-full scroll-mt-28 pt-10', className)}
      aria-labelledby={headingId}
    >
      <FaqSectionIntro headingId={headingId} />
      <FaqAccordion className="mt-8 max-w-[600px]" />
    </section>
  )
}
