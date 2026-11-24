"use client";

import { useEffect, useLayoutEffect, useRef, useState, type FocusEvent } from "react";
import { pages } from "@/content/pages";

type Area = {
  name: string;
  label: string;
  sphereClass: string;
  cardClass: string;
  side: "left" | "right";
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  href: string;
  guard?: boolean;
};

const areas: Area[] = [
  {
    name: "clinic",
    label: "Clínica",
    sphereClass: "sphere-clinic",
    cardClass: "expanded-clinic",
    side: "left",
    eyebrow: "Clínica · familias",
    title: "Acompañamiento en Terapia Ocupacional",
    description: "Para niñas, niños y adolescentes. Con objetivos claros y participación en los entornos cotidianos.",
    items: ["Evaluación", "Tratamiento", "Tratamiento intensivo", "Alimentación", "Perfil sensorial en adultos"],
    href: "/clinica",
  },
  {
    name: "access",
    label: "Accesibilidad e inclusión",
    sphereClass: "sphere-access",
    cardClass: "expanded-access",
    side: "right",
    eyebrow: "Organizaciones",
    title: "Accesibilidad e inclusión",
    description: "Para organizaciones deportivas, culturales y organismos públicos.",
    items: ["Diagnóstico y criterios", "Acompañamiento en producción", "Inclusión laboral"],
    href: "/accesibilidad-inclusion",
  },
  {
    name: "training",
    label: "Formación y experiencias",
    sphereClass: "sphere-training",
    cardClass: "expanded-training",
    side: "left",
    eyebrow: "Instituciones, equipos y familias",
    title: "Formación y experiencias",
    description: "Propuestas para escuelas, equipos, instituciones y familias.",
    items: ["Conferencias", "Talleres y jornadas", "Programas", "Encuentros"],
    href: "/formacion",
  },
  {
    name: "welove",
    label: "We Love TO",
    sphereClass: "sphere-welove",
    cardClass: "expanded-welove",
    side: "right",
    eyebrow: "Comunidad profesional",
    title: "We Love TO",
    description: "Supervisión y comunidad para terapeutas ocupacionales y estudiantes de Latinoamérica.",
    items: ["Supervisiones", "Materiales", "Encuentros en vivo", "Foro"],
    href: "/we-love-to",
    guard: true,
  },
];

type CloseOptions = { returnFocus?: boolean };

export default function HomePage() {
  const [openSphere, setOpenSphere] = useState<string | null>(null);
  const [cardTop, setCardTop] = useState<number | null>(null);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [contactArea, setContactArea] = useState("");

  const sphereRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const closeTimer = useRef<number | null>(null);
  const suppressFocusOpen = useRef(false);
  const motionChoiceMade = useRef(false);

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const closeCard = (options: CloseOptions = {}) => {
    clearCloseTimer();
    if (!openSphere) return;
    const active = openSphere;
    setOpenSphere(null);
    setCardTop(null);

    if (options.returnFocus) {
      suppressFocusOpen.current = true;
      window.requestAnimationFrame(() => {
        sphereRefs.current[active]?.focus();
        window.setTimeout(() => {
          suppressFocusOpen.current = false;
        }, 0);
      });
    }
  };

  const openCard = (name: string) => {
    clearCloseTimer();
    setOpenSphere(name);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      if (!openSphere) return;
      const trigger = sphereRefs.current[openSphere];
      const card = cardRefs.current[openSphere];
      const pointerOnActiveRegion = trigger?.matches(":hover") || card?.matches(":hover");
      const focusInActiveRegion = trigger?.matches(":focus") || card?.contains(document.activeElement);
      if (!pointerOnActiveRegion && !focusInActiveRegion) closeCard();
    }, 500);
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (!motionChoiceMade.current) setMotionEnabled(!event.matches);
    };

    setMotionEnabled(!reducedMotion.matches);
    reducedMotion.addEventListener("change", handleChange);
    return () => reducedMotion.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("motion-enabled", motionEnabled);
    return () => document.body.classList.remove("motion-enabled");
  }, [motionEnabled]);

  useLayoutEffect(() => {
    if (!openSphere) {
      setCardTop(null);
      return;
    }

    const updatePosition = () => {
      if (!window.matchMedia("(min-width: 940px)").matches) {
        setCardTop(null);
        return;
      }

      const trigger = sphereRefs.current[openSphere];
      const card = cardRefs.current[openSphere];
      if (!trigger || !card) return;

      const triggerRect = trigger.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const minTop = 88;
      const maxTop = window.innerHeight - cardRect.height - 16;
      const top = Math.max(minTop, Math.min(triggerRect.top + triggerRect.height / 2 - cardRect.height / 2, maxTop));
      setCardTop(top);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [openSphere]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (openSphere && !target?.closest("[data-sphere], [data-orbit-card]")) closeCard();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openSphere) closeCard({ returnFocus: true });
      if (["PageDown", "PageUp"].includes(event.key) && openSphere) closeCard();
    };
    const handleClose = () => {
      if (openSphere) closeCard();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleClose, { passive: true });
    window.addEventListener("touchmove", handleClose, { passive: true });
    window.addEventListener("resize", handleClose);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleClose);
      window.removeEventListener("touchmove", handleClose);
      window.removeEventListener("resize", handleClose);
    };
  }, [openSphere]);

  const handleStageFocus = (event: FocusEvent<HTMLElement>) => {
    if (suppressFocusOpen.current) return;
    const target = event.target instanceof Element ? event.target.closest("[data-sphere]") : null;
    if (target) openCard(target.getAttribute("data-sphere") || "");
  };

  const handleStageBlur = (event: FocusEvent<HTMLElement>) => {
    const currentTarget = event.currentTarget;
    window.setTimeout(() => {
      if (openSphere && !currentTarget.contains(document.activeElement)) closeCard();
    }, 0);
  };

  const contactHref = contactArea ? `/contacto?area=${contactArea}` : "/contacto";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pages.home.style }} />

      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#inicio">
            <img src="/Diseños/logosolo.png" alt="" width="194" height="200" />
            <span>
              <span className="brand-name">
                <span className="brand-name-line">BELE</span>
                <span className="brand-name-line">CORTESE<span className="brand-slash" aria-hidden="true" /></span>
              </span>
              <span className="brand-role">Neurodiversidad · Inclusión · Accesibilidad</span>
            </span>
          </a>
          <nav className="main-nav" aria-label="Recorridos principales">
            <a href="/clinica">Clínica</a>
            <a href="/accesibilidad-inclusion">Accesibilidad</a>
            <a href="/formacion">Formación</a>
            <a href="/we-love-to">We Love TO</a>
            <span className="motion-control">
              <span className="motion-status" id="motion-status" aria-live="polite">{motionEnabled ? "Activado" : "Pausado"}</span>
              <button
                className="motion-toggle"
                id="motion-toggle"
                type="button"
                aria-pressed={motionEnabled}
                aria-describedby="motion-status"
                onClick={() => {
                  motionChoiceMade.current = true;
                  setMotionEnabled((enabled) => !enabled);
                }}
              >
                Movimiento
              </button>
            </span>
          </nav>
        </div>
      </header>

      <main className="page" id="contenido">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Terapia Ocupacional · Neurodiversidad · Inclusión</p>
            <h1 id="hero-title" aria-label="Bele Cortese">
              <span className="wordmark-line">BELE</span>
              <span className="wordmark-line">CORTESE<span className="brand-slash" aria-hidden="true" /></span>
            </h1>
            <span className="tagline">Otra manera de mirar.</span>
            <p className="descriptor">Neurodiversidad · Inclusión · Accesibilidad</p>
            <p className="hero-support">Una marca, cuatro formas de acompañar y trabajar: clínica, accesibilidad, formación y comunidad profesional.</p>
            <div className="actions">
              <a className="btn btn-primary" href="#areas">Explorar las áreas</a>
              <a className="btn btn-ghost" href="/trayectoria">Conocer la trayectoria</a>
            </div>
            <p className="hero-byline">María Belén Cortese · Terapeuta Ocupacional · <a href="/trayectoria">Trayectoria</a></p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <img className="dot-mark" src="/Diseños/logosolo.png" alt="" width="194" height="200" />
          </div>
        </section>

        <section className="areas" id="areas" aria-labelledby="areas-title">
          <div className="areas-copy">
            <div className="areas-head">
              <p className="eyebrow">Una identidad · cuatro recorridos</p>
              <h2 id="areas-title">Elegí por dónde empezar.</h2>
              <p>Cuatro esferas fijas conectadas por un trazo sonograma. Se ondulan los bordes, se dispersa el halo y el trazo pulsa; no orbitan ni cambian de posición. Hover o foco abre la card; en móvil, tocar. Se cierra al tocar fuera o hacer scroll.</p>
            </div>
            <p className="stage-help">Movimiento activo por defecto; se pausa desde la navbar. Si el sistema prefiere movimiento reducido, inicia estático. Sin flecha/X: se cierra al tocar fuera, hacer scroll o presionar Escape.</p>
          </div>

          <figure
            className="orbit-stage"
            id="orbit-stage"
            aria-labelledby="orbit-caption"
            data-open={openSphere || undefined}
            onFocus={handleStageFocus}
            onBlur={handleStageBlur}
          >
            <svg className="orbit-path" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
              <path className="ring" d="M50 14 C67 14 81 28 86 43 C90 57 83 73 70 82 C57 91 39 89 27 81 C13 71 9 53 15 37 C21 22 34 14 50 14Z" />
              <path className="pulse" d="M40 15 H45 L48 12 L51 19 L54 10 L58 17 H64" />
            </svg>

            {areas.map((area) => (
              <button
                key={area.name}
                ref={(node) => { sphereRefs.current[area.name] = node; }}
                className={`sphere ${area.sphereClass}`}
                type="button"
                data-sphere={area.name}
                aria-expanded={openSphere === area.name}
                aria-controls={`orbit-card-${area.name}`}
                inert={Boolean(openSphere && openSphere !== area.name)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse" || event.pointerType === "pen") openCard(area.name);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse" || event.pointerType === "pen") scheduleClose();
                }}
                onClick={() => openCard(area.name)}
              >
                <span className="sphere-label">{area.label}</span>
              </button>
            ))}

            {areas.map((area) => (
              <article
                key={area.name}
                ref={(node) => { cardRefs.current[area.name] = node; }}
                className={`orbit-card ${area.cardClass}`}
                id={`orbit-card-${area.name}`}
                data-orbit-card={area.name}
                data-side={area.side}
                aria-labelledby={`orbit-card-${area.name}-title`}
                hidden={openSphere !== area.name}
                style={openSphere === area.name && cardTop !== null ? { top: `${cardTop}px` } : undefined}
                onPointerEnter={clearCloseTimer}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse" || event.pointerType === "pen") scheduleClose();
                }}
              >
                {area.guard ? <div className="expanded-guard" aria-hidden="true" /> : null}
                <p className="expanded-label">{area.eyebrow}</p>
                <h3 id={`orbit-card-${area.name}-title`}>{area.title}</h3>
                <p>{area.description}</p>
                <ul className="card-list">
                  {area.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <a className="card-cta" href={area.href}>Ingresar</a>
              </article>
            ))}

            <div className="center-anchor" aria-hidden="true">
              <div className="center-lockup-origin">
                <div className="center-wordmark">
                  <span className="center-wordmark-line">BELE</span>
                  <span className="center-wordmark-line">CORTESE<span className="brand-slash" aria-hidden="true" /></span>
                </div>
              </div>
            </div>
            <figcaption id="orbit-caption" className="visually-hidden">Lockup BELE CORTESE / en una esfera central; cuatro esferas de área permanecen fijas y conectadas por un trazo sonograma, sin movimiento orbital.</figcaption>
          </figure>
        </section>

        <section className="trust" aria-labelledby="trust-title">
          <div className="trust-grid">
            <div className="trust-copy">
              <p className="eyebrow">Trayectoria</p>
              <h2 id="trust-title">Una práctica que conecta clínica, accesibilidad y formación.</h2>
              <p>María Belén Cortese es Terapeuta Ocupacional. Su trabajo reúne atención clínica, docencia, accesibilidad e inclusión, y acompañamiento a organizaciones. Las credenciales y la experiencia verificadas se publican en Trayectoria.</p>
              <a className="trust-link" href="/trayectoria">Conocer la trayectoria</a>
            </div>
            <aside className="trust-card">
              <p className="name">María Belén Cortese</p>
              <p className="role">Terapeuta Ocupacional</p>
              <p>Credenciales, formación y experiencia profesional con revisión previa a la publicación.</p>
            </aside>
          </div>
        </section>

        <section className="contact-home" aria-labelledby="home-contact-title">
          <div className="contact-home-inner">
            <div>
              <p className="eyebrow">Contacto</p>
              <h2 id="home-contact-title">Hablemos.</h2>
              <p>Elegí el área y te llevamos al formulario correspondiente. Para una consulta clínica, WhatsApp sigue siendo el canal principal.</p>
            </div>
            <div className="contact-home-actions">
              <label htmlFor="home-area">¿Sobre qué querés consultar?</label>
              <select id="home-area" value={contactArea} onChange={(event) => setContactArea(event.target.value)}>
                <option value="">Elegí un área</option>
                <option value="clinica">Clínica</option>
                <option value="accesibilidad">Accesibilidad e inclusión</option>
                <option value="formacion">Formación y experiencias</option>
                <option value="welove">We Love TO</option>
                <option value="general">Trayectoria o consulta general</option>
              </select>
              <a className="btn" id="home-contact-link" href={contactHref}>Ir al formulario</a>
            </div>
          </div>
        </section>

        <footer className="site-footer" id="contacto">
          <div>
            <p className="eyebrow" style={{ color: "var(--neon)" }}>Bele Cortese</p>
            <h2>Una marca, cuatro recorridos.</h2>
            <p>Clínica, accesibilidad, formación y comunidad profesional. Trayectoria, Contacto, Accesibilidad del sitio y Privacidad acompañan el recorrido sin competir con las cuatro áreas.</p>
          </div>
          <div>
            <nav className="footer-links" aria-label="Enlaces del sitio">
              <a href="/clinica">Clínica</a>
              <a href="/accesibilidad-inclusion">Accesibilidad</a>
              <a href="/formacion">Formación</a>
              <a href="/we-love-to">We Love TO</a>
              <a href="/trayectoria">Trayectoria</a>
              <a href="/contacto">Contacto</a>
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
