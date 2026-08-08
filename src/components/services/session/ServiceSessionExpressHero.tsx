import type { CSSProperties, ReactNode } from 'react'
import { useRef } from 'react'

import { BrandAnchorButton, BrandLinkButton } from '@/components/ui/button'
import patternImage from '@/img/pattern.webp'
import dogCircle from '@/img/session/dog-circle.webp'
import dogSquare from '@/img/session/dog-square.webp'
import doodleHeart from '@/img/session/doodle-heart.svg'
import doodleMotion1 from '@/img/session/doodle-motion-1.svg'
import doodleMotion2 from '@/img/session/doodle-motion-2.svg'
import doodleMotion3 from '@/img/session/doodle-motion-3.svg'
import doodleSparkDot from '@/img/session/doodle-spark-dot.svg'
import doodleSparkH from '@/img/session/doodle-spark-h.svg'
import doodleSparkV from '@/img/session/doodle-spark-v.svg'
import photoClient from '@/img/session/photo-client.webp'
import photoPaqui from '@/img/session/photo-paqui.webp'
import { SessionHeroSquiggle } from '@/components/services/session/SessionHeroSquiggle'
import { SESSION_EXPRESS_PATH, whatsappContactHref } from '@/lib/routes'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const heroBackground = [
  'radial-gradient(ellipse 343px 198px at 0% 0%, rgb(252 252 252) 0%, rgb(255 244 240) 100%)',
  'linear-gradient(90deg, rgb(255 244 240) 0%, rgb(255 244 240) 100%)',
].join(', ')

/** Site motion token — matches `--ease-out` in `src/styles/tokens.css`. */
const HERO_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/** Figma artboard 1103:6093 — 757×452. Positions as % for responsive scaling. */
const ARTBOARD = { w: 757, h: 452 } as const

function box(
  left: number,
  top: number,
  width: number,
  height: number,
): CSSProperties {
  return {
    left: `${(left / ARTBOARD.w) * 100}%`,
    top: `${(top / ARTBOARD.h) * 100}%`,
    width: `${(width / ARTBOARD.w) * 100}%`,
    height: `${(height / ARTBOARD.h) * 100}%`,
  }
}

type LayerProps = {
  className?: string
  style?: CSSProperties
  /** Decorative transform on an inner wrapper so GSAP entry doesn't overwrite it. */
  surfaceTransform?: string
  children: ReactNode
  layer: string
}

function SessionHeroLayer({
  className,
  style,
  surfaceTransform,
  children,
  layer,
}: LayerProps) {
  return (
    <div
      data-session-hero-layer={layer}
      className={cn('session-hero-layer absolute', className)}
      style={style}
    >
      <div
        className="size-full origin-center"
        style={surfaceTransform ? { transform: surfaceTransform } : undefined}
      >
        {children}
      </div>
    </div>
  )
}

function SessionHeroCollage({ className }: { className?: string }) {
  const collageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const layer = (name: string) => `[data-session-hero-layer="${name}"]`
      const trigger = collageRef.current

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-session-squiggle-mask]', {
          attr: { 'stroke-dashoffset': 0 },
        })
        gsap.fromTo(
          '[data-session-hero-layer]',
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.18,
            stagger: 0.02,
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
        const glow = layer('glow')
        const squiggle = layer('squiggle')
        const squiggleMask = '[data-session-squiggle-mask]'
        const photoPaquiEl = layer('photo-paqui')
        const photoClientEl = layer('photo-client')
        const dogCircle = layer('dog-circle')
        const dogSquare = layer('dog-square')
        const heart = layer('heart')
        const accents = [
          layer('spark-h'),
          layer('spark-v'),
          layer('spark-dot'),
          layer('motion-1'),
          layer('motion-2'),
          layer('motion-3'),
        ]

        gsap.set('[data-session-hero-layer]', { autoAlpha: 0 })
        gsap.set(squiggleMask, {
          attr: { 'stroke-dasharray': 1, 'stroke-dashoffset': 1 },
        })

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

        // Soft desynced bob — photos quieter, doodles a bit livelier.
        bob(photoPaquiEl, -6, 2.6, 0)
        bob(photoClientEl, -8, 3.0, 0.35)
        bob(dogCircle, -10, 2.4, 0.15)
        bob(dogSquare, -7, 2.8, 0.55)
        bob(heart, -9, 2.2, 0.25)
        bob(squiggle, -4, 3.4, 0.1)
        bob(glow, -5, 3.2, 0.2)
        accents.forEach((accent, i) => {
          bob(accent, -5 - (i % 3), 2.0 + i * 0.12, 0.4 + i * 0.08)
        })

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

        // Hand-draw along the brush: constant ink speed (linear), not a clip wipe.
        tl.set(squiggle, { autoAlpha: 1 }, 0)
        tl.to(
          squiggleMask,
          {
            attr: { 'stroke-dashoffset': 0 },
            duration: 1.15,
            ease: 'none',
          },
          0,
        )
        tl.fromTo(
          glow,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.58 },
          0.2,
        )
        tl.fromTo(
          photoPaquiEl,
          { autoAlpha: 0, y: 18, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.58 },
          0.22,
        )
        tl.fromTo(
          photoClientEl,
          { autoAlpha: 0, y: 18, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.58 },
          0.34,
        )
        tl.fromTo(
          [dogCircle, dogSquare],
          { autoAlpha: 0, y: 14, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07 },
          0.46,
        )
        tl.fromTo(
          heart,
          { autoAlpha: 0, scale: 0.9 },
          { autoAlpha: 1, scale: 1, duration: 0.42 },
          0.56,
        )
        tl.fromTo(
          accents,
          { autoAlpha: 0, scale: 0.92 },
          { autoAlpha: 1, scale: 1, duration: 0.38, stagger: 0.04 },
          0.64,
        )
      })

      return () => mm.revert()
    },
    { scope: collageRef },
  )

  return (
    <div
      ref={collageRef}
      className={cn(
        'relative w-full max-w-[757px] shrink-0 lg:w-[min(757px,48%)]',
        className,
      )}
    >
      <div className="relative aspect-[757/452] w-full">
        <div
          data-session-hero-layer="glow"
          className="session-hero-layer pointer-events-none absolute inset-[13%_15%_20%_15%]"
          aria-hidden
        >
          <div
            className="size-full rounded-xl opacity-40 blur-xl"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,78,0,0.45) 0%, transparent 70%)',
            }}
          />
        </div>

        <SessionHeroLayer
          layer="squiggle"
          className="z-0"
          style={box(117.12 - 104.51, 60.9 + 14.05, 737.083, 241.009)}
        >
          <SessionHeroSquiggle />
        </SessionHeroLayer>

        <SessionHeroLayer
          layer="heart"
          className="z-30"
          style={box(189.48, 22.9, 42.132, 37.982)}
        >
          <img
            src={doodleHeart}
            alt=""
            width={42}
            height={38}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </SessionHeroLayer>

        <SessionHeroLayer
          layer="photo-paqui"
          className="z-10"
          style={box(117.12 + 0.11, 60.9 - 4.99, 266.538, 313.982)}
          surfaceTransform="rotate(-2.83deg)"
        >
          <div className="relative size-full overflow-hidden rounded-[4px] bg-surface-subtle-0 shadow-[0_0_5px_var(--Primitive-color-orange-orange-200)]">
            <img
              src={photoPaqui}
              alt=""
              width={900}
              height={900}
              className="absolute left-[-0.65%] top-[-4.55%] h-[161.65%] w-[193.98%] max-w-none object-cover"
              fetchPriority="high"
              decoding="async"
              aria-hidden
            />
          </div>
        </SessionHeroLayer>

        <SessionHeroLayer
          layer="photo-client"
          className="z-20"
          style={box(117.12 + 243.61, 60.9 + 32.27, 269.404, 316.324)}
          surfaceTransform="rotate(3.4deg)"
        >
          <div className="relative size-full overflow-hidden rounded-[4px] bg-surface-subtle-0 shadow-[0_0_5px_var(--Primitive-color-orange-orange-200)]">
            <img
              src={photoClient}
              alt=""
              width={900}
              height={601}
              className="absolute left-[-39.98%] top-[-0.06%] h-[100.12%] w-[179.95%] max-w-none object-cover"
              fetchPriority="high"
              decoding="async"
              aria-hidden
            />
          </div>
        </SessionHeroLayer>

        <SessionHeroLayer
          layer="dog-circle"
          className="z-30"
          style={box(117.12 - 11.62, 60.9 - 52.57, 104.628, 104.628)}
          surfaceTransform="scaleY(-1) rotate(180deg)"
        >
          <div className="relative size-full overflow-hidden rounded-full border border-border-subtle-0 bg-canvas shadow-[0_0_6px_var(--Primitive-color-orange-orange-200)]">
            <img
              src={dogCircle}
              alt=""
              width={420}
              height={630}
              className="absolute left-[-8.47%] top-[-50.77%] h-[175.38%] w-[116.94%] max-w-none object-cover"
              decoding="async"
              aria-hidden
            />
          </div>
        </SessionHeroLayer>

        <SessionHeroLayer
          layer="dog-square"
          className="z-30"
          style={box(117.12 + 431.53, 60.9 + 184.27, 146.271, 146.271)}
        >
          <div className="relative size-full overflow-hidden rounded-xl border border-border-subtle-0 bg-canvas shadow-[0_0_5px_var(--Primitive-color-orange-orange-200)]">
            <img
              src={dogSquare}
              alt=""
              width={440}
              height={296}
              className="absolute left-[-2.93%] top-[5.08%] h-[121.97%] w-[181.35%] max-w-none object-cover"
              decoding="async"
              aria-hidden
            />
          </div>
        </SessionHeroLayer>

        <SessionHeroLayer
          layer="spark-h"
          className="z-40"
          style={box(117.12 + 486.83, 60.9 + 196.78, 16.955, 2.481)}
        >
          <img
            src={doodleSparkH}
            alt=""
            width={17}
            height={4}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </SessionHeroLayer>

        <SessionHeroLayer
          layer="spark-v"
          className="z-40"
          style={box(117.12 + 469.88, 60.9 + 202.56, 2.895, 20.263)}
        >
          <img
            src={doodleSparkV}
            alt=""
            width={4}
            height={20}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </SessionHeroLayer>

        <SessionHeroLayer
          layer="spark-dot"
          className="z-40"
          style={box(117.12 + 483.94, 60.9 + 206.7, 12.406, 12.406)}
        >
          <img
            src={doodleSparkDot}
            alt=""
            width={12}
            height={12}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </SessionHeroLayer>

        <SessionHeroLayer
          layer="motion-1"
          className="z-40"
          style={box(117.12 + 495.13, 60.9 + 183.16, 10.021, 16.529)}
          surfaceTransform="rotate(30deg)"
        >
          <img
            src={doodleMotion1}
            alt=""
            width={10}
            height={19}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </SessionHeroLayer>

        <SessionHeroLayer
          layer="motion-2"
          className="z-40"
          style={box(117.12 + 479.64, 60.9 + 179.59, 17.194, 16.135)}
          surfaceTransform="rotate(30deg)"
        >
          <img
            src={doodleMotion2}
            alt=""
            width={14}
            height={11}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </SessionHeroLayer>

        <SessionHeroLayer
          layer="motion-3"
          className="z-40"
          style={box(117.12 + 468.78, 60.9 + 193.01, 19.106, 13.657)}
          surfaceTransform="rotate(30deg)"
        >
          <img
            src={doodleMotion3}
            alt=""
            width={19}
            height={5}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </SessionHeroLayer>
      </div>
    </div>
  )
}

/** Sesión exprés hero — Figma node 1103:6083. */
export function ServiceSessionExpressHero({
  className,
}: {
  className?: string
}) {
  return (
    <section
      className={cn('relative w-full overflow-hidden', className)}
      aria-labelledby="session-express-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: heroBackground }}
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

      <div className="relative z-10 mx-auto flex w-full min-h-[min(100dvh,800px)] max-w-[1440px] flex-col items-center gap-10 px-4 pb-12 pt-28 sm:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-20 lg:pb-12 lg:pt-[124px]">
        <div className="flex w-full max-w-[880px] flex-1 flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <p
            style={sectionEnterStyle(120)}
            className="section-enter session-hero-copy inline-flex rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
          >
            Sesión exprés de 60 minutos
          </p>
          <h1
            id="session-express-heading"
            style={sectionEnterStyle(280)}
            className="section-enter session-hero-copy text-balance text-[clamp(2rem,4vw+1rem,46px)] font-semibold leading-[1.15] text-foreground-brand lg:leading-[56px]"
          >
            Resuelve tus dudas sobre la conducta de tu perro en 60 minutos
          </h1>
          <p
            style={sectionEnterStyle(400)}
            className="section-enter session-hero-copy max-w-[784px] text-lg leading-6 text-foreground-secondary"
          >
            Si hay algo que te preocupa de la convivencia con tu perro, no
            tienes por qué resolverlo sola. En esta sesión analizaremos lo que
            está ocurriendo, entenderemos por qué sucede y te ofreceré pautas
            prácticas y personalizadas para que puedas empezar a aplicarlas
            desde ese mismo día.
          </p>
          <div
            style={sectionEnterStyle(700)}
            className="section-enter session-hero-copy flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            <BrandAnchorButton
              href={whatsappContactHref('session')}
              brandVariant="primary"
              brandSize="md"
              leftSlot={null}
              rightSlot={null}
            >
              Contactar
            </BrandAnchorButton>
            <BrandLinkButton
              to={{
                pathname: SESSION_EXPRESS_PATH,
                hash: '#session-express-intro',
              }}
              brandVariant="secondary"
              brandSize="md"
              leftSlot={null}
              rightSlot={null}
            >
              Más información
            </BrandLinkButton>
          </div>
        </div>

        <SessionHeroCollage />
      </div>
    </section>
  )
}
