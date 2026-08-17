import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/utils'

type FullBleedPageProps = {
  children: ReactNode
  className?: string
  /** Defaults to `main` (one document landmark per route). Override only if needed. */
  as?: ElementType
  id?: string
}

const fullBleedBase =
  'relative w-screen max-w-none shrink-0 bg-canvas ml-[calc(50%-50vw)]'

/** Escapes SiteShell’s max-width column so marketing pages span the viewport. */
export function FullBleedPage({
  children,
  className,
  as: Comp = 'main',
  id,
}: FullBleedPageProps) {
  return (
    <Comp id={id} className={cn(fullBleedBase, className)}>
      {children}
    </Comp>
  )
}
