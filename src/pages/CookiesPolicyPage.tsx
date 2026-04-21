import { Link } from 'react-router-dom'

import { CONTACT_PATH } from '@/lib/routes'
import { cn } from '@/lib/utils'

/**
 * Política de cookies — referencia de contenido:
 * [Política de cookies (Webflow)](https://paquicabello.webflow.io/politica-de-cookies)
 */
export function CookiesPolicyPage() {
  return (
    <main
      id="politica-de-cookies"
      className={cn(
        'relative w-screen max-w-none flex-1 shrink-0 scroll-mt-28 bg-canvas',
        'ml-[calc(50%-50vw)]',
      )}
    >
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <article className="flex flex-col gap-10 text-foreground-secondary">
          <header className="flex flex-col gap-4">
            <h1 className="headline-sm text-foreground-brand">
              Política de cookies
            </h1>
            <p className="paragraph-md text-foreground-secondary">
              Información sobre el uso de cookies y tecnologías similares en este
              sitio web, en línea con la normativa aplicable en España (entre
              otras, la Ley de Servicios de la Sociedad de la Información y el
              Reglamento General de Protección de Datos).
            </p>
          </header>

          <section className="flex flex-col gap-4" aria-labelledby="cookies-info-general">
            <h2 id="cookies-info-general" className="headline-2xs text-foreground">
              Información general
            </h2>
            <p className="paragraph-md">
              Debido a la entrada en vigor de la referente modificación de la «Ley
              de Servicios de la Sociedad de la Información» (LSSICE),
              establecida por el Real Decreto 13/2012, es obligación obtener el
              consentimiento expreso del usuario de todas las páginas web que
              usan{' '}
              <strong className="font-semibold text-foreground">
                cookies prescindibles
              </strong>
              , antes de que este navegue por ellas.
            </p>
          </section>

          <section className="flex flex-col gap-4" aria-labelledby="cookies-que-son">
            <h2 id="cookies-que-son" className="headline-2xs text-foreground">
              ¿Qué son las cookies?
            </h2>
            <p className="paragraph-md">
              Las cookies y otras tecnologías similares, tales como{' '}
              <em>local shared objects</em>, <em>flash cookies</em> o{' '}
              <em>píxeles</em>, son herramientas empleadas por los servidores web
              para almacenar y recuperar información acerca de sus visitantes,
              así como para ofrecer un correcto funcionamiento del sitio. Mediante
              el uso de estos dispositivos se permite al servidor web recordar
              algunos datos concernientes al usuario, como sus preferencias para
              la visualización de las páginas de ese servidor, nombre y
              contraseña, productos que más le interesan, etc.
            </p>
          </section>

          <section className="flex flex-col gap-6" aria-labelledby="cookies-tipos">
            <h2 id="cookies-tipos" className="headline-2xs text-foreground">
              ¿Qué tipos de cookies existen?
            </h2>

            <div className="flex flex-col gap-4">
              <h3 className="paragraph-md-bold text-foreground">
                Según su titularidad
              </h3>
              <ul className="list-disc space-y-3 pl-6 paragraph-md">
                <li>
                  <strong className="text-foreground">Cookies propias:</strong>{' '}
                  son aquellas que se envían al equipo terminal del usuario desde
                  un equipo o dominio gestionado por el propio editor y desde el
                  que se presta el servicio solicitado por el usuario.
                </li>
                <li>
                  <strong className="text-foreground">Cookies de terceros:</strong>{' '}
                  son aquellas que se envían al equipo terminal del usuario desde
                  un equipo o dominio que no es gestionado por el editor, sino por
                  otra entidad que trata los datos obtenidos a través de las
                  cookies.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="paragraph-md-bold text-foreground">
                Según su duración
              </h3>
              <ul className="list-disc space-y-3 pl-6 paragraph-md">
                <li>
                  <strong className="text-foreground">Cookies de sesión:</strong>{' '}
                  son un tipo de cookies diseñadas para recabar y almacenar datos
                  mientras el usuario accede a una página web.
                </li>
                <li>
                  <strong className="text-foreground">Cookies persistentes:</strong>{' '}
                  son un tipo de cookies en el que los datos siguen almacenados en
                  el terminal y pueden ser accedidos y tratados durante un
                  periodo definido por el responsable de la cookie, que puede ir
                  de unos minutos a varios años.
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="paragraph-md-bold text-foreground">
                Según su funcionalidad
              </h3>
              <ul className="list-disc space-y-3 pl-6 paragraph-md">
                <li>
                  <strong className="text-foreground">Cookies necesarias:</strong>{' '}
                  son aquellas imprescindibles para el correcto funcionamiento del
                  sitio web. No recopilan ningún tipo de datos de usuario y
                  recogen información como la preferencia de idioma, si se ha
                  aceptado la política de cookies, etc.
                </li>
                <li>
                  <strong className="text-foreground">Cookies de análisis:</strong>{' '}
                  son aquellas que, bien tratadas por nosotros o por terceros, nos
                  permiten cuantificar el número de usuarios y así realizar la
                  medición y análisis estadístico de la utilización que hacen los
                  usuarios del servicio ofertado. Para ello se analiza su
                  navegación en nuestra página web con el fin de mejorar la oferta
                  de productos o servicios que le ofrecemos.
                </li>
                <li>
                  <strong className="text-foreground">
                    Cookies publicitarias o de marketing:
                  </strong>{' '}
                  son aquellas que permiten la gestión, de la forma más eficaz
                  posible, de los espacios publicitarios que, en su caso, el
                  editor haya incluido en una página web, aplicación o plataforma
                  desde la que presta el servicio solicitado en base a criterios
                  como el contenido editado o la frecuencia en la que se muestran
                  los anuncios.
                </li>
                <li>
                  <strong className="text-foreground">
                    Cookies de publicidad comportamental o de marketing
                    personalizado:
                  </strong>{' '}
                  son aquellas que permiten la gestión, de la forma más eficaz
                  posible, de los espacios publicitarios que, en su caso, el
                  editor haya incluido en una página web, aplicación o plataforma
                  desde la que presta el servicio solicitado. Estas cookies
                  almacenan información del comportamiento de los usuarios
                  obtenida a través de la observación continuada de sus hábitos de
                  navegación, lo que permite desarrollar un perfil específico
                  para mostrar publicidad en función del mismo. Asimismo es
                  posible que al visitar alguna página web o al abrir algún
                  correo donde se publique algún anuncio o alguna promoción sobre
                  nuestros productos o servicios se instale en tu navegador alguna
                  cookie que nos sirve para mostrarte posteriormente publicidad
                  relacionada con la búsqueda que hayas realizado, desarrollar un
                  control de nuestros anuncios en relación, por ejemplo, con el
                  número de veces que son vistos, dónde aparecen, a qué hora se
                  ven, etc.
                </li>
              </ul>
            </div>
          </section>

          <section className="flex flex-col gap-4" aria-labelledby="cookies-declaracion">
            <h2 id="cookies-declaracion" className="headline-2xs text-foreground">
              Declaración de cookies
            </h2>
            <p className="paragraph-md">
              En versiones del sitio alojadas en determinadas plataformas pueden
              utilizarse cookies de terceros con fines de análisis (por ejemplo,
              para medir sesiones y uso de la web). A título orientativo, y según
              la configuración publicada en la{' '}
              <a
                href="https://paquicabello.webflow.io/politica-de-cookies"
                className="font-semibold text-foreground-accent underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                política de cookies anterior en Webflow
              </a>
              , se describían cookies asociadas a herramientas de análisis de uso
              similares a las siguientes:
            </p>

            <div className="-mx-4 overflow-x-auto sm:mx-0">
              <table
                className={cn(
                  'w-full min-w-[640px] border-collapse text-left text-[14px] leading-snug',
                  'border border-border-subtle-0',
                )}
              >
                <caption className="sr-only">
                  Tabla de cookies de ejemplo según política de referencia
                </caption>
                <thead>
                  <tr className="bg-surface-subtle-0">
                    <th scope="col" className="border border-border-subtle-0 px-3 py-2 font-semibold text-foreground">
                      Cookie
                    </th>
                    <th scope="col" className="border border-border-subtle-0 px-3 py-2 font-semibold text-foreground">
                      Propietario
                    </th>
                    <th scope="col" className="border border-border-subtle-0 px-3 py-2 font-semibold text-foreground">
                      Duración
                    </th>
                    <th scope="col" className="border border-border-subtle-0 px-3 py-2 font-semibold text-foreground">
                      Finalidad
                    </th>
                    <th scope="col" className="border border-border-subtle-0 px-3 py-2 font-semibold text-foreground">
                      Tipo
                    </th>
                  </tr>
                </thead>
                <tbody className="text-foreground-secondary">
                  {[
                    {
                      name: '_hjFirstSeen',
                      owner: 'Hotjar / alojamiento',
                      duration: '30 min',
                      purpose:
                        'Permite al proveedor de análisis rastrear el inicio del recorrido del usuario para obtener un recuento total de sesiones. No contiene información identificable.',
                      type: 'De terceros',
                    },
                    {
                      name: '_hjAbsoluteSessionInProgress',
                      owner: 'Hotjar / alojamiento',
                      duration: '30 min',
                      purpose:
                        'Permite al proveedor de análisis rastrear el inicio del recorrido del usuario para obtener un recuento total de sesiones. No contiene información identificable.',
                      type: 'De terceros',
                    },
                    {
                      name: '_hjSession_*',
                      owner: 'Hotjar / alojamiento',
                      duration: '30 min',
                      purpose:
                        'Permite al proveedor de análisis rastrear el inicio del recorrido del usuario para obtener un recuento total de sesiones. No contiene información identificable.',
                      type: 'De terceros',
                    },
                    {
                      name: '_hjIncludedInSessionSample_*',
                      owner: 'Hotjar / alojamiento',
                      duration: '30 min',
                      purpose:
                        'Permite al proveedor de análisis rastrear el inicio del recorrido del usuario para obtener un recuento total de sesiones. No contiene información identificable.',
                      type: 'De terceros',
                    },
                    {
                      name: '_hjSessionUser_*',
                      owner: 'Hotjar / alojamiento',
                      duration: '1 año',
                      purpose:
                        'Permite al proveedor de análisis rastrear el inicio del recorrido del usuario para obtener un recuento total de sesiones. No contiene información identificable.',
                      type: 'De terceros',
                    },
                  ].map((row) => (
                    <tr key={row.name}>
                      <td className="border border-border-subtle-0 px-3 py-2 font-mono text-[13px] text-foreground">
                        {row.name}
                      </td>
                      <td className="border border-border-subtle-0 px-3 py-2">
                        {row.owner}
                      </td>
                      <td className="border border-border-subtle-0 px-3 py-2 whitespace-nowrap">
                        {row.duration}
                      </td>
                      <td className="border border-border-subtle-0 px-3 py-2">
                        {row.purpose}
                      </td>
                      <td className="border border-border-subtle-0 px-3 py-2 whitespace-nowrap">
                        {row.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="paragraph-md">
              La lista exacta de cookies activas puede variar según la versión
              desplegada del sitio, el proveedor de alojamiento y las herramientas
              integradas en cada momento. Si incorporamos nuevos servicios que
              utilicen cookies, actualizaremos esta política para mantenerla
              transparente y al día.
            </p>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-border-subtle-0 bg-surface-subtle-0 p-6">
            <h2 className="headline-2xs text-foreground">
              Gestión del consentimiento
            </h2>
            <p className="paragraph-md">
              Al utilizar este sitio puede mostrarse un aviso de cookies cuando
              proceda. Puede aceptar, rechazar o configurar las categorías no
              esenciales según las opciones ofrecidas. También puede eliminar o
              bloquear las cookies desde la configuración de su navegador; tenga
              en cuenta que algunas funciones del sitio podrían verse afectadas.
            </p>
            <p className="paragraph-md">
              Para cualquier duda sobre esta política o el tratamiento de sus
              datos, puede{' '}
              <Link
                to={CONTACT_PATH}
                className="font-semibold text-foreground-accent underline-offset-2 hover:underline"
              >
                contactarnos
              </Link>
              .
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
