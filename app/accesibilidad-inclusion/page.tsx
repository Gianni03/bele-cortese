import type { Metadata } from "next";
import AccesibilidadPage from "@/components/AccesibilidadPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.accesibilidad;

export default function Page() {
  return <AccesibilidadPage />;
}
