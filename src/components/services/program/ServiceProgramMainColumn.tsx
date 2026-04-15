import {
  CircleCheck,
  ClipboardList,
  Clock,
  Dog,
  Heart,
  Home,
  ListTodo,
  MapPin,
  ShieldAlert,
  Sparkles,
  Video,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { ServiceInfoCard } from '@/components/services/shared/ServiceInfoCard'
import { BrandLinkButton } from '@/components/ui/button'
import { ServiceProgramFaq } from '@/components/services/program/ServiceProgramFaq'
import {
  ServicePricingAside,
  servicePricingAsideProgram8Weeks,
} from '@/components/services/shared/ServicePricingAside'
import { ServiceProgramTimelineSection } from '@/components/services/program/ServiceProgramTimelineSection'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

const paraMiCases: readonly {
  id: string
  mode: 'plain' | 'split'
  text?: string
  strong?: string
  rest?: string
}[] = [
    {
      id: 'reactividad',
      mode: 'plain',
      text: 'Sientes que tu perro tiene miedos, ansiedad o conductas reactivas que no sabes cómo gestionar, y los paseos o el día a día generan tensión.',
    },
    {
      id: 'multiespecie',
      mode: 'split',
      strong: 'Buscas una crianza multiespecie segura: ',
      rest: 'Hay niños pequeños en casa (o un bebé en camino) y necesitas estructurar la convivencia para evitar conflictos y asegurar el bienestar de todos.',
    },
    {
      id: 'desde-cero',
      mode: 'split',
      strong: 'Empiezas desde cero: ',
      rest: 'Tu perro acaba de llegar a la familia (cachorro o adoptado) y quieres hacer las cosas bien desde el principio para prevenir problemas futuros.',
    },
    {
      id: 'miedos',
      mode: 'split',
      strong: 'Gestión de miedos y ansiedad: ',
      rest: 'Tu perro sufre en situaciones cotidianas (ruidos, visitas, soledad) y no sabes cómo ayudarle a ganar seguridad y autonomía.',
    },
    {
      id: 'paseo',
      mode: 'split',
      strong: 'Dificultades en el paseo: ',
      rest: 'Los paseos son un momento de tensión. Tu perro tira de la correa, ladra a otros perros o personas, se bloquea por miedo o vive en un estado de alerta constante que os impide disfrutar.',
    },
  ]

const outcomes: readonly { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Dog,
    title: 'Reconocen el lenguaje del perro',
    body: 'Ya no interpretan su conducta como mala o desobediente, sino que entienden sus señales de incomodidad, estrés o necesidad.',
  },
  {
    icon: Home,
    title: 'Generan espacios seguros',
    body: 'Diseñaremos un entorno donde tanto humanos como perros tengan sus necesidades cubiertas, eliminando la tensión constante en casa.',
  },
  {
    icon: Heart,
    title: 'Vínculo de confianza profunda',
    body: 'Tu perro dejará de ser una fuente de preocupación para convertirse en un compañero confiable y comprendido.',
  },
  {
    icon: ShieldAlert,
    title: 'Previenen situaciones de riesgo',
    body: 'Aprenderás a anticiparte a los conflictos y a actuar con seguridad antes de que se conviertan en un problema.',
  },
  {
    icon: Sparkles,
    title: 'Crean un hogar consciente',
    body: 'Lograrás que la educación de tu perro esté alineada con tus valores, creando un ambiente de respeto mutuo y aprendizaje diario.',
  },
]

export function ServiceProgramMainColumn({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'mx-auto mt-24 flex w-full max-w-[1440px] flex-col gap-10 px-4 pb-20 sm:gap-12 sm:px-8 lg:mt-[116px] lg:flex-row lg:gap-10 lg:px-20 lg:pb-28',
        className,
      )}
    >
      <div className="order-2 flex min-w-0 flex-1 flex-col gap-14 lg:order-1 lg:gap-16">
        <section
          style={sectionEnterStyle(60)}
          className="section-enter flex max-w-[680px] flex-col gap-4 lg:pl-0"
        >
          <h2 className="text-[26px] font-semibold leading-8 text-foreground">
            ¿Sientes que la convivencia con tu perro se ha vuelto estresante, te
            genera dudas o sientes que has perdido el control de la situación?
          </h2>
          <div className="max-w-[784px] space-y-2 text-base leading-5 text-foreground-secondary">
            <p>
              Durante 8 semanas te acompañaré paso a paso, con atención y cuidado,
              para reestructurar la convivencia en tu hogar. No aplicaremos técnicas
              estandarizadas.
            </p>
            <p>
              Analizaremos a fondo vuestro contexto real para diseñar juntos un
              camino a medida, sin castigos ni imposiciones, logrando que humanos y
              perros podáis convivir desde la calma, la comprensión y el vínculo
              auténtico.
            </p>
          </div>
        </section>

        <section
          id="como-es-programa"
          style={sectionEnterStyle(140)}
          className="section-enter flex scroll-mt-28 flex-col gap-4"
          aria-labelledby="program-8-how-heading"
        >
          <h2
            id="program-8-how-heading"
            className="max-w-[680px] text-[26px] font-semibold leading-8 text-foreground"
          >
            ¿Cómo es el programa personalizado de 8 semanas?
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            <ServiceInfoCard
              className="lg:col-start-1 lg:row-start-1"
              icon={<MapPin className="size-8 text-foreground-brand" strokeWidth={1.5} />}
              title="Localización"
            >
              <p className="mb-2">
                La sesión puede ser en cualquier parte a través de Zoom.
              </p>
              <p>
                También puede ser presencial si vives en cualquier zona de:
                Fuengirola, Mijas, Benalmádena, Torremolinos o Marbella.
              </p>
            </ServiceInfoCard>
            <ServiceInfoCard
              className="lg:col-start-2 lg:row-start-1"
              icon={<Clock className="size-8 text-foreground-brand" strokeWidth={1.5} />}
              title="Duración"
            >
              <p>8 semanas.</p>
            </ServiceInfoCard>
            <ServiceInfoCard
              className="lg:col-start-3 lg:row-start-1"
              icon={
                <ClipboardList className="size-8 text-foreground-brand" strokeWidth={1.5} />
              }
              title="Sesión inicial"
            >
              <p>
                Videollamada de 60 min para conoceros a fondo y adaptar el
                acompañamiento a vuestra realidad.
              </p>
            </ServiceInfoCard>
            <ServiceInfoCard
              className="lg:col-start-1 lg:row-start-2"
              icon={<ListTodo className="size-8 text-foreground-brand" strokeWidth={1.5} />}
              title="Seguimiento"
            >
              <p>
                Resuelve dudas en tiempo real, comparte tus avances y adapta las
                pautas según vuestra evolución.
              </p>
            </ServiceInfoCard>
            <ServiceInfoCard
              className="lg:col-start-2 lg:row-start-2"
              icon={<Video className="size-8 text-foreground-brand" strokeWidth={1.5} />}
              title="Revisión de vídeos"
            >
              <p>
                Analizo vuestras interacciones reales y te acompaño para aplicar las
                pautas con seguridad y confianza.
              </p>
            </ServiceInfoCard>

            <article
              className={cn(
                'flex min-h-[220px] flex-col gap-3 rounded-2xl border border-border-subtle-0 bg-surface-subtle-0 p-6 sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-2 lg:min-h-[280px]',
              )}
            >
              <h3 className="text-xl font-semibold leading-6 text-foreground-brand">
                Usamos la Metodología Crianza Multiespecie
              </h3>
              <ul className="flex flex-col gap-3">
                {[
                  'No usamos violencia, ni castigos, ni técnicas aversivas.',
                  'Respetamos a todos los individuos.',
                  'Nos adaptamos a cada integrante de la familia',
                ].map((t) => (
                  <li
                    key={t}
                    className="flex gap-2 text-[14px] font-semibold leading-4 text-foreground-secondary"
                  >
                    <CircleCheck
                      className="mt-0.5 size-5 shrink-0 text-foreground-brand"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <BrandLinkButton
                to="/#home-method-heading"
                brandVariant="secondary"
                brandSize="md"
                className="mt-1 w-fit"
                leftSlot={null}
                rightSlot={null}
              >
                Saber más
              </BrandLinkButton>
            </article>
          </div>
        </section>

        <div style={sectionEnterStyle(220)} className="section-enter">
          <ServiceProgramTimelineSection />
        </div>

        <section
          style={sectionEnterStyle(300)}
          className="section-enter flex flex-col gap-6"
          aria-labelledby="program-8-audience-heading"
        >
          <div className="flex max-w-[600px] flex-col gap-4">
            <h2
              id="program-8-audience-heading"
              className="text-[26px] font-semibold leading-8 text-foreground"
            >
              ¿Cómo sé si es para mí?
            </h2>
            <p className="text-base leading-5 text-foreground-secondary">
              Estas son situaciones comunes en las que puedo ayudarte.
            </p>
          </div>
          <ul className="flex max-w-[600px] flex-col gap-3">
            {paraMiCases.map((c) => (
              <li key={c.id} className="flex gap-2">
                <CircleCheck
                  className="mt-0.5 size-5 shrink-0 text-foreground-brand"
                  strokeWidth={2}
                  aria-hidden
                />
                {c.mode === 'plain' ? (
                  <p className="text-[14px] font-semibold leading-4 text-foreground-secondary">
                    {c.text}
                  </p>
                ) : (
                  <p className="text-[14px] leading-4 text-foreground-secondary">
                    <span className="font-semibold">{c.strong}</span>
                    <span className="font-normal">{c.rest}</span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section
          style={sectionEnterStyle(380)}
          className="section-enter flex flex-col gap-6"
          aria-labelledby="program-8-outcomes-heading"
        >
          <div className="flex max-w-[600px] flex-col gap-4">
            <h2
              id="program-8-outcomes-heading"
              className="text-[26px] font-semibold leading-8 text-foreground"
            >
              Lo que vas a conseguir
            </h2>
            <p className="text-base leading-5 text-foreground-secondary">
              Cuando una familia termina este proceso, no solo ha aprendido técnicas
              o reglas: ha cambiado su manera de mirar, de escuchar y de convivir.
            </p>
          </div>
          <div className="flex flex-col gap-7 rounded-2xl bg-surface-subtle-1 p-9">
            {outcomes.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <div className="inline-flex h-fit shrink-0 rounded-xl border border-border-subtle-0 bg-surface-subtle-0 p-2">
                  <Icon className="size-8 text-foreground-brand" strokeWidth={1.5} aria-hidden />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <h3 className="text-xl font-semibold leading-6 text-foreground-brand">
                    {title}
                  </h3>
                  <p className="text-base leading-5 text-foreground-secondary">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={sectionEnterStyle(460)} className="section-enter">
          <ServiceProgramFaq className="pl-0 lg:pl-0" />
        </div>
      </div>

      <div style={sectionEnterStyle(180)} className="section-enter order-1 lg:order-2">
        <ServicePricingAside
          {...servicePricingAsideProgram8Weeks}
          className="max-lg:mx-auto max-lg:w-full"
        />
      </div>
    </div>
  )
}
