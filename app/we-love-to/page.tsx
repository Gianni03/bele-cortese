import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.welove;

export default function WeLoveToPage() {
  return <StaticPage slug="welove" />;
}
