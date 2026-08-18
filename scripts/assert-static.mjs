import { readFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD_DIR = join(PROJECT_ROOT, '.next');

const PRERENDER_MANIFEST = join(BUILD_DIR, 'prerender-manifest.json');
const APP_ROUTES_MANIFEST = join(BUILD_DIR, 'app-path-routes-manifest.json');

const ALLOWED_DYNAMIC_ROUTES = new Set(['/_not-found', '/_global-error']);

function readManifest(manifestPath) {
  if (!existsSync(manifestPath)) {
    console.error(`No existe ${manifestPath}. Ejecutar next build antes de assert-static.`);
    process.exit(1);
  }

  return JSON.parse(readFileSync(manifestPath, 'utf8'));
}

function collectPrerenderedRoutes(prerenderManifest) {
  return new Set([
    ...Object.keys(prerenderManifest.routes ?? {}),
    ...Object.keys(prerenderManifest.dynamicRoutes ?? {}),
  ]);
}

function assertStatic() {
  const prerenderManifest = readManifest(PRERENDER_MANIFEST);
  const appRoutes = new Set(Object.values(readManifest(APP_ROUTES_MANIFEST)));
  const prerendered = collectPrerenderedRoutes(prerenderManifest);

  const dynamicRoutes = [...appRoutes].filter(
    (route) => !prerendered.has(route) && !ALLOWED_DYNAMIC_ROUTES.has(route),
  );

  const prerenderedCount = Object.keys(prerenderManifest.routes ?? {}).length;

  if (dynamicRoutes.length > 0) {
    console.error(`\n${dynamicRoutes.length} rutas perdieron el renderizado estatico:\n`);
    for (const route of dynamicRoutes.sort()) console.error(`  ${route}`);
    console.error(
      '\nCausas habituales: leer cookies() o headers() en un layout, olvidar setRequestLocale',
      '\nen una page o layout, o usar useSearchParams fuera de un <Suspense>.',
    );
    process.exit(1);
  }

  console.log(`Renderizado estatico verificado: ${prerenderedCount} rutas prerenderizadas, cero dinamicas.`);
}

assertStatic();
