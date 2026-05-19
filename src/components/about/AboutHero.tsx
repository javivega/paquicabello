import aboutMainImage from '@/img/about-main.png'
import patternImage from '@/img/pattern.png'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

const heroMeshBackground = [
  'radial-gradient(ellipse 343px 198px at 0% 0%, rgb(252 252 252) 0%, rgb(255 244 240) 100%)',
  'linear-gradient(90deg, rgb(255 244 240) 0%, rgb(255 244 240) 100%)',
].join(', ')

export function AboutHero({ className }: { className?: string }) {
  return (
    <section
      className={cn('relative w-full overflow-hidden', className)}
      aria-labelledby="about-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: heroMeshBackground }}
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
          'relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-4 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:grid-cols-2 lg:items-start lg:gap-10 lg:px-20 lg:pb-24 lg:pt-[124px]',
        )}
      >
        <div
          className={cn(
            'flex min-w-0 flex-col gap-4 lg:col-start-2 lg:row-start-1',
            'max-w-[880px] lg:justify-self-start',
          )}
        >
          <p
            style={sectionEnterStyle(50)}
            className="section-enter inline-flex w-fit rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
          >
            ¿Quién soy?
          </p>
          <h1
            id="about-hero-heading"
            style={sectionEnterStyle(120)}
            className="section-enter text-balance text-[clamp(2.25rem,4vw+1rem,52px)] font-semibold leading-[1.08] text-foreground-brand sm:leading-[56px]"
          >
            👋 ¡Hola!
          </h1>
          <p
            style={sectionEnterStyle(190)}
            className="section-enter max-w-[784px] text-[26px] leading-8 text-foreground-secondary"
          >
            Soy Paqui,{' '}
            <span className="font-semibold">educadora canina profesional</span>
            {', y acompaño a familias que quieren vivir con sus perros '}
            <span className="font-semibold">desde la calma, el respeto y la comprensión mutua</span>.
          </p>
          <div
            style={sectionEnterStyle(260)}
            className="section-enter max-w-[784px] space-y-2 text-[18px] leading-6 text-foreground-secondary"
          >
            <p>
              Detrás de los ladridos, miedos o destrozos, hay un perro intentando comunicarse. Sé que la convivencia no siempre es fácil, pero estoy aquí para ayudaros a entenderle y recuperar el equilibrio familiar.
            </p>
            <p>
              Combino mi propia experiencia en una familia multiespecie con mi formación en etología, miedos y reactividad para ofreceros una educación canina respetuosa y sin castigos. En nuestras sesiones personalizadas, os daré herramientas prácticas desde el primer día para generar cambios reales y duraderos.
            </p>
            <p>
              Si queréis volver a disfrutar de vuestra vida juntos, ¡estaré encantada de acompañaros!
            </p>
          </div>
        </div>

        <div
          className={cn(
            'flex w-full justify-center lg:col-start-1 lg:row-start-1 lg:justify-start',
          )}
        >
          <div
            style={sectionEnterStyle(220)}
            className="section-enter-photo relative w-full max-w-[577px] shrink-0"
          >
            <img
              src={aboutMainImage}
              alt="Paqui Cabello, educadora canina"
              className="h-auto w-full object-contain object-left drop-shadow-[0px_0px_10px_var(--Primitive-color-orange-orange-200)]"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
