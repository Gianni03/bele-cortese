import SiteNav from "@/components/SiteNav";

export default function TrayectoriaPage() {
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
            <li aria-current="page">Trayectoria</li>
          </ol>
        </nav>

        <section className="hero" id="trayectoria" aria-labelledby="trayectoria-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="kicker">Trayectoria · María Belén Cortese</p>
              <h1 id="trayectoria-title">Una práctica que une clínica, accesibilidad y formación.</h1>
              <p className="hero-lede">Terapeuta Ocupacional. Acompaño personas y organizaciones desde una mirada que integra rigor, calidez y conversación, sin infantilizar ni prometer resultados que no puedo sostener.</p>
              <div className="actions">
                <a className="btn btn-primary" href="/#areas">Conocer las áreas</a>
                <a className="btn btn-ghost" href="/contacto?area=general">Contacto</a>
              </div>
            </div>
            <aside className="hero-card">
              <span className="status-badge">Perfil en revisión</span>
              <h2>María Belén Cortese</h2>
              <p className="role">Terapeuta Ocupacional</p>
              <p>Clínica, accesibilidad e inclusión, formación y comunidad profesional.</p>
              <p className="card-note">Las credenciales, la experiencia y la foto se publican solo con validación previa.</p>
            </aside>
          </div>
        </section>

        <section className="section" aria-labelledby="enfoque-title">
          <div className="section-head">
            <p className="eyebrow">Enfoque</p>
            <h2 id="enfoque-title">Rigor, calidez y conversación.</h2>
            <p>La práctica se sostiene en decisiones claras y en un vínculo que no infantiliza. La inclusión se vive en la experiencia, no solo en la declaración.</p>
          </div>
          <ul className="values">
            <li><strong>Rigor</strong><span>Decisiones fundamentadas, límites claros y revisión antes de publicar.</span></li>
            <li><strong>Calidez</strong><span>Un trato cercano y respetuoso, sin simplificar de más ni prometer de menos.</span></li>
            <li><strong>Conversación</strong><span>Espacios para preguntar, disentir y construir criterios en conjunto.</span></li>
            <li><strong>Inclusión</strong><span>Accesibilidad en el lenguaje, los espacios y las formas de trabajar.</span></li>
          </ul>
        </section>

        <section className="section" aria-labelledby="areas-title">
          <div className="section-head">
            <p className="eyebrow">Áreas de trabajo</p>
            <h2 id="areas-title">Cuatro formas de acompañar y trabajar.</h2>
            <p>Las áreas comparten una misma mirada y tienen públicos, alcances y conversaciones distintas.</p>
          </div>
          <div className="cards cards--two">
            <article className="card">
              <h3>Clínica</h3>
              <p>Atención de Terapia Ocupacional para niñas, niños y adolescentes; evaluación de perfil sensorial en adultos.</p>
              <p className="meta"><a href="/clinica">Ver Clínica</a></p>
            </article>
            <article className="card">
              <h3>Accesibilidad e inclusión</h3>
              <p>Diagnóstico, acompañamiento en producción e inclusión laboral para organizaciones.</p>
              <p className="meta"><a href="/accesibilidad-inclusion">Ver Accesibilidad</a></p>
            </article>
            <article className="card">
              <h3>Formación y experiencias</h3>
              <p>Conferencias, talleres, jornadas, programas y encuentros para distintos públicos.</p>
              <p className="meta"><a href="/formacion">Ver Formación</a></p>
            </article>
            <article className="card">
              <h3>We Love TO</h3>
              <p>Supervisión y comunidad para terapeutas ocupacionales y estudiantes de Latinoamérica.</p>
              <p className="meta"><a href="/we-love-to">Ver We Love TO</a></p>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="credenciales-title">
          <div className="section-head">
            <p className="eyebrow">Formación y credenciales</p>
            <h2 id="credenciales-title">Lo verificable, con contexto.</h2>
            <p>La versión pública se completa solo con datos exactos, autorizados y revisados. Esta muestra ordena el contenido; no inventa títulos, años ni instituciones.</p>
          </div>
          <div className="credentials">
            <div className="credential"><span><strong>Formación académica</strong><br /><small>Título, institución y año a confirmar</small></span><span className="badge-pending">A confirmar</span></div>
            <div className="credential"><span><strong>Certificaciones</strong><br /><small>Área, entidad y vigencia a confirmar</small></span><span className="badge-pending">A confirmar</span></div>
            <div className="credential"><span><strong>Docencia y conferencias</strong><br /><small>Contexto, audiencia y año a confirmar</small></span><span className="badge-pending">A confirmar</span></div>
            <div className="credential"><span><strong>Experiencia institucional</strong><br /><small>Proyecto, rol y autorización a confirmar</small></span><span className="badge-pending">A confirmar</span></div>
          </div>
          <p className="note">No se publican métricas, clientes, escudos, fotos ni nombres de proyectos reservados sin autorización y contexto validado.</p>
        </section>

        <section className="section" aria-labelledby="faq-title">
          <div className="section-head">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 id="faq-title">Sobre la trayectoria y la información pública.</h2>
          </div>
          <div className="faq">
            <details><summary>¿Quién es María Belén Cortese?</summary><p>Es Terapeuta Ocupacional. Su trabajo reúne atención clínica, accesibilidad e inclusión, formación y comunidad profesional.</p></details>
            <details><summary>¿Cómo se verifican las credenciales?</summary><p>La formación académica, las certificaciones y la experiencia institucional se publican solo después de validar exactitud, contexto y autorización.</p></details>
            <details><summary>¿Se publican métricas o nombres de proyectos?</summary><p>No se publican métricas, clientes ni nombres de proyectos reservados sin autorización y contexto validado.</p></details>
            <details><summary>¿Dónde se ven las áreas de trabajo?</summary><p>En las páginas de Clínica, Accesibilidad e inclusión, Formación y experiencias, y We Love TO.</p></details>
          </div>
        </section>

        <footer className="site-footer">
          <div>
            <p className="eyebrow" style={{ color: "var(--neon)" }}>Bele Cortese</p>
            <h2>Una marca, cuatro recorridos.</h2>
            <p>Trayectoria es transversal: aporta contexto a las cuatro áreas sin convertirse en una quinta oferta.</p>
          </div>
          <div>
            <nav className="footer-links" aria-label="Enlaces del sitio">
              <a href="/#inicio">Inicio</a>
              <a href="/clinica">Clínica</a>
              <a href="/accesibilidad-inclusion">Accesibilidad</a>
              <a href="/formacion">Formación</a>
              <a href="/we-love-to">We Love TO</a>
              <a href="#trayectoria">Trayectoria</a>
              <a href="/contacto?area=general">Contacto</a>
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
