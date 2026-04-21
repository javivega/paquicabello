import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { FacebookIcon } from '@/components/icons/FacebookIcon'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import logoUrl from '@/img/logo.svg'
import { COOKIES_POLICY_PATH, PRIVACY_POLICY_PATH } from '@/lib/routes'
import { cn } from '@/lib/utils'

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

type FooterColumnProps = {
  title: string
  children: ReactNode
  className?: string
}

function FooterColumn({ title, children, className }: FooterColumnProps) {
  return (
    <div
      className={cn(
        'flex w-[180px] max-w-[240px] min-w-[180px] shrink-0 flex-col gap-2 text-on-strong',
        className,
      )}
    >
      <p className="headline-3xs w-full">{title}</p>
      <div className="flex w-full flex-col gap-0">{children}</div>
    </div>
  )
}

type FooterProps = {
  className?: string
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      id="contacta"
      className={cn('w-full scroll-mt-28 bg-btn-primary text-on-strong', className)}
      data-name="nav/footer"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-20">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col flex-wrap items-start gap-x-16 gap-y-10 lg:flex-row lg:gap-x-[116px]">
            <Link
              to="/"
              className="shrink-0 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
            >
              <img
                src={logoUrl}
                alt="Paqui cabello"
                width={92}
                height={92}
                className="size-[92px] object-contain brightness-0 invert"
                decoding="async"
              />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col flex-wrap items-start gap-x-10 gap-y-10 sm:flex-row sm:justify-end">
              <FooterColumn title="Educa en positivo">
                <a
                  href="#educa-en-positivo"
                  className="paragraph-md hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
                >
                  Educa en positivo
                </a>
              </FooterColumn>

              <FooterColumn title="Contacta">
                <a
                  href="tel:+34607340152"
                  className="paragraph-md hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
                >
                  607 340 152
                </a>
                <a
                  href="mailto:francisca.cabello2701@gmail.com"
                  className="paragraph-md hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
                >
                  francisca.cabello2701@gmail.com
                </a>
              </FooterColumn>

              <FooterColumn title="Legal">
                <Link
                  to={COOKIES_POLICY_PATH}
                  className="paragraph-md hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
                >
                  Política de cookies
                </Link>
                <Link
                  to={PRIVACY_POLICY_PATH}
                  className="paragraph-md hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
                >
                  Política de privacidad
                </Link>
              </FooterColumn>

              <div
                className="flex shrink-0 gap-10"
                aria-label="Redes sociales"
              >
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-on-strong hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
                  aria-label="Instagram"
                >
                  <IconInstagram className="size-6" />
                </a>
                <a
                  href="https://es-es.facebook.com/francisca.cabellojimenez"
                  target="_blank"
                  rel="noreferrer"
                  className="text-on-strong hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="size-6" />
                </a>
                <a
                  href="https://wa.me/34607340152"
                  target="_blank"
                  rel="noreferrer"
                  className="text-on-strong hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="size-6" />
                </a>
              </div>
            </div>
          </div>

          <p className="text-center text-[14px] font-normal leading-4 text-on-strong">
            Todos los derechos reservados Paqui Cabello | Designed with love by
            Javi Vega
          </p>
        </div>
      </div>
    </footer>
  )
}
