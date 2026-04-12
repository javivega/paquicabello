import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export function ServiceInfoCard({
  className,
  icon,
  title,
  children,
}: {
  className?: string
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <article
      className={cn(
        'flex min-h-[220px] flex-col gap-4 rounded-2xl border border-border-subtle-1 bg-surface-subtle-1 p-6 lg:min-h-[280px]',
        className,
      )}
    >
      <div className="inline-flex w-fit shrink-0 self-start rounded-xl border border-border-subtle-0 bg-surface-subtle-0 p-2">
        {icon}
      </div>
      <h3 className="text-xl font-semibold leading-6 text-foreground-brand">
        {title}
      </h3>
      <div className="text-base leading-5 text-foreground-secondary">{children}</div>
    </article>
  )
}
