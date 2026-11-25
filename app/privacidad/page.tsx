import type { Metadata } from "next";
import PrivacidadPage from "@/components/PrivacidadPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.privacidad;

export default function Page() {
  return <PrivacidadPage />;
}
