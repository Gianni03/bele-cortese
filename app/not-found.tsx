import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscás no existe o cambió de dirección.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background: "#002931",
        color: "#EDE4D1",
        fontFamily: "Manrope, Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "38rem" }}>
        <img
          src="/Diseños/logosolo.png"
          alt=""
          width="96"
          height="99"
          style={{ marginBottom: "1.5rem" }}
        />
        <p
          style={{
            margin: "0 0 .6rem",
            color: "#E8F000",
            fontFamily: "Barlow Condensed, Arial Narrow, sans-serif",
            fontSize: ".82rem",
            fontWeight: 700,
            letterSpacing: ".14em",
            textTransform: "uppercase",
          }}
        >
          404 · Bele Cortese
        </p>
        <h1
          style={{
            margin: "0 0 1rem",
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            lineHeight: 0.95,
          }}
        >
          Esta página no está.
        </h1>
        <p style={{ margin: "0 0 1.5rem", color: "#D5E0DD", lineHeight: 1.6 }}>
          Puede haber cambiado de dirección o el enlace estar incompleto.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            minHeight: "48px",
            alignItems: "center",
            justifyContent: "center",
            padding: ".7rem 1.1rem",
            borderRadius: "999px",
            background: "#E8F000",
            color: "#171717",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
