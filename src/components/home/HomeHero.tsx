import { BrandAnchorButton, BrandLinkButton } from '@/components/ui/button'
import doodleHeartBottom from '@/img/hero-doodle-heart-bottom.svg'
import doodleHeartTop from '@/img/hero-doodle-heart-top.svg'
import doodleSpark1 from '@/img/hero-doodle-spark-1.svg'
import doodleSpark2 from '@/img/hero-doodle-spark-2.svg'
import doodleSpark3 from '@/img/hero-doodle-spark-3.svg'
import doodleSpark4 from '@/img/hero-doodle-spark-4.svg'
import doodleSpark5 from '@/img/hero-doodle-spark-5.svg'
import doodleSpark6 from '@/img/hero-doodle-spark-6.svg'
import doodleSquiggle from '@/img/hero-doodle-squiggle.svg'
import heroPortrait from '@/img/hero-portrait.webp'
import heroTeacher from '@/img/hero-teacher.svg'
import heroVerify from '@/img/hero-verify.svg'
import multiespecieIcon from '@/img/multiespecie.png'
import { SERVICES_PATH, whatsappContactHref } from '@/lib/routes'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const enterHeading = sectionEnterStyle(60)
const enterLead = sectionEnterStyle(150)
const enterCtaPrimary = sectionEnterStyle(240)
const enterCtaSecondary = sectionEnterStyle(320)
const enterCredentialOrg = sectionEnterStyle(400)
const enterCredentialYears = sectionEnterStyle(480)

/** Scale-fade doodles only — squiggle uses a dedicated draw animation. */
const heroDoodles = [
  {
    src: doodleSpark4,
    className: 'absolute left-[22.5%] top-[6.4%] w-[0.3%] max-w-none',
    delay: '655ms',
  },
  {
    src: doodleSpark5,
    className: 'absolute left-[19%] top-[7.9%] w-[2.8%] max-w-none',
    delay: '710ms',
  },
  {
    src: doodleSpark6,
    className: 'absolute left-[16%] top-[11%] w-[4.8%] max-w-none',
    delay: '765ms',
  },
  {
    src: doodleSpark1,
    className: 'absolute left-[79.5%] top-[13%] w-[2%] max-w-none',
    delay: '820ms',
  },
  {
    src: doodleSpark2,
    className: 'absolute left-[82.5%] top-[12.3%] w-[1.2%] max-w-none',
    delay: '875ms',
  },
  {
    src: doodleSpark3,
    className: 'absolute left-[84%] top-[15%] w-[4.5%] max-w-none',
    delay: '930ms',
  },
  {
    src: doodleHeartTop,
    className: 'absolute left-[52%] top-[-1%] w-[11%] max-w-none',
    tiltClassName: 'origin-center -rotate-[54deg]',
    delay: '985ms',
  },
  {
    src: doodleHeartBottom,
    className: 'absolute left-[89%] top-[80%] w-[5.5%] max-w-none',
    delay: '1040ms',
  },
] as const

function HomeHeroPhoto({ className }: { className?: string }) {
  return (
    <figure
      className={cn(
        'relative mx-auto aspect-[530/660] w-full max-w-[530px]',
        className,
      )}
    >
      <div className="home-hero-photo absolute inset-0">
        <div
          className="home-hero-stack-back absolute inset-[2%_5%_6%_6%] rounded-lg bg-surface-subtle-1 shadow-[0_0_5px_var(--Primitive-color-orange-orange-200)]"
          aria-hidden
        />

        <div className="home-hero-stack-front absolute inset-[4%_6%_8%_5%]">
          <div className="relative size-full overflow-hidden rounded-lg shadow-[0_0_9px_var(--Primitive-color-orange-orange-200)]">
            <img
              src={heroPortrait}
              alt="Paqui Cabello"
              className="absolute left-0 top-[-12%] h-[170%] w-[180%] max-w-none object-cover object-[45%_20%]"
              width={2048}
              height={2048}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* Overlay siblings of photo so scrub y values don't stack. */}
      <div
        className="pointer-events-none absolute inset-[4%_6%_8%_5%] overflow-visible"
        aria-hidden
      >
        <div className="home-hero-squiggle-drift absolute -left-[5%] top-[61%] w-[83%]">
          <img
            src={doodleSquiggle}
            alt=""
            className="home-hero-squiggle w-full max-w-none"
            decoding="async"
          />
        </div>
        {heroDoodles.map((doodle) => {
          const img = (
            <img
              src={doodle.src}
              alt=""
              className="home-hero-doodle w-full max-w-none"
              style={{ animationDelay: doodle.delay }}
              decoding="async"
            />
          )

          return (
            <div key={doodle.src} className={cn('home-hero-doodle-drift', doodle.className)}>
              {'tiltClassName' in doodle ? (
                <div className={doodle.tiltClassName}>{img}</div>
              ) : (
                img
              )}
            </div>
          )
        })}
      </div>
    </figure>
  )
}

export function HomeHero({ className }: { className?: string }) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Compress scrub into the first stretch of leaving the hero so the
        // full drift is visible while the photo is still on-screen.
        // Distances are larger than the original 48px plan values — those
        // read as "no motion" over a ~1300px-tall hero.
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: '+=70%',
            scrub: 0.45,
          },
        })

        tl.to('.home-hero-photo', { y: 160 }, 0)
        tl.to('.home-hero-doodle-drift', { y: (i) => 100 + i * 18 }, 0)
        tl.to('.home-hero-squiggle-drift', { y: 120 }, 0)
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section
      ref={rootRef}
      className={cn(
        'relative isolate w-full overflow-hidden bg-surface-subtle-0 pb-10 pt-20 sm:pt-24 lg:pb-10 lg:pt-[100px]',
        className,
      )}
      aria-labelledby="home-hero-heading"
    >
      <div className="relative z-10 mx-auto box-border flex w-full min-w-0 max-w-[1280px] flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 xl:gap-16 xl:px-20">
        <div className="flex min-w-0 flex-1 flex-col gap-10 lg:max-w-[680px] lg:gap-14">
          <header className="flex flex-col gap-8">
            <div className="flex flex-col gap-5 pt-4 sm:pt-7">
              <h1
                id="home-hero-heading"
                style={enterHeading}
                className="section-enter text-balance text-[clamp(2rem,4vw+1rem,3.625rem)] font-bold leading-[1.1] text-foreground-brand lg:text-[58px] lg:leading-[64px]"
              >
                Mejora la convivencia con tu perro de forma respetuosa
              </h1>
              <p
                style={enterLead}
                className="section-enter max-w-[628px] text-pretty text-xl font-semibold leading-6 text-foreground-secondary sm:text-[20px] sm:leading-6"
              >
                Entender a tu perro lo cambia todo. Te acompaño para que
                comprendáis mejor lo que os está pasando y podáis disfrutar de
                una convivencia más tranquila, segura y feliz.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
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
          </header>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
            <div
              style={enterCredentialOrg}
              className="section-enter relative flex min-w-0 flex-col gap-1 text-foreground-secondary"
            >
              <img
                src={heroVerify}
                alt=""
                className="pointer-events-none absolute -left-8 -top-7 size-[172px] -rotate-15 opacity-20"
                width={172}
                height={172}
                decoding="async"
                aria-hidden
              />
              <span className="relative inline-flex size-8 items-center justify-center overflow-hidden rounded-lg border border-border-subtle-0 bg-canvas p-1">
                <img
                  src={multiespecieIcon}
                  alt=""
                  className="size-full object-contain"
                  width={32}
                  height={32}
                  decoding="async"
                  aria-hidden
                />
              </span>
              <p className="relative text-[14px] leading-4">
                Profesional Miembro Autorizado de la Red de Expertos de
              </p>
              <p className="relative paragraph-md-bold">
                Crianza Multiespecie by creciendo entre perros
              </p>
              <p className="relative border-t border-border-divider pt-1 text-[14px] leading-4">
                Número de Afiliada:{' '}
                <strong className="font-semibold">2025003</strong>
              </p>
            </div>

            <div
              style={enterCredentialYears}
              className="section-enter flex min-w-0 flex-col gap-1 border-border-divider sm:border-l sm:px-5"
            >
              <p className="flex items-center gap-1">
                <img
                  src={heroTeacher}
                  alt=""
                  className="size-8 shrink-0"
                  width={32}
                  height={32}
                  decoding="async"
                  aria-hidden
                />
                <strong className="paragraph-md-bold text-foreground-brand">
                  +7 años
                </strong>
              </p>
              <p className="paragraph-md-bold text-foreground-secondary">
                de formación continua
              </p>
              <p className="text-[14px] leading-4 text-foreground-secondary">
                30 formaciones reconocidas en diferentes aspectos de la
                psicología canina.
              </p>
            </div>
          </div>
        </div>

        <div className="relative w-full min-w-0 shrink-0 lg:w-[min(100%,530px)] lg:max-w-[50%]">
          <HomeHeroPhoto />
        </div>
      </div>
    </section>
  )
}
