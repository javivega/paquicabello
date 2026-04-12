import { FaqStackedSection } from '@/components/faq/FaqAccordion'
import { cn } from '@/lib/utils'

export function ServiceProgramFaq({ className }: { className?: string }) {
  return (
    <FaqStackedSection headingId="program-8-faq-heading" className={cn(className)} />
  )
}
