import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.trayectoria;

export default function TrayectoriaPage() {
  return <StaticPage slug="trayectoria" />;
}
