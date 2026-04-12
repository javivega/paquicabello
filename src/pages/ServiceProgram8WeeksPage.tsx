import { HomeLogosBand } from '@/components/home/HomeLogosBand'
import { ServiceProgramHero } from '@/components/services/program/ServiceProgramHero'
import { ServiceProgramMainColumn } from '@/components/services/program/ServiceProgramMainColumn'
import { cn } from '@/lib/utils'

/** Programa 8 semanas — Figma node 1042:5779. */
export function ServiceProgram8WeeksPage() {
  return (
    <div
      className={cn(
        'relative flex w-screen max-w-none shrink-0 flex-col bg-canvas',
        'ml-[calc(50%-50vw)]',
      )}
    >
      <ServiceProgramHero />
      <HomeLogosBand />
      <ServiceProgramMainColumn />
    </div>
  )
}
