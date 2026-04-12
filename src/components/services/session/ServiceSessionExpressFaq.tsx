import { FaqStackedSection } from '@/components/faq/FaqAccordion'
import { cn } from '@/lib/utils'

export function ServiceSessionExpressFaq({ className }: { className?: string }) {
  return (
    <FaqStackedSection
      headingId="session-express-faq-heading"
      className={cn(className)}
    />
  )
}
