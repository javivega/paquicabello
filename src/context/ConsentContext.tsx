import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'

import { ConsentBanner } from '@/components/consent/ConsentBanner'
import { ConsentModal } from '@/components/consent/ConsentModal'
import { ConsentPreferencesButton } from '@/components/consent/ConsentPreferencesButton'
import { ScriptLoader } from '@/components/consent/ScriptLoader'
import { getConsent, saveConsent, type ConsentState } from '@/lib/consent'

type ConsentContextValue = {
  consent: ConsentState
  isPreferencesOpen: boolean
  acceptAll: () => void
  denyAll: () => void
  savePreferences: (analytics: boolean) => void
  openPreferences: () => void
  closePreferences: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(() => getConsent())
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)

  const updateConsent = (next: ConsentState) => {
    setConsent(next)
    saveConsent(next)
  }

  const acceptAll = () => {
    updateConsent({ decided: true, analytics: true })
    setIsPreferencesOpen(false)
  }

  const denyAll = () => {
    updateConsent({ decided: true, analytics: false })
    setIsPreferencesOpen(false)
  }

  const savePreferencesAction = (analytics: boolean) => {
    updateConsent({ decided: true, analytics })
    setIsPreferencesOpen(false)
  }

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      isPreferencesOpen,
      acceptAll,
      denyAll,
      savePreferences: savePreferencesAction,
      openPreferences: () => setIsPreferencesOpen(true),
      closePreferences: () => setIsPreferencesOpen(false),
    }),
    [consent, isPreferencesOpen],
  )

  return (
    <ConsentContext.Provider value={value}>
      {children}
      <ConsentPreferencesButton />
      <ConsentBanner />
      <ConsentModal />
      <ScriptLoader />
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const context = useContext(ConsentContext)
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider')
  }
  return context
}
