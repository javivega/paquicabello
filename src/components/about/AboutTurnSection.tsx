import { cn } from '@/lib/utils'

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
        <p className="inline-flex w-fit rounded-lg border border-border-subtle-1 bg-canvas px-2 py-1 text-[14px] leading-4 text-foreground-accent">
          Mi trayectoria
        </p>
        <h2
          id="about-turn-heading"
          className="text-balance text-[26px] font-semibold leading-8 text-foreground-brand"
        >
          ¿Qué me hizo cambiar de rumbo?
        </h2>
        <div className="space-y-3 text-base leading-6 text-foreground-secondary">
          <p>
            Ver una y otra vez el mismo patrón: soluciones rápidas que no sostenían el
            vínculo, y familias agotadas que solo necesitaban un lenguaje común y un plan
            respetuoso con todos.
          </p>
          <p>
            Decidí apostar por un acompañamiento profundo, basado en comprensión canina
            real y en la vida cotidiana de cada hogar —porque fuera de vuestro salón, los
            libros de texto no sirven de mucho.
          </p>
        </div>
      </div>
    </section>
  )
}
