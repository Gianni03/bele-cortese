import { pages } from "@/content/pages";
import SiteNav from "@/components/SiteNav";

export default function AccesibilidadPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pages.accesibilidad.style }} />

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
          <SiteNav active="accesibilidad" />
        </div>
      </header>

      <main className="page" id="contenido">
        <nav aria-label="Miga de pan">
          <ol className="breadcrumb">
            <li><a href="/#inicio">Inicio</a></li>
            <li aria-current="page">Accesibilidad e inclusión</li>
          </ol>
        </nav>

        <section className="hero dark" id="accesibilidad" aria-labelledby="access-title">
          <div className="hero-copy">
            <p className="kicker">Accesibilidad e inclusión · Organizaciones</p>
            <h1 id="access-title">Accesibilidad e inclusión para organizaciones.</h1>
            <p className="hero-lede">Acompaño organizaciones deportivas, culturales y organismos públicos a convertir la inclusión en decisiones concretas, desde el diagnóstico hasta la implementación.</p>
            <div className="actions">
              <a className="btn btn-primary" href="/contacto?area=accesibilidad">Escribir por email</a>
              <a className="btn btn-ghost" href="#formas">Ver formas de trabajo</a>
            </div>
            <ul className="facts" aria-label="Datos clave del trabajo con organizaciones">
              <li>Organizaciones deportivas, culturales y públicas</li>
              <li>Alcance nacional</li>
              <li>Diagnóstico · producción · inclusión laboral</li>
            </ul>
          </div>
          <div className="hero-art">
            <span className="blueprint" aria-hidden="true" />
            <div className="panel" aria-hidden="true"><span className="monogram">A+I</span></div>
            <span className="art-rule art-rule-a" aria-hidden="true" />
            <span className="art-rule art-rule-b" aria-hidden="true" />
            <span className="art-rule art-rule-c" aria-hidden="true" />
            <span className="art-tag">Diagnóstico · producción · inclusión laboral</span>
          </div>
        </section>

        <section className="section" id="formas" aria-labelledby="formas-title">
          <div className="section-head">
            <p className="eyebrow">Tres formas de trabajar juntos</p>
            <h2 id="formas-title">De la barrera a una decisión concreta.</h2>
            <p>Las tres ofertas se contratan por separado o como un recorrido. El punto de partida depende de en qué momento está el proyecto.</p>
          </div>
          <div className="cards">
            <article className="card">
              <h3>Diagnóstico y criterios</h3>
              <p>Revisamos experiencias, espacios y procesos para identificar barreras y definir criterios de accesibilidad.</p>
              <p className="meta">Mapa de barreras · criterios priorizados · recomendaciones</p>
            </article>
            <article className="card">
              <h3>Acompañamiento en producción</h3>
              <p>Trabajo junto a equipos y proveedores para que las decisiones de accesibilidad lleguen a la implementación.</p>
              <p className="meta">Revisión · ajustes · criterios para futuras ediciones</p>
            </article>
            <article className="card">
              <h3>Inclusión laboral</h3>
              <p>Acompaño la incorporación y permanencia de personas con discapacidad en equipos de trabajo.</p>
              <p className="meta">Análisis de puestos · ajustes razonables · acompañamiento</p>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="campos-title">
          <div className="section-head">
            <p className="eyebrow">Contexto profesional</p>
            <h2 id="campos-title">Campos de experiencia, no servicios sueltos.</h2>
            <p>Estos campos ordenan el enfoque; no se contratan como piezas separadas.</p>
          </div>
          <ul className="fields">
            <li><strong>Sensorial</strong><span>Entornos que consideran luz, sonido, texturas y carga estimular.</span></li>
            <li><strong>Cognitivo</strong><span>Información, recorridos y tareas que se comprenden sin esfuerzo innecesario.</span></li>
            <li><strong>Físico</strong><span>Acceso, circulación y uso de los espacios.</span></li>
            <li><strong>Eventos</strong><span>Experiencias culturales y deportivas pensadas desde la diversidad.</span></li>
            <li><strong>Diseño inclusivo</strong><span>Decisiones de producto y comunicación que no excluyen a nadie.</span></li>
          </ul>
        </section>

        <section className="process" aria-labelledby="proceso-title">
          <div className="process-head">
            <p className="eyebrow">Cómo trabajamos</p>
            <h2 id="proceso-title">Escuchar, observar, definir y acompañar.</h2>
            <p>Cada organización llega con un contexto distinto. El punto de partida es entender qué necesita y qué puede sostener en el tiempo.</p>
          </div>
          <div className="process-steps">
            <article className="process-step"><span className="number">01</span><h3>Contexto</h3><p>Entender la organización, el proyecto y las personas involucradas.</p></article>
            <article className="process-step"><span className="number">02</span><h3>Diagnóstico</h3><p>Revisar experiencias, espacios y procesos para identificar barreras.</p></article>
            <article className="process-step"><span className="number">03</span><h3>Criterios</h3><p>Priorizar decisiones y definir criterios de accesibilidad.</p></article>
            <article className="process-step"><span className="number">04</span><h3>Acompañamiento</h3><p>Trabajar con equipos y proveedores durante la implementación.</p></article>
          </div>
        </section>

        <section className="section confidentiality" aria-labelledby="confidencialidad-title">
          <div className="confidentiality-grid">
            <div className="confidentiality-copy">
              <p className="eyebrow">Experiencia y confidencialidad</p>
              <h2 id="confidencialidad-title">La confianza también se diseña.</h2>
              <p>La experiencia se muestra solo con autorización y contexto validado. No se publican nombres, escudos, fotos ni ciudades de proyectos reservados. La trayectoria verificable se presenta en Trayectoria, sin convertirla en una lista de clientes.</p>
              <a href="/trayectoria">Conocer la trayectoria</a>
            </div>
            <aside className="confidentiality-card">
              <h3>Antes de publicar</h3>
              <p>Se confirman alcance, permisos de imagen, nombres de proyectos y cualquier dato que permita identificar a una organización.</p>
            </aside>
          </div>
        </section>

        <section className="section" aria-labelledby="faq-title">
          <div className="section-head">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 id="faq-title">Lo que conviene saber antes de consultar.</h2>
          </div>
          <div className="faq">
            <details><summary>¿Qué tipo de organizaciones acompaña?</summary><p>Organizaciones deportivas, culturales y organismos públicos. El trabajo tiene alcance nacional.</p></details>
            <details><summary>¿Qué incluye un diagnóstico de accesibilidad?</summary><p>Revisamos experiencias, espacios y procesos para identificar barreras y definir criterios priorizados. El resultado incluye un mapa de barreras y recomendaciones.</p></details>
            <details><summary>¿Acompañan durante la producción o solo al final?</summary><p>Acompaño durante la producción, junto a equipos y proveedores, para que las decisiones de accesibilidad lleguen a la implementación.</p></details>
            <details><summary>¿La inclusión laboral es una oferta aparte?</summary><p>Sí. Es una de las tres formas de trabajo, junto con diagnóstico y criterios, y acompañamiento en producción. Incluye análisis de puestos, ajustes razonables y acompañamiento.</p></details>
            <details><summary>¿Los campos de experiencia son servicios separados?</summary><p>No. Sensorial, cognitivo, físico, eventos y diseño inclusivo son contexto profesional; no se contratan como piezas separadas.</p></details>
            <details><summary>¿Cómo se maneja la confidencialidad?</summary><p>No se publican nombres, escudos, fotos ni ciudades de proyectos reservados. La experiencia se muestra solo con autorización y contexto validado.</p></details>
            <details><summary>¿Cómo se inicia una consulta?</summary><p>Por email. El canal se confirma antes de publicar.</p></details>
          </div>
        </section>

        <section className="cta-band" id="contacto" aria-labelledby="contacto-title">
          <div>
            <h2 id="contacto-title">Contame qué necesita tu organización.</h2>
            <p>El email es el canal principal para consultas profesionales. WhatsApp queda como alternativa general.</p>
            <small>Dirección de email pendiente de confirmación para la muestra.</small>
          </div>
          <a className="btn" href="/contacto?area=accesibilidad">Escribir por email</a>
        </section>

        <footer className="site-footer">
          <div>
            <p className="eyebrow" style={{ color: "var(--neon)" }}>Bele Cortese</p>
            <h2>Una marca, cuatro recorridos.</h2>
            <p>Accesibilidad e inclusión es una de las cuatro áreas. Trayectoria, Contacto, Accesibilidad del sitio y Privacidad acompañan el recorrido sin competir con él.</p>
          </div>
          <div>
            <nav className="footer-links" aria-label="Enlaces del sitio">
              <a href="/#inicio">Inicio</a>
              <a href="/clinica">Clínica</a>
              <a href="#accesibilidad">Accesibilidad</a>
              <a href="/formacion">Formación</a>
              <a href="/we-love-to">We Love TO</a>
              <a href="/trayectoria">Trayectoria</a>
              <a href="/contacto?area=accesibilidad">Contacto</a>
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
