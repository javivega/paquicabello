import type { LucideIcon } from 'lucide-react'
import {
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
    title: 'Integración',
    body: 'Tu perro es uno más de la familia. Te ayudo a comprender sus necesidades emocionales y físicas para crear rutinas viables en vuestro día a día. Sin buscar la perfección ni soluciones imposibles; solo cambios reales y sostenibles que os hagan la vida mucho más fácil.',
  },
  {
    id: 'limites',
    icon: Link2,
    title: 'Límites respetuosos',
    body: 'Poner límites no es controlar ni cohibir, sino aportar seguridad a toda la familia. Trabajamos desde el respeto, ajustando las normas a vuestra etapa vital para proteger y cuidar, nunca para imponer.',
  },
  {
    id: 'supervicion',
    icon: Eye,
    title: 'Supervisión',
    body: 'Priorizamos la anticipación y la prevención, especialmente si hay peques en casa. Os acompaño para crear entornos física y emocionalmente seguros, donde todos podáis convivir con total tranquilidad.',
  },
  {
    id: 'comunicacion',
    icon: MessagesSquare,
    title: 'Comunicación canina',
    body: 'Aprendemos a leer señales, ritmos y tensiones antes de etiquetar conductas como “obediencia” o “desobediencia”. Aprenderemos a descifrar su lenguaje y esas señales sutiles que suelen pasar desapercibidas. No es cuestión de obediencia, sino de entender qué intenta comunicarte y qué necesita realmente tu perro.',
  },
  {
    id: 'empatia',
    icon: Dog,
    title: 'Empatía',
    body: 'Tu perro siente miedo, alegría o frustración, pero lo expresa a su manera. Te ayudaré a interpretar sus emociones desde su perspectiva canina, alejándonos de expectativas humanas para darle justo lo que necesita.',
  },
  {
    id: 'apoyo',
    icon: HandHeart,
    title: 'Apoyo emocional continuo',
    body: 'Los cambios llevan tiempo y es normal sentir dudas o cansancio. Durante el acompañamiento tendrás un espacio seguro y sin juicios donde preguntar, aprender y avanzar respetando vuestro ritmo familiar.',
  },
  {
    id: 'amor',
    icon: Heart,
    title: 'Amor como motor de cambio',
    body: 'El verdadero cariño se demuestra con coherencia y paciencia. Fomentamos un amor responsable que sirva de guía y aporte seguridad, huyendo de los métodos aversivos y de la permisividad que genera inseguridad.',
  },
]

const lgPlacements = [
  'lg:col-span-5 lg:row-span-2 lg:col-start-1 lg:row-start-1',
  'lg:col-span-7 lg:col-start-6 lg:row-start-1',
  'lg:col-span-7 lg:col-start-6 lg:row-start-2',
  'lg:col-span-4 lg:col-start-1 lg:row-start-3',
  'lg:col-span-4 lg:col-start-5 lg:row-start-3',
  'lg:col-span-4 lg:col-start-9 lg:row-start-3',
  'lg:col-span-12 lg:row-start-4',
] as const

type Prominence = 'hero' | 'side' | 'base' | 'finale'

function prominenceFor(i: number): Prominence {
  if (i === 0) return 'hero'
  if (i === 1 || i === 2) return 'side'
  if (i === 6) return 'finale'
  return 'base'
}

type PrincipleCellProps = {
  index: number
  id: string
  icon: LucideIcon
  title: string
  body: string
  enterDelayMs?: number
}

function PrincipleIcon({
  icon: Icon,
  prominence,
}: {
  icon: LucideIcon
  prominence: Prominence
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-xl border border-border-subtle-0 bg-surface-subtle-0',
        prominence === 'hero' && 'size-14 sm:size-16',
        prominence === 'side' && 'size-11',
        prominence === 'base' && 'size-10',
        prominence === 'finale' &&
          'size-12 border-foreground-brand/15 bg-surface-subtle-1 sm:size-14',
      )}
      aria-hidden
    >
      <Icon
        className={cn(
          'text-foreground-brand',
          prominence === 'hero' && 'size-7 sm:size-8',
          prominence === 'side' && 'size-5',
          prominence === 'base' && 'size-5',
          prominence === 'finale' && 'size-6 sm:size-7',
        )}
        strokeWidth={1.5}
      />
    </span>
  )
}

function PrincipleCell({
  index,
  id,
  icon,
  title,
  body,
  enterDelayMs,
}: PrincipleCellProps) {
  const p = prominenceFor(index)
  const titleId = `about-principle-${id}`

  return (
    <article
      aria-labelledby={titleId}
      style={enterDelayMs != null ? sectionEnterStyle(enterDelayMs) : undefined}
      className={cn(
        'col-span-12 flex flex-col rounded-2xl border border-border-subtle-1 bg-canvas',
        'shadow-[0_1px_3px_0_rgb(0_0_0/_0.05)]',
        'motion-safe:transition-[transform,box-shadow] motion-safe:duration-200',
        'motion-safe:hover:-translate-y-0.5 hover:shadow-[0_6px_24px_0_rgb(0_0_0/_0.07)]',
        lgPlacements[index],
        enterDelayMs != null && 'section-enter',
      )}
    >
      <div
        className={cn(
          'flex flex-1 flex-col',
          p === 'hero' && 'gap-6 p-7 sm:p-8 lg:justify-between lg:gap-8 lg:p-9',
          p === 'side' && 'gap-4 p-5 sm:p-6',
          p === 'base' && 'gap-4 p-5 sm:p-6',
          p === 'finale' &&
            'gap-5 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7 lg:p-8',
        )}
      >
        <PrincipleIcon icon={icon} prominence={p} />
        <div
          className={cn(
            'flex min-w-0 flex-col gap-2',
            p === 'hero' && 'lg:gap-3',
            p === 'finale' && 'flex-1 lg:gap-3',
          )}
        >
          <h3
            id={titleId}
            className={cn(
              'text-balance font-semibold leading-snug text-foreground-brand',
              p === 'hero' &&
                'text-2xl sm:text-[1.75rem] lg:text-[2rem] lg:leading-snug',
              p === 'side' && 'text-xl sm:text-[1.25rem]',
              p === 'base' && 'text-lg sm:text-xl',
              p === 'finale' && 'text-xl sm:text-2xl',
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              'text-pretty text-foreground-secondary',
              p === 'hero' && 'text-base leading-7 sm:text-[17px] sm:leading-[1.75]',
              p === 'side' && 'text-[15px] leading-6',
              p === 'base' && 'text-[15px] leading-6',
              p === 'finale' && 'text-base leading-7 sm:max-w-3xl',
            )}
          >
            {body}
          </p>
        </div>
      </div>
    </article>
  )
}

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
          Más allá de técnicas sueltas o ejercicios puntuales, mi trabajo se basa en una forma de
          acompañar a las familias y a sus perros desde el respeto, la comprensión y la coherencia.
          Esto es lo que puedes esperar cuando trabajemos juntos:
        </p>
      </div>

      <div
        className={cn(
          'mx-auto mt-12 grid w-full max-w-6xl grid-cols-12 gap-4 sm:gap-5',
          'lg:grid-rows-[1fr_1fr_auto_auto] lg:min-h-[min(560px,70vh)] lg:gap-5',
        )}
      >
        {principles.map((principle, i) => (
          <PrincipleCell
            key={principle.id}
            index={i}
            {...principle}
            enterDelayMs={260 + i * 55}
          />
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
