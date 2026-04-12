import animalnature from '@/img/Servicios/animalnature.png'
import creciendoentreperros from '@/img/Servicios/creciendoentreperros.png'
import dieresis from '@/img/Servicios/dieresis.png'
import edogtorial from '@/img/Servicios/edogtorial.png'
import serviciosPartnerLogo from '@/img/Servicios/logo.png'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

const partnerLogos = [
  {
    src: animalnature,
    alt: 'Logotipo Animal Nature',
  },
  {
    src: creciendoentreperros,
    alt: 'Logotipo Creciendo entre perros',
  },
  {
    src: dieresis,
    alt: 'Logotipo Diéresis',
  },
  {
    src: edogtorial,
    alt: 'Logotipo Edogtorial',
  },
  {
    src: serviciosPartnerLogo,
    alt: 'Logotipo de centro de formación colaborador',
  },
] as const

const logoSlots = [
  { w: 'w-[105px]', h: 'h-[59px]' },
  { w: 'w-[127px]', h: 'h-[38px]' },
  { w: 'w-[86px]', h: 'h-10' },
  { w: 'w-[63px]', h: 'h-[62px]' },
  { w: 'w-[107px]', h: 'h-[55px]' },
] as const

type HomeLogosBandProps = {
  className?: string
  /** Override logo row gap (Figma sesión exprés: 80px between marks). */
  slotsClassName?: string
}

export function HomeLogosBand({
  className,
  slotsClassName,
}: HomeLogosBandProps) {
  return (
    <section
      className={cn(
        'w-full bg-surface-subtle-0 py-10 text-foreground',
        className,
      )}
      aria-labelledby="home-logos-heading"
    >
      <h2 id="home-logos-heading" className="sr-only">
        Centros de formación
      </h2>
      <p
        style={sectionEnterStyle(50)}
        className={cn(
          'section-enter mx-auto max-w-4xl px-4 text-center text-lg leading-6 text-foreground sm:px-6',
        )}
      >
        Formada en +30 escuelas de de entrenamiento y psicología canina
      </p>
      <div
        className={cn(
          'mx-auto mt-4 flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-6 px-4 sm:gap-x-16 lg:gap-x-20',
          slotsClassName,
        )}
      >
        {partnerLogos.map((logo, i) => {
          const slot = logoSlots[i]
          return (
            <div
              key={logo.alt}
              style={sectionEnterStyle(100 + i * 55)}
              className={cn(
                'section-enter flex shrink-0 items-center justify-center',
                slot.w,
                slot.h,
              )}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
