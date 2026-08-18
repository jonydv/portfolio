import { expect, test } from '@playwright/test';

test('la raiz redirige al espanol cuando el navegador lo prefiere', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'es-AR' });
  const page = await context.newPage();

  await page.goto('/');
  await expect(page).toHaveURL(/\/es$/);

  await context.close();
});

test('respeta Accept-Language', async ({ browser }) => {
  const context = await browser.newContext({ locale: 'en-US' });
  const page = await context.newPage();

  await page.goto('/');
  await expect(page).toHaveURL(/\/en$/);

  await context.close();
});

test('el conmutador preserva la subruta', async ({ page }) => {
  await page.goto('/es/work/marchand');
  await page.getByRole('button', { name: 'en' }).click();

  await expect(page).toHaveURL(/\/en\/work\/marchand$/);
});

test('cada pagina declara canonical y hreflang consistentes', async ({ page }) => {
  await page.goto('/es/work');

  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  expect(canonical).toContain('/es/work');

  const alternates = await page.locator('link[rel="alternate"]').all();
  const hreflangs = await Promise.all(alternates.map((link) => link.getAttribute('hreflang')));

  expect(hreflangs).toContain('es');
  expect(hreflangs).toContain('en');
  expect(hreflangs).toContain('x-default');
});

test('los redirects legacy preservan el SEO', async ({ page }) => {
  const worksResponse = await page.goto('/works');
  expect(worksResponse?.url()).toContain('/es/work');

  const curriculumResponse = await page.goto('/curriculum');
  expect(curriculumResponse?.url()).toContain('/es/cv');
});
