import { expect, test } from '@playwright/test';

const DARK_CANVAS = 'rgb(11, 11, 12)';

test('el tema se aplica antes del primer paint', async ({ page }) => {
  await page.goto('/es');
  const theme = await page.locator('html').getAttribute('data-theme');
  expect(['light', 'dark']).toContain(theme);
});

test('sin cookie el tema por defecto es oscuro', async ({ page, context }) => {
  await context.clearCookies();
  await page.goto('/es');

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  const canvas = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(canvas).toBe(DARK_CANVAS);
});

test('el tema por defecto ignora la preferencia clara del sistema', async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: 'light' });
  const page = await context.newPage();

  await page.goto('/es');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await context.close();
});

test('sin JavaScript la pagina sigue renderizando en oscuro', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto('/es');

  const canvas = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(canvas).toBe(DARK_CANVAS);

  await context.close();
});

test('el toggle persiste tras recargar y no produce warnings de hidratacion', async ({ page }) => {
  const warnings: string[] = [];
  page.on('console', (message) => {
    if (message.text().toLowerCase().includes('hydrat')) warnings.push(message.text());
  });

  await page.goto('/es');
  const initial = await page.locator('html').getAttribute('data-theme');

  await page.getByRole('button', { name: /tema|theme/i }).click();
  const toggled = await page.locator('html').getAttribute('data-theme');
  expect(toggled).not.toBe(initial);

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', toggled!);

  expect(warnings).toEqual([]);
});
