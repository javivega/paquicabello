import { ServiceMarketingHero } from '@/components/services/shared/ServiceMarketingHero'
import { SESSION_EXPRESS_PATH } from '@/lib/routes'

export function ServiceSessionExpressHero({
  className,
}: {
  className?: string
}) {
  return (
    <ServiceMarketingHero
      className={className}
      headingId="session-express-heading"
      chip="Sesión exprés de 90 minutos"
      title="Resuelve tus dudas sobre la conducta de tu perro en 90 minutos"
      description="No te enfrentes a solas a las inquietudes o la frustración del día a día con tu perro. Resuelve tus dudas en una sesión de 90 minutos diseñada para analizar vuestro contexto y darte claridad, en exclusiva para ti."
      moreInfoTo={`${SESSION_EXPRESS_PATH}#como-es-sesion`}
    />
  )
}
