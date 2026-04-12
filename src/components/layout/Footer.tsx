import type { ReactNode } from 'react'

import logoUrl from '@/img/logo.svg'
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

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-4h2v-1.5C10 8.57 11.57 7 13.5 7H16v4h-2c-.55 0-1 .45-1 1V15h3l-.5 4H15v5.8c4.56-.93 8-4.96 8-9.8z" />
    </svg>
  )
}

function IconWhatsApp({ className }: { className?: string }) {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path d="M9.5 9.5c.2 1.4 1.2 2.5 2.6 2.8" />
      <path d="M9.5 13.5c.3.5.8 1 1.4 1.2" />
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
            <a
              href="/"
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
            </a>

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
                  href="mailto:paqui@gmail.com"
                  className="paragraph-md hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
                >
                  paqui@gmail.com
                </a>
              </FooterColumn>

              <FooterColumn title="Legal">
                <a
                  href="#politica-cookies"
                  className="paragraph-md hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
                >
                  Política de cookies
                </a>
                <a
                  href="#politica-privacidad"
                  className="paragraph-md hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
                >
                  Política de privacidad
                </a>
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
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-on-strong hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
                  aria-label="Facebook"
                >
                  <IconFacebook className="size-6" />
                </a>
                <a
                  href="https://wa.me/34607340152"
                  target="_blank"
                  rel="noreferrer"
                  className="text-on-strong hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-strong"
                  aria-label="WhatsApp"
                >
                  <IconWhatsApp className="size-6" />
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
