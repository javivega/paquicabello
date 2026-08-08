import type { LucideIcon } from 'lucide-react'
import {
  Dog,
  Eye,
  Heart,
  HeartHandshake,
  Link2,
  MessagesSquare,
  Share2,
} from 'lucide-react'
import { useRef } from 'react'

import { useScrollEnter } from '@/hooks/useScrollEnter'
import { cn } from '@/lib/utils'

/** Order matches Figma 1104:8622 (row-major 2-col grid). */
const principles: readonly {
  id: string
  icon: LucideIcon
  title: string
  body: string
}[] = [
  {
    id: 'limites',
    icon: Link2,
    title: 'Límites respetuosos',
    body: 'Educar con respeto no significa dejar hacer todo. Los límites son necesarios cuando se establecen de forma clara, coherente y adaptada a cada perro. Lejos de imponer, ofrecen seguridad, previenen conflictos y favorecen una convivencia más equilibrada para toda la familia.',
  },
  {
    id: 'empatia',
    icon: Dog,
    title: 'Empatía',
    body: 'Los perros también sienten miedo, alegría, frustración y muchas otras emociones, aunque las expresen de una forma diferente a la nuestra. (o no tanto) Te ayudaré a comprender cómo vive y percibe el mundo tu perro para responder a sus necesidades desde el respeto y no desde las expectativas humanas.',
  },
  {
    id: 'integracion',
    icon: Share2,
    title: 'Integración',
    body: 'Creo en una convivencia donde el perro sea un miembro más de la familia. Por eso os ayudo a comprender sus necesidades emocionales y físicas para integrarlas en vuestra rutina de una forma realista, sin perseguir la perfección, sino una convivencia más sencilla, respetuosa y sostenible.',
  },
  {
    id: 'apoyo',
    icon: HeartHandshake,
    title: 'Apoyo emocional continuo',
    body: 'Cada proceso es diferente y no siempre es un camino lineal. Habrá avances, dudas y días más difíciles, y todo eso forma parte del aprendizaje. Mi compromiso es acompañaros durante el proceso, para que os sintáis apoyados, comprendidos y con la confianza necesaria para seguir avanzando.',
  },
  {
    id: 'supervision',
    icon: Eye,
    title: 'Supervisión',
    body: 'La mejor manera de evitar conflictos es anticiparse a ellos. Especialmente cuando hay bebés o niños en casa, os acompaño a crear un entorno seguro, tanto física como emocionalmente, para que todos podáis convivir con tranquilidad y confianza.',
  },
  {
    id: 'amor',
    icon: Heart,
    title: 'Amor como motor de cambio',
    body: 'Educar con respeto no significa dejar hacer todo, ni tampoco imponer. Significa acompañar con coherencia y empatía, ofreciendo la seguridad que vuestro perro necesita para aprender y sentirse comprendido.',
  },
  {
    id: 'comunicacion',
    icon: MessagesSquare,
    title: 'Comunicación canina',
    body: 'Los perros se comunican con nosotros constantemente, aunque muchas veces no sepamos interpretar sus señales. Te enseñaré a reconocer ese lenguaje para comprender mejor sus emociones y necesidades, dejando a un lado etiquetas como “obediente” o “desobediente”.',
  },
]

/** Principios — Figma 1104:8616. */
export function AboutPrinciplesSection({ className }: { className?: string }) {
  const rootRef = useRef<HTMLElement>(null)
  useScrollEnter(rootRef)

  return (
    <section
      ref={rootRef}
      className={cn('w-full', className)}
      aria-labelledby="about-principles-heading"
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4',
          'sm:px-8',
          'lg:px-20',
        )}
      >
        <div className="flex max-w-[680px] flex-col gap-4">
          <p
            data-scroll-enter
            className="scroll-enter inline-flex w-fit rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
          >
            Principios
          </p>
          <h2
            data-scroll-enter
            id="about-principles-heading"
            className="scroll-enter text-balance text-[26px] font-semibold leading-8 text-foreground-brand"
          >
            Mis principios y compromisos
          </h2>
          <p
            data-scroll-enter
            className="scroll-enter max-w-[784px] text-base leading-5 text-foreground-secondary"
          >
            La educación canina no consiste solo en enseñar comportamientos,
            sino en entender qué necesita cada perro y cómo ayudar a toda la
            familia a convivir mejor. Estos son los principios que marcan mi
            forma de trabajar.
          </p>
        </div>

        <ul
          className={cn(
            'grid list-none grid-cols-1 gap-x-10 gap-y-10 p-0',
            'lg:grid-cols-2',
          )}
        >
          {principles.map(({ id, icon: Icon, title, body }) => (
            <li
              key={id}
              data-scroll-enter
              className="scroll-enter flex gap-4"
            >
              <div
                className="inline-flex h-fit shrink-0 rounded-xl border border-border-subtle-0 bg-surface-subtle-0 p-2"
                aria-hidden
              >
                <Icon
                  className="size-8 text-foreground-brand"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <h3 className="text-xl font-semibold leading-6 text-foreground-brand">
                  {title}
                </h3>
                <p className="text-base leading-5 text-foreground-secondary">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
