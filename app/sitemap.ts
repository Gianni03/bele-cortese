import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";

const paths = [
  "/",
  "/clinica/",
  "/accesibilidad-inclusion/",
  "/formacion/",
  "/we-love-to/",
  "/trayectoria/",
  "/contacto/",
  "/accesibilidad-del-sitio/",
  "/privacidad/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
