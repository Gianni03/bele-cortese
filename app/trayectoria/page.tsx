import type { Metadata } from "next";
import TrayectoriaPage from "@/components/TrayectoriaPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.trayectoria;

export default function Page() {
  return <TrayectoriaPage />;
}
