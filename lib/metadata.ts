import type { Metadata } from "next";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://belencortese.com.ar";
export const siteUrl = rawSiteUrl.replace(/\/$/, "");

export const siteName = "Bele Cortese";
export const siteInstagram = "https://www.instagram.com/to.belencortese/";
export const siteDescription =
  "Terapia ocupacional, accesibilidad e inclusión. Una marca común para cuatro formas de acompañar y trabajar.";
export const siteTagline = "Otra manera de mirar.";
export const ogImageUrl = new URL("/og-image.png", siteUrl).toString();

const sharedOpenGraph = {
  type: "website" as const,
  locale: "es_AR",
  siteName,
  images: [
    {
      url: ogImageUrl,
      width: 1200,
      height: 630,
      alt: `${siteName} — ${siteTagline}`,
    },
  ],
};

const sharedTwitter = {
  card: "summary_large_image" as const,
  title: `${siteName} — ${siteTagline}`,
  description: siteDescription,
  images: [ogImageUrl],
};

export const sharedMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ${siteTagline}`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  robots: { index: false, follow: false },
  icons: { icon: "/Diseños/logosolo.png" },
  openGraph: sharedOpenGraph,
  twitter: sharedTwitter,
};

type PageInput = {
  title: string;
  description: string;
  path: string;
  titleAbsolute?: string;
};

function buildPageMetadata({ title, description, path, titleAbsolute }: PageInput): Metadata {
  const canonical = new URL(path, siteUrl).toString();
  const socialTitle = titleAbsolute ?? `${title} | ${siteName}`;

  return {
    title: titleAbsolute ? { absolute: titleAbsolute } : title,
    description,
    alternates: { canonical },
    openGraph: {
      ...sharedOpenGraph,
      title: socialTitle,
      description,
      url: canonical,
    },
    twitter: {
      ...sharedTwitter,
      title: socialTitle,
      description,
    },
  };
}

export const pageMetadata: Record<string, Metadata> = {
  home: buildPageMetadata({
    title: siteTagline,
    titleAbsolute: `${siteName} — ${siteTagline}`,
    description: siteDescription,
    path: "/",
  }),
  clinica: buildPageMetadata({
    title: "Clínica",
    description:
      "Terapia Ocupacional de 0 a 18 años en Roldán, Funes y Rosario según zona y edad. Evaluación, tratamiento, intensivo, alimentación y perfil sensorial.",
    path: "/clinica/",
  }),
  accesibilidad: buildPageMetadata({
    title: "Accesibilidad e inclusión",
    description:
      "Diagnóstico y criterios, acompañamiento en producción e inclusión laboral para organizaciones, espacios y eventos.",
    path: "/accesibilidad-inclusion/",
  }),
  formacion: buildPageMetadata({
    title: "Formación y experiencias",
    description:
      "Formación para escuelas, equipos e instituciones sobre integración sensorial, accesibilidad, inclusión y comunidad profesional.",
    path: "/formacion/",
  }),
  welove: buildPageMetadata({
    title: "We Love TO",
    description:
      "Comunidad profesional de Terapia Ocupacional: supervisiones, materiales, encuentros y acceso temprano.",
    path: "/we-love-to/",
  }),
  trayectoria: buildPageMetadata({
    title: "Trayectoria",
    description:
      "María Belén Cortese, Terapeuta Ocupacional. Clínica, accesibilidad e inclusión, formación y comunidad profesional.",
    path: "/trayectoria/",
  }),
  contacto: buildPageMetadata({
    title: "Contacto",
    description:
      "Canales de contacto de Bele Cortese: WhatsApp para Clínica y email para organizaciones, formación y We Love TO. Sin datos clínicos sensibles.",
    path: "/contacto/",
  }),
  "accesibilidad-sitio": buildPageMetadata({
    title: "Accesibilidad del sitio",
    description:
      "Qué está implementado, cómo se prueba y cómo reportar una barrera de accesibilidad en el sitio de Bele Cortese.",
    path: "/accesibilidad-del-sitio/",
  }),
  privacidad: buildPageMetadata({
    title: "Privacidad",
    description:
      "Política de privacidad y tratamiento de datos de Bele Cortese. Texto en revisión legal antes de publicar.",
    path: "/privacidad/",
  }),
};
