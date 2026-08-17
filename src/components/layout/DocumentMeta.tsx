import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { getPageMeta } from '@/lib/pageMeta'

function setMetaContent(selector: string, content: string) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute('content', content)
}

/** Keeps document title and meta description in sync with the current route. */
export function DocumentMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const { title, description } = getPageMeta(pathname)
    document.title = title
    setMetaContent('meta[name="description"]', description)
    setMetaContent('meta[property="og:title"]', title)
    setMetaContent('meta[property="og:description"]', description)
    setMetaContent(
      'meta[property="og:url"]',
      `https://paquicabello.com${pathname === '/' ? '/' : pathname}`,
    )
    setMetaContent('meta[name="twitter:title"]', title)
    setMetaContent('meta[name="twitter:description"]', description)
  }, [pathname])

  return null
}
