import { useEffect, useId, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'

import logoUrl from '@/img/logo.svg'
import {
  ABOUT_PATH,
  CONTACT_PATH,
  PROGRAM_8_WEEKS_PATH,
  SESSION_EXPRESS_PATH,
} from '@/lib/routes'
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

const serviciosSubItems = [
  { id: 'session-express', label: 'Sesión exprés', to: SESSION_EXPRESS_PATH },
  {
    id: 'program-8-weeks',
    label: 'Programa de 8 semanas',
    to: PROGRAM_8_WEEKS_PATH,
  },
] as const

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

const CONTACT_NAV_ID = 'contacta'

function navLinkClassName(
  itemId: string,
  sectionActive: boolean,
  layout: 'row' | 'stack',
) {
  const isContact = itemId === CONTACT_NAV_ID
  const padding =
    layout === 'stack'
      ? 'inline-flex w-full items-center justify-center rounded-full px-4 py-3'
      : 'inline-flex items-center justify-center rounded-full px-4 py-2'

  const base = cn(
    'paragraph-md text-center transition-[color,background-color,border-color,box-shadow]',
    'border border-transparent',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--Semantictokens-Color-Icon-Accent)]',
    padding,
  )

  /* Contact stays the solid orange CTA on every route so it stays visually focal. */
  if (isContact) {
    return cn(
      base,
      'bg-navbar-link-active-bg text-navbar-link-active-fg',
      'hover:bg-[var(--Primitive-color-orange-orange-600)]',
    )
  }

  /* Current section (non-contact): soft highlight so it does not compete with Contact. */
  if (sectionActive) {
    return cn(
      base,
      'bg-[var(--Primitive-color-orange-orange-100)] text-[var(--Primitive-color-orange-orange-800)]',
    )
  }

  return cn(base, 'text-navbar-link', 'hover:border-navbar-link-hover-border')
}

export function Navbar({
  className,
  items = defaultItems,
  activeId: activeIdProp,
}: NavbarProps) {
  const activeId = useNavActiveId(activeIdProp)
  const { pathname, hash } = useLocation()
  const menuPanelId = useId()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname, hash])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

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
            'pointer-events-auto relative mx-auto flex w-full max-w-4xl items-center justify-between gap-3 rounded-full py-2 pr-2 pl-4 sm:gap-6 sm:pl-6 md:gap-8',
            'bg-navbar-surface',
            'shadow-[0px_0px_10px_0px_var(--Primitive-color-orange-orange-200)]',
          )}
        >
          <Link
            to="/"
            className="min-w-0 shrink focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--Semantictokens-Color-Icon-Accent)]"
            onClick={() => setMobileOpen(false)}
          >
            <img
              src={logoUrl}
              alt="Paqui cabello"
              width={165}
              height={32}
              className="h-7 w-[140px] object-contain object-left sm:h-8 sm:w-[165px]"
              decoding="async"
            />
          </Link>

          <ul className="hidden min-w-0 list-none items-center gap-2 p-0 md:flex md:flex-nowrap">
            {items.map((item) => {
              const sectionActive = item.id === activeId
              const isServicios = item.id === 'servicios'
              return (
                <li key={item.id} className={cn(isServicios && 'group relative')}>
                  <Link
                    to={item.to}
                    className={cn(
                      navLinkClassName(item.id, sectionActive, 'row'),
                      isServicios && 'gap-1.5',
                    )}
                    {...(sectionActive
                      ? { 'aria-current': 'page' as const }
                      : {})}
                  >
                    <span>{item.label}</span>
                    {isServicios ? (
                      <ChevronDown
                        className="size-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                        aria-hidden
                      />
                    ) : null}
                  </Link>

                  {isServicios ? (
                    <div
                      className={cn(
                        'absolute left-1/2 top-[calc(100%+0.5rem)] z-20 w-64 -translate-x-1/2',
                        'invisible opacity-0 transition-[opacity,visibility,transform] duration-200',
                        'translate-y-1 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100',
                        'group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100',
                      )}
                    >
                      <div className="rounded-2xl border border-border-subtle-0 bg-navbar-surface p-2 shadow-[0px_0px_10px_0px_var(--Primitive-color-orange-orange-200)]">
                        <ul className="m-0 list-none p-0">
                          {serviciosSubItems.map((subItem) => (
                            <li key={subItem.id}>
                              <Link
                                to={subItem.to}
                                className={cn(
                                  'paragraph-md flex w-full rounded-xl px-3 py-2.5 text-navbar-link transition-[background-color,color]',
                                  'hover:bg-[var(--Primitive-color-orange-orange-100)] hover:text-[var(--Primitive-color-orange-orange-800)]',
                                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--Semantictokens-Color-Icon-Accent)]',
                                )}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            className={cn(
              'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full md:hidden',
              'text-navbar-link transition-[color,background-color]',
              'hover:bg-navbar-link-active-bg/15',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--Semantictokens-Color-Icon-Accent)]',
            )}
            aria-expanded={mobileOpen}
            aria-controls={menuPanelId}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="size-6" aria-hidden />
            ) : (
              <Menu className="size-6" aria-hidden />
            )}
            <span className="sr-only">
              {mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            </span>
          </button>

          <div
            id={menuPanelId}
            role="region"
            aria-label="Navegación móvil"
            className={cn(
              'absolute top-[calc(100%+0.375rem)] left-0 right-0 z-10 md:hidden',
              'overflow-hidden rounded-3xl bg-navbar-surface p-2',
              'shadow-[0px_0px_10px_0px_var(--Primitive-color-orange-orange-200)]',
              mobileOpen ? 'block' : 'hidden',
            )}
          >
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
              {items.map((item) => {
                const sectionActive = item.id === activeId
                return (
                  <li key={item.id}>
                    <Link
                      to={item.to}
                      className={navLinkClassName(
                        item.id,
                        sectionActive,
                        'stack',
                      )}
                      {...(sectionActive
                        ? { 'aria-current': 'page' as const }
                        : {})}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}
