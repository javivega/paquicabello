import aboutImage from '@/img/about.png'
import { BrandLinkButton } from '@/components/ui/button'
import { CONTACT_PATH } from '@/lib/routes'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

/** “Mi trayectoria” — Figma node 1042:6867 (copy + layout; media `about.png`). */
export function AboutTrajectorySection({ className }: { className?: string }) {
  return (
    <section
      className={cn('w-full', className)}
      aria-labelledby="about-trajectory-heading"
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 py-16 sm:px-8 lg:flex-row lg:items-start lg:gap-10 lg:px-20 lg:py-24',
        )}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <div className="flex max-w-[680px] flex-col gap-4">
            <p
              style={sectionEnterStyle(50)}
              className="section-enter inline-flex w-fit rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
            >
              Mi trayectoria
            </p>
            <h2
              id="about-trajectory-heading"
              style={sectionEnterStyle(120)}
              className="section-enter text-balance text-[26px] font-semibold leading-8 text-foreground-brand"
            >
              Lo que he hecho durante estos años
            </h2>
            <div
              style={sectionEnterStyle(190)}
              className="section-enter max-w-[784px] space-y-2 text-base leading-5 text-foreground-secondary"
            >
              <p>
                En los últimos años he acompañado a familias con clases de educación,
                detección y dog dance, ayudando a transformar el día a día de sus perros
                desde el respeto y el vínculo.
              </p>
              <p>
                Me he formado con profesionales referentes en análisis de conducta,
                etología, propiocepción, intervención asistida y resolución de problemas de
                comportamiento.
              </p>
            </div>
          </div>
          <BrandLinkButton
            to={CONTACT_PATH}
            brandVariant="primary"
            brandSize="md"
            className="section-enter w-fit"
            style={sectionEnterStyle(260)}
            leftSlot={null}
            rightSlot={null}
          >
            Contactar
          </BrandLinkButton>
        </div>

        <div className="flex w-full shrink-0 justify-center lg:w-[678px] lg:justify-end">
          <div
            style={sectionEnterStyle(220)}
            className="section-enter-photo relative h-[424px] w-full max-w-[678px] overflow-hidden rounded-lg"
          >
            <img
              src={aboutImage}
              alt="Paqui acompañando a familias con sus perros en la montaña"
              className="h-full w-full object-contain object-center drop-shadow-[0px_0px_10px_var(--Primitive-color-orange-orange-200)]"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
