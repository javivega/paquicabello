import { BrandAnchorButton, BrandLinkButton } from '@/components/ui/button'
import methodCadaMiembro from '@/img/method/method-cada-miembro.webp'
import methodCompromiso from '@/img/method/method-compromiso.webp'
import methodDisfruta from '@/img/method/method-disfruta.webp'
import methodFamilia from '@/img/method/method-familia.webp'
import methodLimites from '@/img/method/method-limites.webp'
import methodSinCastigos from '@/img/method/method-sin-castigos.webp'
import { SERVICES_PATH, whatsappContactHref } from '@/lib/routes'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const enterChip = sectionEnterStyle(50)
const enterHeading = sectionEnterStyle(120)
const enterBody = sectionEnterStyle(190)
const enterCtaPrimary = sectionEnterStyle(250)
const enterCtaSecondary = sectionEnterStyle(310)

const pillars = [
  {
    id: 'familia',
    title: 'Una familia en la que todos cuentan',
    body: 'Tu perro no es un añadido, es parte de la familia. Tiene emociones, necesidades y una forma propia de comunicarse. Aunque no utilice palabras, a través de su comportamiento y de su lenguaje corporal te está diciendo constantemente cómo se siente. Aprender a entender esas señales es el primer paso para construir una convivencia más tranquila, segura y respetuosa para todos',
    illustration: methodFamilia,
  },
  {
    id: 'sin-castigos',
    title: 'Educación sin castigos',
    body: 'No creo en los gritos, los castigos ni en los métodos que generan miedo o inseguridad. Te acompaño para comprender qué necesita tu perro y ayudarle a aprender desde la confianza, el respeto y una comunicación clara.',
    illustration: methodSinCastigos,
  },
  {
    id: 'limites',
    title: 'Límites que cuidan',
    body: 'Respetar a tu perro no significa dejarle hacer todo. Los límites también forman parte de una convivencia sana cuando son claros, coherentes y tienen en cuenta las necesidades de todos los miembros de la familia.',
    illustration: methodLimites,
  },
  {
    id: 'compromiso',
    title: 'Compromiso de todos',
    body: 'Una convivencia segura entre niños y perros es posible ¡Por supuesto! Durante años nos han dicho que había que controlar al perro en un transportín, en ocasiones, el perro se quedaba relegado/apartado de la vida familiar, la realidad es que da mejores resultados integrarlo en la vida familiar con límites que protejan y sean seguros para los todos miembros de la familia.',
    illustration: methodCompromiso,
  },
  {
    id: 'cada-miembro',
    title: 'Cada miembro de la familia importa',
    body: 'Cada familia es única, y también lo son las personas y los perros que la forman. Por eso busco soluciones que tengan en cuenta las necesidades de todos, creando una convivencia basada en el respeto, la comprensión y el bienestar compartido.',
    illustration: methodCadaMiembro,
  },
  {
    id: 'disfruta',
    title: 'Disfruta de una convivencia más tranquila con tu perro',
    body: 'Convivir con tu perro puede ser mucho más sencillo de lo que imaginas. Entender sus necesidades y saber cómo acompañarlo en cada situación marcará la diferencia en vuestro día a día. Juntos trabajaremos para que recuperéis la calma, la confianza y el disfrute de vivir en familia.',
    illustration: methodDisfruta,
  },
] as const

/** Pin offset from viewport top — clears the navbar and leaves breathing room. */
const STACK_PIN_START = 'top 168px'

type MethodologyPillarCardProps = {
  titleId: string
  title: string
  body: string
  illustration: string
  index: number
  className?: string
}

function MethodologyPillarCard({
  titleId,
  title,
  body,
  illustration,
  index,
  className,
}: MethodologyPillarCardProps) {
  return (
    <article
      aria-labelledby={titleId}
      className={cn('method-stack-card relative w-full', className)}
      style={{ zIndex: index + 1 }}
    >
      {/* Inner surface takes scale so pin transforms stay conflict-free. */}
      <div
        className={cn(
          'method-stack-card-inner flex w-full origin-top flex-col gap-8 rounded-xl border border-border-subtle-0 bg-canvas p-6 shadow-[0_12px_40px_-24px_rgba(28,28,28,0.28)] sm:p-8 lg:flex-row lg:items-start lg:gap-10 lg:p-9',
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-10">
          <div
            className="size-2.5 shrink-0 rounded-full bg-foreground-brand"
            aria-hidden
          />
          <div className="flex max-w-[540px] flex-col gap-3">
            <h3
              id={titleId}
              className="text-balance text-[clamp(1.5rem,2vw+0.75rem,2.25rem)] font-semibold leading-tight text-foreground sm:text-[36px] sm:leading-10"
            >
              {title}
            </h3>
            <p className="max-w-[460px] text-pretty text-base leading-5 text-foreground-secondary">
              {body}
            </p>
          </div>
        </div>

        <figure className="mx-auto flex h-[min(320px,70vw)] w-full max-w-[400px] shrink-0 items-center justify-center lg:mx-0">
          <img
            src={illustration}
            alt={`Ilustración: ${title}`}
            width={400}
            height={320}
            className="h-auto max-h-full w-full object-contain"
            decoding="async"
            loading="lazy"
          />
        </figure>
      </div>
    </article>
  )
}

export function HomeMethodologySection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const stack = stackRef.current
      if (!stack) return

      const cards = gsap.utils.toArray<HTMLElement>('.method-stack-card')
      if (cards.length < 2) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const last = cards[cards.length - 1]

        cards.forEach((card, i) => {
          // Pin each card so the next one stacks over it.
          ScrollTrigger.create({
            trigger: card,
            start: STACK_PIN_START,
            endTrigger: last,
            end: STACK_PIN_START,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          })

          const next = cards[i + 1]
          if (!next) return

          const inner = card.querySelector<HTMLElement>('.method-stack-card-inner')
          if (!inner) return

          // Scale the inner surface only — avoids fighting the pin transform.
          gsap.fromTo(
            inner,
            { scale: 1 },
            {
              scale: 0.96,
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: next,
                start: 'top 60%',
                end: STACK_PIN_START,
                scrub: 0.9,
                invalidateOnRefresh: true,
              },
            },
          )
        })

        // Recalc after lazy images settle the card heights.
        const images = stack.querySelectorAll('img')
        let pending = images.length
        if (pending === 0) {
          ScrollTrigger.refresh()
          return
        }

        const onDone = () => {
          pending -= 1
          if (pending <= 0) ScrollTrigger.refresh()
        }
        images.forEach((img) => {
          if (img.complete) onDone()
          else {
            img.addEventListener('load', onDone, { once: true })
            img.addEventListener('error', onDone, { once: true })
          }
        })
      })

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className={cn('w-full bg-canvas py-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28', className)}
      aria-labelledby="home-method-heading"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 sm:px-6 lg:gap-12 lg:px-20">
        <header className="flex w-full max-w-[672px] flex-col items-center gap-4 text-center">
          <p
            style={enterChip}
            className="section-enter inline-flex w-fit rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
          >
            Metodología
          </p>
          <h2
            id="home-method-heading"
            style={enterHeading}
            className="section-enter text-balance text-[clamp(1.75rem,3vw+1rem,2.875rem)] font-semibold leading-tight text-foreground sm:text-[46px] sm:leading-[56px]"
          >
            Una forma diferente de entender la{' '}
            <span className="text-foreground-brand">educación canina</span>
          </h2>
          <div
            style={enterBody}
            className="section-enter max-w-[640px] space-y-2 text-lg leading-6 text-foreground-secondary"
          >
            <p>
              No se trata de que tu perro haga caso a cualquier precio, sino de
              entender por qué se comporta como lo hace y ayudarle de una forma
              respetuosa.
            </p>
            <p>
              Así construimos una convivencia más tranquila, un vínculo más
              fuerte y una relación en la que ambos os sintáis seguros.
            </p>
          </div>
        </header>

        <div className="flex flex-wrap justify-center gap-3">
          <BrandAnchorButton
            href={whatsappContactHref('general')}
            brandVariant="primary"
            brandSize="md"
            leftSlot={null}
            rightSlot={null}
            className="section-enter"
            style={enterCtaPrimary}
          >
            Contactar
          </BrandAnchorButton>
          <BrandLinkButton
            to={SERVICES_PATH}
            brandVariant="secondary"
            brandSize="md"
            leftSlot={null}
            rightSlot={null}
            className="section-enter"
            style={enterCtaSecondary}
          >
            Explorar servicios
          </BrandLinkButton>
        </div>

        <div
          ref={stackRef}
          className="method-stack relative flex w-full max-w-[1024px] flex-col"
        >
          {pillars.map((pillar, i) => (
            <MethodologyPillarCard
              key={pillar.id}
              titleId={`home-method-pillar-title-${pillar.id}`}
              title={pillar.title}
              body={pillar.body}
              illustration={pillar.illustration}
              index={i}
              className={i < pillars.length - 1 ? 'mb-5' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
