import { HomeHelpFlipDeck } from '@/components/home/HomeHelpFlipDeck'
import { BrandAnchorButton, BrandLinkButton } from '@/components/ui/button'
import { SERVICES_PATH, whatsappContactHref } from '@/lib/routes'
import { sectionEnterStyle } from '@/lib/sectionEnterStyle'
import { cn } from '@/lib/utils'

const enterChip = sectionEnterStyle(40)
const enterHeading = sectionEnterStyle(110)
const enterBody = sectionEnterStyle(180)
const enterCtaPrimary = sectionEnterStyle(260)
const enterCtaSecondary = sectionEnterStyle(320)
const enterDeck = sectionEnterStyle(200)

export function HomeHelpSection({ className }: { className?: string }) {
  return (
    <section
      className={cn('w-full bg-canvas py-16 sm:py-20 lg:py-24', className)}
      aria-labelledby="home-help-heading"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8 xl:gap-8 xl:pl-20 xl:pr-8">
        <div className="relative z-10 flex w-full min-w-0 flex-1 flex-col gap-4 lg:max-w-[680px]">
          <p
            style={enterChip}
            className="section-enter inline-flex w-fit rounded-lg border border-border-subtle-1 bg-surface-subtle-1 px-2 py-1 text-[14px] leading-4 text-foreground-accent"
          >
            Cómo te puedo ayudar
          </p>
          <h2
            id="home-help-heading"
            style={enterHeading}
            className="section-enter text-balance text-[clamp(1.75rem,3vw+1rem,2.875rem)] font-semibold leading-tight sm:text-[46px] sm:leading-[56px]"
          >
            <span className="text-foreground">Te acompaño para que puedas: </span>
            <span className="text-foreground-brand">
              entenderle y convivir mejor.
            </span>
          </h2>
          <div
            style={enterBody}
            className="section-enter max-w-[784px] space-y-2 text-lg leading-6 text-foreground-secondary"
          >
            <p>
              Muchas de las conductas que hoy te preocupan no son desobediencia,
              sino la forma que tiene tu perro de comunicar una necesidad. Cuando
              aprendes a interpretar sus señales y a responder de una forma
              respetuosa, deja de haber una lucha constante y empieza una
              convivencia más tranquila y consciente.
            </p>
            <p>
              <span> Porque cuando entiendes lo que necesita, todo empieza a encajar.</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <BrandAnchorButton
              href={whatsappContactHref('general')}
              brandVariant="primary"
              brandSize="md"
              leftSlot={null}
              rightSlot={null}
              className="section-enter"
              style={enterCtaPrimary}
            >
              Contactar
            </BrandAnchorButton>
            <BrandLinkButton
              to={SERVICES_PATH}
              brandVariant="secondary"
              brandSize="md"
              leftSlot={null}
              rightSlot={null}
              className="section-enter"
              style={enterCtaSecondary}
            >
              Explorar servicios
            </BrandLinkButton>
          </div>
        </div>

        <div
          style={enterDeck}
          className="section-enter relative z-0 flex w-full shrink-0 justify-center overflow-visible px-2 py-6 sm:px-0 sm:py-8 lg:w-[min(100%,664px)] lg:py-0"
        >
          <HomeHelpFlipDeck />
        </div>
      </div>
    </section>
  )
}
