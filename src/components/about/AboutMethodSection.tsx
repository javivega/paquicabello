import familyImage from '@/img/family.png'
import { BrandLinkButton } from '@/components/ui/button'
import { CONTACT_PATH } from '@/lib/routes'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

export function AboutMethodSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'mx-auto grid w-full max-w-[1440px] gap-10 px-4 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-20 lg:py-24',
        className,
      )}
      aria-labelledby="about-method-heading"
    >
      <div className="flex justify-center lg:justify-start">
        <div
          style={sectionEnterStyle(140)}
          className="section-enter-photo relative w-full max-w-[min(100%,640px)] lg:max-w-none"
        >
          <img
            src={familyImage}
            alt="Collage con la palabra familia y retratos de personas y mascotas"
            className="h-auto w-full object-contain object-left drop-shadow-[0px_0px_10px_var(--Primitive-color-orange-orange-200)]"
            decoding="async"
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <p
          style={sectionEnterStyle(50)}
          className="section-enter inline-flex w-fit rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
        >
          Método
        </p>
        <h2
          id="about-method-heading"
          style={sectionEnterStyle(120)}
          className="section-enter text-balance text-[26px] font-semibold leading-8 text-foreground-brand sm:text-[28px] sm:leading-9"
        >
          La Metodología Crianza Multiespecie®
        </h2>
        <div
          style={sectionEnterStyle(190)}
          className="section-enter space-y-4 text-base leading-6 text-foreground-secondary"
        >
          <p>
            Es un marco de trabajo propio, pensado para integrar a todas las personas y
            animales que conviven en un mismo hogar. Partimos de la comunicación canina
            real, del respeto mutuo y de límites claros que se pueden adaptar cuando la
            vida cambia (un bebé, un traslado, un nuevo compañero…).
          </p>
          <p>
            Rechazo la violencia, los castigos y las soluciones “de manual” que ignoran
            el contexto. Mi referente ético y formativo incluye años de aprendizaje junto
            a profesionales como{' '}
            <span className="font-semibold text-foreground">Tamara Hernán</span>, con
            quien sigo alineando criterios sobre bienestar, supervisión y crianza
            consciente.
          </p>
          <p>
            Si quieres profundizar en pilares y ejemplos, también lo encontrarás en la
            sección de metodología de la web. Aquí el objetivo es simple: que tu familia
            gane calma, seguridad y confianza —sin perder de vista que el amor, bien
            encauzado, es el mejor combustible.
          </p>
        </div>
        <BrandLinkButton
          to={CONTACT_PATH}
          brandVariant="primary"
          brandSize="md"
          style={sectionEnterStyle(260)}
          className="section-enter mt-2 w-fit"
          leftSlot={null}
          rightSlot={null}
        >
          Contactar
        </BrandLinkButton>
      </div>
    </section>
  )
}
