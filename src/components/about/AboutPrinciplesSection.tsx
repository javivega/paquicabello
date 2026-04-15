import type { LucideIcon } from 'lucide-react'
import {
  Baby,
  Dog,
  Eye,
  HandHeart,
  Heart,
  Link2,
  MessagesSquare,
  Share2,
} from 'lucide-react'

import { BrandLinkButton } from '@/components/ui/button'
import { CONTACT_PATH } from '@/lib/routes'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

const principles: readonly {
  id: string
  icon: LucideIcon
  title: string
  body: string
}[] = [
  {
    id: 'integracion',
    icon: Share2,
    title: 'Integración real de todos',
    body: 'Nadie es un extra en su propia casa: escuchamos necesidades humanas y caninas por igual para que el plan sea sostenible.',
  },
  {
    id: 'limites',
    icon: Link2,
    title: 'Límites respetuosos y adaptables',
    body: 'Estructura y claridad sin rigidez tóxica: los límites protegen y se revisan cuando cambian las etapas o el entorno.',
  },
  {
    id: 'supervision',
    icon: Eye,
    title: 'Supervisión consciente',
    body: 'Especialmente con peques, priorizamos anticipación y seguridad física y emocional para todos los involucrados.',
  },
  {
    id: 'comunicacion',
    icon: MessagesSquare,
    title: 'Comunicación canina real',
    body: 'Aprendemos a leer señales, ritmos y tensiones antes de etiquetar conductas como “obediencia” o “desobediencia”.',
  },
  {
    id: 'empatia',
    icon: Dog,
    title: 'Empatía sin humanizar',
    body: 'Reconocemos emociones y motivaciones caninas sin proyectar narrativas humanas que distorsionan lo que el perro necesita.',
  },
  {
    id: 'apoyo',
    icon: HandHeart,
    title: 'Apoyo emocional continuo',
    body: 'El proceso incluye espacio para tus dudas y tu cansancio: el cambio es gradual y merece compañía, no juicio.',
  },
  {
    id: 'amor',
    icon: Heart,
    title: 'Amor como motor de cambio',
    body: 'El cariño se traduce en coherencia, paciencia y acciones alineadas con el bienestar —no en permisividad que genera inseguridad.',
  },
  {
    id: 'crianza-peque',
    icon: Baby,
    title: 'Crianza consciente desde la etapa del peque',
    body: 'Si convives con bebés o niños, integramos sus ritmos y curiosidad en el diseño de la convivencia con el perro.',
  },
]

export function AboutPrinciplesSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'mx-auto w-full max-w-[1440px] px-4 pb-20 pt-4 sm:px-8 lg:px-20 lg:pb-28',
        className,
      )}
      aria-labelledby="about-principles-heading"
    >
      <div className="mx-auto flex max-w-[800px] flex-col gap-4 text-center">
        <p
          style={sectionEnterStyle(50)}
          className="section-enter mx-auto inline-flex w-fit rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
        >
          Principios
        </p>
        <h2
          id="about-principles-heading"
          style={sectionEnterStyle(120)}
          className="section-enter text-balance text-[26px] font-semibold leading-8 text-foreground-brand sm:text-[28px] sm:leading-9"
        >
          Mis principios y compromisos
        </h2>
        <p
          style={sectionEnterStyle(190)}
          className="section-enter text-base leading-6 text-foreground-secondary"
        >
          Esto es lo que puedes esperar cuando trabajamos juntos, más allá de técnicas
          sueltas.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {principles.map(({ id, icon: Icon, title, body }, i) => (
          <article
            key={id}
            style={sectionEnterStyle(260 + i * 55)}
            className="section-enter flex gap-4 rounded-2xl border border-border-subtle-1 bg-canvas p-5 sm:p-6"
            aria-labelledby={`about-principle-${id}`}
          >
            <div className="inline-flex h-fit shrink-0 rounded-xl border border-border-subtle-0 bg-surface-subtle-0 p-2">
              <Icon className="size-8 text-foreground-brand" strokeWidth={1.5} aria-hidden />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <h3
                id={`about-principle-${id}`}
                className="text-lg font-semibold leading-6 text-foreground-brand"
              >
                {title}
              </h3>
              <p className="text-base leading-5 text-foreground-secondary">{body}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <BrandLinkButton
          to={CONTACT_PATH}
          brandVariant="primary"
          brandSize="md"
          style={sectionEnterStyle(760)}
          className="section-enter"
          leftSlot={null}
          rightSlot={null}
        >
          Contactar
        </BrandLinkButton>
      </div>
    </section>
  )
}
