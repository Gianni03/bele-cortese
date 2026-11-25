# Progress — Bele Cortese

**Actualizado:** 25 de noviembre de 2026  
**Producción:** https://belencortese.com.ar  
**Preview:** https://bele-cortese.vercel.app  
**Repo:** https://github.com/Gianni03/bele-cortese

## Estado actual

| Área | Estado | Nota |
|---|---|---|
| Dominio, SSL y redirect `www → apex` | Listo | Apex 200; `www` 308 al apex |
| Resend y correo del formulario | Listo | Dominio verificado; envío real probado |
| Endpoint de contacto | Listo | `POST /api/contacto/`; 16 tests |
| Home | Componente React | Movimiento pendiente de ajuste |
| Contacto | Componente React | Canales y contenido real pendientes |
| Clínica | Componente React | Contenido y canales pendientes |
| Accesibilidad e inclusión | Componente React | Experiencia y permisos pendientes |
| Otras cinco páginas | Puente HTML | Migrar a React, una por PR |
| GA4 | Implementado con consentimiento | Falta validación en producción |
| `noindex` | Activo | Retirar solo con contenido y legal aprobados |
| Contenido y revisión legal | Pendiente | Depende de Belén |

## Flujo de trabajo

`main` es producción y no recibe pushes directos.

1. Actualizar `main`.
2. Crear una rama corta: `feat/...`, `fix/...` o `chore/...`.
3. Hacer commits chicos y coherentes; tests y docs junto al cambio.
4. Push de la rama.
5. Abrir Pull Request.
6. CI y Vercel Preview corren sobre el PR.
7. Revisar el preview y el contenido.
8. Merge a `main`; Vercel publica producción.
9. Borrar la rama.

Las correcciones futuras siguen el mismo circuito: `fix/<tema>` → PR → preview → merge.

## Próximos pasos

| Orden | Rama | Alcance |
|---|---|---|
| 1 | `feat/componentize-accesibilidad` | Accesibilidad e inclusión a React |
| 2 | `feat/componentize-formacion` | Formación y experiencias a React |
| 3 | `feat/componentize-welove` | We Love TO a React |
| 4 | `feat/componentize-trayectoria` | Trayectoria a React |
| 5 | `feat/componentize-utilidades` | Accesibilidad del sitio y Privacidad |
| 6 | `fix/home-motion` | Ajustar el movimiento de Home |
| 7 | `content/cliente` | Reemplazar placeholders y revisar legal |
| 8 | `chore/launch` | Retirar `noindex`, sitemap/robots, QA final |

## Criterio de terminado por página

- Componente React con el contenido y los enlaces actuales.
- Responsive y foco visibles.
- Sin errores de consola ni excepciones de runtime.
- Metadata correcta.
- Build y tests pasan.
- Preview de Vercel revisado.
- PR mergeado a `main`.

## Correcciones

Las correcciones no se hacen directo en `main`. Se abre una rama `fix/...`, se valida en el preview y se mergea. Cada corrección relevante se agrega a este tablero.

## Entorno y secretos

- Las claves reales viven en Vercel.
- Para desarrollo local, usar `.env.local` (ignorado por Git).
- `.env.example` solo contiene placeholders.
- No se commitean claves, tokens ni datos de clientes.

## Pendientes conocidos

- Ajustar movimiento de Home.
- Completar canales, credenciales, actividades e imágenes.
- Revisión legal de Privacidad.
- Validación con lector de pantalla, zoom y mobile.
- Validar GA4 en producción.
- Retirar `noindex` al aprobar contenido.
