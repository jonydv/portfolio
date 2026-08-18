import { expect, test } from '@playwright/test';

const LOCALE_COUNT = 2;
const STATIC_PATH_COUNT = 5;
const PUBLISHED_PROJECT_COUNT = 12;
const EXPECTED_SITEMAP_URL_COUNT = LOCALE_COUNT * (STATIC_PATH_COUNT + PUBLISHED_PROJECT_COUNT);

test('el sitemap lista todas las URLs con alternates', async ({ request }) => {
  const response = await request.get('/sitemap.xml');
  expect(response.status()).toBe(200);

  const body = await response.text();
  const urlCount = [...body.matchAll(/<url>/g)].length;
  expect(urlCount).toBe(EXPECTED_SITEMAP_URL_COUNT);
  expect(body).toContain('hreflang');
});

test('robots.txt referencia el sitemap y excluye el styleguide', async ({ request }) => {
  const response = await request.get('/robots.txt');
  const body = await response.text();

  expect(body).toContain('Sitemap:');
  expect(body).toContain('styleguide');
});

test('cada pagina expone description y OG propios', async ({ page }) => {
  for (const path of ['/es', '/es/work', '/es/work/marchand', '/es/cv']) {
    await page.goto(path);

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');

    expect(description, path).toBeTruthy();
    expect(ogTitle, path).toBeTruthy();
  }
});

test('el JSON-LD es valido y esta tipado', async ({ page }) => {
  await page.goto('/es');

  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(blocks.length).toBeGreaterThan(0);

  const types = blocks.map((block) => JSON.parse(block)['@type']);
  expect(types).toContain('Person');
  expect(types).toContain('WebSite');
});

test('la imagen OG se genera por proyecto', async ({ request }) => {
  const response = await request.get('/es/work/marchand/opengraph-image');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('image/png');
});
