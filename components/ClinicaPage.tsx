import { pages } from "@/content/pages";

export default function ClinicaPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pages.clinica.style }} />

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
            <a href="/">Home</a>
            <a href="#clinica" aria-current="page">Clínica</a>
            <a href="/accesibilidad-inclusion">Accesibilidad</a>
            <a href="/formacion">Formación</a>
            <a href="/we-love-to">We Love TO</a>
            <a href="/contacto?area=clinica">Contacto</a>
          </nav>
        </div>
      </header>

      <main className="page" id="contenido">
        <nav aria-label="Miga de pan">
          <ol className="breadcrumb">
            <li><a href="/#inicio">Inicio</a></li>
            <li aria-current="page">Clínica</li>
          </ol>
        </nav>

        <section className="hero dark" id="clinica" aria-labelledby="clinica-title">
          <div className="hero-copy">
            <p className="kicker">Clínica · Familias</p>
            <h1 id="clinica-title">Terapia ocupacional para niñas, niños y adolescentes.</h1>
            <p className="hero-lede">Acompaño a niñas, niños y adolescentes de 0 a 18 años en Roldán, Funes y Rosario según zona y edad. Trabajo desde una mirada que integra desarrollo, sensorialidad y vida cotidiana, con objetivos claros, revisiones y un final acordado.</p>
            <div className="actions">
              <a className="btn btn-primary" href="#contacto">Iniciar conversación por WhatsApp</a>
              <a className="btn btn-ghost" href="#proceso">Ver cómo empieza</a>
            </div>
            <ul className="facts" aria-label="Datos clave de la atención clínica">
              <li>0 a 18 años</li>
              <li>Roldán · Funes · Rosario</li>
              <li>Evaluación y tratamiento</li>
            </ul>
            <p className="sensitive">No compartas historias clínicas, diagnósticos ni datos sensibles en formularios.</p>
          </div>
          <div className="hero-art">
            <span className="art-shape" aria-hidden="true" />
            <span className="art-ring" aria-hidden="true" />
            <div className="hero-media">
              <div className="media-placeholder" aria-hidden="true"><span>Imagen opcional · autorizada</span></div>
            </div>
            <svg className="sono" viewBox="0 0 240 44" focusable="false" aria-hidden="true">
              <path d="M4 24h30l8-12 9 26 9-19 8 10h24l6-12 8 24 9-18 8 9h30" />
            </svg>
          </div>
        </section>

        <section className="section" id="proceso" aria-labelledby="proceso-title">
          <div className="section-head">
            <p className="eyebrow">Un proceso claro</p>
            <h2 id="proceso-title">Empezar, revisar y cerrar.</h2>
            <p>El acompañamiento no es un circuito abierto: tiene un propósito, instancias de revisión y un final definido.</p>
          </div>
          <ol className="steps">
            <li><strong>Primera conversación</strong><span>Escucho el motivo de consulta y las prioridades de la familia.</span></li>
            <li><strong>Evaluación</strong><span>Observo las áreas que necesitan apoyo y qué hace falta para avanzar.</span></li>
            <li><strong>Objetivos y plan</strong><span>Acordamos qué se va a trabajar, con qué frecuencia y cómo se revisa.</span></li>
            <li><strong>Revisiones y cierre</strong><span>Evaluamos avances y definimos juntos el momento de terminar.</span></li>
          </ol>
        </section>

        <section className="section" aria-labelledby="servicios-title">
          <div className="section-head">
            <p className="eyebrow">Puntos de partida</p>
            <h2 id="servicios-title">Elegir por dónde empezar.</h2>
          </div>
          <div className="cards">
            <article className="card">
              <h3>Evaluación</h3>
              <p>Para entender qué está pasando y qué apoyos tienen sentido.</p>
              <p className="meta">Familias que buscan orientación</p>
            </article>
            <article className="card">
              <h3>Tratamiento</h3>
              <p>Acompañamiento con objetivos, revisiones y un cierre acordado.</p>
              <p className="meta">Proceso continuo</p>
            </article>
            <article className="card">
              <h3>Tratamiento intensivo</h3>
              <p>Para familias del interior que necesitan concentrar el trabajo en un período.</p>
              <p className="meta">Formato con propósito propio</p>
            </article>
            <article className="card">
              <h3>Alimentación</h3>
              <p>Un espacio con identidad propia dentro del acompañamiento, con sus objetivos y tiempos.</p>
              <p className="meta">Abordaje específico</p>
            </article>
            <article className="card">
              <h3>Perfil sensorial en adultos</h3>
              <p>Evaluación, no tratamiento. Para personas adultas que buscan comprender su perfil sensorial.</p>
              <p className="meta">Alcance nacional</p>
            </article>
          </div>
          <p className="note">La integración sensorial se presenta como abordaje dentro de Terapia Ocupacional, no como un servicio independiente.</p>
        </section>

        <section className="section" aria-labelledby="alcance-title">
          <div className="split">
            <div className="section-head">
              <p className="eyebrow">Alcance y coordinación</p>
              <h2 id="alcance-title">La atención se ajusta a cada situación.</h2>
              <p>Roldán es la base. Funes y Rosario se evalúan según zona y edad. La modalidad, la frecuencia y los horarios se acuerdan en la primera conversación.</p>
            </div>
            <aside className="info-card">
              <h3>Antes de escribir</h3>
              <ul>
                <li>Edad de la persona.</li>
                <li>Zona donde vive.</li>
                <li>Motivo general de consulta.</li>
              </ul>
              <p style={{ marginTop: ".7rem" }}>No compartas historias clínicas, diagnósticos ni datos sensibles en formularios.</p>
            </aside>
          </div>
        </section>

        <section className="section adult" aria-labelledby="adultos-title">
          <p className="badge">Oferta aparte · Solo evaluación</p>
          <div className="section-head">
            <h2 id="adultos-title">Perfil sensorial en adultos.</h2>
            <p>Es una evaluación, no un tratamiento. Está dirigida a personas adultas que quieren comprender su perfil sensorial y tiene alcance nacional. No se anuncia tratamiento para adultos ni se mezcla con la atención pediátrica.</p>
          </div>
        </section>

        <section className="section" aria-labelledby="faq-title">
          <div className="section-head">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 id="faq-title">Lo que conviene saber antes de consultar.</h2>
          </div>
          <div className="faq">
            <details><summary>¿A qué edades acompaña?</summary><p>A niñas, niños y adolescentes de 0 a 18 años. La evaluación de perfil sensorial en adultos es una oferta aparte y solo de evaluación.</p></details>
            <details><summary>¿Dónde atiende?</summary><p>Roldán es la base. Funes y Rosario se evalúan según zona y edad. La modalidad, la frecuencia y los horarios se acuerdan en la primera conversación; no se publican dirección ni horarios sin confirmar.</p></details>
            <details><summary>¿Cuál es la diferencia entre evaluación, tratamiento y tratamiento intensivo?</summary><p>La evaluación permite entender qué está pasando y qué apoyos tienen sentido. El tratamiento es un acompañamiento con objetivos, revisiones y un cierre acordado. El intensivo concentra el trabajo en un período para familias del interior.</p></details>
            <details><summary>¿La integración sensorial es un servicio separado?</summary><p>No. La integración sensorial se presenta como un abordaje dentro de Terapia Ocupacional, no como un servicio independiente.</p></details>
            <details><summary>¿Atiende a personas adultas?</summary><p>Solo se ofrece evaluación de perfil sensorial en adultos, con alcance nacional. No se anuncia tratamiento para adultos.</p></details>
            <details><summary>¿Cómo se inicia una consulta?</summary><p>Por WhatsApp. No compartas historias clínicas, diagnósticos ni datos sensibles en formularios.</p></details>
            <details><summary>¿El acompañamiento tiene un final?</summary><p>Sí. El tratamiento se organiza con objetivos, instancias de revisión y un cierre acordado.</p></details>
          </div>
        </section>

        <section className="cta-band" id="contacto" aria-labelledby="contacto-title">
          <div>
            <h2 id="contacto-title">Hablemos de tu consulta.</h2>
            <p>WhatsApp es el canal principal para iniciar la conversación. El email queda como alternativa.</p>
            <small>Número y email se confirman antes de publicar.</small>
          </div>
          <a className="btn" href="/contacto?area=clinica">Escribir por WhatsApp</a>
        </section>

        <footer className="site-footer">
          <div>
            <p className="eyebrow" style={{ color: "var(--neon)" }}>Bele Cortese</p>
            <h2>Una marca, cuatro recorridos.</h2>
            <p>Clínica es una de las cuatro áreas. Trayectoria, Contacto, Accesibilidad del sitio y Privacidad acompañan el recorrido sin competir con él.</p>
          </div>
          <div>
            <nav className="footer-links" aria-label="Enlaces utilitarios">
              <a href="/#inicio">Inicio</a>
              <a href="#clinica">Clínica</a>
              <a href="/accesibilidad-inclusion">Accesibilidad</a>
              <a href="/formacion">Formación</a>
              <a href="/we-love-to">We Love TO</a>
              <a href="/trayectoria">Trayectoria</a>
              <a href="/contacto?area=clinica">Contacto</a>
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
