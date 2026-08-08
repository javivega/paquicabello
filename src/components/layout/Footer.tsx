import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { FacebookIcon } from '@/components/icons/FacebookIcon'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import footerLogoMark from '@/img/footer-logo-mark.svg'
import footerLogoWordmark from '@/img/footer-logo-wordmark.svg'
import {
  COOKIES_POLICY_PATH,
  PRIVACY_POLICY_PATH,
  WHATSAPP_CONTACT_HREF,
} from '@/lib/routes'
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

const footerLinkClassName =
  'paragraph-md text-foreground-secondary hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-brand'

const socialLinkClassName =
  'text-icon-brand hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-brand'

type FooterColumnProps = {
  title: string
  children: ReactNode
  className?: string
}

function FooterColumn({ title, children, className }: FooterColumnProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 max-w-[280px] flex-col gap-2 text-foreground-secondary',
        className,
      )}
    >
      <p className="headline-3xs w-full">{title}</p>
      <div className="flex w-full min-w-0 flex-col gap-0">{children}</div>
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
      className={cn(
        'w-full scroll-mt-28 bg-surface-subtle-0 text-foreground-secondary',
        className,
      )}
      data-name="nav/footer"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-4 py-10 sm:px-8 lg:px-20">
        <div className="flex flex-col flex-wrap items-start gap-x-16 gap-y-10 lg:flex-row lg:gap-x-[116px]">
          <Link
            to="/"
            className="relative block size-[92px] shrink-0 overflow-hidden focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-brand"
            aria-label="Paqui cabello"
          >
            <span className="absolute inset-[14.13%_8.7%] overflow-hidden">
              <span className="absolute inset-x-1/4 top-0 bottom-[37.39%]">
                <img
                  src={footerLogoMark}
                  alt=""
                  width={38}
                  height={41}
                  className="absolute inset-0 size-full max-w-none object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="absolute inset-[75.12%_0_0.05%_0]">
                <img
                  src={footerLogoWordmark}
                  alt=""
                  width={76}
                  height={16}
                  className="absolute inset-0 size-full max-w-none object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </span>
          </Link>

          <div className="flex min-w-0 flex-1 flex-col flex-wrap items-start gap-x-10 gap-y-10 sm:flex-row sm:justify-end">
            <FooterColumn title="Contacta" className="max-w-[min(100%,320px)] sm:min-w-[220px]">
              <a href="tel:+34607340152" className={footerLinkClassName}>
                607 340 152
              </a>
              <a
                href="mailto:francisca.cabello2701@gmail.com"
                className={cn(footerLinkClassName, 'break-words')}
              >
                francisca.cabello2701@gmail.com
              </a>
            </FooterColumn>

            <FooterColumn title="Legal">
              <Link to={COOKIES_POLICY_PATH} className={footerLinkClassName}>
                Política de cookies
              </Link>
              <Link to={PRIVACY_POLICY_PATH} className={footerLinkClassName}>
                Política de privacidad
              </Link>
            </FooterColumn>

            <div className="flex shrink-0 gap-10" aria-label="Redes sociales">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={socialLinkClassName}
                aria-label="Instagram"
              >
                <IconInstagram className="size-6" />
              </a>
              <a
                href="https://es-es.facebook.com/francisca.cabellojimenez"
                target="_blank"
                rel="noreferrer"
                className={socialLinkClassName}
                aria-label="Facebook"
              >
                <FacebookIcon className="size-6" />
              </a>
              <a
                href={WHATSAPP_CONTACT_HREF}
                target="_blank"
                rel="noreferrer"
                className={socialLinkClassName}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="size-6" />
              </a>
            </div>
          </div>
        </div>

        <p className="paragraph-xs text-center text-foreground-secondary">
          Todos los derechos reservados Paqui Cabello | Designed with love by
          Javi Vega
        </p>
      </div>
    </footer>
  )
}
