import { BrandLinkButton } from '@/components/ui/button'
import { FaqAccordion, FaqSectionIntro } from '@/components/faq/FaqAccordion'
import { CONTACT_PATH } from '@/lib/routes'
import { cn } from '@/lib/utils'

export function HomeFaqSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        'w-full bg-canvas py-16 sm:py-20 lg:py-24',
        className,
      )}
      aria-labelledby="home-faq-heading"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
        <FaqSectionIntro
          animated
          headingId="home-faq-heading"
          className="lg:sticky lg:top-24 lg:shrink-0 lg:pl-8 xl:pl-20"
          footer={
            <BrandLinkButton
              to={CONTACT_PATH}
              brandVariant="secondary"
              brandSize="md"
              className="w-fit"
              leftSlot={null}
              rightSlot={null}
            >
              Tengo más dudas
            </BrandLinkButton>
          }
        />
        <FaqAccordion animated className="min-w-0 flex-1 lg:pr-6" />
      </div>
    </section>
  )
}
