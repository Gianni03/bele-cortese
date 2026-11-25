export default function AccesibilidadSitioPage() {
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
          <nav className="main-nav" aria-label="Navegación principal">
            <a href="/clinica">Clínica</a>
            <a href="/accesibilidad-inclusion">Accesibilidad</a>
            <a href="/formacion">Formación</a>
            <a href="/we-love-to">We Love TO</a>
            <a href="/contacto?area=general">Contacto</a>
          </nav>
        </div>
      </header>

      <main className="page" id="contenido">
        <nav aria-label="Miga de pan">
          <ol className="breadcrumb">
            <li><a href="/#inicio">Inicio</a></li>
            <li aria-current="page">Accesibilidad del sitio</li>
          </ol>
        </nav>

        <section className="hero" id="accesibilidad-sitio" aria-labelledby="access-site-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="kicker">Accesibilidad del sitio</p>
              <h1 id="access-site-title">Un sitio para usar de distintas maneras.</h1>
              <p className="hero-lede">Este espacio explica qué está implementado, cómo lo probamos y cómo reportar una barrera. La base es WCAG 2.2 AA y se busca AAA donde sea viable; la conformidad se declara después de la auditoría final.</p>
              <div className="actions">
                <a className="btn btn-primary" href="#reportar">Reportar una barrera</a>
                <a className="btn btn-ghost" href="/contacto?area=general">Contacto</a>
              </div>
            </div>
            <aside className="hero-card">
              <span className="status-badge">En revisión</span>
              <h2>Base WCAG 2.2 AA; AAA donde sea viable</h2>
              <p>Teclado, lectores de pantalla, zoom, contraste y movimiento reducido forman parte de la revisión.</p>
              <p className="card-note">No se declara conformidad total antes de la auditoría final y de resolver las limitaciones conocidas.</p>
            </aside>
          </div>
        </section>

        <section className="section" aria-labelledby="implementado-title">
          <div className="section-head">
            <p className="eyebrow">Qué está implementado</p>
            <h2 id="implementado-title">Decisiones que ya están en el diseño.</h2>
            <p>La accesibilidad se integra desde la estructura y los componentes; no se resuelve con un widget al final.</p>
          </div>
          <ul className="checklist">
            <li><strong>HTML semántico y jerarquía</strong><span>Encabezados, listas, enlaces y botones con estructura comprensible.</span></li>
            <li><strong>Teclado y foco visible</strong><span>Enlace para saltar al contenido y foco claro en controles y tarjetas.</span></li>
            <li><strong>Contraste y color</strong><span>Pares de texto revisados; el color no es el único portador de información.</span></li>
            <li><strong>Movimiento reducido</strong><span>El campo de esferas respeta la preferencia del sistema y tiene control en la navbar.</span></li>
            <li><strong>Texto y zoom</strong><span>Textos legibles, sin bloques justificados ni contenido esencial dentro de imágenes.</span></li>
            <li><strong>Formularios y enlaces</strong><span>Etiquetas visibles, instrucciones, ayuda y nombres descriptivos.</span></li>
          </ul>
        </section>

        <section className="section" aria-labelledby="pruebas-title">
          <div className="section-head">
            <p className="eyebrow">Cómo lo probamos</p>
            <h2 id="pruebas-title">Pruebas antes de publicar.</h2>
          </div>
          <div className="cards cards--two">
            <article className="card"><h3>Teclado</h3><p>Recorrido completo con Tab, Shift+Tab, Enter, Espacio y Escape; foco visible y sin trampas.</p><p className="meta">Desktop y móvil</p></article>
            <article className="card"><h3>Lector de pantalla</h3><p>Revisión de nombres accesibles, orden de lectura, encabezados y estados expandidos.</p><p className="meta">Tecnologías de asistencia</p></article>
            <article className="card"><h3>Zoom y responsive</h3><p>Texto al 200 %, anchos estrechos y reflow sin desplazamiento horizontal.</p><p className="meta">Móvil primero</p></article>
            <article className="card"><h3>Movimiento reducido</h3><p>Estado estático, control de pausa y conservación del contenido y los destinos.</p><p className="meta">Preferencia del sistema</p></article>
          </div>
          <p className="note">La auditoría final incluye pruebas manuales y con tecnologías de asistencia. Hasta entonces, esta página describe el objetivo y lo implementado, no una certificación.</p>
        </section>

        <section className="section" aria-labelledby="limitaciones-title">
          <div className="section-head">
            <p className="eyebrow">Limitaciones conocidas</p>
            <h2 id="limitaciones-title">Lo que todavía se está revisando.</h2>
          </div>
          <div className="cards cards--two">
            <article className="card"><h3>Campo de esferas</h3><p>Tiene enlaces directos a las áreas y una alternativa de texto; se sigue probando con teclado y lectores de pantalla.</p><p className="meta">Home</p></article>
            <article className="card"><h3>Imágenes pendientes</h3><p>Las fotos autorizadas todavía no están cargadas. Ninguna información esencial depende de ellas.</p><p className="meta">Contenido</p></article>
            <article className="card"><h3>Formulario de contacto</h3><p>El formulario ya está conectado al endpoint; la validación final con tecnologías de asistencia y staging sigue pendiente.</p><p className="meta">Contacto</p></article>
            <article className="card"><h3>Páginas en revisión</h3><p>El sitio sigue con noindex hasta que el contenido y la revisión legal estén aprobados.</p><p className="meta">Lanzamiento</p></article>
          </div>
        </section>

        <section className="section" id="reportar" aria-labelledby="reportar-title">
          <div className="report-card">
            <h2 id="reportar-title">¿Encontraste una barrera?</h2>
            <p>Escribí por el canal de contacto con la página, la barrera encontrada y la tecnología que usás. Si podés, incluí el paso exacto donde ocurre.</p>
            <a className="btn" href="/contacto?area=general">Ir a Contacto</a>
            <p className="note" style={{ marginTop: ".8rem", background: "transparent", color: "#D9E2DF", borderLeftColor: "var(--neon)" }}>El canal para reportar barreras se confirma antes de publicar.</p>
          </div>
        </section>

        <section className="section" aria-labelledby="faq-title">
          <div className="section-head">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 id="faq-title">Sobre el uso del sitio.</h2>
          </div>
          <div className="faq">
            <details><summary>¿Cómo reduzco el movimiento del sitio?</summary><p>El campo de esferas de la Home respeta prefers-reduced-motion y tiene un control en la navbar para pausarlo. Las demás páginas no tienen movimiento automático.</p></details>
            <details><summary>¿Puedo navegar solo con teclado?</summary><p>Sí. Los enlaces, botones, formularios y tarjetas expandibles tienen foco visible y orden de lectura. El sitio incluye un enlace para saltar al contenido.</p></details>
            <details><summary>¿Funciona con lector de pantalla?</summary><p>La estructura usa HTML semántico, encabezados jerárquicos, nombres accesibles y contenido en texto. La revisión con tecnologías de asistencia forma parte de la auditoría final.</p></details>
            <details><summary>¿Cómo reporto una barrera?</summary><p>Escribí por el canal de contacto con la página, la barrera encontrada y la tecnología que usás. El canal se confirma antes de publicar.</p></details>
            <details><summary>¿El sitio declara conformidad WCAG?</summary><p>La base es WCAG 2.2 AA; se busca AAA donde sea viable. La conformidad se declara después de la auditoría final y de resolver las limitaciones conocidas.</p></details>
          </div>
        </section>

        <footer className="site-footer">
          <div>
            <p className="eyebrow" style={{ color: "var(--neon)" }}>Bele Cortese</p>
            <h2>Una marca, cuatro recorridos.</h2>
            <p>Accesibilidad del sitio es una utilidad transversal, distinta del servicio profesional de accesibilidad e inclusión.</p>
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
              <a href="#accesibilidad-sitio">Accesibilidad del sitio</a>
              <a href="/privacidad">Privacidad</a>
              <a href="https://www.instagram.com/to.belencortese/" target="_blank" rel="noopener noreferrer">Instagram · externo</a>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
