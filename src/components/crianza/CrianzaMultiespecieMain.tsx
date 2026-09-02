import { useRef, type ReactNode } from 'react'

import heroVerify from '@/img/hero-verify.svg'
import multiespecieIcon from '@/img/multiespecie.png'
import { useScrollEnter } from '@/hooks/useScrollEnter'
import { cn } from '@/lib/utils'

const accompanyItems = [
  'estás esperando un bebé y quieres preparar a tu perro para su llegada;',
  'tu perro ha tenido malas experiencias con niños;',
  'tu perro ladra o muestra miedo ante tu hijo;',
  'hay situaciones de la convivencia que generan tensión o preocupación;',
  'no sabes interpretar algunas de las respuestas de tu perro;',
  'ya has probado diferentes estrategias y no habéis conseguido mejorar;',
  'quieres aprender a construir una convivencia más segura entre tu perro y tus hijos.',
] as const

type ContentBlockProps = {
  headingId: string
  title: string
  children: ReactNode
}

function ContentBlock({ headingId, title, children }: ContentBlockProps) {
  return (
    <section
      className="flex w-full flex-col gap-1"
      aria-labelledby={headingId}
    >
      <h2
        id={headingId}
        data-scroll-enter
        className="scroll-enter headline-2xs text-foreground"
      >
        {title}
      </h2>
      <div
        data-scroll-enter
        className="scroll-enter space-y-2 paragraph-lg text-foreground-secondary"
      >
        {children}
      </div>
    </section>
  )
}

type CrianzaMultiespecieMainProps = {
  className?: string
}

/** Contenido principal — Figma node 1142:3030. */
export function CrianzaMultiespecieMain({
  className,
}: CrianzaMultiespecieMainProps) {
  const rootRef = useRef<HTMLElement>(null)
  useScrollEnter(rootRef)

  return (
    <section
      ref={rootRef}
      className={cn('w-full bg-canvas', className)}
      aria-labelledby="crianza-multiespecie-heading"
    >
      <div
        className={cn(
          'mx-auto flex w-full max-w-[1440px] justify-center px-4 pb-20 pt-24',
          'sm:px-8 sm:pb-24 sm:pt-28',
          'lg:px-20 lg:pb-28 lg:pt-[124px]',
        )}
      >
        <article className="flex w-full max-w-[672px] flex-col gap-8">
          <header
            data-scroll-enter
            className="scroll-enter flex flex-col gap-4"
          >
            <h1
              id="crianza-multiespecie-heading"
              className="headline-sm text-foreground-brand"
            >
              Crianza Multiespecie®
            </h1>
            <p className="headline-xs text-foreground-secondary">
              Una convivencia segura y respetuosa entre perros, bebés y niños
            </p>
          </header>

          <ContentBlock
            headingId="crianza-prepararse"
            title="Prepararse también es una forma de cuidar"
          >
            <p>
              La llegada de un bebé cambia muchas cosas en casa: las rutinas,
              los espacios, los horarios y la atención que recibe cada miembro
              de la familia. Para un perro, también es un cambio importante.
            </p>
            <p>
              Por eso, si estás esperando un bebé, no es necesario esperar a
              que aparezca un problema para pedir ayuda. Podemos prepararnos
              antes, anticipar cambios y crear unas bases de convivencia que
              hagan más sencilla la adaptación a esta nueva etapa.
            </p>
            <p>
              Y si tus hijos ya conviven con tu perro, también podemos trabajar
              sobre las dificultades que hayan aparecido.
            </p>
          </ContentBlock>

          <ContentBlock
            headingId="crianza-convivencia-dificil"
            title="Cuando la convivencia no está siendo fácil"
          >
            <p>
              Quizás tu perro ladra a tu hijo, se pone nervioso cuando se
              acerca, muestra miedo o alguna de sus reacciones te preocupa.
              Quizás ya has intentado diferentes cosas y no sabes qué más
              hacer. O puede que hayas tenido una mala experiencia con tu
              perro y otros niños y ahora quieras evitar que vuelva a ocurrir.
            </p>
            <p>
              Cada situación es diferente y, antes de decidir qué hacer,
              necesitamos entender qué está pasando y por qué.
            </p>
            <p>
              Una misma conducta puede tener detrás emociones y necesidades muy
              diferentes. Por eso no trabajo desde soluciones genéricas, sino
              desde la observación y la comprensión de cada caso.
            </p>
          </ContentBlock>

          <ContentBlock
            headingId="crianza-comprender"
            title="Comprender al perro para prevenir conflictos"
          >
            <p>
              Un ladrido, un gruñido, una huida o una respuesta que puede
              parecernos agresiva no aparecen porque sí. Pueden ser la forma
              que tiene un perro de expresar miedo, incomodidad, estrés o que
              necesita más distancia.
            </p>
            <p>
              Aprender a reconocer estas señales nos permite intervenir antes
              de que la situación llegue a un punto de conflicto y, sobre
              todo, darle al perro otras herramientas para gestionar lo que
              está viviendo.
            </p>
            <p>
              Pero también trabajamos con las personas. Aprender a interpretar
              a tu perro, saber cuándo necesita espacio y entender cómo
              acompañarlo forma parte de construir una convivencia más segura.
            </p>
          </ContentBlock>

          <ContentBlock
            headingId="crianza-metodologia"
            title="Crianza Multiespecie®"
          >
            <p>
              Me he formado profesionalmente con Tamara Hernán, especializada
              en Crianza Multiespecie®, para poder acompañar de forma
              específica las situaciones en las que perros y niños comparten
              un hogar.
            </p>
            <p>
              Esta formación complementa mi experiencia en educación canina y
              mi trabajo con problemas de comportamiento, aportando una mirada
              centrada en el bienestar emocional de todos los miembros de la
              familia.
            </p>
            <p>
              Porque cuando hablamos de convivencia entre perros y niños, el
              objetivo no puede ser únicamente que el perro &ldquo;se porte
              bien&rdquo;.
            </p>
            <p>
              Tenemos que tener en cuenta al perro, pero también al niño, a
              los adultos, las rutinas familiares, los espacios y las
              situaciones que pueden resultar difíciles para cada uno.
            </p>
          </ContentBlock>

          <ContentBlock
            headingId="crianza-acompanar"
            title="¿En qué puedo acompañarte?"
          >
            <p>Puedo ayudarte tanto si quieres prevenir dificultades como si ya existe un problema.</p>
            <p>Por ejemplo, si:</p>
            <ul className="list-disc space-y-2 pl-[27px]">
              {accompanyItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              No buscamos que perro y niño tengan que estar juntos todo el
              tiempo ni que el perro tenga que aceptar cualquier situación.
            </p>
            <p>
              Buscamos que todos puedan convivir de una forma segura,
              respetuosa y equilibrada.
            </p>
          </ContentBlock>

          <ContentBlock
            headingId="crianza-construir"
            title="Una convivencia que se construye entre todos"
          >
            <p>
              La relación entre un perro y un niño no se construye únicamente
              enseñándole cosas al perro. Se construye creando un entorno
              donde cada uno pueda comunicar sus necesidades, tener sus
              propios espacios y aprender a relacionarse de una manera segura.
            </p>
            <p>
              Mi objetivo es acompañarte para que puedas tomar mejores
              decisiones en vuestro día a día y ayudaros a construir una
              relación basada en la comprensión y el respeto.
            </p>
            <p>
              Si estás esperando un bebé, tienes niños en casa o hay alguna
              situación entre tu perro y tu familia que te preocupa, podemos
              valorar vuestro caso y ver cómo puedo ayudarte.
            </p>
          </ContentBlock>

          <div
            data-scroll-enter
            className="scroll-enter relative flex max-w-[420px] flex-col gap-1 text-foreground-secondary"
          >
            <img
              src={heroVerify}
              alt=""
              className="pointer-events-none absolute -left-8 -top-7 size-[172px] -rotate-15 opacity-20"
              width={172}
              height={172}
              decoding="async"
              aria-hidden
            />
            <span className="relative inline-flex size-8 items-center justify-center overflow-hidden rounded-lg border border-border-subtle-0 bg-canvas p-1">
              <img
                src={multiespecieIcon}
                alt="Logo de Crianza Multiespecie®"
                className="size-full object-contain"
                width={32}
                height={32}
                decoding="async"
              />
            </span>
            <div className="relative">
              <p className="text-[14px] leading-4">
                Profesional Miembro Autorizado de la Red de Expertos de
              </p>
              <p className="paragraph-md-bold">
                Crianza Multiespecie® by creciendo entre perros
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
