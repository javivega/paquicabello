import { useLayoutEffect, type RefObject } from 'react'

import gsap from 'gsap'

/** Site motion token — matches `--ease-out` in `src/styles/tokens.css`. */
const SCROLL_ENTER_EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const SELECTOR = '[data-scroll-enter]'

/** Viewport fraction — matches prior ScrollTrigger `start: 'top 88%'`. */
const ENTER_LINE = 0.88

/**
 * One-shot scroll entrances for `[data-scroll-enter]` descendants.
 * Use with class `scroll-enter` for CSS pre-hide (avoids FOUC).
 *
 * Peers that cross the enter line in the same tick are batched and
 * staggered (ScrollTrigger.batch feel). IntersectionObserver plus a
 * scroll/resize geometry fallback (also catches “already past” targets).
 */
export function useScrollEnter(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const root = scopeRef.current
    if (!root) return

    const elements = Array.from(root.querySelectorAll<HTMLElement>(SELECTOR))
    if (!elements.length) return

    const mm = gsap.matchMedia()

    const setup = (reduced: boolean) => {
      const pending: HTMLElement[] = []
      const revealed = new Set<HTMLElement>()
      let raf = 0
      let timer = 0
      let io: IntersectionObserver

      const flush = () => {
        if (raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
        if (timer) {
          window.clearTimeout(timer)
          timer = 0
        }
        if (!pending.length) return
        const batch = pending.splice(0, pending.length)

        if (reduced) {
          gsap.to(batch, {
            autoAlpha: 1,
            duration: 0.18,
            stagger: 0.06,
            ease: SCROLL_ENTER_EASE,
            overwrite: 'auto',
          })
          return
        }

        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: SCROLL_ENTER_EASE,
          overwrite: 'auto',
          force3D: true,
        })
      }

      const scheduleFlush = () => {
        if (!raf) {
          raf = requestAnimationFrame(flush)
        }
        if (!timer) {
          timer = window.setTimeout(flush, 48)
        }
      }

      const queue = (el: HTMLElement) => {
        if (revealed.has(el)) return
        revealed.add(el)
        io.unobserve(el)
        pending.push(el)
        scheduleFlush()
      }

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            queue(entry.target as HTMLElement)
          }
        },
        {
          root: null,
          rootMargin: '0px 0px -12% 0px',
          threshold: 0,
        },
      )

      const checkGeometry = () => {
        const line = window.innerHeight * ENTER_LINE
        for (const el of elements) {
          if (el.getBoundingClientRect().top < line) {
            queue(el)
          }
        }
      }

      elements.forEach((el) => io.observe(el))
      checkGeometry()
      window.addEventListener('scroll', checkGeometry, { passive: true })
      window.addEventListener('resize', checkGeometry)

      return () => {
        io.disconnect()
        window.removeEventListener('scroll', checkGeometry)
        window.removeEventListener('resize', checkGeometry)
        if (raf) cancelAnimationFrame(raf)
        if (timer) window.clearTimeout(timer)
      }
    }

    mm.add('(prefers-reduced-motion: reduce)', () => setup(true))
    mm.add('(prefers-reduced-motion: no-preference)', () => setup(false))

    return () => mm.revert()
  }, [scopeRef])
}
