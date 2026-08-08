import { Paywall } from '@/components/paywall/Paywall'

export function HomePricingSection({ className }: { className?: string }) {
  return (
    <Paywall
      className={className}
      headingId="home-pricing-heading"
      sessionTitleId="home-pricing-session-title"
      programTitleId="home-pricing-program-title"
      title="Convierte tu hogar en un espacio tranquilo y armonioso para ti y tu perro"
      description="La convivencia con tu perro no tiene por qué ser complicada. Con la guía adecuada, podrás comprender sus señales, anticipar conflictos y crear un vínculo seguro y respetuoso. Estoy aquí para acompañarte en cada paso."
    />
  )
}
