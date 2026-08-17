import type { ReactNode } from 'react'
import { useLayoutEffect, useRef, useState } from 'react'

import doodleSquiggle from '@/img/about/doodle-squiggle.svg'
import heroPhoto from '@/img/about/hero-photo.webp'
import patternImage from '@/img/pattern.webp'
import { useScrollEnter } from '@/hooks/useScrollEnter'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const heroMeshBackground = [
  'radial-gradient(ellipse 343px 198px at 50% 0%, rgb(252 252 252) 0%, rgb(255 244 240) 100%)',
  'linear-gradient(90deg, rgb(255 244 240) 0%, rgb(255 244 240) 100%)',
].join(', ')

/** Site motion token — matches `--ease-out` in `src/styles/tokens.css`. */
const HERO_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/** Figma Frame 11 — 1104:8567. */
const ARTBOARD = { w: 577, h: 676 } as const

function AboutHeroLayer({
  layer,
  className,
  children,
}: {
  layer: string
  className?: string
  children: ReactNode
}) {
  return (
    <div
      data-about-hero-layer={layer}
      className={cn('about-hero-layer', className)}
    >
      {children}
    </div>
  )
}

/**
 * Collage — Figma 1104:8567 nested peek → photo → squiggle.
 * Fixed artboard coords, scaled to container width.
 */
function AboutHeroCollage({ className }: { className?: string }) {
  const collageRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const el = collageRef.current
    if (!el) return
    const update = () => {
      setScale(el.clientWidth / ARTBOARD.w)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const layer = (name: string) => `[data-about-hero-layer="${name}"]`
      const trigger = collageRef.current

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.fromTo(
          '[data-about-hero-layer]',
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.18,
            stagger: 0.03,
            ease: HERO_EASE,
            scrollTrigger: {
              trigger,
              start: 'top 85%',
              once: true,
            },
          },
        )
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const peek = layer('peek')
        const photo = layer('photo')
        const squiggle = layer('squiggle')

        gsap.set('[data-about-hero-layer]', { autoAlpha: 0 })

        const floatTweens: gsap.core.Tween[] = []
        const bob = (
          target: string,
          y: number,
          duration: number,
          delay: number,
        ) => {
          floatTweens.push(
            gsap.to(target, {
              y,
              duration,
              delay,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              paused: true,
            }),
          )
        }

        bob(peek, -5, 3.1, 0.1)
        bob(photo, -7, 2.7, 0.2)
        bob(squiggle, -9, 2.4, 0.35)

        const setFloatPlaying = (play: boolean) => {
          floatTweens.forEach((tween) => {
            if (play) tween.play()
            else tween.pause()
          })
        }

        let floatArmed = false
        const floatWatch = ScrollTrigger.create({
          trigger,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => {
            if (floatArmed) setFloatPlaying(true)
          },
          onEnterBack: () => {
            if (floatArmed) setFloatPlaying(true)
          },
          onLeave: () => setFloatPlaying(false),
          onLeaveBack: () => setFloatPlaying(false),
        })

        const tl = gsap.timeline({
          defaults: { ease: HERO_EASE, force3D: true },
          scrollTrigger: {
            trigger,
            start: 'top 85%',
            once: true,
          },
          onComplete: () => {
            floatArmed = true
            if (floatWatch.isActive) setFloatPlaying(true)
          },
        })

        tl.fromTo(
          peek,
          { autoAlpha: 0, scale: 0.96 },
          { autoAlpha: 1, scale: 1, duration: 0.55 },
          0,
        )
        tl.fromTo(
          photo,
          { autoAlpha: 0, y: 16, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 },
          0.16,
        )
        tl.fromTo(
          squiggle,
          { autoAlpha: 0, scale: 0.94 },
          { autoAlpha: 1, scale: 1, duration: 0.5 },
          0.36,
        )
      })

      return () => mm.revert()
    },
    { scope: collageRef },
  )

  return (
    <div
      ref={collageRef}
      className={cn('relative w-full max-w-[577px] shrink-0', className)}
      style={{ height: ARTBOARD.h * scale }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left overflow-clip"
        style={{
          width: ARTBOARD.w,
          height: ARTBOARD.h,
          transform: `scale(${scale})`,
        }}
      >
        {/* Peek host — 1104:8568 */}
        <div className="absolute left-[5px] top-[6.57px] flex h-[624.643px] w-[538.514px] items-center justify-center">
          <AboutHeroLayer layer="peek" className="relative h-[580px] w-[484px] shrink-0">
            <div className="relative size-full rotate-[-5.62deg] rounded-lg bg-surface-subtle-1 shadow-[0_0_5px_var(--Primitive-color-orange-orange-200)]">
              {/* Photo host — 1104:8569 */}
              <div className="absolute left-[-29.04px] top-[-13.88px] flex h-[629.642px] w-[544.765px] items-center justify-center">
                <AboutHeroLayer
                  layer="photo"
                  className="relative h-[580px] w-[484px] shrink-0"
                >
                  <div className="relative size-full rotate-[6.3deg] rounded-lg p-2.5 shadow-[0_0_10px_var(--Primitive-color-orange-orange-200)]">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-lg bg-canvas"
                    />
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                      {/* Figma crop on fill image */}
                      <img
                        src={heroPhoto}
                        alt="Paqui Cabello con sus perros"
                        width={484}
                        height={580}
                        className="absolute left-[-0.65%] top-[-4.55%] h-[161.65%] w-[193.98%] max-w-none object-cover"
                        fetchPriority="high"
                        decoding="async"
                      />
                    </div>

                    {/* Squiggle + sparks — 1104:8570 */}
                    <AboutHeroLayer
                      layer="squiggle"
                      className="pointer-events-none absolute left-[1.19px] top-[19.19px] h-[603.734px] w-[596.735px]"
                    >
                      <div className="relative size-full rotate-[-0.68deg]">
                        <img
                          src={doodleSquiggle}
                          alt="Garabato decorativo"
                          width={590}
                          height={597}
                          className="absolute inset-0 block size-full max-w-none select-none"
                          decoding="async"
                        />
                      </div>
                    </AboutHeroLayer>
                  </div>
                </AboutHeroLayer>
              </div>
            </div>
          </AboutHeroLayer>
        </div>
      </div>
    </div>
  )
}

/** Hero — Figma 1104:8566. */
export function AboutHero({ className }: { className?: string }) {
  const rootRef = useRef<HTMLElement>(null)
  useScrollEnter(rootRef)

  return (
    <section
      ref={rootRef}
      className={cn('relative w-full overflow-hidden', className)}
      aria-labelledby="about-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: heroMeshBackground }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url(${patternImage})`,
          backgroundSize: 'auto',
        }}
        aria-hidden
      />

      <div
        className={cn(
          'relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-start justify-center gap-10 px-4 pb-16 pt-24',
          'sm:px-8 sm:pb-20 sm:pt-28',
          'lg:min-h-[800px] lg:flex-row lg:gap-10 lg:px-20 lg:pb-12 lg:pt-[124px]',
        )}
      >
        <AboutHeroCollage />

        <div className="flex min-w-0 flex-1 flex-col gap-4 lg:max-w-[880px]">
          <p
            data-scroll-enter
            className="scroll-enter inline-flex w-fit rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
          >
            ¿Quién soy?
          </p>
          <p
            data-scroll-enter
            className="scroll-enter text-[26px] leading-8 text-foreground-secondary"
          >
            👋 ¡Hola!
          </p>
          <h1
            data-scroll-enter
            id="about-hero-heading"
            className="scroll-enter text-balance text-[clamp(2.25rem,4vw+1rem,52px)] font-semibold leading-[1.08] text-foreground-brand sm:leading-[56px]"
          >
            Soy Paqui, educadora canina
          </h1>
          <div
            data-scroll-enter
            className="scroll-enter max-w-[784px] space-y-2 text-[18px] leading-6 text-foreground-secondary"
          >
            <p>
              Si has llegado hasta aquí, probablemente la convivencia con tu
              perro no está siendo como imaginabas. Quizá hay ladridos, miedos,
              destrozos o paseos que se han convertido en un problema. Y
              créeme, sé lo frustrante que puede llegar a ser.
            </p>
            <p>
              Yo no trabajo buscando que tu perro obedezca porque sí. Mi
              trabajo es ayudaros a entender qué le está pasando, daros
              herramientas para acompañarle y conseguir que la convivencia
              vuelva a ser tranquila y agradable para todos.
            </p>
            <p>
              Lo hago desde una educación respetuosa, sin castigos y adaptada a
              vuestra realidad, porque cada perro y cada familia son
              diferentes.
            </p>
            <p>
              Si sientes que ha llegado el momento de dar ese paso, estaré
              encantada de acompañaros durante el proceso.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
