export const CONSENT_STORAGE_KEY = 'paqui_consent_v1'

export type ConsentState = {
  decided: boolean
  analytics: boolean
}

const DEFAULT_CONSENT: ConsentState = {
  decided: false,
  analytics: false,
}

let ga4Loaded = false
let clarityLoaded = false

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

export function getConsent(): ConsentState {
  if (typeof window === 'undefined') return DEFAULT_CONSENT
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return DEFAULT_CONSENT
    const parsed = JSON.parse(raw) as Partial<ConsentState>
    return {
      decided: Boolean(parsed.decided),
      analytics: Boolean(parsed.analytics),
    }
  } catch {
    return DEFAULT_CONSENT
  }
}

export function saveConsent(consent: ConsentState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))
}

export function loadGA4(measurementId: string) {
  if (!measurementId || ga4Loaded || typeof document === 'undefined') return
  ga4Loaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args)
  }

  window.gtag('js', new Date())
  window.gtag('config', measurementId)
}

export function loadClarity(projectId: string) {
  if (!projectId || clarityLoaded || typeof document === 'undefined') return
  clarityLoaded = true

  ;(function (c: Window, d: Document, i: string) {
    c.clarity =
      c.clarity ||
      function (...args: unknown[]) {
        ;(c.clarity as unknown as { q?: unknown[] }).q =
          (c.clarity as unknown as { q?: unknown[] }).q || []
        ;(c.clarity as unknown as { q: unknown[] }).q.push(args)
      }
    const y = d.createElement('script')
    const firstScript = d.getElementsByTagName('script')[0]
    y.async = true
    y.src = `https://www.clarity.ms/tag/${i}`
    firstScript?.parentNode?.insertBefore(y, firstScript)
  })(window, document, projectId)
}
