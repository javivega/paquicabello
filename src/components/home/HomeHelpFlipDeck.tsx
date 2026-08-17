import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useId, useRef, useState } from 'react'

import { BrandButton } from '@/components/ui/button'
import arrowLeft from '@/img/help-arrow-left.svg'
import arrowRight from '@/img/help-arrow-right.svg'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP)

export type HelpSituation = {
  id: string
  frontEyebrow: string
  frontTitle: string
  backItems: string[]
}

/** Same cases as the former marquee; copy shaped for flip front/back. */
export const helpSituations: HelpSituation[] = [
  {
    id: 'paseos',
    frontEyebrow: 'Los paseos se han convertido en un momento de estrés',
    frontTitle:
      'Tira de la correa, va pendiente de todo y volvéis a casa más cansados que al salir',
    backItems: [
      '😰 Me siento sobrepasado',
      '🌿 Necesito explorar',
      '⚡ Estoy demasiado activado',
    ],
  },
  {
    id: 'recursos',
    frontEyebrow: 'Los recursos se convierten en un problema',
    frontTitle:
      'Me preocupa cómo reacciona cuando hay comida, juguetes o recursos de por medio y no sé cómo gestionar estas situaciones',
    backItems: [
      '🛡️ Tengo miedo de perder algo importante',
      '⚠️ Necesito que mantengas la distancia',
      '🧩 He aprendido que protegerlo funciona',
    ],
  },
  {
    id: 'miedo',
    frontEyebrow: 'El miedo o la ansiedad marcan el día a día',
    frontTitle:
      'Siento que mi perro vive con miedo o ansiedad y no sé cómo ayudarle a sentirse más seguro',
    backItems: [
      '😨 El mundo me supera',
      '🏠 Necesito sentirme seguro',
      '🌿 Necesito tiempo para volver a estar tranquilo',
    ],
  },
  {
    id: 'ladridos',
    frontEyebrow: 'Los encuentros en la calle se vuelven difíciles',
    frontTitle:
      'Le ladra a otros perros o personas y me da miedo sacarlo por lo que pueda pasar',
    backItems: [
      '😰 Esto me preocupa o me supera',
      '↔️ Necesito más distancia',
      '🗣️ Estoy intentando que se alejen',
    ],
  },
  {
    id: 'vinculo',
    frontEyebrow: 'La relación se siente rota',
    frontTitle:
      'He probado mil métodos pero sigue sin hacerme caso; siento que el vínculo se ha desgastado',
    backItems: [
      '🗣️ Estoy intentando comunicarte cómo me siento',
      '🧩 No siempre entiendes lo que necesito',
      '🤝 Necesitamos volver a escucharnos',
    ],
  },
  {
    id: 'casa',
    frontEyebrow: 'En casa no hay calma',
    frontTitle:
      'No sabe estar tranquilo y me agota sentir que siempre está demandando algo',
    backItems: [
      '⚡ Me cuesta bajar mi nivel de activación',
      '🧠 Hay demasiadas cosas pasando dentro de mí',
      '🌿 Todavía no sé cómo relajarme',
    ],
  },
]

const CARD_SHADOW =
  'shadow-[0_0_5px_var(--Primitive-color-orange-orange-200)]'
const CARD_BORDER =
  'border border-[var(--Primitive-color-orange-orange-200)]'

/** Distinct resting pose per situation so deck changes read clearly. */
const CARD_POSES = [
  { rotate: -2.28, x: 0, y: 0 },
  { rotate: 3.64, x: 10, y: -4 },
  { rotate: -5.57, x: -12, y: 6 },
  { rotate: 4.8, x: 14, y: 4 },
  { rotate: -3.9, x: -8, y: -6 },
  { rotate: 2.1, x: 6, y: 8 },
] as const

function poseTransform(pose: (typeof CARD_POSES)[number]) {
  return `translate(${pose.x}px, ${pose.y}px) rotate(${pose.rotate}deg)`
}

type HomeHelpFlipDeckProps = {
  situations?: HelpSituation[]
  className?: string
}

export function HomeHelpFlipDeck({
  situations = helpSituations,
  className,
}: HomeHelpFlipDeckProps) {
  const titleId = useId()
  const backId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const flipperRef = useRef<HTMLDivElement>(null)
  const flipTween = useRef<gsap.core.Timeline | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const count = situations.length
  const active = situations[activeIndex]
  const activePose = CARD_POSES[activeIndex % CARD_POSES.length]
  const peekPoses = [
    CARD_POSES[(activeIndex + 1) % CARD_POSES.length],
    CARD_POSES[(activeIndex + 2) % CARD_POSES.length],
  ]

  const { contextSafe } = useGSAP(
    () => {
      const flipper = flipperRef.current
      if (!flipper) return

      gsap.set(flipper, {
        transformPerspective: 1800,
        transformStyle: 'preserve-3d',
        rotateY: 0,
        scale: 1,
        z: 0,
        force3D: true,
      })
      gsap.set('.home-help-card-face', {
        backfaceVisibility: 'hidden',
        force3D: true,
      })
      gsap.set('.home-help-card-back', { rotateY: 180 })
      gsap.set('.home-help-back-item', { autoAlpha: 0, y: 14 })
      gsap.set('.home-help-peek', { scale: 1, autoAlpha: 1 })
    },
    { scope: rootRef, dependencies: [activeIndex] },
  )

  const animateFlip = contextSafe((next: boolean) => {
    const flipper = flipperRef.current
    if (!flipper) return

    flipTween.current?.kill()

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const peeks = gsap.utils.toArray<HTMLElement>('.home-help-peek')
    const backItems = gsap.utils.toArray<HTMLElement>('.home-help-back-item')

    if (reduce) {
      gsap.set(flipper, { rotateY: next ? 180 : 0, scale: 1, z: 0 })
      gsap.set(peeks, { scale: 1, autoAlpha: 1 })
      gsap.set(backItems, { autoAlpha: next ? 1 : 0, y: 0 })
      return
    }

    const tl = gsap.timeline({
      defaults: { force3D: true },
      onComplete: () => {
        flipTween.current = null
      },
    })
    flipTween.current = tl

    // Continuous spin + mid-flip lift (yoyo) — modern, interruptible, no long-way spin.
    tl.to(
      flipper,
      {
        rotateY: next ? 180 : 0,
        duration: 0.52,
        ease: 'power2.inOut',
      },
      0,
    )
    tl.fromTo(
      flipper,
      { scale: 1, z: 0 },
      {
        scale: 1.05,
        z: 40,
        duration: 0.26,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      },
      0,
    )
    tl.to(
      peeks,
      {
        scale: next ? 0.965 : 1,
        autoAlpha: next ? 0.7 : 1,
        duration: 0.36,
        ease: 'power2.inOut',
        stagger: 0.03,
      },
      0,
    )

    if (next) {
      gsap.set(backItems, { autoAlpha: 0, y: 14 })
      tl.to(
        backItems,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.04,
          ease: 'power3.out',
        },
        0.28,
      )
    } else {
      tl.to(
        backItems,
        { autoAlpha: 0, y: 10, duration: 0.16, ease: 'power2.in' },
        0,
      )
    }
  })

  function setFlip(next: boolean) {
    if (next === flipped) return
    setFlipped(next)
    animateFlip(next)
  }

  function goTo(index: number) {
    flipTween.current?.kill()
    flipTween.current = null
    setFlipped(false)
    setActiveIndex((index + count) % count)
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        'flex w-full max-w-[664px] flex-col items-center gap-1',
        className,
      )}
    >
      <div className="relative flex h-[482px] w-full max-w-[442px] items-center justify-center overflow-visible">
        {peekPoses.map((pose, i) => (
          <div
            key={`${activeIndex}-peek-${i}`}
            className={cn(
              'home-help-peek pointer-events-none absolute h-[446px] w-[min(400px,88%)] rounded-3xl bg-surface-subtle-0',
              CARD_BORDER,
              CARD_SHADOW,
              'motion-safe:transition-[transform] motion-safe:duration-500 motion-safe:ease-[var(--ease-out)]',
            )}
            style={{ zIndex: i + 1, transform: poseTransform(pose) }}
            aria-hidden
          />
        ))}

        {/* Pose lives outside the flipper so 2D tilt never fights rotateY. */}
        <div
          className="relative z-10 h-[446px] w-[min(400px,88%)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[var(--ease-out)]"
          style={{ transform: poseTransform(activePose) }}
        >
          <div className="size-full [perspective:1800px]">
            <div ref={flipperRef} className="relative size-full">
              <article
                aria-label={active.frontTitle}
                className="absolute inset-0 [transform-style:preserve-3d]"
              >
                <div
                  className={cn(
                    'home-help-card-face home-help-card-front absolute inset-0 flex flex-col items-end gap-4 rounded-3xl bg-surface-subtle-0 p-5 sm:gap-6 sm:p-8',
                    CARD_BORDER,
                    CARD_SHADOW,
                    flipped && 'pointer-events-none',
                  )}
                  aria-hidden={flipped}
                  {...(flipped ? { inert: true } : {})}
                >
                  <p className="w-full text-base leading-5 text-foreground-secondary sm:text-lg sm:leading-6">
                    {active.frontEyebrow}
                  </p>
                  <h3
                    id={titleId}
                    className="w-full flex-1 text-[20px] font-semibold leading-6 text-foreground sm:text-[26px] sm:leading-8"
                  >
                    {active.frontTitle}
                  </h3>
                  <BrandButton
                    type="button"
                    brandVariant="secondary"
                    brandSize="md"
                    leftSlot={null}
                    rightSlot={null}
                    aria-expanded={flipped}
                    aria-controls={backId}
                    onClick={() => setFlip(true)}
                  >
                    Qué puede haber detrás?
                  </BrandButton>
                </div>

                <div
                  id={backId}
                  className={cn(
                    'home-help-card-face home-help-card-back absolute inset-0 flex flex-col items-end gap-4 rounded-3xl p-5 sm:gap-6 sm:p-8',
                    'bg-[var(--Semantictokens-Color-Background-Strong-0-default)]',
                    CARD_BORDER,
                    CARD_SHADOW,
                    !flipped && 'pointer-events-none',
                  )}
                  aria-hidden={!flipped}
                  {...(!flipped ? { inert: true } : {})}
                >
                  <p className="w-full text-base leading-5 text-on-strong sm:text-lg sm:leading-6">
                    ¿Qué puede haber detrás?
                  </p>
                  <ul className="w-full flex-1 list-none space-y-4 p-0 text-[20px] font-semibold leading-6 text-on-strong sm:space-y-8 sm:text-[26px] sm:leading-8">
                    {active.backItems.map((item) => (
                      <li key={item} className="home-help-back-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <BrandButton
                    type="button"
                    brandVariant="secondary"
                    brandSize="md"
                    leftSlot={null}
                    rightSlot={null}
                    onClick={() => setFlip(false)}
                  >
                    Volver
                  </BrandButton>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      <nav
        className="mt-4 flex flex-col items-center"
        aria-label="Situaciones que podemos trabajar"
      >
        <div className="flex h-5 items-center gap-2">
          {situations.map((situation, index) => {
            const selected = index === activeIndex
            return (
              <button
                key={situation.id}
                type="button"
                aria-label={situation.frontEyebrow}
                aria-current={selected ? 'true' : undefined}
                className={cn(
                  'size-2.5 rounded-full transition-colors duration-150 ease-[var(--ease-out)]',
                  selected
                    ? 'bg-foreground-accent'
                    : 'border border-foreground-accent bg-transparent',
                )}
                onClick={() => goTo(index)}
              />
            )
          })}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <BrandButton
            type="button"
            brandVariant="tertiary"
            brandSize="md"
            leftSlot={
              <img
                src={arrowLeft}
                alt="Flecha izquierda"
                width={20}
                height={20}
                className="size-5"
              />
            }
            rightSlot={null}
            aria-label="Situación anterior"
            onClick={() => goTo(activeIndex - 1)}
          />
          <BrandButton
            type="button"
            brandVariant="tertiary"
            brandSize="md"
            leftSlot={
              <img
                src={arrowRight}
                alt="Flecha derecha"
                width={20}
                height={20}
                className="size-5"
              />
            }
            rightSlot={null}
            aria-label="Situación siguiente"
            onClick={() => goTo(activeIndex + 1)}
          />
        </div>
      </nav>
    </div>
  )
}
