import type { Metadata } from "next";
import AccesibilidadSitioPage from "@/components/AccesibilidadSitioPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata["accesibilidad-sitio"];

export default function Page() {
  return <AccesibilidadSitioPage />;
}
