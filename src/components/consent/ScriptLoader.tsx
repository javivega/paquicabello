import { useEffect } from 'react'

import { useConsent } from '@/context/ConsentContext'
import { loadClarity, loadGA4 } from '@/lib/consent'

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined
const CLARITY_ID = import.meta.env.VITE_CLARITY_ID as string | undefined

/** Loads analytics tags only after explicit analytics consent. */
export function ScriptLoader() {
  const {
    consent: { analytics },
  } = useConsent()

  useEffect(() => {
    if (!analytics) return
    if (GA4_ID) loadGA4(GA4_ID)
    if (CLARITY_ID) loadClarity(CLARITY_ID)
  }, [analytics])

  return null
}
