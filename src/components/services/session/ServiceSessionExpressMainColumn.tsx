import heroImage from '@/img/hero.png'
import {
  CircleCheck,
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
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

const esParaMiCases = [
  {
    strong: 'Buscas claridad y dirección: ',
    rest: 'La convivencia en casa es generalmente buena, pero hay situaciones concretas (paseos, miedos, visitas) en las que te sientes perdida/o y no sabes cómo actuar.',
  },
  {
    strong: 'Quieres educar sin castigos, pero te falta estructura: ',
    rest: 'Tienes claro que rechazas los métodos tradicionales coercitivos, pero no sabes qué pautas reales y respetuosas aplicar en tu día a día.',
  },
  {
    strong: 'Necesitas validación profesional: ',
    rest: 'Te preocupa saber si vas por el camino adecuado con las estrategias que estás aplicando o si, sin querer, estás generando estrés en tu perro.',
  },
  {
    strong: 'Tu familia está cambiando o creciendo:',
    rest: ' Acaba de llegar un cachorro, viene un bebé en camino, o ya tienes niños pequeños y quieres estructurar una convivencia sana y segura para todos desde el principio.',
  },
  {
    strong: 'Deseas una segunda opinión:',
    rest: ' Estás siguiendo otro programa o tienes demasiada información contradictoria y necesitas la visión analítica de una profesional para organizar tus ideas.',
  },
] as const

/** Contenido principal + barra lateral — Figma 1042:5676–5759. */
export function ServiceSessionExpressMainColumn({
  className,
}: {
  className?: string
}) {
  return (
    <div
      className={cn(
        /* Figma Content → content section: section gap-sm ~116px below hero+logos */
        'mx-auto mt-24 flex w-full max-w-[1440px] flex-col gap-10 px-4 pb-20 sm:gap-12 sm:px-8 lg:mt-[116px] lg:flex-row lg:gap-10 lg:px-20 lg:pb-28',
        className,
      )}
    >
      <div className="order-2 flex min-w-0 flex-1 flex-col gap-14 lg:order-1 lg:gap-16">
        <section
          style={sectionEnterStyle(60)}
          className="section-enter flex max-w-[680px] flex-col gap-4 lg:pl-0"
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
              fácil sentirse confundido, o incluso sentir culpa y miedo a no estar
              haciéndolo bien.
            </p>
            <p>
              A veces nos cuesta entender su lenguaje o sus necesidades reales.
              Pero quiero decirte algo importante: en la mayoría de los casos no
              tienes un &quot;perro problemático&quot;, sino una convivencia que
              necesita ser comprendida y reestructurada. Si tu perro muestra
              estrés, miedos o conductas que no entiendes, probablemente solo esté
              intentando comunicarte algo.
            </p>
          </div>
        </section>

        <section
          id="como-es-sesion"
          style={sectionEnterStyle(140)}
          className="section-enter flex scroll-mt-28 flex-col gap-4"
          aria-labelledby="session-express-how-heading"
        >
          <h2
            id="session-express-how-heading"
            className="max-w-[680px] text-[26px] font-semibold leading-8 text-foreground"
          >
            ¿Cómo es una sesión exprés?
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
              <p>90 minutos solo para ti.</p>
            </ServiceInfoCard>
            <ServiceInfoCard
              className="sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-start-1"
              icon={
                <ClipboardList className="size-8 text-foreground-brand" strokeWidth={1.5} />
              }
              title="Contenido"
            >
              <p>
                La sesión será un espacio en el que puedes trasladar tus dudas
                sobre cualquier aspecto de la educación de tu perro en tu hogar
                con tu bebé.
              </p>
            </ServiceInfoCard>

            <ServiceInfoCard
              className="sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-2"
              icon={<Sparkles className="size-8 text-foreground-brand" strokeWidth={1.5} />}
              title="Después de la sesión"
            >
              <p>
                Te llevarás una lista de consejos, tareas y técnicas que se
                adaptarán perfectamente a tu situación específica y que podrás
                aplicar en tu hogar para mejorar la convivencia.
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
                  <li key={t} className="flex gap-2 text-[14px] font-semibold leading-4 text-foreground-secondary">
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

        <section
          style={sectionEnterStyle(220)}
          className="section-enter flex flex-col gap-6 lg:flex-row lg:gap-6"
          aria-labelledby="session-express-audience-heading"
        >
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <div className="flex max-w-[600px] flex-col gap-4">
              <h2
                id="session-express-audience-heading"
                className="text-[26px] font-semibold leading-8 text-foreground"
              >
                ¿Es para mí?
              </h2>
              <p className="text-base leading-5 text-foreground-secondary">
                Estas son situaciones comunes en las que puedo ayudarte.
              </p>
            </div>
            <ul className="flex max-w-[600px] flex-col gap-3">
              {esParaMiCases.map((c) => (
                <li key={c.strong} className="flex gap-2">
                  <CircleCheck
                    className="mt-0.5 size-5 shrink-0 text-foreground-brand"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <p className="text-[14px] leading-4 text-foreground-secondary">
                    <span className="font-semibold">{c.strong}</span>
                    <span className="font-normal">{c.rest}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[220px] w-full shrink-0 overflow-hidden rounded-3xl border border-border-subtle-0 bg-surface-subtle-0 sm:h-[276px] lg:w-[390px]">
            <img
              src={heroImage}
              alt=""
              className="absolute inset-0 m-auto max-h-full max-w-full object-contain p-2"
              decoding="async"
            />
          </div>
        </section>

        <div style={sectionEnterStyle(300)} className="section-enter">
          <ServiceSessionExpressFaq />
        </div>
      </div>

      <div style={sectionEnterStyle(180)} className="section-enter order-1 lg:order-2">
        <ServicePricingAside
          {...servicePricingAsideSessionExpress}
          className="max-lg:mx-auto max-lg:w-full"
        />
      </div>
    </div>
  )
}
