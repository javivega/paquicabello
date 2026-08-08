import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  if (!id) return false
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return true
}

/**
 * Resets window scroll on pathname changes, or scrolls to `location.hash`
 * when present (e.g. “Más información” → main-column anchors).
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    // Wait a frame (and briefly retry) so route content / lazy sections exist.
    let cancelled = false
    let attempts = 0
    let raf = 0
    let timer = 0

    const tryScroll = () => {
      if (cancelled) return
      if (scrollToHash(hash)) return
      attempts += 1
      if (attempts < 12) {
        timer = window.setTimeout(() => {
          raf = requestAnimationFrame(tryScroll)
        }, 50)
      }
    }

    raf = requestAnimationFrame(tryScroll)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.clearTimeout(timer)
    }
  }, [pathname, hash])

  return null
}
