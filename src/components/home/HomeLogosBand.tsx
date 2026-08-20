import { useRef } from 'react'

import animalnature from '@/img/Servicios/animalnature.webp'
import creciendoentreperros from '@/img/Servicios/creciendoentreperros.webp'
import dieresis from '@/img/Servicios/dieresis.webp'
import edogtorial from '@/img/Servicios/edogtorial.webp'
import serviciosPartnerLogo from '@/img/Servicios/logo.webp'
import { useScrollEnter } from '@/hooks/useScrollEnter'
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
  const rootRef = useRef<HTMLElement>(null)
  useScrollEnter(rootRef)

  return (
    <section
      ref={rootRef}
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
        data-scroll-enter
        className={cn(
          'scroll-enter mx-auto max-w-4xl px-4 text-center text-lg leading-6 text-foreground sm:px-6',
        )}
      >
        Formada en +15 escuelas de entrenamiento y psicología canina
      </p>
      <ul
        className={cn(
          'mx-auto mt-4 flex max-w-6xl list-none flex-wrap items-center justify-center gap-x-10 gap-y-6 p-0 px-4 sm:gap-x-16 lg:gap-x-20',
          slotsClassName,
        )}
      >
        {partnerLogos.map((logo, i) => {
          const slot = logoSlots[i]
          return (
            <li
              key={logo.alt}
              data-scroll-enter
              className={cn(
                'scroll-enter flex shrink-0 items-center justify-center',
                slot.w,
                slot.h,
              )}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                width={214}
                height={124}
                className="max-h-full max-w-full object-contain object-center"
                loading="lazy"
                decoding="async"
              />
            </li>
          )
        })}
      </ul>
    </section>
  )
}
