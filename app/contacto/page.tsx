import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.contacto;

export default function ContactoPage() {
  return <StaticPage slug="contacto" withScripts />;
}
