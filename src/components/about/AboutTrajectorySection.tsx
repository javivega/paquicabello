import type { CSSProperties, ReactNode } from 'react'
import { useRef } from 'react'

import trajectoryInset from '@/img/about/trajectory-inset.webp'
import trajectoryMain from '@/img/about/trajectory-main.webp'
import { BrandAnchorButton } from '@/components/ui/button'
import { useScrollEnter } from '@/hooks/useScrollEnter'
import { whatsappContactHref } from '@/lib/routes'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/** Figma Frame 13 — 1100:9616 (678×424, content clipped at the bottom). */
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

function TrajLayer({
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
      data-about-traj-layer={layer}
      className={cn('about-traj-layer', className)}
    >
      {children}
    </div>
  )
}

/** Collage — Figma 1100:9616 peek → main → inset, clipped to 678×424. */
function TrajectoryCollage({ className }: { className?: string }) {
  const collageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const trigger = collageRef.current
      const layer = (name: string) => `[data-about-traj-layer="${name}"]`

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.fromTo(
          '[data-about-traj-layer]',
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
        gsap.set('[data-about-traj-layer]', { autoAlpha: 0 })
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
          layer('main'),
          { autoAlpha: 0, y: 18, scale: 0.97 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55 },
          0.12,
        )
        tl.fromTo(
          layer('inset'),
          { autoAlpha: 0, y: 22, scale: 0.95 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 },
          0.28,
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
      {/* Peek — 1100:9617 */}
      <div
        className="absolute flex items-center justify-center"
        style={box(30, 28, 617.106, 713.129)}
      >
        <TrajLayer
          layer="peek"
          className="relative aspect-[547.96/656.646] h-[92%] w-auto max-w-[89%] shrink-0"
        >
          <div
            className="size-full rotate-[-6.34deg] rounded-lg bg-surface-subtle-1 shadow-[0_0_10px_var(--Primitive-color-orange-orange-200)]"
            aria-hidden
          />
        </TrajLayer>
      </div>

      {/* Main photo — 1100:9618 */}
      <div
        className="absolute flex items-center justify-center"
        style={box(84.93, 19.95, 393.836, 520.083)}
      >
        <div className="flex h-[98.7%] w-[97.8%] shrink-0 items-center justify-center">
          <TrajLayer layer="main" className="relative size-full">
            <div className="flex size-full items-center justify-center">
              <div className="relative size-full rotate-[0.96deg] overflow-hidden rounded-lg bg-canvas shadow-[0_0_10px_var(--Primitive-color-orange-orange-200)]">
                <img
                  src={trajectoryMain}
                  alt="Paqui con sus perros en la montaña"
                  width={385}
                  height={514}
                  className="absolute inset-0 size-full max-w-none object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </TrajLayer>
        </div>
      </div>

      {/* Inset photo — 1100:9619 */}
      <div
        className="absolute flex items-center justify-center"
        style={box(394.31, 208.78, 228.686, 291.971)}
      >
        <div className="flex h-[94.6%] w-[90.6%] shrink-0 items-center justify-center">
          <TrajLayer layer="inset" className="relative size-full">
            <div className="relative size-full rotate-[4.61deg] overflow-hidden rounded-lg bg-canvas shadow-[0_0_10px_var(--Primitive-color-orange-orange-200)]">
              <img
                src={trajectoryInset}
                alt="Paqui Cabello con un perro"
                width={207}
                height={276}
                className="absolute inset-0 size-full max-w-none object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </TrajLayer>
        </div>
      </div>
    </div>
  )
}

/** “Mi trayectoria” — Figma 1104:8584 / collage 1100:9616. */
export function AboutTrajectorySection({ className }: { className?: string }) {
  const rootRef = useRef<HTMLElement>(null)
  useScrollEnter(rootRef)

  return (
    <section
      ref={rootRef}
      className={cn('w-full', className)}
      aria-labelledby="about-trajectory-heading"
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-16',
          'sm:px-8',
          'lg:flex-row lg:items-start lg:gap-10 lg:pr-20 lg:pl-0 lg:py-0',
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-8 lg:max-w-[642px] lg:pl-20">
          <div className="flex max-w-[680px] flex-col gap-4">
            <p
              data-scroll-enter
              className="scroll-enter inline-flex w-fit rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
            >
              Mi trayectoria
            </p>
            <h2
              data-scroll-enter
              id="about-trajectory-heading"
              className="scroll-enter text-balance text-[26px] font-semibold leading-8 text-foreground-brand"
            >
              Lo que he hecho durante estos años
            </h2>
            <div
              data-scroll-enter
              className="scroll-enter max-w-[784px] space-y-2 text-base leading-5 text-foreground-secondary"
            >
              <p>
                Mi camino como educadora canina ha combinado la formación
                continua con el acompañamiento a familias que buscaban mejorar
                la convivencia con sus perros. A través de sesiones de
                educación canina, desde un enfoque respetuoso.
              </p>
              <p>
                Sigo formándome de manera constante con profesionales
                especializados en diferentes ámbitos porque creo que aprender
                nunca termina y que cada perro merece un acompañamiento
                adaptado a sus necesidades.
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

        <TrajectoryCollage className="mx-auto lg:mx-0" />
      </div>
    </section>
  )
}
