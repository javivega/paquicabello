import { cn } from '@/lib/utils'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'

export function AboutTurnSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'border-y border-border-subtle-1 bg-surface-subtle-0 py-16 sm:py-20 lg:py-24',
        className,
      )}
      aria-labelledby="about-turn-heading"
    >
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-4 px-4 sm:px-8 lg:px-20">
        <p
          style={sectionEnterStyle(50)}
          className="section-enter inline-flex w-fit rounded-lg border border-border-subtle-1 bg-canvas px-2 py-1 text-[14px] leading-4 text-foreground-accent"
        >
          Mi trayectoria
        </p>
        <h2
          id="about-turn-heading"
          style={sectionEnterStyle(120)}
          className="section-enter text-balance text-[26px] font-semibold leading-8 text-foreground-brand"
        >
          ¿Qué me hizo cambiar de rumbo?
        </h2>
        <div
          style={sectionEnterStyle(190)}
          className="section-enter space-y-3 text-base leading-6 text-foreground-secondary"
        >
          <p>
          Dar vueltas una y otra vez al mismo punto: soluciones rápidas que parecían funcionar al principio, pero que no llegaban a la raíz del problema ni cuidaban el vínculo, y familias cansadas que solo necesitaban entenderse mejor con su perro y tener un plan realista para su día a día.
          </p>
          <p>
          Ahí entendí que quería trabajar de otra manera. Apostar por un acompañamiento más humano, más profundo y adaptado a cada hogar. Porque la convivencia no ocurre en una sesión puntual… ocurre en vuestra casa, en vuestros paseos y en vuestra rutina diaria. Y es ahí donde realmente pasan las cosas importantes.
          </p>
        </div>
      </div>
    </section>
  )
}
