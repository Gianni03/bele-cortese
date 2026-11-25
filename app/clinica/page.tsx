import type { Metadata } from "next";
import ClinicaPage from "@/components/ClinicaPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.clinica;

export default function Page() {
  return <ClinicaPage />;
}
