import { useRef } from 'react'

import tickCircle from '@/img/pricing-tick-circle.svg'
import {
  ClipboardList,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react'

import { ServiceInfoCard } from '@/components/services/shared/ServiceInfoCard'
import { BrandLinkButton } from '@/components/ui/button'
import { ServiceSessionExpressFaq } from '@/components/services/session/ServiceSessionExpressFaq'
import {
  ServicePricingAside,
  servicePricingAsideSessionExpress,
} from '@/components/services/shared/ServicePricingAside'
import { useScrollEnter } from '@/hooks/useScrollEnter'
import { cn } from '@/lib/utils'

const methodologyPoints = [
  'No usamos violencia, ni castigos, ni técnicas aversivas.',
  'Respetamos a todos los individuos.',
  'Nos adaptamos a cada integrante de la familia',
] as const

const audienceCases = [
  {
    title: 'Hay momentos concretos que se te hacen cuesta arriba',
    body: 'En general convivís bien, pero los paseos, las visitas, los miedos o determinadas situaciones te generan dudas y no sabes cómo actuar.',
  },
  {
    title: 'Quieres educar desde el respeto, pero no sabes por dónde empezar',
    body: 'Tienes claro que no quieres recurrir a castigos, pero necesitas pautas claras, realistas y fáciles de aplicar en vuestro día a día.',
  },
  {
    title: 'Necesitas saber si vais por buen camino',
    body: 'Has leído mucho, has recibido consejos diferentes y te gustaría contar con una orientación profesional que te ayude a entender qué es lo mejor para vuestro caso.',
  },
  {
    title: 'Tu familia está viviendo un cambio importante',
    body: 'Ha llegado un cachorro, estás esperando un bebé o quieres preparar la convivencia con niños desde el principio para que todos os sintáis seguros.',
  },
  {
    title: 'Necesitas una segunda opinión',
    body: 'Ya estás trabajando con otro profesional o has probado diferentes enfoques, pero sientes que aún te faltan respuestas y quieres valorar otras opciones antes de seguir avanzando.',
  },
] as const

function TickIcon({ className }: { className?: string }) {
  return (
    <img
      src={tickCircle}
      alt=""
      width={20}
      height={20}
      className={cn('shrink-0', className)}
      decoding="async"
      aria-hidden
    />
  )
}

/** Contenido principal + barra lateral — Figma 1103:6115. */
export function ServiceSessionExpressMainColumn({
  className,
}: {
  className?: string
}) {
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
      <div className="order-2 flex min-w-0 flex-1 flex-col gap-40 lg:order-1 lg:gap-52">
        <section
          id="session-express-intro"
          data-scroll-enter
          className="scroll-enter flex max-w-[680px] scroll-mt-28 flex-col gap-4"
          aria-labelledby="session-express-interpret-heading"
        >
          <h2
            id="session-express-interpret-heading"
            className="text-[26px] font-semibold leading-8 text-foreground"
          >
            ¿No sabes cómo interpretar o gestionar ciertos comportamientos de tu
            perro?
          </h2>
          <div className="max-w-[784px] space-y-2 text-base leading-5 text-foreground-secondary">
            <p>
              ¡Es de lo más normal! Convivir con un perro parece sencillo en la
              teoría, pero en la práctica nadie nos entrega un manual de
              instrucciones. Hoy en día hay tanta sobreinformación que es muy
              fácil sentirse confundido, o incluso sentir culpa y miedo a no
              estar haciéndolo bien.
            </p>
            <p>
              A veces nos cuesta entender su lenguaje o sus necesidades reales.
              Pero quiero decirte algo importante: en la mayoría de los casos no
              tienes un &quot;perro problemático&quot;, sino una convivencia que
              necesita ser comprendida y reestructurada. Si tu perro muestra
              estrés, miedos o conductas que no entiendes, probablemente solo
              esté intentando comunicarte algo.
            </p>
          </div>
        </section>

        <section
          id="como-es-sesion"
          className="flex scroll-mt-28 flex-col gap-4"
          aria-labelledby="session-express-how-heading"
        >
          <h2
            data-scroll-enter
            id="session-express-how-heading"
            className="scroll-enter max-w-[680px] text-[26px] font-semibold leading-8 text-foreground"
          >
            ¿Cómo es una sesión exprés?
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
              <p>60 minutos dedicados exclusivamente a ti y a tu perro.</p>
            </ServiceInfoCard>

            <ServiceInfoCard
              data-scroll-enter
              className="scroll-enter sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-1"
              icon={
                <ClipboardList
                  className="size-8 text-foreground-brand"
                  strokeWidth={1.5}
                />
              }
              title="La sesión"
            >
              <p>
                Resolveremos tus dudas, analizaremos vuestra situación y te
                llevarás pautas prácticas y adaptadas a vuestro día a día para
                saber cómo actuar con mayor confianza.
              </p>
            </ServiceInfoCard>

            <ServiceInfoCard
              data-scroll-enter
              className="scroll-enter sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-2"
              icon={
                <Sparkles
                  className="size-8 text-foreground-brand"
                  strokeWidth={1.5}
                />
              }
              title="Después de la sesión"
            >
              <p className="mb-2">
                Al finalizar la sesión sabrás qué está ocurriendo, por qué
                sucede y qué pasos dar a partir de ese momento.
              </p>
              <p>
                Te llevarás pautas personalizadas, fáciles de aplicar y
                adaptadas a vuestro día a día para que puedas acompañar a tu
                perro con más seguridad y confianza.
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
                to="/#home-method-heading"
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

        <section
          className="flex max-w-[600px] flex-col gap-6"
          aria-labelledby="session-express-audience-heading"
        >
          <h2
            data-scroll-enter
            id="session-express-audience-heading"
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
                  <p className="text-lg font-semibold leading-6">{item.title}</p>
                  <p className="text-base leading-5">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div data-scroll-enter className="scroll-enter">
          <ServiceSessionExpressFaq />
        </div>
      </div>

      <div
        data-scroll-enter
        className="scroll-enter order-1 lg:order-2"
      >
        <ServicePricingAside
          {...servicePricingAsideSessionExpress}
          className="max-lg:mx-auto max-lg:w-full"
        />
      </div>
    </div>
  )
}
