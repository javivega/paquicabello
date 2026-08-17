import type { CSSProperties, ReactNode } from 'react'
import { useRef } from 'react'

import methodPhoto from '@/img/about/method-photo.webp'
import { BrandAnchorButton } from '@/components/ui/button'
import { useScrollEnter } from '@/hooks/useScrollEnter'
import { whatsappContactHref } from '@/lib/routes'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/** Figma Frame 14 — 1104:8605 (678×424, content clipped at the bottom). */
const ARTBOARD = { w: 678, h: 424 } as const

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

function MethodLayer({
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
      data-about-method-layer={layer}
      className={cn('about-method-layer', className)}
    >
      {children}
    </div>
  )
}

/** Collage — peek → photo, clipped to 678×424 like Frame 13. */
function MethodCollage({ className }: { className?: string }) {
  const collageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const trigger = collageRef.current
      const layer = (name: string) => `[data-about-method-layer="${name}"]`

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.fromTo(
          '[data-about-method-layer]',
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.18,
            stagger: 0.04,
            ease: EASE,
            scrollTrigger: { trigger, start: 'top 85%', once: true },
          },
        )
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('[data-about-method-layer]', { autoAlpha: 0 })
        const tl = gsap.timeline({
          defaults: { ease: EASE, force3D: true },
          scrollTrigger: { trigger, start: 'top 85%', once: true },
        })
        tl.fromTo(
          layer('peek'),
          { autoAlpha: 0, scale: 0.96 },
          { autoAlpha: 1, scale: 1, duration: 0.5 },
          0,
        )
        tl.fromTo(
          layer('photo'),
          { autoAlpha: 0, y: 18, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55 },
          0.14,
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
        'relative w-full max-w-[678px] shrink-0 overflow-clip',
        className,
      )}
      style={{ aspectRatio: `${ARTBOARD.w} / ${ARTBOARD.h}` }}
    >
      {/* Peek */}
      <div
        className="absolute flex items-center justify-center"
        style={box(30, 28, 617.106, 713.129)}
      >
        <MethodLayer
          layer="peek"
          className="relative aspect-[547.96/656.646] h-[92%] w-auto max-w-[89%] shrink-0"
        >
          <div
            className="size-full rotate-[-6.34deg] rounded-lg bg-surface-subtle-1 shadow-[0_0_10px_var(--Primitive-color-orange-orange-200)]"
            aria-hidden
          />
        </MethodLayer>
      </div>

      {/* Photo */}
      <div
        className="absolute flex items-center justify-center"
        style={box(119.76, 5.33, 420.318, 539.424)}
      >
        <div className="flex h-[95.2%] w-[91.7%] shrink-0 items-center justify-center">
          <MethodLayer layer="photo" className="relative size-full">
            <div className="relative size-full rotate-[4.02deg] overflow-hidden rounded-lg bg-canvas shadow-[0_0_10px_var(--Primitive-color-orange-orange-200)]">
              <img
                src={methodPhoto}
                alt="Paqui en la playa con sus perros"
                width={385}
                height={514}
                className="absolute inset-0 size-full max-w-none object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </MethodLayer>
        </div>
      </div>
    </div>
  )
}

/** Método — Figma 1104:8604. */
export function AboutMethodSection({ className }: { className?: string }) {
  const rootRef = useRef<HTMLElement>(null)
  useScrollEnter(rootRef)

  return (
    <section
      ref={rootRef}
      className={cn('w-full', className)}
      aria-labelledby="about-method-title"
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-16',
          'sm:px-8 sm:py-20',
          'lg:flex-row lg:items-start lg:gap-10 lg:pr-20 lg:pl-0 lg:py-24',
        )}
      >
        <MethodCollage className="mx-auto lg:mx-0" />

        <div className="flex min-w-0 flex-1 flex-col gap-8 lg:max-w-[642px] lg:pl-20">
          <div
            id="about-method-heading"
            className="flex max-w-[680px] scroll-mt-28 flex-col gap-4"
          >
            <p
              data-scroll-enter
              className="scroll-enter inline-flex w-fit rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
            >
              Método
            </p>
            <h2
              data-scroll-enter
              id="about-method-title"
              className="scroll-enter text-balance text-[26px] font-semibold leading-8 text-foreground-brand"
            >
              La Metodología Crianza Multiespecie
            </h2>
            <div
              data-scroll-enter
              className="scroll-enter max-w-[784px] space-y-2 text-base leading-5 text-foreground-secondary"
            >
              <p>
                Si tienes pequeños en casa o estás esperando su llegada, puedo
                ayudarte a construir una convivencia segura y respetuosa entre
                perros y niños.
              </p>
              <p>
                Estoy especializado en Crianza Multiespecie®, una metodología
                enfocada exclusivamente en la convivencia familiar entre perros
                y pequeños, donde se trabaja entre otras muchas cosas la
                relación y la comunicación dentro de la familia, previniendo
                conflictos y favoreciendo experiencias positivas y vínculos
                sanos desde el principio.
              </p>
              <p>
                Me formé profesionalmente con Tamara Hernán, la mayor referente
                que hay ahora mismo en este ámbito, lo que me permite
                acompañarte con herramientas prácticas y actuales, basadas en
                el bienestar emocional tanto de tu perro como del resto de los
                miembros de la familia.
              </p>
              <p>
                Mi objetivo es ayudarte a crear un hogar donde perros y
                pequeños crezcan juntos de forma segura, equilibrada y feliz.
              </p>
            </div>
          </div>
          <BrandAnchorButton
            href={whatsappContactHref('general')}
            brandVariant="primary"
            brandSize="md"
            data-scroll-enter
            className="scroll-enter w-fit"
            leftSlot={null}
            rightSlot={null}
          >
            Contactar
          </BrandAnchorButton>
        </div>
      </div>
    </section>
  )
}
