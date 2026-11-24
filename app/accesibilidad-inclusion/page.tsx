import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.accesibilidad;

export default function AccesibilidadPage() {
  return <StaticPage slug="accesibilidad" />;
}
