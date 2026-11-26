import { pages } from "@/content/pages";
import SiteNav from "@/components/SiteNav";

export default function FormacionPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pages.formacion.style }} />

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
          <SiteNav active="formacion" />
        </div>
      </header>

      <main className="page" id="contenido">
        <nav aria-label="Miga de pan">
          <ol className="breadcrumb">
            <li><a href="/#inicio">Inicio</a></li>
            <li aria-current="page">Formación y experiencias</li>
          </ol>
        </nav>

        <section className="hero" id="formacion" aria-labelledby="training-title">
          <div className="hero-copy">
            <p className="kicker">Formación y experiencias</p>
            <h1 id="training-title">Aprender, preguntar y probar otras formas.</h1>
            <p className="hero-lede">Conferencias, talleres, jornadas, programas y encuentros para escuelas, equipos, instituciones y familias. Cada propuesta se adapta al público y al momento.</p>
            <div className="actions">
              <a className="btn btn-primary" href="/contacto?area=formacion">Consultar por una propuesta</a>
              <a className="btn btn-ghost" href="#formatos">Ver formatos</a>
            </div>
            <ul className="facts" aria-label="Públicos y alcance de la formación">
              <li>Escuelas</li>
              <li>Equipos</li>
              <li>Instituciones</li>
              <li>Familias</li>
              <li>Alcance nacional</li>
            </ul>
          </div>
          <div className="hero-art">
            <span className="art-blob" aria-hidden="true" />
            <span className="art-ring" aria-hidden="true" />
            <span className="art-strip" aria-hidden="true" />
            <span className="art-plus" aria-hidden="true">+</span>
            <span className="art-tag">Conferencias · talleres · programas · encuentros</span>
          </div>
        </section>

        <section className="section" id="formatos" aria-labelledby="formatos-title">
          <div className="section-head">
            <p className="eyebrow">Formatos</p>
            <h2 id="formatos-title">Distintas puertas, una misma conversación.</h2>
            <p>El formato se elige según el público, el objetivo y el tiempo disponible. No todos los temas funcionan igual en todos los formatos.</p>
          </div>
          <div className="cards">
            <article className="card">
              <h3>Conferencias</h3>
              <p>Una introducción clara a un tema, con tiempo para preguntas.</p>
              <p className="meta">Públicos amplios · instituciones</p>
            </article>
            <article className="card">
              <h3>Talleres y jornadas</h3>
              <p>Espacios participativos para profundizar y llevarse herramientas concretas.</p>
              <p className="meta">Equipos · escuelas · organizaciones</p>
            </article>
            <article className="card">
              <h3>Programas</h3>
              <p>Recorridos de varios encuentros, con objetivos y continuidad.</p>
              <p className="meta">Procesos · acompañamiento sostenido</p>
            </article>
            <article className="card">
              <h3>Encuentros</h3>
              <p>Conversaciones y espacios de intercambio con familias y profesionales.</p>
              <p className="meta">Comunidad · preguntas compartidas</p>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="temas-title">
          <div className="section-head">
            <p className="eyebrow">Temas</p>
            <h2 id="temas-title">Seis ejes para pensar la práctica.</h2>
            <p>Los temas se agrupan y se adaptan al formato. No son piezas cerradas: se combinan según lo que el grupo necesite.</p>
          </div>
          <ul className="topics">
            <li><strong>Neurodesarrollo y neurodiversidad</strong><span>Una mirada actualizada sobre el desarrollo y la diversidad.</span></li>
            <li><strong>Procesamiento sensorial</strong><span>Cómo influye la experiencia sensorial en la vida cotidiana.</span></li>
            <li><strong>Educación e inclusión</strong><span>Criterios para pensar aulas y propuestas más accesibles.</span></li>
            <li><strong>Autonomía y vida cotidiana</strong><span>Apoyos para decidir, participar y sostener la independencia.</span></li>
            <li><strong>Accesibilidad y diseño</strong><span>Decisiones de espacio, producto y comunicación.</span></li>
            <li><strong>Neurodiversidad en el trabajo</strong><span>Inclusión laboral y entornos que funcionan para todas las personas.</span></li>
          </ul>
        </section>

        <section className="section" aria-labelledby="actividades-title">
          <div className="section-head">
            <p className="eyebrow">Actividades y estados</p>
            <h2 id="actividades-title">Cada actividad dice dónde está parada.</h2>
            <p>El estado se escribe con palabras, no solo con color. No se presentan como abiertas las actividades cerradas ni se publican fechas sin confirmar.</p>
          </div>
          <div className="status-list">
            <div className="status-row"><span><strong>Nombre de la actividad</strong><br /><small>Audiencia · formato · fecha a confirmar</small></span><span className="badge badge-open">Abierta</span></div>
            <div className="status-row"><span><strong>Nombre de la actividad</strong><br /><small>Audiencia · formato · fecha a confirmar</small></span><span className="badge badge-prep">En preparación</span></div>
            <div className="status-row"><span><strong>Nombre de la actividad</strong><br /><small>Audiencia · formato · edición anterior</small></span><span className="badge badge-closed">Cerrada</span></div>
            <div className="status-row"><span><strong>Aviso de próxima edición</strong><br /><small>Solo si el canal está operativo</small></span><span className="badge badge-soon">Aviso</span></div>
          </div>
          <p className="note">Las filas son estructura de muestra: no representan actividades, fechas ni ediciones reales.</p>
        </section>

        <section className="section proposal" aria-labelledby="propuesta-title">
          <div className="proposal-grid">
            <div className="proposal-copy">
              <p className="eyebrow">Pedir una propuesta</p>
              <h2 id="propuesta-title">Contame qué necesitás y para quién.</h2>
              <p>Con esos datos puedo pensar un formato posible y responder con condiciones reales. La propuesta se ajusta al público, al tiempo y al momento de la institución.</p>
            </div>
            <aside className="proposal-card">
              <h3>Para empezar</h3>
              <ul>
                <li>Institución o grupo.</li>
                <li>Público y cantidad estimada.</li>
                <li>Tema o formato de interés.</li>
                <li>Fechas tentativas.</li>
              </ul>
              <a className="btn" href="/contacto?area=formacion">Escribir por email</a>
            </aside>
          </div>
        </section>

        <section className="section" aria-labelledby="faq-title">
          <div className="section-head">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 id="faq-title">Lo que conviene saber antes de consultar.</h2>
          </div>
          <div className="faq">
            <details><summary>¿A quién está dirigida la formación?</summary><p>A escuelas, equipos, instituciones y familias. El alcance es nacional.</p></details>
            <details><summary>¿Qué formatos ofrece?</summary><p>Conferencias, talleres y jornadas, programas y encuentros. Cada propuesta se adapta al público y al momento.</p></details>
            <details><summary>¿Las actividades están abiertas?</summary><p>Cada actividad indica su estado: abierta, en preparación, cerrada o aviso de próxima edición. No se presentan como abiertas las que están cerradas.</p></details>
            <details><summary>¿Cómo pido una propuesta?</summary><p>Por email, con institución o grupo, público estimado, tema o formato de interés y fechas tentativas.</p></details>
            <details><summary>¿Se adaptan los contenidos?</summary><p>Sí. Cada propuesta se piensa para el público y el momento; los detalles se acuerdan en la consulta.</p></details>
            <details><summary>¿Hay propuestas para familias?</summary><p>Sí, encuentros y propuestas para familias, según la actividad y el estado de cada edición.</p></details>
            <details><summary>¿Cómo se confirma una fecha?</summary><p>No se publican fechas sin confirmar. La fecha y las condiciones se acuerdan por email.</p></details>
          </div>
        </section>

        <section className="cta-band" id="contacto" aria-labelledby="contacto-title">
          <div>
            <h2 id="contacto-title">¿Pensamos una propuesta?</h2>
            <p>El email es el canal principal para consultas, propuestas y avisos de nuevas ediciones.</p>
            <small>Dirección de email pendiente de confirmación para la muestra.</small>
          </div>
          <a className="btn" href="/contacto?area=formacion">Escribir por email</a>
        </section>

        <footer className="site-footer">
          <div>
            <p className="eyebrow" style={{ color: "var(--neon)" }}>Bele Cortese</p>
            <h2>Una marca, cuatro recorridos.</h2>
            <p>Formación y experiencias es una de las cuatro áreas. Trayectoria, Contacto, Accesibilidad del sitio y Privacidad acompañan el recorrido sin competir con él.</p>
          </div>
          <div>
            <nav className="footer-links" aria-label="Enlaces del sitio">
              <a href="/#inicio">Inicio</a>
              <a href="/clinica">Clínica</a>
              <a href="/accesibilidad-inclusion">Accesibilidad</a>
              <a href="#formacion">Formación</a>
              <a href="/we-love-to">We Love TO</a>
              <a href="/trayectoria">Trayectoria</a>
              <a href="/contacto?area=formacion">Contacto</a>
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
