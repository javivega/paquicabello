import { Dialog } from '@base-ui/react/dialog'
import { useEffect, useState } from 'react'

import { BrandButton } from '@/components/ui/button'
import { useConsent } from '@/context/ConsentContext'

function ToggleRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border-subtle-1 bg-surface-subtle-0 px-4 py-3">
      <div className="min-w-0">
        <p className="paragraph-md-bold text-foreground">{label}</p>
        <p className="paragraph-xs mt-1 text-foreground-secondary">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-border-subtle-1 bg-surface-subtle-1 p-0.5 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span
          className="h-5 w-5 rounded-full bg-white shadow transition-transform"
          style={{
            transform: checked ? 'translateX(20px)' : 'translateX(0px)',
            background: checked
              ? 'var(--Primitive-color-orange-orange-500)'
              : 'var(--Primitive-color-gray-gray-200)',
          }}
        />
      </button>
    </div>
  )
}

export function ConsentModal() {
  const {
    consent,
    isPreferencesOpen,
    closePreferences,
    savePreferences,
    acceptAll,
  } = useConsent()
  const [analyticsEnabled, setAnalyticsEnabled] = useState(consent.analytics)

  useEffect(() => {
    if (isPreferencesOpen) setAnalyticsEnabled(consent.analytics)
  }, [consent.analytics, isPreferencesOpen])

  return (
    <Dialog.Root
      open={isPreferencesOpen}
      onOpenChange={(open) => {
        if (!open) closePreferences()
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="consent-modal-backdrop fixed inset-0 z-[205] bg-black/40" />
        <Dialog.Popup className="consent-modal-enter fixed inset-0 z-[210] m-auto h-fit w-[min(92vw,640px)] rounded-2xl border border-border-subtle-1 bg-canvas p-5 shadow-[0_20px_60px_rgb(0_0_0_/_0.2)] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="headline-2xs text-foreground">
                Preferencias de cookies
              </Dialog.Title>
              <Dialog.Description className="paragraph-xs mt-2 text-foreground-secondary">
                Puedes decidir que categorias permites. Las cookies necesarias
                siempre estan activadas.
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="paragraph-xs-bold rounded-md px-2 py-1 text-foreground-secondary hover:bg-surface-subtle-1"
              aria-label="Cerrar preferencias de cookies"
            >
              Cerrar
            </Dialog.Close>
          </div>

          <div className="mt-5 space-y-3">
            <ToggleRow
              label="Cookies necesarias"
              description="Requeridas para seguridad y funcionamiento del sitio."
              checked
              disabled
            />
            <ToggleRow
              label="Cookies de analisis"
              description="Permiten medir uso con Google Analytics 4 y Microsoft Clarity."
              checked={analyticsEnabled}
              onChange={setAnalyticsEnabled}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
            <BrandButton
              leftSlot={null}
              rightSlot={null}
              onClick={() => savePreferences(analyticsEnabled)}
            >
              Guardar preferencias
            </BrandButton>
            <BrandButton
              brandVariant="secondary"
              leftSlot={null}
              rightSlot={null}
              onClick={acceptAll}
            >
              Aceptar todas
            </BrandButton>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
