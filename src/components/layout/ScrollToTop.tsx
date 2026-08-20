import { useEffect } from 'react'
import { useLenis } from 'lenis/react'
import type Lenis from 'lenis'
import { useLocation } from 'react-router-dom'

function scrollToHash(hash: string, lenis: Lenis | undefined) {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  if (!id) return false
  const el = document.getElementById(id)
  if (!el) return false
  if (lenis) {
    lenis.scrollTo(el, { offset: 0 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return true
}

/**
 * Resets window scroll on pathname changes, or scrolls to `location.hash`
 * when present (e.g. “Más información” → main-column anchors).
 * Prefers Lenis when the smooth-scroll provider is active.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (!hash) {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
      return
    }

    // Wait a frame (and briefly retry) so route content / lazy sections exist.
    let cancelled = false
    let attempts = 0
    let raf = 0
    let timer = 0

    const tryScroll = () => {
      if (cancelled) return
      if (scrollToHash(hash, lenis)) return
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
  }, [pathname, hash, lenis])

  return null
}
