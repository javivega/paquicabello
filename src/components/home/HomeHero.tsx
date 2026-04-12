import heroImage from '@/img/hero.png'
import patternImage from '@/img/pattern.png'
import { BrandButton } from '@/components/ui/button'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

export function HomeHero({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        /* Solid canvas top; floor gradient + mesh tie into HomeLogosBand (surface-subtle-0) */
        'relative isolate w-full min-h-[min(100vh,800px)] overflow-hidden bg-canvas pb-10 pt-16 sm:pb-12 sm:pt-20 lg:min-h-[800px] lg:pb-16 lg:pt-24',
        className,
      )}
      aria-labelledby="home-hero-heading"
    >
      {/* Very slow atmospheric depth — warm + neutral only */}
      <div className="pointer-events-none absolute inset-0 home-hero-mesh" aria-hidden />
      {/* Seam to next section: same token as logos band, feathered upward */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(52vh,520px)]"
        style={{
          background:
            'linear-gradient(to top, var(--Semantictokens-Color-Background-Subtle-0-default) 0%, color-mix(in srgb, var(--Semantictokens-Color-Background-Subtle-0-default) 48%, transparent) 36%, transparent 72%)',
        }}
        aria-hidden
      />
      {/* Light grain; stays subordinate to typography */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] home-hero-pattern motion-reduce:opacity-[0.03]"
        style={{
          backgroundImage: `url(${patternImage})`,
          backgroundSize: 'auto',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto box-border flex w-full min-w-0 max-w-[1280px] flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-8 xl:px-12">
        <div className="flex min-w-0 flex-1 flex-col gap-10 lg:max-w-[680px] lg:gap-14">
          <div className="flex flex-col gap-5 pt-4 sm:gap-6 sm:pt-7">
            <h1
              id="home-hero-heading"
              style={sectionEnterStyle(60)}
              className={cn(
                'section-enter text-balance text-[clamp(2rem,4vw+1rem,3.625rem)] font-bold leading-[1.1] text-foreground-brand lg:text-[58px] lg:leading-[64px]',
              )}
            >
              Mejora la convivencia con tu perro de forma respetuosa
            </h1>
            <p
              style={sectionEnterStyle(150)}
              className={cn(
                'section-enter max-w-[628px] text-pretty text-xl font-semibold leading-6 text-foreground-secondary sm:text-[20px] sm:leading-6',
              )}
            >
              Convierte tu hogar en un espacio seguro y respetuoso, desde el
              acompañamiento y entendimiento de las emociones de todas las
              especies implicadas para construir confianza.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="section-enter inline-flex" style={sectionEnterStyle(240)}>
              <BrandButton
                brandVariant="primary"
                brandSize="lg"
                type="button"
                leftSlot={null}
              >
                Contactar
              </BrandButton>
            </span>
            <span className="section-enter inline-flex" style={sectionEnterStyle(320)}>
              <BrandButton
                brandVariant="secondary"
                brandSize="lg"
                type="button"
                leftSlot={null}
                rightSlot={null}
              >
                Explorar servicios
              </BrandButton>
            </span>
          </div>

          <div className="grid gap-6 border-t border-border-divider pt-6 sm:grid-cols-2 sm:gap-4 sm:pt-8">
            <div
              style={sectionEnterStyle(400)}
              className={cn('section-enter flex min-w-0 flex-col gap-2')}
            >
              <div className="inline-flex size-8 items-center justify-center rounded-lg border border-border-subtle-0 bg-canvas">
                <span
                  className="size-4 rounded-sm bg-foreground-accent/80"
                  aria-hidden
                />
              </div>
              <div className="space-y-2 text-foreground-secondary">
                <p className="text-[14px] leading-4">
                  Profesional Miembro Autorizado de la Red de Expertos de
                </p>
                <p className="paragraph-md-bold">
                  Crianza Multiespecie by creciendo entre perros
                </p>
              </div>
              <p className="border-t border-border-divider pt-1 text-[14px] leading-4 text-foreground-secondary">
                <span>Número de Afiliada: </span>
                <span className="font-semibold">2025003</span>
              </p>
            </div>
            <div
              style={sectionEnterStyle(480)}
              className={cn(
                'section-enter flex min-w-0 flex-col gap-1 border-border-divider sm:border-l sm:pl-5',
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className="grid size-8 shrink-0 place-items-center rounded-md bg-surface-subtle-0"
                  aria-hidden
                >
                  <span className="size-4 rounded bg-foreground-brand/20" />
                </span>
                <p className="paragraph-md-bold text-foreground-brand">
                  +7 años
                </p>
              </div>
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

        <div
          style={sectionEnterStyle(200)}
          className={cn(
            'section-enter-photo relative w-full min-w-0 shrink-0 lg:w-[min(100%,596px)] lg:max-w-[50%]',
          )}
        >
          <div className="relative aspect-[596/660] min-h-[min(100vw,420px)] w-full overflow-hidden rounded-2xl lg:min-h-0">
            <img
              src={heroImage}
              alt="Paqui con familia y perro"
              className="absolute inset-0 size-full object-cover object-center"
              width={596}
              height={660}
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
