import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.formacion;

export default function FormacionPage() {
  return <StaticPage slug="formacion" />;
}
