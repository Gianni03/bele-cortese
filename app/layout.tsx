import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { sharedMetadata } from "@/lib/metadata";
import { siteSchema } from "@/lib/schema";

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body>
        {children}
        <JsonLd data={siteSchema} />
        <Script src="/consent.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
