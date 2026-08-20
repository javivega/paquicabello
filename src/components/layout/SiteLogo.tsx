import logoSvg from '@/img/logo.svg?raw'

import { cn } from '@/lib/utils'

type SiteLogoProps = {
  className?: string
  title?: string
}

/**
 * Inline wordmark (not an &lt;img&gt;) so it cannot become the LCP image
 * and fail LCP image-discovery audits meant for the hero photo.
 */
export function SiteLogo({
  className,
  title = 'Paqui cabello',
}: SiteLogoProps) {
  return (
    <span
      role="img"
      aria-label={title}
      className={cn(
        'inline-flex h-7 w-[140px] shrink-0 overflow-hidden sm:h-8 sm:w-[165px]',
        '[&>svg]:block [&>svg]:h-full [&>svg]:w-full',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: logoSvg }}
    />
  )
}
