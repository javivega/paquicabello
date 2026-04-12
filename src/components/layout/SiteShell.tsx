import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type SiteShellProps = {
  children: ReactNode
  /** Renders above the constrained column (e.g. sticky navbar — kept outside overflow so `position: sticky` works). */
  header?: ReactNode
  /** Renders below main content (e.g. full-width footer). */
  footer?: ReactNode
}

export function SiteShell({ children, footer, header }: SiteShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      {header}
      <div
        className={cn(
          'mx-auto flex w-full max-w-6xl flex-1 flex-col bg-canvas',
          /* First paint: main fills the viewport so the footer sits below the fold. */
          'min-h-[100dvh]',
          'px-4 pt-0 sm:px-6 sm:pt-0',
        )}
      >
        {children}
      </div>
      {footer}
    </div>
  )
}
