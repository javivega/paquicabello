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
    title: 'Integración',
    body: 'Tu perro es uno más de la familia. Te ayudo a comprender sus necesidades emocionales y físicas para crear rutinas viables en vuestro día a día. Sin buscar la perfección ni soluciones imposibles; solo cambios reales y sostenibles que os hagan la vida mucho más fácil.',
  },
  {
    id: 'limites',
    icon: Link2,
    title: 'Límites respetuosos',
    body: 'Poner límites no es controlar ni cohibir, sino aportar seguridad a toda la familia. Trabajamos desde el respeto, ajustando las normas a vuestra etapa vital para proteger y cuidar, nunca para imponer.'
  },
  {
    id: 'supervision',
    icon: Eye,
    title: 'Supervisión',
    body: 'Priorizamos la anticipación y la prevención, especialmente si hay peques en casa. Os acompaño para crear entornos física y emocionalmente seguros, donde todos podáis convivir con total tranquilidad.',
  },
  {
    id: 'comunicacion',
    icon: MessagesSquare,
    title: 'Comunicación canina',
    body: 'Aprendemos a leer señales, ritmos y tensiones antes de etiquetar conductas como “obediencia” o “desobedienciaAprenderemos a descifrar su lenguaje y esas señales sutiles que suelen pasar desapercibidas. No es cuestión de obediencia, sino de entender qué intenta comunicarte y qué necesita realmente tu perro.',
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
          Más allá de técnicas sueltas o ejercicios puntuales, mi trabajo se basa en una forma de acompañar a las familias y a sus perros desde el respeto, la comprensión y la coherencia.
          Esto es lo que puedes esperar cuando trabajemos juntos:
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
