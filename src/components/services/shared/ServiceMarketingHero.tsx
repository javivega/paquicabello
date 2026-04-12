import heroImage from '@/img/hero.png'
import patternImage from '@/img/pattern.png'
import { BrandButton, BrandLinkButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const heroMeshBackground = [
  'radial-gradient(ellipse 343px 198px at 0% 0%, rgb(252 252 252) 0%, rgb(255 244 240) 100%)',
  'linear-gradient(90deg, rgb(255 244 240) 0%, rgb(255 244 240) 100%)',
].join(', ')

const collageFrames = [
  { className: 'left-0 top-[18%] -rotate-[5.76deg]', objectPosition: '18% 42%' },
  {
    className: 'left-[calc(50%-280px)] top-[12%] rotate-[10.86deg]',
    objectPosition: '55% 38%',
  },
  {
    className: 'left-[calc(50%+80px)] top-[14%] -rotate-[8.6deg]',
    objectPosition: '72% 36%',
  },
  { className: 'right-0 top-[18%] -rotate-[5.76deg]', objectPosition: '88% 44%' },
] as const

type ServiceMarketingHeroProps = {
  className?: string
  headingId: string
  chip: string
  title: string
  description: string
  moreInfoTo: string
}

/** Hero compartido (malla + collage) para páginas de detalle de servicio — Figma. */
export function ServiceMarketingHero({
  className,
  headingId,
  chip,
  title,
  description,
  moreInfoTo,
}: ServiceMarketingHeroProps) {
  return (
    <section
      className={cn(
        'relative w-full overflow-hidden',
        'min-h-[min(100vh,800px)] lg:min-h-[800px]',
        className,
      )}
      aria-labelledby={headingId}
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
          'relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center',
          'px-4 pb-4 pt-24 sm:px-8 sm:pb-6 sm:pt-28 lg:px-20 lg:pb-8 lg:pt-[124px]',
        )}
      >
        <div className="flex w-full max-w-[880px] flex-col items-center gap-4 text-center">
          <p className="inline-flex rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent">
            {chip}
          </p>
          <h1
            id={headingId}
            className="text-balance text-[clamp(2rem,4vw+1rem,52px)] font-semibold leading-[1.08] text-foreground-brand sm:leading-[56px]"
          >
            {title}
          </h1>
          <p className="max-w-[784px] text-lg leading-6 text-foreground-secondary sm:leading-6">
            {description}
          </p>
          <div className="mt-2 flex w-full flex-wrap items-center justify-center gap-2 px-6 sm:gap-2">
            <BrandButton
              brandVariant="primary"
              brandSize="md"
              type="button"
              leftSlot={null}
              rightSlot={null}
            >
              Contactar
            </BrandButton>
            <BrandLinkButton
              to={moreInfoTo}
              brandVariant="secondary"
              brandSize="md"
              leftSlot={null}
              rightSlot={null}
            >
              Más información
            </BrandLinkButton>
          </div>
        </div>

        <div className="relative z-10 mt-10 w-full max-w-[640px] lg:hidden">
          <img
            src={heroImage}
            alt=""
            className="mx-auto aspect-[4/3] w-full max-w-sm rounded-[24px] border border-border-subtle-0 object-cover shadow-[0px_0px_10px_0px_var(--Primitive-color-orange-orange-200)]"
            decoding="async"
          />
        </div>
        <div
          className="relative z-10 mt-10 hidden h-[320px] w-full max-w-[1054px] lg:mt-12 lg:block"
          aria-hidden
        >
          {collageFrames.map((slot, i) => (
            <div
              key={i}
              className={cn(
                'absolute size-[200px] overflow-hidden rounded-[24px] border border-border-subtle-0 shadow-[0px_0px_10px_0px_var(--Primitive-color-orange-orange-200)]',
                slot.className,
              )}
            >
              <div
                className="absolute inset-0 bg-surface-subtle-0"
                aria-hidden
              />
              <img
                src={heroImage}
                alt=""
                className="relative z-[1] h-full w-full object-cover"
                style={{ objectPosition: slot.objectPosition }}
                decoding="async"
              />
            </div>
          ))}
          <SparkleDecor className="absolute left-[2%] top-[6%] text-foreground-brand/35" />
          <SparkleDecor className="absolute right-[3%] bottom-[8%] rotate-12 scale-75 text-foreground-brand/35" />
        </div>
      </div>
    </section>
  )
}

function SparkleDecor({ className }: { className?: string }) {
  return (
    <svg
      className={cn('size-10', className)}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M20 4l1.8 6.2L28 12l-6.2 1.8L20 20l-1.8-6.2L12 12l6.2-1.8L20 4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
