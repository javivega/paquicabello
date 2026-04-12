import { ServiceMarketingHero } from '@/components/services/shared/ServiceMarketingHero'
import { PROGRAM_8_WEEKS_PATH } from '@/lib/routes'

export function ServiceProgramHero({ className }: { className?: string }) {
  return (
    <ServiceMarketingHero
      className={className}
      headingId="program-8-weeks-heading"
      chip="Programa personalizado de 8 semanas"
      title="Transforma la convivencia en tu hogar con tu perro en tan solo 8 semanas"
      description="Un programa personalizado de 8 semanas para integrar a tu perro en la vida familiar, sin gritos, castigos ni miedo. Solo respeto, comprensión y acompañamiento real."
      moreInfoTo={`${PROGRAM_8_WEEKS_PATH}#como-es-programa`}
    />
  )
}
