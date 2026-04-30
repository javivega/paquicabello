import { BrandLinkButton } from '@/components/ui/button'
import { CONTACT_PATH, SERVICES_PATH } from '@/lib/routes'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

const pillars = [
  {
    title: 'Una familia en la que todos cuentan',
    body: 'Tu perro no es un añadido más, forma parte del núcleo familiar, con emociones muy parecidas a las tuyas y aunque no habla como nosotras, tiene un repertorio de señales comunicativas que expresan en todo momento su estado emocional.',
  },
  {
    title: 'Libre de violencia',
    body: 'Construimos vínculos desde la confianza, sin gritos, castigos, ni métodos invasivos. La comunicación respetuosa es el camino.',
  },
  {
    title: 'Respeto y límites recíprocos',
    body: 'Fomentamos una relación basada en el respeto mutuo, reconociendo las necesidades caninas y estableciendolímites seguros y que protejan a todos los miembros de la familia',
  },
  {
    title: 'Cada miembro de la familia importa',
    body: 'Cada miembro de la familia importa y es tratado según su forma única de ser, sin importar la especie.',
  },
  {
    title: 'Compromiso de todos',
    body: 'Una convivencia segura entre niños y perros es posible ¡Por supuesto! Durante años nos han dicho que había que controlar al perro en un transportín, al final el perro se quedaba relegado/apartado de la vida familiar, la realidad es que da mejores resultados integrarlo en la vida familiar con límites que protejan y sean seguros para todos los miembros de la familia.',
  },
] as const

const lgPlacements = [
  'lg:col-span-5 lg:row-span-2 lg:col-start-1 lg:row-start-1',
  'lg:col-span-7 lg:col-start-6 lg:row-start-1',
  'lg:col-span-7 lg:col-start-6 lg:row-start-2',
  'lg:col-span-6 lg:col-start-1 lg:row-start-3',
  'lg:col-span-6 lg:col-start-7 lg:row-start-3',
] as const

type Prominence = 'hero' | 'side' | 'base'

function prominenceFor(i: number): Prominence {
  if (i === 0) return 'hero'
  if (i === 1 || i === 2) return 'side'
  return 'base'
}

type MethodologyPillarCellProps = {
  index: number
  titleId: string
  title: string
  body: string
  enterDelayMs?: number
}

function MethodologyPillarCell({
  index,
  titleId,
  title,
  body,
  enterDelayMs,
}: MethodologyPillarCellProps) {
  const p = prominenceFor(index)

  return (
    <article
      aria-labelledby={titleId}
      style={enterDelayMs != null ? sectionEnterStyle(enterDelayMs) : undefined}
      className={cn(
        'col-span-12 flex flex-col rounded-2xl border border-border-subtle-1 bg-canvas',
        'shadow-[0_1px_3px_0_rgb(0_0_0/_0.05)]',
        'motion-safe:transition-[transform,box-shadow] motion-safe:duration-200',
        'motion-safe:hover:-translate-y-0.5 hover:shadow-[0_6px_24px_0_rgb(0_0_0_/_0.07)]',
        lgPlacements[index],
        enterDelayMs != null && 'section-enter',
      )}
    >
      <div
        className={cn(
          'flex flex-1 flex-col',
          p === 'hero' && 'gap-6 p-7 sm:p-8 lg:justify-start lg:gap-10 lg:p-9',
          p === 'side' && 'gap-3 p-5 sm:p-6',
          p === 'base' && 'gap-3 p-6 sm:p-7',
        )}
      >
        <div
          className={cn(
            'rounded-full bg-foreground-brand',
            p === 'hero' ? 'size-2.5' : 'size-2',
          )}
          aria-hidden
        />
        <div className="flex flex-col gap-2 lg:gap-3">
          <h3
            id={titleId}
            className={cn(
              'text-balance font-semibold leading-snug text-foreground',
              p === 'hero' &&
                'text-2xl sm:text-[1.75rem] lg:text-[2rem] lg:leading-snug xl:text-[2.25rem]',
              p === 'side' && 'text-xl sm:text-[1.25rem] lg:leading-snug',
              p === 'base' && 'text-xl sm:text-[1.25rem] lg:leading-snug',
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              'text-pretty text-foreground-secondary',
              p === 'hero' && 'text-base leading-7 sm:text-[17px] sm:leading-[1.75]',
              p !== 'hero' && 'text-[15px] leading-6',
            )}
          >
            {body}
          </p>
        </div>
      </div>
    </article>
  )
}

export function HomeMethodologySection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'w-full bg-surface-subtle-1 py-16 sm:py-20 lg:py-24',
        className,
      )}
      aria-labelledby="home-method-heading"
    >
      <div className="mx-auto flex max-w-[1289px] flex-col items-center gap-10 px-4 sm:px-6 lg:gap-12">
        <div className="flex w-full max-w-[640px] flex-col gap-4 text-left lg:mx-auto lg:text-center">
          <p
            style={sectionEnterStyle(50)}
            className={cn(
              'section-enter inline-flex w-fit rounded-lg border border-border-subtle-1 bg-canvas px-2 py-1 text-[14px] leading-4 text-foreground-accent lg:mx-auto',
            )}
          >
            Metodología
          </p>
          <h2
            id="home-method-heading"
            style={sectionEnterStyle(120)}
            className={cn(
              'section-enter text-balance text-[clamp(1.75rem,3vw+1rem,2.875rem)] font-semibold leading-tight text-foreground sm:text-[46px] sm:leading-[56px]',
            )}
          >
            Educación canina basada en{' '}
            <span className="text-foreground-brand">
              respeto, ciencia y vínculo
            </span>
          </h2>
          <div
            style={sectionEnterStyle(190)}
            className={cn(
              'section-enter space-y-2 text-lg leading-7 text-foreground-secondary lg:mx-auto lg:max-w-[640px]',
            )}
          >
            <p>Educar es acompañar y fortalecer el vínculo.</p>
            <p>
            Trabajamos desde la
            evidencia científica y una mirada multiespecie, dejando atrás los castigos y los modelos
            basados en la dominancia. Nuestro objetivo no es la obediencia, sino construir
            seguridad, equilibrio emocional y relaciones de confianza.
            </p>
          </div>
        </div>

        <div
          className={cn(
            'grid w-full max-w-6xl grid-cols-12 gap-4 sm:gap-5',
            'lg:grid-rows-[1fr_1fr_auto] lg:min-h-[min(540px,68vh)] lg:gap-5',
          )}
        >
          {pillars.map((p, i) => (
            <MethodologyPillarCell
              key={p.title}
              index={i}
              titleId={`home-method-pillar-title-${i}`}
              title={p.title}
              body={p.body}
              enterDelayMs={260 + i * 70}
            />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <span
            className="section-enter inline-flex"
            style={sectionEnterStyle(620)}
          >
            <BrandLinkButton
              to={CONTACT_PATH}
              brandVariant="primary"
              brandSize="md"
              leftSlot={null}
              rightSlot={null}
            >
              Contactar
            </BrandLinkButton>
          </span>
          <span
            className="section-enter inline-flex"
            style={sectionEnterStyle(690)}
          >
            <BrandLinkButton
              to={SERVICES_PATH}
              brandVariant="secondary"
              brandSize="md"
              leftSlot={null}
              rightSlot={null}
            >
              Explorar servicios
            </BrandLinkButton>
          </span>
        </div>
      </div>
    </section>
  )
}
