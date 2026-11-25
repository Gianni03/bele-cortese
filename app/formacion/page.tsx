import type { Metadata } from "next";
import FormacionPage from "@/components/FormacionPage";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata.formacion;

export default function Page() {
  return <FormacionPage />;
}
