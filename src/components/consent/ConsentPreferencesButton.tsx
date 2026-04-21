import { Cookie } from 'lucide-react'

import { useConsent } from '@/context/ConsentContext'

/** Floating cookie settings shortcut to reopen consent preferences. */
export function ConsentPreferencesButton() {
  const {
    consent: { decided },
    openPreferences,
  } = useConsent()

  if (!decided) return null

  return (
    <button
      type="button"
      onClick={openPreferences}
      aria-label="Cambiar preferencias de cookies"
      className="fixed bottom-4 left-4 z-[190] inline-flex h-12 w-12 items-center justify-center rounded-full border border-border-subtle-1 bg-canvas text-foreground-accent shadow-[0_8px_30px_rgb(0_0_0_/_0.14)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--Semantictokens-Color-Icon-Accent)]"
    >
      <Cookie className="h-5 w-5" aria-hidden />
    </button>
  )
}
