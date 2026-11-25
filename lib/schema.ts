import {
  ogImageUrl,
  siteDescription,
  siteInstagram,
  siteName,
  siteTagline,
  siteUrl,
} from "@/lib/metadata";

const personId = `${siteUrl}/#maria-belen-cortese`;
const serviceId = `${siteUrl}/#bele-cortese`;
const websiteId = `${siteUrl}/#website`;

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "es-AR",
      publisher: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "María Belén Cortese",
      alternateName: siteName,
      jobTitle: "Terapeuta Ocupacional",
      description:
        "Terapeuta Ocupacional. Clínica, accesibilidad e inclusión, formación y comunidad profesional.",
      url: `${siteUrl}/trayectoria/`,
      image: ogImageUrl,
      sameAs: [siteInstagram],
      knowsAbout: [
        "Terapia Ocupacional",
        "Integración sensorial",
        "Accesibilidad e inclusión",
        "Formación y experiencias",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": serviceId,
      name: siteName,
      url: siteUrl,
      image: ogImageUrl,
      description: siteDescription,
      slogan: siteTagline,
      founder: { "@id": personId },
      sameAs: [siteInstagram],
      serviceType: "Terapia Ocupacional",
      areaServed: [
        { "@type": "City", name: "Roldán" },
        { "@type": "City", name: "Funes" },
        { "@type": "City", name: "Rosario" },
        { "@type": "Country", name: "Argentina" },
      ],
      availableLanguage: "es",
      knowsAbout: [
        "Terapia Ocupacional",
        "Integración sensorial",
        "Accesibilidad e inclusión",
        "Formación y experiencias",
      ],
    },
  ],
};
