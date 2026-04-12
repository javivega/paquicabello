import { ServicesOffersSection } from '@/components/services/ServicesOffersSection'
import { cn } from '@/lib/utils'

/** Servicios — Figma frame 1042:5303 */
export function ServicesPage() {
  return (
    <div
      className={cn(
        'relative flex w-screen max-w-none shrink-0 flex-col bg-canvas',
        'ml-[calc(50%-50vw)]',
      )}
    >
      <ServicesOffersSection />
    </div>
  )
}
