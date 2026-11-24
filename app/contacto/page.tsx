import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.contacto;

export default function Page() {
  return <ContactPage />;
}
