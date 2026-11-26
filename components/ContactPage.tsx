"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import SiteNav from "@/components/SiteNav";

const allowedAreas = new Set(["clinica", "accesibilidad", "formacion", "welove", "general"]);
type Area = "clinica" | "accesibilidad" | "formacion" | "welove" | "general";
type StatusState = "idle" | "sending" | "success" | "error";
type Status = { state: StatusState; message: string };

const initialStatus: Status = {
  state: "idle",
  message: "Elegí un área para ver el formulario.",
};

export default function ContactPage() {
  const [area, setArea] = useState<Area | "">("");
  const [status, setStatus] = useState<Status>(initialStatus);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const areaRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("area");
    if (param && allowedAreas.has(param)) {
      setArea(param as Area);
      setStatus({ state: "idle", message: "Completá los datos y revisá la privacidad antes de enviar." });
    }
  }, []);

  const chooseArea = (value: string) => {
    const next = allowedAreas.has(value) ? (value as Area) : "";
    setArea(next);
    setStatus({
      state: "idle",
      message: next ? "Completá los datos y revisá la privacidad antes de enviar." : "Elegí un área para ver el formulario.",
    });

    try {
      const url = new URL(window.location.href);
      if (next) url.searchParams.set("area", next);
      else url.searchParams.delete("area");
      window.history.replaceState(null, "", url);
    } catch {
      // file:// can block history
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!area) {
      setStatus({ state: "error", message: "Elegí un área antes de enviar." });
      areaRef.current?.focus();
      return;
    }

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const sentArea = area;
    const payload = Object.fromEntries(new FormData(form).entries());
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    setSubmitting(true);
    setStatus({ state: "sending", message: "Enviando tu consulta…" });

    try {
      const response = await fetch("/api/contacto/", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      let data: { ok?: boolean; error?: string } = {};
      try {
        data = await response.json();
      } catch {
        // A response without JSON is still handled below.
      }

      if (response.ok && data.ok) {
        form.reset();
        chooseArea(sentArea);
        setStatus({ state: "success", message: "Consulta enviada. Te vamos a responder por el medio que indicaste." });
        return;
      }

      if (response.status === 429) {
        setStatus({ state: "error", message: "Recibimos varias consultas desde esta conexión. Esperá unos minutos o usá el canal del área." });
      } else if (response.status === 503 || data.error === "not_configured") {
        setStatus({ state: "error", message: "El formulario todavía no está conectado. Escribinos por el canal del área." });
      } else if (response.status === 422) {
        setStatus({ state: "error", message: "Revisá los campos marcados e intentá de nuevo." });
      } else {
        setStatus({ state: "error", message: "No pudimos enviar la consulta. Probá de nuevo o usá el canal del área." });
      }
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof DOMException && error.name === "AbortError"
          ? "La consulta tardó demasiado. Probá de nuevo o usá el canal del área."
          : "No pudimos conectar con el formulario. Revisá tu conexión o usá el canal del área.",
      });
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  };

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="/">
            <img src="/Diseños/logosolo.png" alt="" width="194" height="200" />
            <span>
              <span className="brand-name">
                <span className="brand-name-line">BELE</span>
                <span className="brand-name-line">CORTESE<span className="brand-slash" aria-hidden="true" /></span>
              </span>
              <span className="brand-role">Neurodiversidad · Inclusión · Accesibilidad</span>
            </span>
          </a>
          <SiteNav active="contacto" />
        </div>
      </header>

      <main className="page" id="contenido">
        <nav aria-label="Miga de pan">
          <ol className="breadcrumb">
            <li><a href="/#inicio">Inicio</a></li>
            <li aria-current="page">Contacto</li>
          </ol>
        </nav>

        <section className="hero" id="contacto" aria-labelledby="contacto-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="kicker">Contacto</p>
              <h1 id="contacto-title">Hablemos.</h1>
              <p className="hero-lede">Elegí el canal según el motivo. Para Clínica, WhatsApp; para organizaciones, formación y We Love TO, email. No envíes datos clínicos sensibles en formularios.</p>
              <div className="actions">
                <a className="btn btn-primary" href="#canales">Ver canales</a>
                <a className="btn btn-ghost" href="/privacidad">Privacidad</a>
              </div>
            </div>
            <aside className="hero-card">
              <span className="status-badge">Canales a confirmar</span>
              <h2>Un canal por motivo.</h2>
              <p>Clínica: WhatsApp. Organizaciones, formación y We Love TO: email.</p>
              <p className="card-note">El número y las direcciones se publican cuando estén confirmados.</p>
            </aside>
          </div>
        </section>

        <section className="section" id="canales" aria-labelledby="canales-title">
          <div className="section-head">
            <p className="eyebrow">Canales por área</p>
            <h2 id="canales-title">Cada conversación tiene su lugar.</h2>
            <p>Los canales se confirman antes de publicar. La prioridad es que la consulta llegue al espacio correcto sin exponer datos innecesarios.</p>
          </div>
          <div className="channels">
            <article className="channel">
              <span className="channel-badge">WhatsApp</span>
              <h3>Clínica</h3>
              <p>Para iniciar una consulta por atención de Terapia Ocupacional.</p>
              <p className="channel-note">No envíes historia clínica, diagnósticos ni datos sensibles. Número a confirmar.</p>
            </article>
            <article className="channel">
              <span className="channel-badge">Email</span>
              <h3>Accesibilidad e inclusión</h3>
              <p>Para organizaciones deportivas, culturales y organismos públicos.</p>
              <p className="channel-note">Dirección a confirmar.</p>
            </article>
            <article className="channel">
              <span className="channel-badge">Email</span>
              <h3>Formación y experiencias</h3>
              <p>Para propuestas, actividades, avisos y consultas institucionales.</p>
              <p className="channel-note">Dirección a confirmar.</p>
            </article>
            <article className="channel">
              <span className="channel-badge">Email</span>
              <h3>We Love TO</h3>
              <p>Para supervisiones y acceso temprano a la comunidad.</p>
              <p className="channel-note">Dirección a confirmar.</p>
            </article>
            <article className="channel">
              <span className="channel-badge">Email</span>
              <h3>Trayectoria y consultas generales</h3>
              <p>Para prensa, docencia, colaboraciones o consultas que no encajan en las otras áreas.</p>
              <p className="channel-note">Dirección a confirmar.</p>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="form-title">
          <div className="form-layout">
            <div className="section-head">
              <p className="eyebrow">Formulario de contacto</p>
              <h2 id="form-title">Un formulario para ordenar la consulta.</h2>
              <p>El formulario pide lo mínimo para responder. No es el canal clínico y no reemplaza a WhatsApp. Si el envío no está disponible, usá el canal del área.</p>
              <p className="note">No incluyas historias clínicas, diagnósticos ni datos sensibles. Si tu consulta es clínica, usá el canal de Clínica.</p>
            </div>

            <form
              ref={formRef}
              className="form-card"
              id="contact-form"
              action="/api/contacto/"
              method="post"
              aria-labelledby="form-title"
              aria-busy={submitting}
              onSubmit={handleSubmit}
            >
              <h3>Contame brevemente.</h3>
              <p>El formulario cambia según el área. Los campos marcados son obligatorios.</p>
              <div className="field field-full">
                <label htmlFor="contact-area">¿Sobre qué querés consultar?</label>
                <select
                  ref={areaRef}
                  id="contact-area"
                  name="area"
                  required
                  aria-describedby="area-help"
                  value={area}
                  disabled={submitting}
                  onChange={(event) => chooseArea(event.target.value)}
                >
                  <option value="">Elegí un área</option>
                  <option value="clinica">Clínica</option>
                  <option value="accesibilidad">Accesibilidad e inclusión</option>
                  <option value="formacion">Formación y experiencias</option>
                  <option value="welove">We Love TO</option>
                  <option value="general">Trayectoria o consulta general</option>
                </select>
                <p className="help" id="area-help">Al elegir un área se muestran las preguntas correspondientes.</p>
              </div>

              {area === "clinica" ? (
                <fieldset className="form-area">
                  <legend>Clínica</legend>
                  <div className="form-grid">
                    <div className="field">
                      <label htmlFor="clinica-edad">Edad o rango</label>
                      <select id="clinica-edad" name="clinica_edad" required>
                        <option value="">Elegí</option>
                        <option>0 a 6</option><option>7 a 12</option><option>13 a 18</option><option>Adulto</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="clinica-zona">Zona</label>
                      <select id="clinica-zona" name="clinica_zona" required>
                        <option value="">Elegí</option><option>Roldán</option><option>Funes</option><option>Rosario</option><option>Otra</option>
                      </select>
                    </div>
                    <div className="field field-full">
                      <label htmlFor="clinica-motivo">Motivo general de consulta</label>
                      <textarea id="clinica-motivo" name="clinica_motivo" required placeholder="Contá brevemente qué necesitás" />
                      <p className="help">No incluyas diagnósticos, historia clínica ni datos sensibles.</p>
                    </div>
                  </div>
                  <p className="form-area-note">WhatsApp sigue siendo el canal principal para consultas clínicas. No envíes información sensible por el formulario.</p>
                </fieldset>
              ) : null}

              {area === "accesibilidad" ? (
                <fieldset className="form-area">
                  <legend>Accesibilidad e inclusión</legend>
                  <div className="form-grid">
                    <div className="field"><label htmlFor="access-org">Organización</label><input id="access-org" name="access_org" type="text" required /></div>
                    <div className="field"><label htmlFor="access-tipo">Tipo de organización</label><select id="access-tipo" name="access_tipo"><option>Deportiva</option><option>Cultural</option><option>Organismo público</option><option>Otra</option></select></div>
                    <div className="field"><label htmlFor="access-rol">Rol de quien escribe</label><input id="access-rol" name="access_rol" type="text" /></div>
                    <div className="field"><label htmlFor="access-servicio">Servicio de interés</label><select id="access-servicio" name="access_servicio"><option>Diagnóstico y criterios</option><option>Acompañamiento en producción</option><option>Inclusión laboral</option><option>No sé todavía</option></select></div>
                    <div className="field field-full"><label htmlFor="access-mensaje">Mensaje</label><textarea id="access-mensaje" name="access_mensaje" required placeholder="Contanos sobre el proyecto y el momento en que está" /></div>
                  </div>
                </fieldset>
              ) : null}

              {area === "formacion" ? (
                <fieldset className="form-area">
                  <legend>Formación y experiencias</legend>
                  <div className="form-grid">
                    <div className="field"><label htmlFor="formacion-institucion">Institución o grupo</label><input id="formacion-institucion" name="formacion_institucion" type="text" required /></div>
                    <div className="field"><label htmlFor="formacion-publico">Público</label><select id="formacion-publico" name="formacion_publico"><option>Escuelas</option><option>Equipos</option><option>Instituciones</option><option>Familias</option><option>Otro</option></select></div>
                    <div className="field"><label htmlFor="formacion-formato">Formato</label><select id="formacion-formato" name="formacion_formato"><option>Conferencia</option><option>Taller o jornada</option><option>Programa</option><option>Encuentro</option><option>No sé todavía</option></select></div>
                    <div className="field"><label htmlFor="formacion-fechas">Fechas tentativas</label><input id="formacion-fechas" name="formacion_fechas" type="text" placeholder="Mes o período aproximado" /></div>
                    <div className="field field-full"><label htmlFor="formacion-mensaje">Mensaje</label><textarea id="formacion-mensaje" name="formacion_mensaje" required placeholder="Tema, objetivos y cantidad estimada de personas" /></div>
                  </div>
                </fieldset>
              ) : null}

              {area === "welove" ? (
                <fieldset className="form-area">
                  <legend>We Love TO</legend>
                  <div className="form-grid">
                    <div className="field"><label htmlFor="welove-pais">País</label><input id="welove-pais" name="welove_pais" type="text" required /></div>
                    <div className="field"><label htmlFor="welove-rol">Rol</label><select id="welove-rol" name="welove_rol"><option>Terapeuta ocupacional</option><option>Estudiante</option><option>Otro</option></select></div>
                    <div className="field field-full"><label htmlFor="welove-interes">Interés</label><select id="welove-interes" name="welove_interes"><option>Supervisiones</option><option>Materiales</option><option>Encuentros en vivo</option><option>Foro</option><option>Acceso temprano</option><option>No sé todavía</option></select></div>
                    <div className="field field-full"><label htmlFor="welove-mensaje">Mensaje</label><textarea id="welove-mensaje" name="welove_mensaje" required placeholder="Contanos qué te interesa de la comunidad" /></div>
                  </div>
                </fieldset>
              ) : null}

              {area === "general" ? (
                <fieldset className="form-area">
                  <legend>Consulta general</legend>
                  <div className="form-grid">
                    <div className="field field-full"><label htmlFor="general-motivo">Motivo</label><select id="general-motivo" name="general_motivo"><option>Prensa</option><option>Docencia</option><option>Colaboración</option><option>Otra</option></select></div>
                    <div className="field field-full"><label htmlFor="general-mensaje">Mensaje</label><textarea id="general-mensaje" name="general_mensaje" required /></div>
                  </div>
                </fieldset>
              ) : null}

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="contact-name">Nombre y apellido</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required />
                </div>
                <div className="field field-full">
                  <label htmlFor="contact-phone">Teléfono o WhatsApp (opcional)</label>
                  <input id="contact-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className="field field-full">
                  <div className="checkbox">
                    <input id="contact-privacy" type="checkbox" name="privacy" required />
                    <label htmlFor="contact-privacy">Acepto la <a href="/privacidad">política de privacidad</a> y el tratamiento de mis datos para responder esta consulta.</label>
                  </div>
                </div>
              </div>

              <div className="honeypot" hidden>
                <label htmlFor="contact-website">No completar</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <button className="btn" id="contact-submit" type="submit" disabled={!area || submitting} aria-describedby="form-status">
                {submitting ? "Enviando…" : "Enviar consulta"}
              </button>
              <p className="form-status" id="form-status" role="status" aria-live="polite" data-state={status.state}>
                {status.message}
              </p>
              <noscript><p className="form-status">Este formulario necesita JavaScript. Escribinos por el canal del área.</p></noscript>
            </form>
          </div>
        </section>

        <section className="section" aria-labelledby="antes-title">
          <div className="section-head">
            <p className="eyebrow">Antes de escribir</p>
            <h2 id="antes-title">Qué ayuda a responder mejor.</h2>
          </div>
          <div className="cards cards--two">
            <article className="card"><h3>Clínica</h3><p>Edad de la persona, zona donde vive y motivo general de consulta.</p><p className="meta">Sin diagnósticos ni historia clínica</p></article>
            <article className="card"><h3>Organizaciones</h3><p>Tipo de organización, proyecto o instancia y momento en que se encuentra.</p><p className="meta">Sin nombres de clientes reservados</p></article>
            <article className="card"><h3>Formación</h3><p>Público, cantidad estimada, tema o formato de interés y fechas tentativas.</p><p className="meta">Sin fechas inventadas</p></article>
            <article className="card"><h3>We Love TO</h3><p>Rol, país y tipo de interés: supervisión, materiales o acceso temprano.</p><p className="meta">Sin datos sensibles</p></article>
          </div>
        </section>

        <section className="section" aria-labelledby="faq-title">
          <div className="section-head">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 id="faq-title">Sobre los canales y los datos.</h2>
          </div>
          <div className="faq">
            <details><summary>¿Qué canal uso para una consulta clínica?</summary><p>WhatsApp es el canal principal para Clínica. No envíes datos clínicos sensibles en formularios.</p></details>
            <details><summary>¿Qué canal uso para una organización?</summary><p>Email es el canal principal para organizaciones, formación y We Love TO.</p></details>
            <details><summary>¿Qué incluyo en el mensaje?</summary><p>Motivo general, área de interés, nombre y un medio de contacto. Para Clínica, edad y zona; para organización, tipo de proyecto; para formación, público y tema.</p></details>
            <details><summary>¿Puedo enviar diagnósticos o historia clínica?</summary><p>No. No se solicitan datos clínicos sensibles para iniciar una consulta.</p></details>
            <details><summary>¿Cuándo se confirman los canales?</summary><p>El número de WhatsApp y las direcciones de email se publican cuando estén confirmados.</p></details>
            <details><summary>¿Hay tiempos de respuesta publicados?</summary><p>No se publican tiempos de respuesta sin confirmar.</p></details>
          </div>
        </section>

        <footer className="site-footer">
          <div>
            <p className="eyebrow" style={{ color: "var(--neon)" }}>Bele Cortese</p>
            <h2>Una marca, cuatro recorridos.</h2>
            <p>Contacto es transversal. Los canales se ordenan por área para que cada conversación llegue al espacio correcto.</p>
          </div>
          <div>
            <nav className="footer-links" aria-label="Enlaces del sitio">
              <a href="/#inicio">Inicio</a><a href="/clinica">Clínica</a><a href="/accesibilidad-inclusion">Accesibilidad</a><a href="/formacion">Formación</a><a href="/we-love-to">We Love TO</a><a href="/trayectoria">Trayectoria</a><a href="#contacto">Contacto</a><a href="/accesibilidad-del-sitio">Accesibilidad del sitio</a><a href="/privacidad">Privacidad</a><a href="https://www.instagram.com/to.belencortese/" target="_blank" rel="noopener noreferrer">Instagram · externo</a>
            </nav>
          </div>
        </footer>
      </main>
    </>
  );
}
