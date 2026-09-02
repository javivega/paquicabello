import { useRef } from 'react'

import antropozoologia from '@/img/schools/antropozoologia.webp'
import cisneNegro from '@/img/schools/cisne-negro.webp'
import cuidadosMultiespecie from '@/img/schools/cuidados-multiespecie.webp'
import damelapatita from '@/img/schools/damelapatita.webp'
import etolia from '@/img/schools/etolia.webp'
import funnyDogs from '@/img/schools/funny-dogs.webp'
import kaneSapiens from '@/img/schools/kane-sapiens.webp'
import montegorgorito from '@/img/schools/montegorgorito.webp'
import petaneres from '@/img/schools/petaneres.webp'
import propi3c from '@/img/schools/propi-3c.webp'
import takoda from '@/img/schools/takoda.webp'
import trabajoConPerros from '@/img/schools/trabajo-con-perros.webp'
import { useScrollEnter } from '@/hooks/useScrollEnter'
import { cn } from '@/lib/utils'

const schoolLogos = [
  { src: etolia, alt: 'Logotipo Etolia etología veterinaria', width: 300, height: 121 },
  { src: damelapatita, alt: 'Logotipo Damelapatita', width: 200, height: 200 },
  {
    src: cuidadosMultiespecie,
    alt: 'Logotipo Cuidados Multiespecie',
    width: 300,
    height: 166,
  },
  {
    src: antropozoologia,
    alt: 'Logotipo Antropozoología Paula Calvo',
    width: 300,
    height: 135,
  },
  { src: cisneNegro, alt: 'Logotipo Cisne Negro', width: 300, height: 247 },
  { src: montegorgorito, alt: 'Logotipo Montegorgorito', width: 300, height: 178 },
  { src: funnyDogs, alt: 'Logotipo Funny Dogs', width: 225, height: 68 },
  { src: kaneSapiens, alt: 'Logotipo Kane Sapiens', width: 150, height: 150 },
  { src: takoda, alt: 'Logotipo Takoda', width: 300, height: 213 },
  { src: petaneres, alt: 'Logotipo Petaneres', width: 150, height: 150 },
  { src: propi3c, alt: 'Logotipo Propi 3C', width: 150, height: 150 },
  {
    src: trabajoConPerros,
    alt: 'Logotipo Trabajo con perros',
    width: 210,
    height: 95,
  },
] as const

function LogoRow({ clone = false }: { clone?: boolean }) {
  return (
    <ul
      className="flex list-none p-0"
      aria-hidden={clone || undefined}
      data-marquee-clone={clone ? '' : undefined}
    >
      {schoolLogos.map((logo) => (
        <li
          key={clone ? `${logo.alt}-clone` : logo.alt}
          className="mr-16 flex size-[150px] shrink-0 items-center justify-center"
        >
          <img
            src={logo.src}
            alt={clone ? '' : logo.alt}
            width={logo.width}
            height={logo.height}
            className="logos-marquee-logo max-h-[64%] max-w-[76%] object-contain object-center"
            loading="lazy"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  )
}

type HomeLogosBandProps = {
  className?: string
}

export function HomeLogosBand({ className }: HomeLogosBandProps) {
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
        Escuelas de formación
      </h2>
      <p
        data-scroll-enter
        className="scroll-enter mx-auto max-w-4xl px-4 text-center text-lg leading-6 text-foreground sm:px-6"
      >
        Formada en +15 escuelas de entrenamiento y psicología canina
      </p>
      <div className="mx-auto mt-4 w-full max-w-[1440px]">
        <div className="logos-marquee-viewport overflow-hidden bg-surface-subtle-0">
          <div className="logos-marquee-track flex w-max">
            <LogoRow />
            <LogoRow clone />
          </div>
        </div>
      </div>
    </section>
  )
}
