import { expect, test } from '@playwright/test';

const COVER_ROUTES = ['/es', '/en', '/es/about', '/es/cv', '/es/contact', '/es/work'];
const COVER_PATH = '/og-cover.png';

async function metaContent(page: import('@playwright/test').Page, property: string) {
  return page.locator(`meta[property="${property}"]`).first().getAttribute('content');
}

for (const route of COVER_ROUTES) {
  test(`${route} comparte la portada del sitio`, async ({ page, request }) => {
    await page.goto(route);

    const image = await metaContent(page, 'og:image');
    expect(image).toContain(COVER_PATH);

    expect(await metaContent(page, 'og:image:width')).toBe('1200');
    expect(await metaContent(page, 'og:image:height')).toBe('630');
    expect(await metaContent(page, 'og:image:type')).toBe('image/png');

    const asset = await request.get(COVER_PATH);
    expect(asset.status()).toBe(200);
    expect(asset.headers()['content-type']).toContain('image/png');
  });
}

test('cada caso de estudio conserva su propia imagen generada', async ({ page }) => {
  await page.goto('/es/work/marchand');

  const image = await metaContent(page, 'og:image');
  expect(image).toContain('/es/work/marchand/opengraph-image');
  expect(image).not.toContain(COVER_PATH);
});

test('la tarjeta de Twitter usa formato grande y la misma imagen', async ({ page }) => {
  await page.goto('/es');

  const card = await page.locator('meta[name="twitter:card"]').first().getAttribute('content');
  const image = await page.locator('meta[name="twitter:image"]').first().getAttribute('content');

  expect(card).toBe('summary_large_image');
  expect(image).toContain(COVER_PATH);
});
