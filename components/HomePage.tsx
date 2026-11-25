"use client";

import { useEffect, useRef, useState, type CSSProperties, type FocusEvent } from "react";
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

const WAVE_LINES = 7;
const WAVE_WAVES = 7;
const WAVE_SEGMENTS = 120;

function wavePath(radius: number, phase: number, amplitude: number) {
  const points: string[] = [];

  for (let step = 0; step <= WAVE_SEGMENTS; step += 1) {
    const angle = (step / WAVE_SEGMENTS) * Math.PI * 2;
    const wobble = Math.sin(angle * WAVE_WAVES + phase) * amplitude;
    const currentRadius = radius + wobble;
    const x = 50 + Math.cos(angle) * currentRadius;
    const y = 50 + Math.sin(angle) * currentRadius;
    points.push(`${step === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`);
  }

  return `${points.join(" ")} Z`;
}

function SonarRing({ active }: { active: boolean }) {
  const pathRefs = useRef<Array<SVGPathElement | null>>([]);

  useEffect(() => {
    let frame = 0;

    const draw = (time: number) => {
      const phase = time * 0.00055;

      pathRefs.current.forEach((path, index) => {
        if (!path) return;
        path.setAttribute(
          "d",
          wavePath(33 + index * 1.05, phase + index * 0.38, 0.8 + index * 0.07),
        );
      });

      if (active) frame = window.requestAnimationFrame(draw);
    };

    draw(0);
    if (active) frame = window.requestAnimationFrame(draw);

    return () => window.cancelAnimationFrame(frame);
  }, [active]);

  return (
    <g className="sound-wave">
      <defs>
        <linearGradient id="sound-wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8F000" />
          <stop offset="50%" stopColor="#F4C430" />
          <stop offset="100%" stopColor="#EDE4D1" />
        </linearGradient>
      </defs>
      {Array.from({ length: WAVE_LINES }, (_, index) => (
        <path
          key={index}
          ref={(node) => { pathRefs.current[index] = node; }}
          fill="none"
          stroke="url(#sound-wave-gradient)"
          strokeWidth={0.38 + index * 0.025}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.3 + index * 0.07}
          d={wavePath(33 + index * 1.05, index * 0.38, 0.8 + index * 0.07)}
        />
      ))}
    </g>
  );
}

const cardFinalBackground: Record<string, string> = {
  clinic: "#0B3A42",
  access: "var(--cream)",
  training: "var(--neon)",
  welove: "var(--black)",
};

function getCardStyles(trigger: HTMLButtonElement, name: string) {
  const rect = trigger.getBoundingClientRect();
  const computed = getComputedStyle(trigger);
  const width = Math.min(620, window.innerWidth - 32);
  const height = Math.min(340, window.innerHeight - 120);
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const left = Math.max(16, Math.min(centerX - width / 2, window.innerWidth - width - 16));
  const top = Math.max(88, Math.min(centerY - height / 2, window.innerHeight - height - 16));

  const start: CSSProperties = {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    borderRadius: computed.borderRadius,
    backgroundColor: computed.backgroundColor,
  };

  const end: CSSProperties = {
    top,
    left,
    width,
    height,
    borderRadius: "0.9rem",
    backgroundColor: cardFinalBackground[name],
  };

  return { start, end };
}

export default function HomePage() {
  const [openSphere, setOpenSphere] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);
  const [cardStyle, setCardStyle] = useState<CSSProperties | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [contactArea, setContactArea] = useState("");

  const sphereRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const cardCloseTimer = useRef<number | null>(null);
  const hoverCloseTimer = useRef<number | null>(null);
  const suppressFocusOpen = useRef(false);
  const motionChoiceMade = useRef(false);

  const clearHoverClose = () => {
    if (hoverCloseTimer.current !== null) window.clearTimeout(hoverCloseTimer.current);
    hoverCloseTimer.current = null;
  };

  const scheduleClose = () => {
    if (pinned) return;
    clearHoverClose();
    hoverCloseTimer.current = window.setTimeout(() => {
      if (!openSphere || pinned) return;
      const trigger = sphereRefs.current[openSphere];
      const card = document.getElementById(`orbit-card-${openSphere}`);
      const pointerOnActiveRegion = trigger?.matches(":hover") || card?.matches(":hover");
      const focusInActiveRegion = trigger?.matches(":focus") || card?.contains(document.activeElement);
      if (!pointerOnActiveRegion && !focusInActiveRegion) closeCard();
    }, 260);
  };

  const closeCard = (options: CloseOptions = {}) => {
    if (!openSphere) return;
    clearHoverClose();
    const active = openSphere;
    const trigger = sphereRefs.current[active];

    if (!trigger) {
      setOpenSphere(null);
      setCardStyle(null);
      setIsClosing(false);
      return;
    }

    const { start } = getCardStyles(trigger, active);
    setPinned(false);
    setCardStyle(start);
    setIsClosing(true);

    if (cardCloseTimer.current !== null) window.clearTimeout(cardCloseTimer.current);
    cardCloseTimer.current = window.setTimeout(() => {
      setOpenSphere(null);
      setCardStyle(null);
      setIsClosing(false);

      if (options.returnFocus) {
        suppressFocusOpen.current = true;
        sphereRefs.current[active]?.focus();
        window.setTimeout(() => {
          suppressFocusOpen.current = false;
        }, 0);
      }
    }, 460);
  };

  const openCard = (name: string, pin = false) => {
    const trigger = sphereRefs.current[name];
    if (!trigger) return;

    clearHoverClose();
    if (cardCloseTimer.current !== null) window.clearTimeout(cardCloseTimer.current);

    const { start, end } = getCardStyles(trigger, name);
    setIsClosing(false);
    setPinned(pin);
    setCardStyle(start);
    setOpenSphere(name);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setCardStyle(end);
      });
    });
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
    if (target) openCard(target.getAttribute("data-sphere") || "", false);
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
            </div>
          </div>

          <figure
            className="orbit-stage"
            id="orbit-stage"
            aria-labelledby="orbit-caption"
            data-open={openSphere || undefined}
            onFocus={handleStageFocus}
          >
            <svg className="orbit-path" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
              <SonarRing active={motionEnabled} />
            </svg>

            {areas.map((area) => (
              <button
                key={area.name}
                ref={(node) => { sphereRefs.current[area.name] = node; }}
                className={`sphere ${area.sphereClass}${openSphere === area.name ? " is-active" : ""}`}
                type="button"
                data-sphere={area.name}
                aria-expanded={openSphere === area.name}
                aria-controls={`orbit-card-${area.name}`}
                inert={Boolean(openSphere && openSphere !== area.name)}
                onPointerEnter={(event) => {
                  if (openSphere === area.name) return;
                  if (event.pointerType === "mouse" || event.pointerType === "pen") openCard(area.name, false);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse" || event.pointerType === "pen") scheduleClose();
                }}
                onClick={() => openCard(area.name, true)}
              >
                <span className="sphere-label">{area.label}</span>
              </button>
            ))}

            {areas.map((area) => (
              <article
                key={area.name}
                className={`orbit-card ${area.cardClass}${openSphere === area.name ? " is-open" : ""}${isClosing ? " is-closing" : ""}`}
                id={`orbit-card-${area.name}`}
                data-orbit-card={area.name}
                data-side={area.side}
                aria-labelledby={`orbit-card-${area.name}-title`}
                aria-hidden={openSphere !== area.name}
                inert={openSphere !== area.name}
                style={openSphere === area.name ? cardStyle ?? undefined : undefined}
                onPointerEnter={clearHoverClose}
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
