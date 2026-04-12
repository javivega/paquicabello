import contactImage from '@/img/contact.png'
import patternImage from '@/img/pattern.png'
import { brandButtonVariants, iconRingVariants, labelVariants } from '@/components/ui/button-variants'
import { WHATSAPP_CONTACT_HREF } from '@/lib/routes'
import { cn } from '@/lib/utils'
import { MessageCircle } from 'lucide-react'

const contactMeshBackground = [
  'radial-gradient(ellipse 720px 420px at 100% 0%, rgb(252 252 252) 0%, rgb(255 244 240) 45%, rgb(255 244 240) 100%)',
  'linear-gradient(90deg, rgb(255 244 240) 0%, rgb(255 244 240) 100%)',
].join(', ')

/** Bloque principal contacto — Figma node 1042:6959 (sin footer duplicado). */
export function ContactMainSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'relative flex min-h-full w-full flex-1 flex-col overflow-hidden',
        className,
      )}
      aria-labelledby="contact-page-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: contactMeshBackground }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url(${patternImage})`,
          backgroundSize: 'auto',
        }}
        aria-hidden
      />

      <div
        className={cn(
          'relative z-10 mx-auto flex min-h-full w-full max-w-[1440px] flex-1 flex-col justify-center gap-10 px-4 py-20 sm:px-8 sm:py-24 lg:flex-row lg:items-center lg:gap-16 lg:px-20 lg:py-24',
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-6 lg:max-w-[720px]">
          <p className="inline-flex w-fit items-center gap-1 self-start rounded-lg border border-border-subtle-1 bg-surface-subtle-1 py-1 pr-2 pl-1.5 text-[14px] leading-4 text-foreground-accent">
            <span
              className="size-2 shrink-0 rounded-full bg-foreground-accent"
              aria-hidden
            />
            Disponible
          </p>

          <div className="flex flex-col gap-4">
            <h1
              id="contact-page-heading"
              className="text-balance text-[clamp(1.875rem,3vw+1rem,46px)] font-semibold leading-[1.22] text-foreground-brand sm:leading-[56px]"
            >
              Mejora la vida de tu compañero canino
            </h1>
            <p className="max-w-[720px] text-lg leading-6 text-foreground-secondary">
              Rellena el formulario o contáctanos por WhatsApp explicando cómo quieres que
              te ayudemos; te responderemos lo antes posible para ayudaros a ti y a tu
              amigo con pelo.
            </p>
          </div>

          <a
            href={WHATSAPP_CONTACT_HREF}
            target="_blank"
            rel="noreferrer"
            className={cn(
              brandButtonVariants({ brandVariant: 'primary', brandSize: 'md' }),
              'no-underline',
            )}
          >
            <span
              className={iconRingVariants({ brandVariant: 'primary', brandSize: 'md' })}
              data-part="icon-left"
            >
              <MessageCircle className="size-4" aria-hidden strokeWidth={1.75} />
            </span>
            <span className={labelVariants({ brandVariant: 'primary', brandSize: 'md' })}>
              Contactar por WhatsApp
            </span>
          </a>
        </div>

        <div className="flex w-full shrink-0 justify-center lg:w-[678px] lg:justify-end">
          <div className="relative h-[424px] w-full max-w-[678px] overflow-hidden rounded-lg">
            <img
              src={contactImage}
              alt="Paqui con sus perros en la montaña"
              className="h-full w-full object-contain object-center drop-shadow-[0px_0px_10px_var(--Primitive-color-orange-orange-200)]"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
