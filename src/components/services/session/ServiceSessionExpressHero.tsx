import patternImage from '@/img/pattern.png'
import service1Image from '@/img/service1.png'
import { BrandButton, BrandLinkButton } from '@/components/ui/button'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'
import { SESSION_EXPRESS_PATH } from '@/lib/routes'

const heroBackground = [
  'radial-gradient(ellipse 343px 198px at 0% 0%, rgb(252 252 252) 0%, rgb(255 244 240) 100%)',
  'linear-gradient(90deg, rgb(255 244 240) 0%, rgb(255 244 240) 100%)',
].join(', ')

export function ServiceSessionExpressHero({
  className,
}: {
  className?: string
}) {
  return (
    <section
      className={cn('relative w-full min-h-[100dvh] overflow-hidden', className)}
      aria-labelledby="session-express-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: heroBackground }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: `url(${patternImage})`, backgroundSize: 'auto' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1440px] flex-col items-center justify-center px-4 py-8 sm:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-20">
        {/* Left: text content */}
        <div className="flex flex-1 flex-col items-center gap-4 text-center lg:items-start lg:text-left lg:max-w-[880px] lg:min-w-0">
          <p
            style={sectionEnterStyle(50)}
            className="section-enter inline-flex rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
          >
            Sesión exprés de 90 minutos
          </p>
          <h1
            id="session-express-heading"
            style={sectionEnterStyle(120)}
            className="section-enter text-balance text-[clamp(2rem,4vw+1rem,46px)] font-semibold leading-[1.15] text-foreground-brand lg:leading-[56px]"
          >
            Resuelve tus dudas sobre la conducta de tu perro en 90 minutos
          </h1>
          <p
            style={sectionEnterStyle(190)}
            className="section-enter max-w-[784px] text-lg leading-6 text-foreground-secondary"
          >
            No te enfrentes a solas a las inquietudes o la frustración del día
            a día con tu perro. Resuelve tus dudas en una sesión de 90 minutos
            diseñada para analizar vuestro contexto y darte claridad, en
            exclusiva para ti.
          </p>
          <div
            style={sectionEnterStyle(260)}
            className="section-enter mt-2 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
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
            <BrandLinkButton
              to={`${SESSION_EXPRESS_PATH}#como-es-sesion`}
              brandVariant="secondary"
              brandSize="md"
              leftSlot={null}
              rightSlot={null}
            >
              Más información
            </BrandLinkButton>
          </div>
        </div>

        {/* Right: image collage */}
        <div
          style={sectionEnterStyle(220)}
          className="section-enter-photo relative mt-10 w-full max-w-[680px] shrink-0 lg:mt-0 lg:w-[680px]"
        >
          <img
            src={service1Image}
            alt=""
            className="h-auto w-full object-contain drop-shadow-[0px_18px_46px_rgba(255,78,0,0.35)]"
            decoding="async"
            aria-hidden
          />
        </div>
      </div>
    </section>
  )
}
