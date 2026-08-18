# Portfolio — Jonatan David Villalba

Portfolio bilingüe construido con Next.js 16 (App Router), next-intl, Tailwind v4 y Zod.
Todo el contenido vive como JSON versionado en `content/` y se sirve tanto a los Server
Components como a una API pública estática en `/api/{locale}/*`.

Producción: https://www.jonatandvillalbaweb.com.ar

## Restricción de contrato: cero comentarios

Este proyecto no admite comentarios en ningún archivo. No `//`, `/* */`, JSDoc, `{/* */}`,
`#` en YAML ni claves `"_comment"` en JSON. El código debe ser deducible por sí solo.

Cuando un fragmento parezca necesitar un comentario, se reescribe: la explicación se
convierte en un nombre (`OG_DESCRIPTION_MAX_LENGTH` en vez de `200`, `rejectsMojibake` en
vez de un regex suelto) o en un test con nombre descriptivo. El contexto de arquitectura
va en este README, nunca en el código fuente.

Lo hace cumplir `npm run lint:comments`, que corre primero en CI y en cada commit.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción, con `assert-static` como postbuild |
| `npm run lint:comments` | Verifica que no exista ningún comentario |
| `npm run typecheck` | `tsc --noEmit` (requiere `npx next typegen` en un checkout limpio) |
| `npm run content:build` | Normaliza, genera manifiesto de medios y metadatos, y valida |
| `npm run content:validate` | Zod más integridad referencial y verificación de charset |
| `npm test` | Tests unitarios y de componente (Vitest) |
| `npm run test:e2e` | Tests end-to-end (Playwright) |

## Arquitectura

**La frontera servidor/cliente es `lib/` contra `components/`, no `app/`.** Cada `page.tsx`
es una composición delgada de una llamada al repositorio más componentes. Eso hace que
"los Server Components y los route handlers comparten el mismo repositorio" sea
estructuralmente cierto y no una aspiración.

Se refuerza con tres mecanismos, no con documentación:

1. Todo `lib/content/**` abre con `import 'server-only'`. Si un componente cliente lo
   importa, el build falla con un error que traza la cadena completa.
2. `'use client'` aparece solo en `components/**`.
3. ESLint prohíbe `fetch('/api/…')` dentro del árbol de Server Components, y
   `tests/unit/api.test.ts` afirma que la respuesta de cada endpoint es idéntica a la del
   repositorio. Si divergen, falla.

### Capa de datos

`content/*.json` → `lib/content/source.ts` (único módulo que importa el JSON, parsea con Zod
y memoiza) → `lib/content/repository.ts` (API pública) → Server Components y route handlers.

Los campos localizados van inline como `{ es, en }` en un solo archivo por colección, no en
archivos por idioma. `localized(z.string())` hace imposible publicar 14 proyectos en español
y 13 en inglés, el 70% de los campos no se localiza, y el orden se define una sola vez.

Regla de frontera entre `content/` y `messages/`: si lo editaría el dueño del sitio en un
CMS, es `content/`. Si es una etiqueta que la UI necesita para renderizar algo, es
`messages/`.

### Renderizado

**121 rutas prerenderizadas, cero dinámicas.** El proxy de negociación de idioma es la única
superficie que corre por request.

`scripts/assert-static.mjs` es la pieza de infraestructura más importante del repo. Tres
cosas rompen el renderizado estático sin producir ningún error: leer `cookies()` o
`headers()` en un layout, olvidar `setRequestLocale` en una página, y usar
`useSearchParams` fuera de un `<Suspense>`. La app seguiría funcionando en desarrollo y se
convertiría en silencio en una app serverless por request en producción. El script corre
como `postbuild`, así que falla en local antes de llegar a un PR.

Por eso el tema **nunca** se lee en el servidor: un script inline bloqueante en `<head>`
escribe `data-theme` antes del primer paint, y `theme-toggle` lee el DOM con
`useSyncExternalStore`. React nunca es dueño del tema; las CSS custom properties hacen todo
el trabajo visual.

### API

```
GET /api                          Documento de descubrimiento
GET /api/{locale}/profile | projects | projects/{slug} | experience | credentials
                              | skills | services | goals | social | resume
```

El locale va como segmento de ruta y no como query param: con `?locale=` cada handler
tendría que leer `searchParams`, lo que lo volvería dinámico y significaría una invocación
serverless por request. Como segmento, cada endpoint se prerenderiza a un JSON estático.

Caché en tres niveles: el navegador siempre revalida (304 barato vía ETag), el CDN retiene
un año, y Vercel purga en cada deploy. Como el contenido solo cambia por deploy, "inmutable
hasta el deploy" es exactamente correcto.

## Editar el contenido

Todo el contenido está en `content/`. Después de editarlo:

```bash
npm run content:build
```

Eso regenera el manifiesto de medios y los metadatos, y valida schemas, integridad
referencial, existencia de assets y charset. Añadir un proyecto actualiza el sitemap, la
API y las imágenes OG sin tocar código.

`scripts/legacy-raw.json` y `scripts/legacy-slug-map.json` conservan la procedencia de la
migración desde Angular. El mapa es la fuente de verdad del emparejamiento entre los dos
arrays de proyectos que tenía el código original, cuyos órdenes y nombres de archivo no se
correspondían.

## Variables de entorno

Copiar `.env.example` a `.env.local`. Sin `RESEND_API_KEY` el formulario de contacto usa un
mailer de prueba que no envía nada, de modo que el desarrollo local funciona sin
configuración.
