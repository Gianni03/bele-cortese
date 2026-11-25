import { pages } from "@/content/pages";

export default function WeLoveToPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pages.welove.style }} />

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
            <a href="#welove" aria-current="page">We Love TO</a>
            <a href="/contacto?area=welove">Contacto</a>
          </nav>
        </div>
      </header>

      <main className="page" id="contenido">
        <nav aria-label="Miga de pan">
          <ol className="breadcrumb">
            <li><a href="/#inicio">Inicio</a></li>
            <li aria-current="page">We Love TO</li>
          </ol>
        </nav>

        <section className="hero dark" id="welove" aria-labelledby="welove-title">
          <div className="hero-copy">
            <p className="kicker">We Love TO · Comunidad profesional</p>
            <h1 id="welove-title">Supervisión y comunidad para terapeutas ocupacionales.</h1>
            <p className="hero-lede">Un espacio para compartir preguntas, revisar prácticas y sostener la profesión en compañía. Para terapeutas ocupacionales y estudiantes de Latinoamérica.</p>
            <div className="actions">
              <a className="btn btn-primary" href="/contacto?area=welove">Consultar por supervisiones</a>
              <a className="btn btn-ghost" href="#propuesta">Conocer la propuesta</a>
            </div>
            <ul className="facts" aria-label="Datos clave de We Love TO">
              <li>En construcción</li>
              <li>Acceso temprano</li>
              <li>Latinoamérica</li>
            </ul>
          </div>
          <div className="hero-art">
            <span className="wl-ring" aria-hidden="true" />
            <span className="wl-bars" aria-hidden="true"><span /><span /><span /><span /><span /><span /></span>
            <span className="wl-monogram" aria-hidden="true">TO</span>
            <span className="wl-badge">Acceso temprano</span>
          </div>
        </section>

        <section className="section-dark" id="propuesta" aria-labelledby="propuesta-title">
          <div className="section-head">
            <p className="eyebrow">Qué reúne</p>
            <h2 id="propuesta-title">Práctica, preguntas y encuentros.</h2>
            <p>We Love TO está en construcción. Estos son los espacios que va a reunir; la disponibilidad de cada uno se confirma según el estado de la comunidad.</p>
          </div>
          <div className="wl-cards">
            <article className="wl-card">
              <h3>Supervisiones</h3>
              <p>Espacios para revisar situaciones de la práctica y pensar próximos pasos.</p>
              <p className="meta">Acompañamiento profesional</p>
            </article>
            <article className="wl-card">
              <h3>Materiales</h3>
              <p>Recursos para estudiar, preparar encuentros o profundizar temas.</p>
              <p className="meta">Biblioteca en construcción</p>
            </article>
            <article className="wl-card">
              <h3>Encuentros en vivo</h3>
              <p>Instancias para conversar, preguntar y encontrarse con otras personas de la profesión.</p>
              <p className="meta">Agenda por confirmar</p>
            </article>
            <article className="wl-card">
              <h3>Foro</h3>
              <p>Un lugar para dejar preguntas y seguir aprendiendo entre colegas.</p>
              <p className="meta">Acceso temprano</p>
            </article>
          </div>
        </section>

        <section className="status" aria-labelledby="estado-title">
          <div className="status-grid">
            <div className="status-copy">
              <p className="eyebrow">Estado de apertura</p>
              <span className="status-badge">En construcción · acceso temprano</span>
              <h2 id="estado-title">Una comunidad que se está armando.</h2>
              <p>No se presenta como una membresía abierta ni se prometen funciones que todavía no existen. El acceso temprano se coordina por email. No se publican precio ni fecha de apertura sin confirmar.</p>
            </div>
            <aside className="status-card">
              <h3>Para quién</h3>
              <ul>
                <li>Terapeutas ocupacionales.</li>
                <li>Estudiantes de Terapia Ocupacional.</li>
                <li>Personas de Latinoamérica interesadas en supervisión.</li>
              </ul>
              <p>La comunidad se gestiona fuera de este sitio. La plataforma no se nombra.</p>
            </aside>
          </div>
        </section>

        <section className="faq-section dark" aria-labelledby="faq-title">
          <div className="section-head">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 id="faq-title">Lo que conviene saber antes de consultar.</h2>
          </div>
          <div className="faq">
            <details><summary>¿Qué es We Love TO?</summary><p>Una comunidad de supervisión y recursos para terapeutas ocupacionales y estudiantes. Está en construcción y se ofrece como acceso temprano.</p></details>
            <details><summary>¿Para quién es?</summary><p>Para terapeutas ocupacionales y estudiantes de Latinoamérica.</p></details>
            <details><summary>¿Ya está abierta la membresía?</summary><p>No. No se presenta como una membresía abierta ni se prometen funciones que todavía no existen. El acceso temprano se coordina por email.</p></details>
            <details><summary>¿Qué incluye?</summary><p>Supervisiones, materiales, encuentros en vivo y foro. La disponibilidad de cada espacio se confirma según el estado de la comunidad.</p></details>
            <details><summary>¿Dónde funciona la comunidad?</summary><p>La comunidad se gestiona fuera de este sitio. La plataforma no se nombra en el sitio.</p></details>
            <details><summary>¿Cómo expreso interés?</summary><p>Por email, para consultar por supervisiones o pedir que te avise cuando la comunidad abra. La lista de aviso se ofrece solo si está operativa.</p></details>
            <details><summary>¿Hay costo o fecha de apertura?</summary><p>No se publican precio ni fecha sin confirmar.</p></details>
          </div>
        </section>

        <section className="cta-band" id="contacto" aria-labelledby="contacto-title">
          <div>
            <h2 id="contacto-title">¿Querés sumarte al acceso temprano?</h2>
            <p>Escribí por email para consultar por supervisiones o pedir que te avise cuando la comunidad abra.</p>
            <small>Dirección de email y lista de aviso pendientes de confirmación para la muestra.</small>
          </div>
          <a className="btn" href="/contacto?area=welove">Escribir por email</a>
        </section>

        <footer className="site-footer">
          <div>
            <p className="eyebrow" style={{ color: "var(--neon)" }}>Bele Cortese</p>
            <h2>Una marca, cuatro recorridos.</h2>
            <p>We Love TO es una de las cuatro áreas. Trayectoria, Contacto, Accesibilidad del sitio y Privacidad acompañan el recorrido sin competir con él.</p>
          </div>
          <div>
            <nav className="footer-links" aria-label="Enlaces del sitio">
              <a href="/#inicio">Inicio</a>
              <a href="/clinica">Clínica</a>
              <a href="/accesibilidad-inclusion">Accesibilidad</a>
              <a href="/formacion">Formación</a>
              <a href="#welove">We Love TO</a>
              <a href="/trayectoria">Trayectoria</a>
              <a href="/contacto?area=welove">Contacto</a>
              <a href="/accesibilidad-del-sitio">Accesibilidad del sitio</a>
              <a href="/privacidad">Privacidad</a>
              <a href="https://www.instagram.com/to.belencortese/" target="_blank" rel="noopener noreferrer">Instagram · externo</a>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
