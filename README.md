# Bele Cortese — Next.js preview

Migración a Next.js App Router + React. Home y Contacto ya son componentes React con su comportamiento nativo; las otras siete páginas se sirven desde el puente generado en `content/pages.js` y se convertirán en la siguiente etapa. No es todavía la implementación final.

## Development

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

Preview público: https://bele-cortese.vercel.app/ (hasta que esté el dominio final).

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
NEXT_PUBLIC_SITE_URL=https://bele-cortese.vercel.app
```

El endpoint del formulario es `POST /api/contacto` y usa la lógica testeada de `lib/contacto.js`.

## Analytics

Google Analytics 4 `G-XMX3CXFTTK` se carga desde `public/consent.js` **solo después del consentimiento**. El contenedor GTM no se carga para evitar duplicación. La política de privacidad sigue siendo un borrador a revisar.

## Notes

- Las páginas siguen con `noindex` hasta que el contenido esté aprobado.
- El dominio final y las credenciales de Resend se configuran en Vercel.
