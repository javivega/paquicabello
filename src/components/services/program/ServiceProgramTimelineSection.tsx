import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const STEPS = [
  {
    n: '01',
    title: 'Contactamos',
    body: 'Puedes escribirme directamente por WhatsApp pulsando el botón de contacto. Estaré encantada de saber más sobre tu caso y acompañarte en este camino.',
  },
  {
    n: '02',
    title: 'Sesión inicial',
    body: 'Una vez me cuentes lo que está ocurriendo en casa, agendaremos una videollamada de 60 minutos para conoceros mejor a ti, a tu familia… y, por supuesto, a tu perro.',
  },
  {
    n: '03',
    title: 'Vídeos en casa y primeros pasos',
    body: 'Tras la sesión inicial, te propondré algunas pautas sencillas para empezar a mejorar la convivencia. También te pediré que grabes pequeños vídeos del día a día para poder acompañarte mejor y asegurarme de que todo va bien desde el inicio.',
  },
  {
    n: '04',
    title: 'Recomendaciones personalizadas',
    body: 'A medida que vayáis avanzando, te compartiré nuevas propuestas, juegos y estrategias adaptadas a vuestra realidad. Te acompañaré paso a paso para seguir construyendo un hogar más tranquilo y equilibrado.',
  },
  {
    n: '05',
    title: 'Acompañamiento continuo',
    body: 'Durante todo el proceso estaré disponible para resolver dudas en tiempo real, ajustar las pautas cuando lo necesitéis y apoyar cada pequeño avance que vayáis logrando.',
  },
] as const

/** ~200ms ease-out — calm micro-motion (ui-design-brain). */
const easeOut = 'ease-[cubic-bezier(0.25,0.1,0.25,1)]'
const easeOutSoft = 'ease-[cubic-bezier(0.22,1,0.36,1)]'

/** Timeline: document scroll; step nearest viewport focal line is “active”. No nested scroll. */
export function ServiceProgramTimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const updateActive = useCallback(() => {
    const focalY = window.innerHeight * 0.38

    let bestIdx = 0
    let bestDist = Number.POSITIVE_INFINITY
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const mid = r.top + r.height / 2
      const d = Math.abs(mid - focalY)
      if (d < bestDist) {
        bestDist = d
        bestIdx = i
      }
    })
    setActiveIndex((prev) => (prev !== bestIdx ? bestIdx : prev))
  }, [])

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(STEPS.length - 1, index))
      const el = itemRefs.current[clamped]
      if (!el) return
      el.scrollIntoView({
        block: 'center',
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    },
    [reduceMotion],
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onMq = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onMq)
    return () => mq.removeEventListener('change', onMq)
  }, [])

  useLayoutEffect(() => {
    updateActive()
  }, [updateActive])

  useEffect(() => {
    updateActive()
    window.addEventListener('scroll', updateActive, { passive: true })
    window.addEventListener('resize', updateActive, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateActive)
      window.removeEventListener('resize', updateActive)
    }
  }, [updateActive])

  const onRegionKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        scrollToIndex(activeIndex + 1)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        scrollToIndex(activeIndex - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        scrollToIndex(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        scrollToIndex(STEPS.length - 1)
      }
    },
    [activeIndex, scrollToIndex],
  )

  const spineProgress =
    STEPS.length <= 1 ? 100 : (activeIndex / (STEPS.length - 1)) * 100

  const active = STEPS[activeIndex]

  return (
    <section
      className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-14"
      aria-labelledby="program-8-timeline-heading"
    >
      <div className="flex max-w-[400px] shrink-0 flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
        <h2
          id="program-8-timeline-heading"
          className="text-[26px] font-semibold leading-8 text-foreground"
        >
          Tu día a día en el programa de 8 semanas
        </h2>
        <p
          id="program-8-timeline-hint"
          className="text-sm leading-5 text-foreground-secondary lg:max-w-[320px]"
        >
          Al hacer scroll por la página, la fase más cercana al centro de la ventana se
          destaca. Con el foco en la lista de pasos (Tab), usa las flechas o Inicio y
          Fin para desplazarte entre fases.
        </p>
      </div>

      <div
        role="region"
        aria-labelledby="program-8-timeline-heading"
        aria-describedby="program-8-timeline-hint"
        tabIndex={0}
        onKeyDown={onRegionKeyDown}
        className={cn(
          'relative min-w-0 flex-1 rounded-2xl border border-border-subtle-1 bg-canvas py-3 pr-3 shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.65)] sm:py-4 sm:pr-4',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--Semantictokens-Color-Icon-Accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        )}
      >
        <div
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          Paso {activeIndex + 1} de {STEPS.length}: {active.title}
        </div>

        {/* Spine: gutter matches ol padding + grid column */}
        <div
          className="pointer-events-none absolute bottom-6 left-2 top-6 z-0 w-10 sm:left-3 sm:top-8 sm:bottom-8"
          aria-hidden
        >
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border-subtle-0" />
          <div
            className={cn(
              'absolute left-1/2 top-0 w-px origin-top -translate-x-1/2 bg-foreground-brand',
              reduceMotion ? '' : cn('transition-[height] duration-500', easeOutSoft),
            )}
            style={{ height: `${spineProgress}%` }}
          />
        </div>

        <ol className="m-0 flex list-none flex-col gap-4 py-1 pl-2 sm:gap-5 sm:pl-3">
          {STEPS.map((step, i) => {
            const isActive = i === activeIndex
            const isPast = i < activeIndex
            const isFuture = i > activeIndex

            return (
              <li
                key={step.n}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                className="relative z-[1] grid scroll-mt-28 grid-cols-[2.5rem_1fr] items-start gap-3 md:gap-4"
              >
                <div className="flex w-full justify-center pt-6">
                  <div
                    className={cn(
                      'size-[22px] shrink-0 rounded-full border-2 bg-canvas motion-safe:transition-[transform,box-shadow,border-color,background-color] motion-safe:duration-200 sm:size-6',
                      easeOut,
                      reduceMotion
                        ? isPast || isActive
                          ? 'border-foreground-brand bg-foreground-brand'
                          : 'border-border-subtle-0'
                        : cn(
                            isActive &&
                              'scale-[1.06] border-foreground-brand shadow-[0_0_0_4px_color-mix(in_srgb,var(--Primitive-color-orange-orange-100)_60%,transparent)]',
                            isPast &&
                              !isActive &&
                              'border-foreground-brand bg-foreground-brand shadow-none',
                            isFuture &&
                              'border-border-subtle-0 bg-surface-subtle-0 shadow-none',
                          ),
                    )}
                    aria-hidden
                  />
                </div>

                <div
                  className={cn(
                    'group/card min-w-0 flex-1 rounded-2xl border p-6 sm:p-8',
                    'motion-safe:transition-[transform,opacity,box-shadow,border-color,background-color] motion-safe:duration-200',
                    easeOut,
                    reduceMotion
                      ? cn(
                          'border-border-subtle-1 bg-canvas',
                          isActive && 'border-foreground-brand/45 ring-1 ring-foreground-brand/15',
                        )
                      : cn(
                          isActive &&
                            'border-foreground-brand/40 bg-canvas shadow-[0_8px_30px_-8px_rgb(0_0_0_/_0.07)] ring-1 ring-foreground-brand/10',
                          !isActive &&
                            isFuture &&
                            'border-border-subtle-1 bg-surface-subtle-1/70 opacity-[0.72] hover:border-foreground-brand/25 hover:bg-surface-subtle-1 hover:opacity-90 md:translate-y-0.5 md:scale-[0.995]',
                          !isActive &&
                            isPast &&
                            'border-border-subtle-1 bg-surface-subtle-0/80 opacity-[0.86] hover:border-border-subtle-0 hover:opacity-100 md:scale-[0.998]',
                          isActive && 'md:scale-[1.01] motion-safe:duration-300',
                        ),
                  )}
                >
                  <p
                    className={cn(
                      'inline-flex w-fit rounded-lg border px-2 py-1 text-[14px] font-semibold leading-4 motion-safe:transition-colors motion-safe:duration-200',
                      isActive
                        ? 'border-foreground-brand/30 bg-[color-mix(in_srgb,var(--Primitive-color-orange-orange-50)_88%,var(--Primitive-color-orange-orange-100))] text-foreground-brand'
                        : 'border-border-subtle-0 bg-surface-subtle-0 text-foreground-brand',
                    )}
                  >
                    {step.n}
                  </p>
                  <p
                    className={cn(
                      'mt-3 text-xl font-semibold leading-7 motion-safe:transition-colors motion-safe:duration-200',
                      isActive ? 'text-foreground' : 'text-foreground-secondary',
                    )}
                  >
                    {step.title}
                  </p>
                  <p className="mt-2 max-w-prose text-base leading-6 text-foreground-secondary">
                    {step.body}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
