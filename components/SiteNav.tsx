"use client";

import { useEffect, useState, type ReactNode } from "react";

type NavKey = "inicio" | "clinica" | "accesibilidad" | "formacion" | "welove" | "contacto";

const links: Array<{ key: NavKey; href: string; label: string }> = [
  { key: "inicio", href: "/", label: "Inicio" },
  { key: "clinica", href: "/clinica", label: "Clínica" },
  { key: "accesibilidad", href: "/accesibilidad-inclusion", label: "Accesibilidad" },
  { key: "formacion", href: "/formacion", label: "Formación" },
  { key: "welove", href: "/we-love-to", label: "We Love TO" },
  { key: "contacto", href: "/contacto", label: "Contacto" },
];

export default function SiteNav({ active, motion }: { active?: NavKey; motion?: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className={`main-nav${open ? " is-open" : ""}`} aria-label="Navegación principal">
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "Cerrar" : "Menú"}
      </button>
      <div className="nav-links" id="site-menu">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            aria-current={active === link.key ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
        {motion}
      </div>
    </nav>
  );
}
