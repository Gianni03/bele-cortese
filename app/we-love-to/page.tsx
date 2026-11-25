import type { Metadata } from "next";
import WeLoveToPage from "@/components/WeLoveToPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.welove;

export default function Page() {
  return <WeLoveToPage />;
}
