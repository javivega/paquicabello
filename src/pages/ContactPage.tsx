import { ContactMainSection } from '@/components/contact/ContactMainSection'
import { cn } from '@/lib/utils'

/** Contacto — Figma node 1042:6959. */
export function ContactPage() {
  return (
    <div
      className={cn(
        'relative flex min-h-full w-screen max-w-none flex-1 shrink-0 flex-col bg-canvas',
        'ml-[calc(50%-50vw)]',
      )}
    >
      <ContactMainSection />
    </div>
  )
}
