import { Link, useLocation } from 'react-router-dom'

import logoUrl from '@/img/logo.svg'
import { ABOUT_PATH, CONTACT_PATH } from '@/lib/routes'
import { cn } from '@/lib/utils'

export type NavbarItem = {
  id: string
  label: string
  to: string
}

const defaultItems: NavbarItem[] = [
  { id: 'servicios', label: 'Servicios', to: '/servicios' },
  { id: 'sobre-mi', label: 'Sobre mí', to: ABOUT_PATH },
  { id: 'contacta', label: 'Contacta', to: CONTACT_PATH },
]

type NavbarProps = {
  className?: string
  items?: NavbarItem[]
  /** Overrides route-based active link when set. */
  activeId?: string
}

function useNavActiveId(activeIdOverride?: string) {
  const { pathname, hash } = useLocation()
  if (activeIdOverride) return activeIdOverride
  if (pathname === '/servicios' || pathname.startsWith('/servicios/'))
    return 'servicios'
  if (pathname === ABOUT_PATH) return 'sobre-mi'
  if (pathname === '/' && hash === '#sobre-mi') return 'sobre-mi'
  return 'contacta'
}

export function Navbar({
  className,
  items = defaultItems,
  activeId: activeIdProp,
}: NavbarProps) {
  const activeId = useNavActiveId(activeIdProp)
  return (
    /* Fixed so the pill stays pinned for the full page scroll. `sticky` inside an
       `absolute` header does not get a tall enough scroll range across the document. */
    <header
      className={cn(
        'pointer-events-none fixed inset-x-0 top-0 z-[100]',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 sm:pt-10">
        <nav
          aria-label="Principal"
          className={cn(
            'pointer-events-auto mx-auto flex w-full max-w-xl items-center justify-between gap-6 rounded-full py-2 pr-2 pl-6 sm:gap-10',
            'bg-navbar-surface',
            'shadow-[0px_0px_10px_0px_var(--Primitive-color-orange-orange-200)]',
          )}
        >
          <Link
            to="/"
            className="min-w-0 shrink focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--Semantictokens-Color-Icon-Accent)]"
          >
            <img
              src={logoUrl}
              alt="Paqui cabello"
              width={165}
              height={32}
              className="h-8 w-[165px] object-contain object-left"
              decoding="async"
            />
          </Link>

          <ul className="flex min-w-0 list-none flex-wrap items-center gap-3 p-0">
            {items.map((item) => {
              const active = item.id === activeId
              return (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    className={cn(
                      'inline-flex items-center justify-center rounded-full px-4 py-2',
                      'paragraph-md text-center transition-[color,background-color,border-color,box-shadow]',
                      'border border-transparent',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--Semantictokens-Color-Icon-Accent)]',
                      active
                        ? 'bg-navbar-link-active-bg text-navbar-link-active-fg'
                        : [
                            'text-navbar-link',
                            'hover:border-navbar-link-hover-border',
                          ].join(' '),
                    )}
                    {...(active ? { 'aria-current': 'page' as const } : {})}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
