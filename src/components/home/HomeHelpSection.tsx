import { useSyncExternalStore } from 'react'

import { BrandButton } from '@/components/ui/button'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getReducedMotionServerSnapshot() {
  return false
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  )
}

const situations = [
  {
    title: 'Mi perro se aleja cuando tengo a mi bebé en brazos',
    accent: true as const,
    rotate: '-rotate-1' as const,
  },
  {
    title: 'Mi perro mira fijamente a mi bebé  cuando está en casa',
    accent: false as const,
    rotate: 'rotate-2' as const,
  },
  {
    title: 'Mi perro ladra o gruñe cuando el bebé llora',
    accent: false as const,
    rotate: '-rotate-1' as const,
  },
  {
    title: 'Mi perro tira de la correa cuando salimos a pasear',
    accent: false as const,
    rotate: 'rotate-1' as const,
  },
  {
    title: 'Mi perro no me hace caso y no sé qué más probar',
    accent: false as const,
    rotate: '-rotate-1' as const,
  },
  {
    title: 'Mi perro roba juguetes y cosas del bebé',
    accent: true as const,
    rotate: '-rotate-1' as const,
  },
] as const

type SituationCard = (typeof situations)[number]

function SituationCardItem({ card }: { card: SituationCard }) {
  return (
    <div
      className={cn(
        'w-[min(389px,85vw)] shrink-0 sm:w-[389px]',
        card.rotate,
      )}
    >
      <article className="flex h-full flex-col gap-5 rounded-2xl border border-border-subtle-1 bg-surface-subtle-1 p-6">
        <h3
          className={cn(
            'text-xl font-semibold leading-6',
            card.accent ? 'text-foreground-brand' : 'text-foreground',
          )}
        >
          {card.title}
        </h3>
        <BrandButton
          brandVariant="secondary"
          brandSize="md"
          type="button"
          className="w-fit"
          leftSlot={null}
          rightSlot={null}
        >
          Evaluar caso
        </BrandButton>
      </article>
    </div>
  )
}

export function HomeHelpSection({ className }: { className?: string }) {
  const reducedMotion = usePrefersReducedMotion()
  const marqueeCards = reducedMotion
    ? [...situations]
    : [...situations, ...situations]

  return (
    <section
      className={cn('w-full bg-canvas py-16 sm:py-20 lg:py-24', className)}
      aria-labelledby="home-help-heading"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col px-4 sm:px-6 lg:pl-8 lg:pr-4 xl:pl-20">
        <div className="flex max-w-[680px] flex-col gap-4">
          <p
            style={sectionEnterStyle(40)}
            className={cn(
              'section-enter inline-flex w-fit rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent',
            )}
          >
            Cómo te puedo ayudar
          </p>
          <h2
            id="home-help-heading"
            style={sectionEnterStyle(110)}
            className={cn(
              'section-enter text-balance text-[clamp(1.75rem,3vw+1rem,2.875rem)] font-semibold leading-tight sm:text-[46px] sm:leading-[56px]',
            )}
          >
            <span className="text-foreground">Tu perro no es difícil</span>
            <span className="text-foreground-brand">
              , probablemente nadie te ha enseñado a entenderlo
            </span>
          </h2>
          <div
            style={sectionEnterStyle(180)}
            className={cn('section-enter space-y-2 text-lg leading-6 text-foreground-secondary')}
          >
            <p>
              La desinformación y las expectativas poco realistas nos hacen
              interpretar como “problemas” lo que en realidad son intentos de
              comunicación. Cuando aprendemos a leer sus señales, cambia todo.
            </p>
            <p>
              <span>Te acompaño para que puedas: </span>
              <span className="font-semibold">
                comprender su comportamiento, ajustar el entorno y las
                dinámicas, construir una convivencia más tranquila y consciente
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <span
              className="section-enter inline-flex"
              style={sectionEnterStyle(260)}
            >
              <BrandButton
                brandVariant="primary"
                brandSize="md"
                type="button"
                leftSlot={null}
                rightSlot={null}
              >
                Contactar
              </BrandButton>
            </span>
            <span
              className="section-enter inline-flex"
              style={sectionEnterStyle(320)}
            >
              <BrandButton
                brandVariant="secondary"
                brandSize="md"
                type="button"
                leftSlot={null}
                rightSlot={null}
              >
                Explorar servicios
              </BrandButton>
            </span>
          </div>
        </div>
      </div>

      {/* Full viewport width — outside max-w column so the track spans edge to edge */}
      <div
        style={sectionEnterStyle(360)}
        className={cn(
          'section-enter-fade relative mt-8 w-full overflow-hidden py-4 sm:mt-10 lg:mt-12',
          !reducedMotion && 'home-help-marquee-wrap',
        )}
        aria-label="Ejemplos de situaciones que podemos trabajar"
        role="region"
      >
        <div
          className={cn(
            reducedMotion
              ? 'flex w-full flex-wrap justify-center gap-6 pb-2'
              : 'home-help-marquee-track will-change-transform pb-2',
          )}
        >
          {marqueeCards.map((card, i) => (
            <SituationCardItem
              key={reducedMotion ? card.title : `marquee-${i}`}
              card={card}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
