import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.clinica;

export default function ClinicaPage() {
  return <StaticPage slug="clinica" />;
}
