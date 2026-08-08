import { useRef } from 'react'

import { useScrollEnter } from '@/hooks/useScrollEnter'
import { cn } from '@/lib/utils'

/** Cambio de rumbo — Figma 1104:8597. */
export function AboutTurnSection({ className }: { className?: string }) {
  const rootRef = useRef<HTMLElement>(null)
  useScrollEnter(rootRef)

  return (
    <section
      ref={rootRef}
      className={cn('w-full', className)}
      aria-labelledby="about-turn-heading"
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1440px] flex-col px-4',
          'sm:px-8',
          'lg:px-20',
        )}
      >
        <div className="flex max-w-[680px] flex-col gap-4">
          <h2
            data-scroll-enter
            id="about-turn-heading"
            className="scroll-enter text-balance text-[26px] font-semibold leading-8 text-foreground-brand"
          >
            ¿Qué me hizo cambiar de rumbo?
          </h2>
          <div
            data-scroll-enter
            className="scroll-enter max-w-[784px] space-y-2 text-base leading-5 text-foreground-secondary"
          >
            <p>
              Con el tiempo me di cuenta de que muchas soluciones prometían
              cambios rápidos, pero pocas se preocupaban por entender qué había
              detrás del comportamiento del perro. Porque detrás de cada
              conducta hay una emoción, una necesidad o algo que el perro está
              intentando comunicar. El problema podía desaparecer durante un
              tiempo, pero la causa seguía ahí, y con ella la frustración de
              muchas familias.
            </p>
            <p>
              Fue entonces cuando entendí que quería trabajar de otra manera:
              ofreciendo un acompañamiento cercano, respetuoso y adaptado a
              cada caso. Porque la convivencia no se construye en una sesión,
              sino en el día a día, en casa, durante los paseos y en todas esas
              pequeñas situaciones que compartís con vuestro perro. Ahí es
              donde ocurren los cambios de verdad.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
