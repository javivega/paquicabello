import { useRef } from 'react'

import tickCircle from '@/img/pricing-tick-circle.svg'
import {
  ClipboardList,
  Clock,
  Dog,
  Heart,
  Home,
  ListTodo,
  MapPin,
  ShieldCheck,
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
import { useScrollEnter } from '@/hooks/useScrollEnter'
import { cn } from '@/lib/utils'

const methodologyPoints = [
  'No usamos violencia, ni castigos, ni técnicas aversivas.',
  'Respetamos a todos los individuos.',
  'Nos adaptamos a cada integrante de la familia',
] as const

const audienceCases = [
  {
    title: 'La convivencia con tu perro se ha vuelto complicada',
    body: 'Sientes que los paseos, determinadas situaciones o algunos comportamientos generan estrés y ya no sabes cómo ayudarle.',
  },
  {
    title: 'Quieres preparar una convivencia segura entre niños y perros',
    body: 'Estás embarazada, acaba de llegar un bebé o tienes niños pequeños y quieres que todos convivan con tranquilidad, respeto y seguridad desde el principio.',
  },
  {
    title: 'Acaba de llegar un perro a vuestra familia',
    body: 'Ya sea un cachorro o un perro adoptado, quieres empezar con buen pie, comprender sus necesidades y sentar las bases de una convivencia equilibrada.',
  },
  {
    title:
      'Tu perro vive con miedo, ansiedad o le cuesta gestionar algunas situaciones',
    body: 'Los ruidos, las visitas, quedarse solo o encontrarse con otros perros le generan inseguridad y no sabes cómo acompañarlo para que gane confianza.',
  },
  {
    title: 'Los paseos se han convertido en un momento de tensión',
    body: 'Tu perro tira de la correa, ladra, se bloquea o permanece en un estado de alerta constante, haciendo que salir a pasear deje de ser un momento agradable para ambos.',
  },
] as const

const outcomes: readonly { icon: LucideIcon; title: string; body: string }[] =
  [
    {
      icon: Dog,
      title: 'Comprender mejor a tu perro',
      body: 'Aprenderás a reconocer su lenguaje y a interpretar sus conductas desde la emoción y las necesidades que hay detrás de ellas.',
    },
    {
      icon: Home,
      title: 'Crear una convivencia más tranquila',
      body: 'Adaptaremos el entorno y las rutinas para favorecer el bienestar de toda la familia y reducir las situaciones de estrés en casa.',
    },
    {
      icon: Heart,
      title: 'Fortalecer vuestro vínculo',
      body: 'Construiréis una relación basada en la confianza, el respeto y una comunicación más clara, para que os entendáis mejor en vuestro día a día.',
    },
    {
      icon: ShieldCheck,
      title: 'Saber cómo actuar',
      body: 'Aprenderás a identificar las señales antes de que aparezcan los conflictos y a responder de una forma más segura y adaptada a cada situación.',
    },
    {
      icon: Sparkles,
      title: 'Crear un hogar consciente',
      body: 'Desarrollarás una forma de convivir con tu perro que respete sus necesidades y también las de tu familia, creando un ambiente de calma, aprendizaje y bienestar para todos.',
    },
  ]

function TickIcon({ className }: { className?: string }) {
  return (
    <img
      src={tickCircle}
      alt="Incluido"
      width={24}
      height={24}
      className={cn('shrink-0', className)}
      decoding="async"
      aria-hidden
    />
  )
}

/** Contenido principal + barra lateral — Figma 1104:6789. */
export function ServiceProgramMainColumn({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  useScrollEnter(rootRef)

  return (
    <div
      ref={rootRef}
      className={cn(
        'mx-auto mt-24 flex w-full max-w-[1440px] flex-col gap-10 px-4 pb-20 sm:gap-12 sm:px-8 lg:mt-[116px] lg:flex-row lg:gap-10 lg:px-20 lg:pb-28',
        className,
      )}
    >
      <div className="page-section-stack order-2 flex min-w-0 flex-1 flex-col lg:order-1">
        <section
          id="program-4-intro"
          data-scroll-enter
          className="scroll-enter flex max-w-[680px] scroll-mt-28 flex-col gap-4"
          aria-labelledby="program-4-intro-heading"
        >
          <h2
            id="program-4-intro-heading"
            className="text-[26px] font-semibold leading-8 text-foreground"
          >
            ¿Sientes que la convivencia con tu perro se ha vuelto estresante, te
            genera dudas o sientes que has perdido el control de la situación?
          </h2>
          <p className="max-w-[784px] text-base leading-5 text-foreground-secondary">
            Cada familia y cada perro son diferentes. Por eso este
            acompañamiento es totalmente personalizado. Durante cuatro semanas
            tendrás las herramientas, el apoyo y las pautas necesarias para
            comprender mejor a tu perro y crear una convivencia más tranquila,
            respetuosa y equilibrada.
          </p>
        </section>

        <section
          id="como-es-programa"
          className="flex scroll-mt-28 flex-col gap-4"
          aria-labelledby="program-4-how-heading"
        >
          <h2
            data-scroll-enter
            id="program-4-how-heading"
            className="scroll-enter max-w-[680px] text-[26px] font-semibold leading-8 text-foreground"
          >
            ¿Cómo es el programa personalizado de 4 semanas?
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            <ServiceInfoCard
              data-scroll-enter
              className="scroll-enter lg:col-start-1 lg:row-start-1"
              icon={
                <MapPin
                  className="size-8 text-foreground-brand"
                  strokeWidth={1.5}
                />
              }
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
              data-scroll-enter
              className="scroll-enter lg:col-start-2 lg:row-start-1"
              icon={
                <Clock
                  className="size-8 text-foreground-brand"
                  strokeWidth={1.5}
                />
              }
              title="Duración"
            >
              <p>4 semanas.</p>
            </ServiceInfoCard>
            <ServiceInfoCard
              data-scroll-enter
              className="scroll-enter lg:col-start-3 lg:row-start-1"
              icon={
                <ClipboardList
                  className="size-8 text-foreground-brand"
                  strokeWidth={1.5}
                />
              }
              title="Sesión inicial"
            >
              <p>
                Videollamada o sesión presencial de 60 minutos para conoceros a fondo y adaptar el
                acompañamiento a vuestra realidad.
              </p>
            </ServiceInfoCard>
            <ServiceInfoCard
              data-scroll-enter
              className="scroll-enter lg:col-start-1 lg:row-start-2"
              icon={
                <ListTodo
                  className="size-8 text-foreground-brand"
                  strokeWidth={1.5}
                />
              }
              title="Seguimiento"
            >
              <p>
                Resuelve dudas en tiempo real, comparte tus avances y adapta las
                pautas según vuestra evolución.
              </p>
            </ServiceInfoCard>
            <ServiceInfoCard
              data-scroll-enter
              className="scroll-enter lg:col-start-2 lg:row-start-2"
              icon={
                <Video
                  className="size-8 text-foreground-brand"
                  strokeWidth={1.5}
                />
              }
              title="Revisión de vídeos"
            >
              <p>
                Analizo vuestras interacciones reales y te acompaño para aplicar
                las pautas con seguridad y confianza.
              </p>
            </ServiceInfoCard>

            <article
              data-scroll-enter
              className={cn(
                'scroll-enter flex min-h-[220px] flex-col items-center gap-3 rounded-2xl border border-border-subtle-0 bg-surface-subtle-0 p-6 sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-2 lg:min-h-[280px]',
              )}
            >
              <h3 className="w-full text-xl font-semibold leading-6 text-foreground-brand">
                Usamos la Metodología Crianza Multiespecie®
              </h3>
              <ul className="flex w-full flex-col gap-3">
                {methodologyPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-[14px] font-semibold leading-4 text-foreground-secondary"
                  >
                    <TickIcon className="mt-0.5 size-5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <BrandLinkButton
                to={{ pathname: '/', hash: '#about-method-heading' }}
                brandVariant="secondary"
                brandSize="md"
                className="mt-auto w-fit"
                leftSlot={null}
                rightSlot={null}
              >
                Saber más
              </BrandLinkButton>
            </article>
          </div>
        </section>

        {/* Timeline header marked for scroll-enter; steps keep their own ST. */}
        <div>
          <ServiceProgramTimelineSection />
        </div>

        <section
          className="flex max-w-[600px] flex-col gap-6"
          aria-labelledby="program-4-audience-heading"
        >
          <h2
            data-scroll-enter
            id="program-4-audience-heading"
            className="scroll-enter text-[26px] font-semibold leading-8 text-foreground"
          >
            ¿Te sientes identificada con alguna de estas situaciones?
          </h2>
          <ul className="flex flex-col gap-8">
            {audienceCases.map((item) => (
              <li
                key={item.title}
                data-scroll-enter
                className="scroll-enter flex gap-2"
              >
                <TickIcon className="mt-0.5 size-6" />
                <div className="flex min-w-0 flex-1 flex-col gap-1 text-foreground-secondary">
                  <h3 className="text-lg font-semibold leading-6">{item.title}</h3>
                  <p className="text-base leading-5">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="flex flex-col gap-6"
          aria-labelledby="program-4-outcomes-heading"
        >
          <div
            data-scroll-enter
            className="scroll-enter flex max-w-[600px] flex-col gap-4"
          >
            <h2
              id="program-4-outcomes-heading"
              className="text-[26px] font-semibold leading-8 text-foreground"
            >
              Lo que vas a conseguir
            </h2>
            <p className="text-base leading-5 text-foreground-secondary">
              Cuando una familia termina este proceso, no solo ha aprendido
              técnicas o reglas: ha cambiado su manera de mirar, de escuchar y
              de convivir.
            </p>
          </div>
          <div className="flex flex-col gap-7 rounded-2xl bg-surface-subtle-1 p-9">
            {outcomes.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                data-scroll-enter
                className="scroll-enter flex gap-4"
              >
                <div className="inline-flex h-fit shrink-0 rounded-xl border border-border-subtle-0 bg-surface-subtle-0 p-2">
                  <Icon
                    className="size-8 text-foreground-brand"
                    strokeWidth={1.5}
                    aria-hidden
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
              </div>
            ))}
          </div>
        </section>

        <div data-scroll-enter className="scroll-enter">
          <ServiceProgramFaq className="pl-0 lg:pl-0" />
        </div>
      </div>

      <div data-scroll-enter className="scroll-enter order-1 lg:order-2">
        <ServicePricingAside
          {...servicePricingAsideProgram8Weeks}
          className="max-lg:mx-auto max-lg:w-full"
        />
      </div>
    </div>
  )
}
