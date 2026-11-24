# Bele Cortese — Next.js preview

Primera migración a Next.js App Router + React. Las páginas hi-fi se generan desde `planning/*-alta-fidelidad.html` y se sirven en rutas limpias. Es una base de preview, no la implementación final: la próxima etapa es convertir esas páginas en componentes React y separar layout, secciones y contenido.

## Development

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Content generation

```bash
npm run build:content
```

Regenera `content/pages.js` desde las páginas de `planning/`. Ejecutarlo después de editar una página de diseño.

## Environment

Copiar `.env.example` a `.env.local` y completar:

```text
RESEND_API_KEY=
CONTACT_TO=
CONTACT_FROM=
NEXT_PUBLIC_SITE_URL=https://belencortese.com.ar
```

El endpoint del formulario es `POST /api/contacto` y usa la lógica testeada de `lib/contacto.js`.

## Analytics

Google Analytics 4 `G-XMX3CXFTTK` se carga desde `public/consent.js` **solo después del consentimiento**. El contenedor GTM no se carga para evitar duplicación. La política de privacidad sigue siendo un borrador a revisar.

## Notes

- Las páginas siguen con `noindex` hasta que el contenido esté aprobado.
- El dominio final y las credenciales de Resend se configuran en Vercel.
