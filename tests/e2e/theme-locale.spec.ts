import { expect, test } from '@playwright/test';

test('el tema claro sobrevive al cambio de idioma', async ({ page }) => {
  await page.goto('/es');

  await page.getByRole('button', { name: /tema|theme/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.getByRole('button', { name: 'en', exact: true }).click();
  await expect(page).toHaveURL(/\/en$/);

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('la cookie del tema sigue siendo light tras cambiar de idioma', async ({ page, context }) => {
  await page.goto('/es');
  await page.getByRole('button', { name: /tema|theme/i }).click();

  await page.getByRole('button', { name: 'en', exact: true }).click();
  await expect(page).toHaveURL(/\/en$/);

  const themeCookie = (await context.cookies()).find((cookie) => cookie.name === 'theme');
  expect(themeCookie?.value).toBe('light');
});

test('el canvas sigue claro tras cambiar de idioma', async ({ page }) => {
  await page.goto('/es');
  await page.getByRole('button', { name: /tema|theme/i }).click();

  await page.getByRole('button', { name: 'en', exact: true }).click();
  await expect(page).toHaveURL(/\/en$/);

  const canvas = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(canvas).toBe('rgb(247, 246, 243)');
});
