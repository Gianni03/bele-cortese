import SiteNav from "@/components/SiteNav";

export default function PrivacidadPage() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="/#inicio">
            <img src="/Diseños/logosolo.png" alt="" width="194" height="200" />
            <span>
              <span className="brand-name">
                <span className="brand-name-line">BELE</span>
                <span className="brand-name-line">CORTESE<span className="brand-slash" aria-hidden="true" /></span>
              </span>
              <span className="brand-role">Neurodiversidad · Inclusión · Accesibilidad</span>
            </span>
          </a>
          <SiteNav />
        </div>
      </header>

      <main className="page" id="contenido">
        <nav aria-label="Miga de pan">
          <ol className="breadcrumb">
            <li><a href="/#inicio">Inicio</a></li>
            <li aria-current="page">Privacidad</li>
          </ol>
        </nav>

        <section className="hero" id="privacidad" aria-labelledby="privacidad-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="kicker">Privacidad</p>
              <h1 id="privacidad-title">Qué datos se solicitan y cómo se cuidan.</h1>
              <p className="hero-lede">Un borrador de estructura para la política de privacidad. La versión final se valida antes de publicar y explica con precisión qué datos se piden, para qué y cómo se ejercen los derechos.</p>
              <div className="actions">
                <a className="btn btn-primary" href="/contacto?area=general">Consultar por privacidad</a>
                <a className="btn btn-ghost" href="/#inicio">Volver al inicio</a>
              </div>
            </div>
            <aside className="hero-card">
              <span className="status-badge">Borrador</span>
              <h2>Texto legal a validar.</h2>
              <p>La estructura está preparada. Los plazos, la base legal y los datos del responsable se completan en la versión final.</p>
              <p className="card-note">Esta página no es asesoría legal ni reemplaza la revisión profesional.</p>
            </aside>
          </div>
        </section>

        <section className="section" aria-labelledby="legal-title">
          <div className="section-head">
            <p className="eyebrow">Política de privacidad</p>
            <h2 id="legal-title">Estructura de la política.</h2>
            <p>Los datos de contacto, los plazos y la base legal definitiva se confirman antes de publicar.</p>
          </div>
          <div className="legal-layout">
            <aside className="legal-toc" aria-label="Índice de la política">
              <h2>En esta página</h2>
              <ol>
                <li><a href="#responsable">Responsable</a></li>
                <li><a href="#datos">Datos que se solicitan</a></li>
                <li><a href="#finalidad">Para qué</a></li>
                <li><a href="#no-solicita">Qué no se solicita</a></li>
                <li><a href="#conservacion">Conservación</a></li>
                <li><a href="#derechos">Derechos</a></li>
                <li><a href="#menores">Menores</a></li>
                <li><a href="#cookies">Cookies y analítica</a></li>
                <li><a href="#cambios">Cambios</a></li>
                <li><a href="#contacto-privacidad">Contacto</a></li>
              </ol>
            </aside>
            <div className="legal-content">
              <p className="legal-note"><strong>Borrador de política.</strong> Es un texto de trabajo y debe revisarse legalmente antes de publicar. No es asesoría legal ni una política publicada.</p>

              <h2 id="responsable">Responsable</h2>
              <p>Responsable: María Belén Cortese. El canal de privacidad y los datos legales del responsable se confirman antes de publicar.</p>

              <h2 id="datos">Datos que se solicitan</h2>
              <ul>
                <li>Nombre, email y, si se brinda, teléfono o WhatsApp.</li>
                <li>Área de interés y contenido del mensaje.</li>
                <li>Datos específicos del área: edad, zona y motivo general en Clínica; organización, rol y servicio en Accesibilidad; institución, público, formato y fechas en Formación; país, rol e interés en We Love TO.</li>
                <li>Datos técnicos mínimos de analítica solo si se acepta la analítica.</li>
              </ul>
              <p>No se solicitan historias clínicas, diagnósticos, estudios médicos ni otros datos sensibles. Las consultas clínicas se inician por WhatsApp, no por el formulario.</p>

              <h2 id="finalidad">Para qué</h2>
              <ul>
                <li>Responder consultas y coordinar servicios.</li>
                <li>Enviar información o avisos solo cuando exista consentimiento.</li>
                <li>Cumplir obligaciones legales aplicables.</li>
              </ul>
              <p>Los datos se usan para responder y coordinar. No se venden ni se ceden para publicidad. Para operar el sitio se usan proveedores técnicos que procesan datos por cuenta de Bele Cortese: Vercel (hosting y formularios), Resend (envío de email) y Google (analítica solo si se acepta).</p>
              <p>La base legal de cada tratamiento se define en la versión final.</p>

              <h2 id="no-solicita">Qué no se solicita</h2>
              <p>No se solicitan historias clínicas, diagnósticos, estudios médicos ni otros datos sensibles para iniciar una consulta. Si la consulta es clínica, el canal indicado es WhatsApp y no un formulario web.</p>

              <h2 id="conservacion">Conservación</h2>
              <p>Los datos se conservan solo durante el tiempo necesario para responder la consulta y cumplir obligaciones legales. No se crea una base de datos comercial. Los plazos concretos se definen en la versión final.</p>

              <h2 id="derechos">Derechos</h2>
              <p>La persona puede solicitar acceso, rectificación, actualización o eliminación de sus datos, y oponerse a determinados tratamientos. El canal para ejercer estos derechos se confirma antes de publicar.</p>

              <h2 id="menores">Menores</h2>
              <p>Las consultas deben ser iniciadas por personas adultas responsables. No se solicitan datos de niñas, niños o adolescentes en formularios web ni se publican datos que permitan identificarlos.</p>

              <h2 id="cookies">Cookies y analítica</h2>
              <p>El sitio no usa cookies de publicidad. Si aceptás, se carga Google Analytics 4 solo después de tu elección; no se usa para publicidad ni para perfiles. Google Analytics puede usar cookies de medición como <code>_ga</code> y <code>_ga_*</code>, y los datos son tratados por Google LLC conforme a sus condiciones. La elección se guarda en el almacenamiento local del navegador. Podés aceptar, rechazar o cambiar la preferencia cuando quieras.</p>
              <p>La versión publicada debe completar la base legal, la retención, la transferencia internacional y el canal de derechos antes de activar la medición.</p>
              <p><button className="consent-open" type="button" data-consent-open="true">Cambiar preferencia de analítica</button></p>

              <h2 id="cambios">Cambios</h2>
              <p>La política puede actualizarse cuando cambien los canales, las herramientas o la normativa aplicable. La fecha de la última revisión se publica en la versión final.</p>

              <h2 id="contacto-privacidad">Contacto</h2>
              <p>Para consultas sobre privacidad, escribí por el canal de contacto. La dirección se confirma antes de publicar.</p>
              <p><a href="/contacto?area=general">Ir a Contacto</a></p>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div>
            <p className="eyebrow" style={{ color: "var(--neon)" }}>Bele Cortese</p>
            <h2>Una marca, cuatro recorridos.</h2>
            <p>Privacidad es una utilidad transversal. La versión publicada se valida antes de entrar en vigor.</p>
          </div>
          <div>
            <nav className="footer-links" aria-label="Enlaces del sitio">
              <a href="/#inicio">Inicio</a>
              <a href="/clinica">Clínica</a>
              <a href="/accesibilidad-inclusion">Accesibilidad</a>
              <a href="/formacion">Formación</a>
              <a href="/we-love-to">We Love TO</a>
              <a href="/trayectoria">Trayectoria</a>
              <a href="/contacto?area=general">Contacto</a>
              <a href="/accesibilidad-del-sitio">Accesibilidad del sitio</a>
              <a href="#privacidad">Privacidad</a>
              <a href="https://www.instagram.com/to.belencortese/" target="_blank" rel="noopener noreferrer">Instagram · externo</a>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
