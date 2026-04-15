import patternImage from '@/img/pattern.png'
import service2Image from '@/img/service2.png'
import { BrandButton, BrandLinkButton } from '@/components/ui/button'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'
import { PROGRAM_8_WEEKS_PATH } from '@/lib/routes'

const heroBackground = [
  'radial-gradient(ellipse 343px 198px at 0% 0%, rgb(252 252 252) 0%, rgb(255 244 240) 100%)',
  'linear-gradient(90deg, rgb(255 244 240) 0%, rgb(255 244 240) 100%)',
].join(', ')

export function ServiceProgramHero({
  className,
}: {
  className?: string
}) {
  return (
    <section
      className={cn('relative w-full min-h-[100dvh] overflow-hidden', className)}
      aria-labelledby="program-8-weeks-heading"
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

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-4 px-4 pb-8 pt-24 sm:px-8 sm:pt-28 lg:px-20 lg:pb-12 lg:pt-[124px]">
        <div className="flex w-full max-w-[880px] flex-col items-center gap-4 text-center">
          <p
            style={sectionEnterStyle(50)}
            className="section-enter inline-flex rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
          >
            Programa personalizado de 8 semanas
          </p>
          <h1
            id="program-8-weeks-heading"
            style={sectionEnterStyle(120)}
            className="section-enter text-balance text-[clamp(2rem,4vw+1rem,46px)] font-semibold leading-[1.15] text-foreground-brand lg:leading-[56px]"
          >
            Transforma la convivencia en tu hogar con tu perro en tan solo 8
            semanas
          </h1>
          <p
            style={sectionEnterStyle(190)}
            className="section-enter max-w-[784px] text-lg leading-6 text-foreground-secondary"
          >
            Un programa personalizado de 8 semanas para integrar a tu perro en
            la vida familiar, sin gritos, castigos ni miedo. Solo respeto,
            comprensión y acompañamiento real.
          </p>
        </div>

        <div
          style={sectionEnterStyle(260)}
          className="section-enter flex w-full items-center justify-center gap-2 px-6"
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
            to={`${PROGRAM_8_WEEKS_PATH}#como-es-programa`}
            brandVariant="secondary"
            brandSize="md"
            leftSlot={null}
            rightSlot={null}
          >
            Más información
          </BrandLinkButton>
        </div>

        <div
          style={sectionEnterStyle(220)}
          className="section-enter-photo relative mt-8 w-full max-w-[1054px]"
        >
          <img
            src={service2Image}
            alt=""
            className="h-auto w-full object-contain"
            decoding="async"
            aria-hidden
          />
        </div>
      </div>
    </section>
  )
}
