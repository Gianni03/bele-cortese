import type { Metadata } from "next";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://belencortese.com.ar";
export const siteUrl = rawSiteUrl.replace(/\/$/, "");

export const sharedMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bele Cortese — Otra manera de mirar.",
    template: "%s | Bele Cortese",
  },
  description:
    "Terapia ocupacional, accesibilidad e inclusión. Una marca común para cuatro formas de acompañar y trabajar.",
  robots: { index: false, follow: false },
  icons: { icon: "/Diseños/logosolo.png" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Bele Cortese",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bele Cortese — Otra manera de mirar.",
      },
    ],
  },
};

export const pageMetadata: Record<string, Metadata> = {
  home: {
    title: "Otra manera de mirar.",
    description:
      "Terapia ocupacional, accesibilidad e inclusión. Una marca común para cuatro formas de acompañar y trabajar.",
  },
  clinica: {
    title: "Clínica",
    description:
      "Terapia Ocupacional de 0 a 18 años en Roldán, Funes y Rosario según zona y edad. Evaluación, tratamiento, intensivo, alimentación y perfil sensorial.",
  },
  accesibilidad: {
    title: "Accesibilidad e inclusión",
    description:
      "Diagnóstico y criterios, acompañamiento en producción e inclusión laboral para organizaciones, espacios y eventos.",
  },
  formacion: {
    title: "Formación y experiencias",
    description:
      "Formación para escuelas, equipos e instituciones sobre integración sensorial, accesibilidad, inclusión y comunidad profesional.",
  },
  welove: {
    title: "We Love TO",
    description:
      "Comunidad profesional de Terapia Ocupacional: supervisiones, materiales, encuentros y acceso temprano.",
  },
  trayectoria: {
    title: "Trayectoria",
    description:
      "María Belén Cortese, Terapeuta Ocupacional. Clínica, accesibilidad e inclusión, formación y comunidad profesional.",
  },
  contacto: {
    title: "Contacto",
    description:
      "Canales de contacto de Bele Cortese: WhatsApp para Clínica y email para organizaciones, formación y We Love TO. Sin datos clínicos sensibles.",
  },
  "accesibilidad-sitio": {
    title: "Accesibilidad del sitio",
    description:
      "Qué está implementado, cómo se prueba y cómo reportar una barrera de accesibilidad en el sitio de Bele Cortese.",
  },
  privacidad: {
    title: "Privacidad",
    description:
      "Política de privacidad y tratamiento de datos de Bele Cortese. Texto en revisión legal antes de publicar.",
  },
};
