import type { ReactNode } from 'react'

type SiteShellProps = {
  children: ReactNode
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4 py-10 sm:px-6 sm:py-14">
      {children}
    </div>
  )
}
