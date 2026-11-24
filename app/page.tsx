import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.home;

export default function HomePage() {
  return <StaticPage slug="home" withScripts />;
}
