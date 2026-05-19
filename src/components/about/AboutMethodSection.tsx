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
          Si tienes peques en casa o estás esperando su llegada, puedo ayudarte a construir una convivencia segura y respetuosa entre perros y niños.
          </p>
          <p>
            Estoy especializada en <span className="font-semibold">Crianza Multiespecie®</span>, una metodología enfocada exclusivamente en la convivencia familiar entre perros y peques, donde se trabaja entre otras muchas cosas la relación y la comunicación dentro de la familia, previniendo conflictos y favoreciendo experiencias positivas y vínculos sanos desde el principio.
          </p>
          <p>
            Me he formado profesionalmente con Tamara Hernán, la mayor referente que hay ahora mismo en este ámbito, lo que me permite acompañarte con herramientas prácticas y actuales, basadas en el bienestar emocional tanto de tu perro como del resto de los miembros de la familia.
          </p>
          <p>
            Mi objetivo es ayudarte a crear un hogar donde perros y peques crezcan juntos de forma segura, equilibrada y feliz.
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
