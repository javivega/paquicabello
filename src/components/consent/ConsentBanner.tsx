import { Link } from 'react-router-dom'

import { BrandButton } from '@/components/ui/button'
import { useConsent } from '@/context/ConsentContext'
import { COOKIES_POLICY_PATH, PRIVACY_POLICY_PATH } from '@/lib/routes'

export function ConsentBanner() {
  const {
    consent: { decided },
    acceptAll,
    denyAll,
    openPreferences,
  } = useConsent()

  if (decided) return null

  return (
    <section
      className="consent-banner-enter fixed inset-x-3 bottom-3 z-[200] mx-auto max-w-[880px] rounded-2xl border border-border-subtle-1 bg-canvas p-4 shadow-[0_10px_40px_rgb(0_0_0_/_0.12)] sm:inset-x-6 sm:bottom-6 sm:p-5"
      role="region"
      aria-label="Aviso de cookies"
    >
      <p className="paragraph-xs text-foreground-secondary">
        Usamos cookies necesarias para el funcionamiento del sitio y cookies de
        analisis para medir uso (GA4 y Clarity). Puedes aceptar, rechazar o
        configurar preferencias. Mas informacion en{' '}
        <Link className="underline" to={COOKIES_POLICY_PATH}>
          Politica de cookies
        </Link>{' '}
        y{' '}
        <Link className="underline" to={PRIVACY_POLICY_PATH}>
          Politica de privacidad
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
        <BrandButton brandSize="md" leftSlot={null} rightSlot={null} onClick={acceptAll}>
          Aceptar
        </BrandButton>
        <BrandButton
          brandVariant="secondary"
          brandSize="md"
          leftSlot={null}
          rightSlot={null}
          onClick={denyAll}
        >
          Solo necesarias
        </BrandButton>
        <button
          type="button"
          className="paragraph-xs-bold px-2 py-1 text-foreground-accent underline underline-offset-4"
          onClick={openPreferences}
        >
          Preferencias
        </button>
      </div>
    </section>
  )
}
