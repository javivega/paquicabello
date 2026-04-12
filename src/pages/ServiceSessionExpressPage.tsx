import { HomeLogosBand } from '@/components/home/HomeLogosBand'
import { ServiceSessionExpressHero } from '@/components/services/session/ServiceSessionExpressHero'
import { ServiceSessionExpressMainColumn } from '@/components/services/session/ServiceSessionExpressMainColumn'
import { cn } from '@/lib/utils'

/** Sesión exprés — Figma node 1042:5639 (MCP `get_design_context`). */
export function ServiceSessionExpressPage() {
  return (
    <div
      className={cn(
        'relative flex w-screen max-w-none shrink-0 flex-col bg-canvas',
        'ml-[calc(50%-50vw)]',
      )}
    >
      <ServiceSessionExpressHero />
      <HomeLogosBand />
      <ServiceSessionExpressMainColumn />
    </div>
  )
}
