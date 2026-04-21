import { Link } from 'react-router-dom'

import { CONTACT_PATH, COOKIES_POLICY_PATH } from '@/lib/routes'
import { cn } from '@/lib/utils'

/**
 * Política de privacidad — referencia de contenido:
 * [Política de privacidad (Webflow)](https://paquicabello.webflow.io/politica-de-privacidad)
 */
export function PrivacyPolicyPage() {
  return (
    <main
      id="politica-de-privacidad"
      className={cn(
        'relative w-screen max-w-none flex-1 shrink-0 scroll-mt-28 bg-canvas',
        'ml-[calc(50%-50vw)]',
      )}
    >
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <article className="flex flex-col gap-10 text-foreground-secondary">
          <header className="flex flex-col gap-4">
            <h1 className="headline-sm text-foreground-brand">
              Política de privacidad
            </h1>
            <p className="paragraph-md">
              La presente política de privacidad establece los términos en que{' '}
              <strong className="text-foreground">
                Paqui Cabello — Adiestradora canina
              </strong>{' '}
              usa y protege la información que es proporcionada por sus usuarios
              al utilizar su sitio web. Esta compañía está comprometida con la
              seguridad de los datos de sus usuarios. Cuando le pedimos rellenar
              los campos de información personal con la cual usted pueda ser
              identificado, lo hacemos asegurando que solo se empleará de acuerdo
              con los términos de este documento. Sin embargo, esta política de
              privacidad puede cambiar con el tiempo o ser actualizada; por ello
              le recomendamos revisar continuamente esta página para asegurarse de
              que está de acuerdo con dichos cambios.
            </p>
          </header>

          <section className="flex flex-col gap-4" aria-labelledby="privacidad-recogida">
            <h2 id="privacidad-recogida" className="headline-2xs text-foreground">
              Información que es recogida
            </h2>
            <p className="paragraph-md">
              Nuestro sitio web podrá recoger información personal, por ejemplo:
              nombre, información de contacto como su dirección de correo
              electrónico e información demográfica. Asimismo, cuando sea necesario
              podrá ser requerida información específica para procesar algún
              pedido o realizar una entrega o facturación.
            </p>
          </section>

          <section className="flex flex-col gap-4" aria-labelledby="privacidad-uso">
            <h2 id="privacidad-uso" className="headline-2xs text-foreground">
              Uso de la información recogida
            </h2>
            <p className="paragraph-md">
              Nuestro sitio web emplea la información con el fin de proporcionar
              el mejor servicio posible, particularmente para mantener un
              registro de usuarios, de pedidos en caso de que aplique, y mejorar
              nuestros productos y servicios. Es posible que se envíen correos
              electrónicos periódicamente a través de nuestro sitio con ofertas
              especiales, novedades y otra información que consideremos relevante
              para usted o que pueda brindarle algún beneficio; estos correos
              electrónicos serán enviados a la dirección que usted proporcione y
              podrán cancelarse en cualquier momento.
            </p>
            <p className="paragraph-md">
              Paqui Cabello — Adiestradora canina está comprometida con cumplir
              el deber de mantener su información segura. Utilizamos sistemas
              actualizados y medidas razonables para reducir el riesgo de acceso
              no autorizado.
            </p>
          </section>

          <section className="flex flex-col gap-4" aria-labelledby="privacidad-cookies">
            <h2 id="privacidad-cookies" className="headline-2xs text-foreground">
              Cookies
            </h2>
            <p className="paragraph-md">
              Una cookie se refiere a un fichero que se envía con la finalidad de
              solicitar permiso para almacenarse en su ordenador; al aceptar dicho
              fichero se crea la cookie, que sirve para tener información respecto
              al tráfico web y también facilita las futuras visitas a una web
              recurrente. Otra función de las cookies es que con ellas el sitio
              puede reconocerle individualmente y ofrecerle un servicio
              personalizado.
            </p>
            <p className="paragraph-md">
              Nuestro sitio web puede emplear cookies para identificar las
              páginas que son visitadas y su frecuencia. Esta información puede
              emplearse para análisis estadístico; según la configuración, los
              datos pueden conservarse o agregarse de forma que no identifiquen a
              la persona. Usted puede eliminar las cookies en cualquier momento
              desde su navegador.
            </p>
            <p className="paragraph-md">
              Las cookies ayudan a proporcionar un mejor servicio en los sitios
              web; éstas no dan acceso a información de su ordenador ni de usted,
              salvo que usted así lo decida y la proporcione directamente. Puede
              aceptar o negar el uso de cookies; la mayoría de navegadores las
              aceptan automáticamente porque sirven para tener un mejor servicio
              web. También puede cambiar la configuración de su navegador para
              rechazar las cookies. Si se rechazan, es posible que no pueda
              utilizar algunas funciones del sitio.
            </p>
            <p className="paragraph-md">
              Para más detalle sobre tipos de cookies y cómo las gestionamos, consulte
              nuestra{' '}
              <Link
                to={COOKIES_POLICY_PATH}
                className="font-semibold text-foreground-accent underline-offset-2 hover:underline"
              >
                política de cookies
              </Link>
              .
            </p>
          </section>

          <section className="flex flex-col gap-4" aria-labelledby="privacidad-terceros">
            <h2 id="privacidad-terceros" className="headline-2xs text-foreground">
              Enlaces a terceros
            </h2>
            <p className="paragraph-md">
              Este sitio web puede contener enlaces a otros sitios que pudieran
              ser de su interés. Una vez que haga clic en estos enlaces y abandone
              nuestra página, ya no tenemos control sobre el sitio al que es
              redirigido y, por tanto, no somos responsables de los términos,
              privacidad ni de la protección de sus datos en esos sitios de
              terceros. Dichos sitios están sujetos a sus propias políticas de
              privacidad; le recomendamos consultarlas para confirmar que está de
              acuerdo con ellas.
            </p>
          </section>

          <section className="flex flex-col gap-4" aria-labelledby="privacidad-control">
            <h2 id="privacidad-control" className="headline-2xs text-foreground">
              Control de su información personal
            </h2>
            <p className="paragraph-md">
              Usted puede ejercer control sobre la información personal que
              proporciona a nuestro sitio web. Cada vez que se le solicite
              rellenar un formulario, puede marcar o desmarcar la opción de
              recibir información por correo electrónico. Si hubiera marcado la
              opción de recibir nuestro boletín o comunicaciones comerciales,
              podrá cancelarla en cualquier momento.
            </p>
            <p className="paragraph-md">
              Esta compañía no venderá, cederá ni distribuirá la información
              personal recopilada sin su consentimiento, salvo que sea requerido
              por resolución judicial firme.
            </p>
            <p className="paragraph-md">
              Paqui Cabello — Adiestradora canina se reserva el derecho de cambiar
              los términos de la presente política de privacidad en cualquier
              momento.
            </p>
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-border-subtle-0 bg-surface-subtle-0 p-6">
            <h2 className="headline-2xs text-foreground">Contacto</h2>
            <p className="paragraph-md">
              Para ejercer sus derechos de protección de datos o resolver dudas
              sobre esta política, puede{' '}
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
