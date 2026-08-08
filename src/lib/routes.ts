/** “Sobre mí” landing (Figma node 1042:6846). */
export const ABOUT_PATH = '/sobre-mi' as const

/** Página de contacto (Figma node 1042:6959). */
export const CONTACT_PATH = '/contacto' as const

/** Política de cookies (contenido alineado con la publicación en Webflow). */
export const COOKIES_POLICY_PATH = '/politica-de-cookies' as const

/** Política de privacidad (contenido alineado con la publicación en Webflow). */
export const PRIVACY_POLICY_PATH = '/politica-de-privacidad' as const

/** Listado de servicios. */
export const SERVICES_PATH = '/servicios' as const

/** WhatsApp (mismo número que en el pie). */
export const WHATSAPP_PHONE = '34607340152' as const

/** Pre-filled WhatsApp openers for Contactar CTAs. */
export type WhatsAppContactIntent = 'general' | 'program' | 'session'

const WHATSAPP_MESSAGES = {
  general:
    'Hola, Paqui. He visto tu web y me gustaría contarte mi situación con mi perro para saber cómo puedes ayudarnos. ¿Podemos hablar?',
  program:
    'Hola, Paqui. He visto el programa de acompañamiento de 4 semanas y creo que puede encajar con lo que estamos viviendo con mi perro. Me gustaría contarte nuestra situación y saber cómo funciona. ¿Podemos hablar?',
  session:
    'Hola, Paqui. He visto la sesión de 60 minutos y me gustaría consultarte una situación concreta con mi perro. ¿Podemos hablar para ver si esta sesión puede ayudarnos?',
} as const satisfies Record<WhatsAppContactIntent, string>

/** Build a `wa.me` URL with an optional pre-filled message. */
export function whatsappContactHref(
  intent: WhatsAppContactIntent = 'general',
): string {
  const text = encodeURIComponent(WHATSAPP_MESSAGES[intent])
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`
}

/** Default WhatsApp link (mensaje general). */
export const WHATSAPP_CONTACT_HREF = whatsappContactHref('general')

/** Detail page for the basic “Sesión exprés” tier (paywall “Más información”). */
export const SESSION_EXPRESS_PATH = '/servicios/sesion-expres' as const

/** Detail page for the premium “Programa personalizado de 4 semanas” tier. */
export const PROGRAM_4_WEEKS_PATH = '/servicios/programa-4-semanas' as const
