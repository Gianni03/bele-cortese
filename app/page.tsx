import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.home;

export default function Page() {
  return <HomePage />;
}
