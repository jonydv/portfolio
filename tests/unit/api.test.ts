import { describe, expect, it } from 'vitest';
import { GET as getProjectsRoute } from '@/app/api/[locale]/projects/route';
import { GET as getProjectBySlugRoute } from '@/app/api/[locale]/projects/[slug]/route';
import { GET as getResumeRoute } from '@/app/api/[locale]/resume/route';
import { getProjects, getProjectBySlug, getResume } from '@/lib/content/repository';
import type { ApiError, ApiSuccess } from '@/lib/api/contract';

const request = new Request('http://localhost/api');

function routeContext<Params extends Record<string, string>>(params: Params) {
  return { params: Promise.resolve(params) } as never;
}

async function readSuccess<Data>(response: Response): Promise<ApiSuccess<Data>> {
  return (await response.json()) as ApiSuccess<Data>;
}

async function readError(response: Response): Promise<ApiError> {
  return (await response.json()) as ApiError;
}

describe('contrato de la API', () => {
  it('devuelve el envelope con meta completo', async () => {
    const response = await getProjectsRoute(request, routeContext({ locale: 'es' }));
    const body = await readSuccess<unknown[]>(response);

    expect(response.status).toBe(200);
    expect(body.meta.locale).toBe('es');
    expect(body.meta.count).toBe(body.data.length);
    expect(body.meta.version).toMatch(/^[0-9a-f]{12}$/);
    expect(body.meta.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it('emite un ETag derivado de la version y el idioma', async () => {
    const response = await getProjectsRoute(request, routeContext({ locale: 'en' }));
    expect(response.headers.get('etag')).toMatch(/^W\/"[0-9a-f]{12}-en"$/);
  });

  it('marca la respuesta como cacheable en el CDN hasta el deploy', async () => {
    const response = await getProjectsRoute(request, routeContext({ locale: 'es' }));
    expect(response.headers.get('vercel-cdn-cache-control')).toContain('s-maxage=31536000');
  });

  it('rechaza un idioma desconocido con 400 tipado', async () => {
    const response = await getProjectsRoute(request, routeContext({ locale: 'fr' }));
    const body = await readError(response);

    expect(response.status).toBe(400);
    expect(body.error.code).toBe('INVALID_LOCALE');
  });

  it('devuelve 404 tipado para un slug inexistente', async () => {
    const response = await getProjectBySlugRoute(
      request,
      routeContext({ locale: 'es', slug: 'no-existe' }),
    );
    const body = await readError(response);

    expect(response.status).toBe(404);
    expect(body.error.code).toBe('NOT_FOUND');
  });
});

describe('la API y los Server Components comparten el repositorio', () => {
  it('projects devuelve exactamente lo mismo que getProjects', async () => {
    const response = await getProjectsRoute(request, routeContext({ locale: 'es' }));
    const body = await readSuccess(response);

    expect(body.data).toEqual(JSON.parse(JSON.stringify(getProjects('es'))));
  });

  it('projects/[slug] devuelve exactamente lo mismo que getProjectBySlug', async () => {
    const response = await getProjectBySlugRoute(
      request,
      routeContext({ locale: 'en', slug: 'marchand' }),
    );
    const body = await readSuccess(response);

    expect(body.data).toEqual(JSON.parse(JSON.stringify(getProjectBySlug('en', 'marchand'))));
  });

  it('resume devuelve exactamente lo mismo que getResume', async () => {
    const response = await getResumeRoute(request, routeContext({ locale: 'es' }));
    const body = await readSuccess(response);

    expect(body.data).toEqual(JSON.parse(JSON.stringify(getResume('es'))));
  });
});
