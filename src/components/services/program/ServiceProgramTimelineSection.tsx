import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { useCallback, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const STEPS = [
  {
    n: '01',
    title: 'Contáctame',
    body: [
      {
        id: 'contact-1',
        text: 'Cuéntame qué os preocupa y cómo es vuestra convivencia. Puedes escribirme directamente por WhatsApp y estaré encantada de conoceros, resolver tus primeras dudas y orientarte sobre cómo puedo ayudaros.',
      },
    ],
  },
  {
    n: '02',
    title: 'Sesión inicial',
    body: [
      {
        id: 'initial-1',
        text: 'Una vez me hayas contado qué está ocurriendo en casa, agendaremos una videollamada de 60 minutos para conoceros mejor a ti, a tu familia y, por supuesto, a tu perro.',
      },
      {
        id: 'initial-2',
        text: 'Hablaremos de vuestra historia, analizaremos la situación y definiremos un plan de trabajo adaptado a vuestra realidad.',
      },
    ],
  },
  {
    n: '03',
    title: 'Primeras pautas y revisión de vídeos',
    body: [
      {
        id: 'pautas-1',
        text: 'Después de la sesión empezaréis a aplicar las primeras pautas, siempre adaptadas a vuestro día a día y al ritmo de vuestra familia.',
      },
      {
        id: 'pautas-2',
        text: 'Además, podréis compartir conmigo pequeños vídeos de situaciones cotidianas. Esto me permitirá observar cómo se comunica vuestro perro, comprender mejor lo que está ocurriendo y ajustar las recomendaciones para acompañaros de una forma mucho más personalizada.',
      },
    ],
  },
  {
    n: '04',
    title: 'Seguimos avanzando juntos',
    body: [
      {
        id: 'avance-1',
        text: 'Cada pequeño avance nos ayudará a dar el siguiente paso. A lo largo del programa irás recibiendo nuevas pautas y recomendaciones adaptadas a vuestra evolución, para que los cambios sean reales, sostenibles y encajen en vuestro día a día.',
      },
    ],
  },
  {
    n: '05',
    title: 'Acompañamiento continuo',
    body: [
      {
        id: 'acomp-1',
        text: 'Durante todo el proceso estaré a tu lado para resolver tus dudas, ayudarte a adaptar las pautas cuando sea necesario y acompañaros en cada avance. No tendrás que esperar a la siguiente sesión para sentirte acompañada.',
      },
    ],
  },
] as const

const easeOut = 'ease-[var(--ease-out)]'
const FOCAL = '45%' as const

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Timeline — scroll-active steps + scrubbed spine (ScrollTrigger). */
export function ServiceProgramTimelineSection({
  className,
}: {
  className?: string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const spineFillRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [reduceMotion] = useState(prefersReducedMotion)

  useGSAP(
    () => {
      const list = listRef.current
      const spine = spineFillRef.current
      if (!list || !spine) return

      const items = gsap.utils.toArray<HTMLElement>('[data-timeline-step]', list)
      if (items.length === 0) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(spine, { scaleY: 1, transformOrigin: '50% 0%' })
        items.forEach((item, i) => {
          ScrollTrigger.create({
            trigger: item,
            start: `top ${FOCAL}`,
            end: `bottom ${FOCAL}`,
            onEnter: () => setActiveIndex(i),
            onEnterBack: () => setActiveIndex(i),
          })
        })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(spine, { scaleY: 0, transformOrigin: '50% 0%' })

        gsap.to(spine, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: list,
            start: `top ${FOCAL}`,
            end: `bottom ${FOCAL}`,
            scrub: 0.45,
          },
        })

        items.forEach((item, i) => {
          ScrollTrigger.create({
            trigger: item,
            start: `top ${FOCAL}`,
            end: `bottom ${FOCAL}`,
            onEnter: () => setActiveIndex(i),
            onEnterBack: () => setActiveIndex(i),
          })

          const card = item.querySelector<HTMLElement>('[data-timeline-card]')
          if (!card) return

          gsap.fromTo(
            card,
            { autoAlpha: 0.5, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            },
          )
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(STEPS.length - 1, index))
    const el = itemRefs.current[clamped]
    if (!el) return
    el.scrollIntoView({
      block: 'center',
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }, [reduceMotion])

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

  const active = STEPS[activeIndex]

  return (
    <section
      ref={sectionRef}
      className={cn(
        'flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-14',
        className,
      )}
      aria-labelledby="program-4-timeline-heading"
    >
      <div
        data-scroll-enter
        className="scroll-enter flex max-w-[400px] shrink-0 flex-col gap-4 lg:sticky lg:top-28 lg:self-start"
      >
        <h2
          id="program-4-timeline-heading"
          className="text-[26px] font-semibold leading-8 text-foreground"
        >
          Tu día a día en el programa de 4 semanas
        </h2>
      </div>

      <div
        role="region"
        aria-label="Pasos del programa"
        tabIndex={0}
        onKeyDown={onRegionKeyDown}
        className={cn(
          'relative min-w-0 flex-1 rounded-2xl border border-border-subtle-1 bg-canvas py-3 pr-3 shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.65)] sm:py-4 sm:pr-4',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--Semantictokens-Color-Icon-Accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        )}
      >
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Paso {activeIndex + 1} de {STEPS.length}: {active.title}
        </div>

        <div
          className="pointer-events-none absolute bottom-6 left-2 top-6 z-0 w-10 sm:bottom-8 sm:left-3 sm:top-8"
          aria-hidden
        >
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border-subtle-0" />
          <div
            ref={spineFillRef}
            className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-foreground-brand will-change-transform"
          />
        </div>

        <ol
          ref={listRef}
          className="m-0 flex list-none flex-col gap-4 py-1 pl-2 sm:gap-5 sm:pl-3"
        >
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
                data-timeline-step=""
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
                  data-timeline-card=""
                  className={cn(
                    'group/card min-w-0 flex-1 rounded-2xl border p-6 sm:p-8',
                    'motion-safe:transition-[transform,opacity,box-shadow,border-color,background-color] motion-safe:duration-200',
                    easeOut,
                    reduceMotion
                      ? cn(
                          'border-border-subtle-1 bg-canvas',
                          isActive &&
                            'border-foreground-brand/45 ring-1 ring-foreground-brand/15',
                        )
                      : cn(
                          isActive &&
                            'border-foreground-brand/40 bg-canvas shadow-[0_8px_30px_-8px_rgb(0_0_0_/_0.07)] ring-1 ring-foreground-brand/10 md:scale-[1.01] motion-safe:duration-300',
                          !isActive &&
                            isFuture &&
                            'border-border-subtle-1 bg-surface-subtle-1/70 opacity-[0.72] hover:border-foreground-brand/25 hover:bg-surface-subtle-1 hover:opacity-90 md:translate-y-0.5 md:scale-[0.995]',
                          !isActive &&
                            isPast &&
                            'border-border-subtle-1 bg-surface-subtle-0/80 opacity-[0.86] hover:border-border-subtle-0 hover:opacity-100 md:scale-[0.998]',
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
                  <h3
                    className={cn(
                      'mt-3 text-xl font-semibold leading-7 motion-safe:transition-colors motion-safe:duration-200',
                      isActive ? 'text-foreground' : 'text-foreground-secondary',
                    )}
                  >
                    {step.title}
                  </h3>
                  <div className="mt-2 max-w-prose space-y-2 text-base leading-6 text-foreground-secondary">
                    {step.body.map((paragraph) => (
                      <p key={paragraph.id}>{paragraph.text}</p>
                    ))}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
