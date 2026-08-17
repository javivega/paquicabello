import type { CSSProperties, ReactNode } from 'react'
import { useRef } from 'react'

import { BrandAnchorButton, BrandLinkButton } from '@/components/ui/button'
import { ProgramHeroSquiggle } from '@/components/services/program/ProgramHeroSquiggle'
import patternImage from '@/img/pattern.webp'
import photo1 from '@/img/program/photo-1.webp'
import photo2 from '@/img/program/photo-2.webp'
import photo3 from '@/img/program/photo-3.webp'
import photo4 from '@/img/program/photo-4.webp'
import doodleHeart from '@/img/session/doodle-heart.svg'
import doodleMotion1 from '@/img/session/doodle-motion-1.svg'
import doodleMotion2 from '@/img/session/doodle-motion-2.svg'
import doodleMotion3 from '@/img/session/doodle-motion-3.svg'
import doodleSparkDot from '@/img/session/doodle-spark-dot.svg'
import doodleSparkH from '@/img/session/doodle-spark-h.svg'
import doodleSparkV from '@/img/session/doodle-spark-v.svg'
import { PROGRAM_4_WEEKS_PATH, whatsappContactHref } from '@/lib/routes'
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

/** Figma artboard 1055:5148 — 1054×320. */
const ARTBOARD = { w: 1054, h: 320 } as const

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
  surfaceTransform?: string
  children: ReactNode
  layer: string
}

function ProgramHeroLayer({
  className,
  style,
  surfaceTransform,
  children,
  layer,
}: LayerProps) {
  return (
    <div
      data-program-hero-layer={layer}
      className={cn('program-hero-layer absolute', className)}
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

function PhotoCard({
  src,
  alt,
  width,
  height,
  imgClassName,
  fetchPriority,
}: {
  src: string
  alt: string
  width: number
  height: number
  imgClassName: string
  fetchPriority?: 'high'
}) {
  const decorative = alt === ''
  return (
    <div className="relative size-full overflow-hidden rounded-3xl border border-border-subtle-0 bg-canvas shadow-[0_0_10px_var(--Primitive-color-orange-orange-200)]">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn('absolute max-w-none', imgClassName)}
        fetchPriority={fetchPriority}
        decoding="async"
        {...(decorative ? { 'aria-hidden': true as const } : {})}
      />
    </div>
  )
}

function PeekCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'size-full rounded-3xl bg-[var(--Semantictokens-Color-Background-Subtle-0-hover,#ffede5)] shadow-[0_0_10px_var(--Primitive-color-orange-orange-200)]',
        className,
      )}
      aria-hidden
    />
  )
}

function ProgramHeroCollage({ className }: { className?: string }) {
  const collageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const layer = (name: string) => `[data-program-hero-layer="${name}"]`
      const trigger = collageRef.current

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-program-squiggle-mask]', {
          attr: { 'stroke-dashoffset': 0 },
        })
        gsap.fromTo(
          '[data-program-hero-layer]',
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
        const squiggle = layer('squiggle')
        const squiggleMask = '[data-program-squiggle-mask]'
        const peeks = [
          layer('peek-1'),
          layer('peek-2'),
          layer('peek-3'),
          layer('peek-4'),
        ]
        const photos = [
          layer('photo-1'),
          layer('photo-2'),
          layer('photo-3'),
          layer('photo-4'),
        ]
        const heart = layer('heart')
        const accents = [
          layer('motion-1'),
          layer('motion-2'),
          layer('motion-3'),
          layer('spark-h'),
          layer('spark-v'),
          layer('spark-dot'),
        ]

        gsap.set('[data-program-hero-layer]', { autoAlpha: 0 })
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

        // Soft desynced bob — peeks/photos quieter, doodles livelier.
        peeks.forEach((peek, i) => {
          bob(peek, -4 - (i % 2), 2.8 + i * 0.15, 0.1 + i * 0.12)
        })
        photos.forEach((photo, i) => {
          bob(photo, -6 - (i % 3), 2.5 + i * 0.18, 0.05 + i * 0.2)
        })
        bob(heart, -9, 2.2, 0.3)
        bob(squiggle, -4, 3.4, 0.1)
        accents.forEach((accent, i) => {
          bob(accent, -5 - (i % 3), 2.0 + i * 0.12, 0.35 + i * 0.08)
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

        // Hand-draw squiggle, then escalate peeks → photos → accents.
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
          peeks,
          { autoAlpha: 0, scale: 0.96 },
          { autoAlpha: 1, scale: 1, duration: 0.48, stagger: 0.05 },
          0.22,
        )
        tl.fromTo(
          photos,
          { autoAlpha: 0, y: 16, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07 },
          0.32,
        )
        tl.fromTo(
          heart,
          { autoAlpha: 0, scale: 0.9 },
          { autoAlpha: 1, scale: 1, duration: 0.42 },
          0.58,
        )
        tl.fromTo(
          accents,
          { autoAlpha: 0, scale: 0.92 },
          { autoAlpha: 1, scale: 1, duration: 0.38, stagger: 0.04 },
          0.66,
        )
      })

      return () => mm.revert()
    },
    { scope: collageRef },
  )

  return (
    <div
      ref={collageRef}
      className={cn('relative w-full max-w-[1054px]', className)}
    >
      <div className="relative aspect-[1054/320] w-full">
        <ProgramHeroLayer
          layer="squiggle"
          className="z-0"
          style={box(12.04, 0.18, 976.445, 319.606)}
        >
          <ProgramHeroSquiggle />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="peek-1"
          className="z-[1]"
          style={box(87.17, 47.94, 219.049, 219.049)}
          surfaceTransform="rotate(-5.76deg)"
        >
          <PeekCard />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="peek-2"
          className="z-[1]"
          style={box(303.17, 47.94, 219.049, 219.049)}
          surfaceTransform="rotate(-5.76deg)"
        >
          <PeekCard />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="peek-3"
          className="z-[1]"
          style={box(505.17, 41, 234.103, 234.103)}
          surfaceTransform="rotate(10.86deg)"
        >
          <PeekCard />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="peek-4"
          className="z-[1]"
          style={box(739.17, 44.09, 227.657, 227.657)}
          surfaceTransform="rotate(-8.6deg)"
        >
          <PeekCard />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="photo-1"
          className="z-10"
          style={box(110.17, 58, 200, 200)}
        >
          <PhotoCard
            src={photo1}
            alt="Paqui Cabello con un perro"
            width={600}
            height={480}
            imgClassName="inset-0 size-full object-cover"
            fetchPriority="high"
          />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="photo-2"
          className="z-10"
          style={box(324.17, 58, 200, 200)}
        >
          <PhotoCard
            src={photo2}
            alt="Familia con su perro durante el programa"
            width={600}
            height={900}
            imgClassName="left-[-13.63%] top-[-23.26%] h-[172.49%] w-[115.01%] object-cover"
            fetchPriority="high"
          />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="photo-3"
          className="z-10"
          style={box(538.17, 58, 200, 200)}
        >
          <PhotoCard
            src={photo3}
            alt="Perro acompañado en una sesión"
            width={800}
            height={539}
            imgClassName="left-[-4.12%] top-[2.05%] h-[153.33%] w-[227.99%] object-cover"
          />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="photo-4"
          className="z-10"
          style={box(752.17, 58, 200, 200)}
        >
          <PhotoCard
            src={photo4}
            alt="Tutor y perro en el exterior"
            width={800}
            height={1200}
            imgClassName="left-[-72.26%] top-[-53.63%] h-[359.47%] w-[239.68%] object-cover"
          />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="heart"
          className="z-20"
          style={box(512.56, 16.96, 80.939, 72.966)}
        >
          <img
            src={doodleHeart}
            alt="Corazón decorativo"
            width={81}
            height={73}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="motion-1"
          className="z-20"
          style={box(91.11, 32.59, 1.589, 35.749)}
        >
          <img
            src={doodleMotion1}
            alt="Línea de movimiento"
            width={10}
            height={19}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="motion-2"
          className="z-20"
          style={box(55.36, 45.3, 26.216, 20.655)}
        >
          <img
            src={doodleMotion2}
            alt="Trazo de movimiento"
            width={14}
            height={11}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="motion-3"
          className="z-20"
          style={box(45.03, 81.05, 37.338, 8.739)}
        >
          <img
            src={doodleMotion3}
            alt="Curva de movimiento"
            width={19}
            height={5}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="spark-h"
          className="z-20"
          style={box(958.62, 258.21, 32.571, 4.767)}
        >
          <img
            src={doodleSparkH}
            alt="Destello horizontal"
            width={17}
            height={4}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="spark-v"
          className="z-20"
          style={box(926.05, 269.33, 5.561, 38.927)}
        >
          <img
            src={doodleSparkV}
            alt="Destello vertical"
            width={4}
            height={20}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </ProgramHeroLayer>

        <ProgramHeroLayer
          layer="spark-dot"
          className="z-20"
          style={box(953.06, 277.27, 23.833, 23.833)}
        >
          <img
            src={doodleSparkDot}
            alt="Punto destello"
            width={12}
            height={12}
            className="size-full max-w-none object-contain"
            decoding="async"
            aria-hidden
          />
        </ProgramHeroLayer>
      </div>
    </div>
  )
}

/** Programa 4 semanas hero — Figma node 1042:5781. */
export function ServiceProgramHero({
  className,
}: {
  className?: string
}) {
  return (
    <section
      className={cn('relative w-full overflow-hidden', className)}
      aria-labelledby="program-4-weeks-heading"
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

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-4 px-4 pb-8 pt-28 sm:px-8 lg:px-20 lg:pb-12 lg:pt-[124px]">
        <div className="flex w-full max-w-[880px] flex-col items-center gap-4 text-center">
          <p
            style={sectionEnterStyle(80)}
            className="section-enter program-hero-copy inline-flex rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
          >
            Programa personalizado de 4 semanas
          </p>
          <h1
            id="program-4-weeks-heading"
            style={sectionEnterStyle(180)}
            className="section-enter program-hero-copy text-balance text-[clamp(2rem,4vw+1rem,46px)] font-semibold leading-[1.15] text-foreground-brand lg:leading-[56px]"
          >
            4 semanas para mejorar la convivencia con tu perro
          </h1>
          <p
            style={sectionEnterStyle(280)}
            className="section-enter program-hero-copy max-w-[784px] text-lg leading-6 text-foreground-secondary"
          >
            Un programa personalizado de 4 semanas para integrar a tu perro en
            la vida familiar, sin gritos, castigos ni miedo. Solo respeto,
            comprensión y acompañamiento real. Porque no necesitas un perro perfecto, 
            necesitas entender qué está pasando y saber cómo acompañarlo.
          </p>
        </div>

        <div
          style={sectionEnterStyle(620)}
          className="section-enter program-hero-copy flex w-full flex-wrap items-center justify-center gap-2"
        >
          <BrandAnchorButton
            href={whatsappContactHref('program')}
            brandVariant="primary"
            brandSize="md"
            leftSlot={null}
            rightSlot={null}
          >
            Contactar
          </BrandAnchorButton>
          <BrandLinkButton
            to={{
              pathname: PROGRAM_4_WEEKS_PATH,
              hash: '#program-4-intro',
            }}
            brandVariant="secondary"
            brandSize="md"
            leftSlot={null}
            rightSlot={null}
          >
            Más información
          </BrandLinkButton>
        </div>

        <ProgramHeroCollage className="mt-6 w-full sm:mt-8" />
      </div>
    </section>
  )
}
