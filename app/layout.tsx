import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { sharedMetadata } from "@/lib/metadata";

export const metadata: Metadata = sharedMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body>
        {children}
        <Script src="/consent.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
