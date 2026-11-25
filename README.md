# Bele Cortese — Next.js preview

Migración a Next.js App Router + React. Todas las páginas son componentes React; `content/pages.js` se mantiene solo como fuente de estilos embebidos y no se sirve HTML crudo. La implementación sigue en revisión de contenido y legal.

## Development

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

Producción: https://belencortese.com.ar/  
Preview: https://bele-cortese.vercel.app/  
Progreso y próximos pasos: [docs/progress.md](docs/progress.md)

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
