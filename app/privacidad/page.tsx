import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.privacidad;

export default function PrivacidadPage() {
  return <StaticPage slug="privacidad" />;
}
