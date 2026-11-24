import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata["accesibilidad-sitio"];

export default function AccesibilidadSitioPage() {
  return <StaticPage slug="accesibilidad-sitio" />;
}
