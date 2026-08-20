import {
  ABOUT_PATH,
  CONTACT_PATH,
  COOKIES_POLICY_PATH,
  CRIANZA_MULTIESPECIE_PATH,
  PRIVACY_POLICY_PATH,
  PROGRAM_4_WEEKS_PATH,
  SERVICES_PATH,
  SESSION_EXPRESS_PATH,
} from '@/lib/routes'

export type PageMeta = {
  title: string
  description: string
}

const SITE_NAME = 'Paqui Cabello'

export const DEFAULT_PAGE_META: PageMeta = {
  title: `${SITE_NAME} — Educación canina respetuosa`,
  description:
    'Mejora la convivencia con tu perro de forma respetuosa. Educación canina con Paqui Cabello.',
}

const PAGE_META_BY_PATH: Record<string, PageMeta> = {
  '/': DEFAULT_PAGE_META,
  [ABOUT_PATH]: {
    title: `Sobre mí — ${SITE_NAME}`,
    description:
      'Conoce a Paqui Cabello, educadora canina. Educación respetuosa, sin castigos, adaptada a cada familia y su perro.',
  },
  [CRIANZA_MULTIESPECIE_PATH]: {
    title: `Crianza Multiespecie® — ${SITE_NAME}`,
    description:
      'Una convivencia segura y respetuosa entre perros, bebés y niños. Acompañamiento con la Metodología Crianza Multiespecie®.',
  },
  [SERVICES_PATH]: {
    title: `Servicios — ${SITE_NAME}`,
    description:
      'Sesión exprés de 60 minutos y programa personalizado de 4 semanas para mejorar la convivencia con tu perro.',
  },
  [SESSION_EXPRESS_PATH]: {
    title: `Sesión exprés de 60 minutos — ${SITE_NAME}`,
    description:
      'Consulta una situación concreta con tu perro en una videollamada de 60 minutos con Paqui Cabello.',
  },
  [PROGRAM_4_WEEKS_PATH]: {
    title: `Programa de 4 semanas — ${SITE_NAME}`,
    description:
      'Acompañamiento personalizado durante 4 semanas para transformar la convivencia con tu perro de forma respetuosa.',
  },
  [CONTACT_PATH]: {
    title: `Contacto — ${SITE_NAME}`,
    description:
      'Contacta con Paqui Cabello por WhatsApp y cuenta tu situación con tu perro. Estaré encantada de orientarte.',
  },
  [PRIVACY_POLICY_PATH]: {
    title: `Política de privacidad — ${SITE_NAME}`,
    description:
      'Información sobre el tratamiento de datos personales en paquicabello.com.',
  },
  [COOKIES_POLICY_PATH]: {
    title: `Política de cookies — ${SITE_NAME}`,
    description:
      'Información sobre el uso de cookies en paquicabello.com y cómo gestionar tu consentimiento.',
  },
}

/** Resolve title and description for a pathname (basename stripped). */
export function getPageMeta(pathname: string): PageMeta {
  const normalized =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname
  return PAGE_META_BY_PATH[normalized] ?? DEFAULT_PAGE_META
}
