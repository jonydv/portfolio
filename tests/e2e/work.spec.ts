import { expect, test } from '@playwright/test';

const EXPECTED_PROJECT_COUNT = 11;
const OFFLINE_SLUGS = ['spartacus-demo', 'k-one', 'tupemesa'];

test('el indice lista todos los proyectos publicados en el HTML servido', async ({ page }) => {
  await page.goto('/es/work');
  await expect(page.locator('[data-project-card]')).toHaveCount(EXPECTED_PROJECT_COUNT);
});

test('los proyectos son rastreables sin JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto('/es/work');
  await expect(page.locator('[data-project-card]')).toHaveCount(EXPECTED_PROJECT_COUNT);

  await context.close();
});

test('el filtro reduce la lista y se refleja en la URL', async ({ page }) => {
  await page.goto('/es/work');
  await page.getByRole('button', { name: 'nextjs' }).click();

  await expect(page).toHaveURL(/tag=nextjs/);
  const visible = page.locator('[data-project-card]:not([hidden])');
  await expect(visible).not.toHaveCount(EXPECTED_PROJECT_COUNT);
});

test('navega del indice al caso de estudio', async ({ page }) => {
  await page.goto('/es/work');
  await page.locator('[data-project-card] a').first().click();

  await expect(page).toHaveURL(/\/es\/work\/[a-z0-9-]+$/);
  await expect(page.locator('h1')).toBeVisible();
});

test('el caso de estudio muestra metadatos y navegacion', async ({ page }) => {
  await page.goto('/es/work/marchand');

  await expect(page.locator('h1')).toHaveText('Marchand');
  await expect(page.getByText('Rol', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Volver a trabajos/ })).toBeVisible();
});

test('el proyecto sin captura renderiza la variante generativa', async ({ page }) => {
  await page.goto('/es/work/medusa-storefront');
  await expect(page.locator('h1')).toHaveText('Medusa.js Enterprise Storefront');
});

test('CineScope muestra sus capturas reales', async ({ page }) => {
  await page.goto('/es/work/cinescope');

  const screenshot = page.locator('img[src*="cinescope-desktop"]').first();
  await expect(screenshot).toBeVisible();
});

test('los proyectos con el sitio fuera de linea devuelven 404', async ({ page }) => {
  for (const slug of OFFLINE_SLUGS) {
    const response = await page.goto(`/es/work/${slug}`);
    expect(response?.status(), slug).toBe(404);
  }
});
