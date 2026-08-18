import { expect, test } from '@playwright/test';

const POINTER = 'pointer';
const NOT_ALLOWED = 'not-allowed';

async function cursorOf(locator: import('@playwright/test').Locator) {
  return locator.evaluate((node) => getComputedStyle(node).cursor);
}

test.describe('cursores de los controles interactivos', () => {
  test('el conmutador de idioma y el de tema muestran cursor pointer', async ({ page }) => {
    await page.goto('/es');

    const localeButton = page.getByRole('button', { name: 'en', exact: true });
    const themeButton = page.getByRole('button', { name: 'Cambiar tema', exact: true });

    expect(await cursorOf(localeButton)).toBe(POINTER);
    expect(await cursorOf(themeButton)).toBe(POINTER);
  });

  test('el disparador del menu movil muestra cursor pointer', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/es');

    expect(await cursorOf(page.getByRole('button', { name: 'Abrir menú' }))).toBe(POINTER);
  });

  test('el boton de copiar email muestra cursor pointer', async ({ page }) => {
    await page.goto('/es/contact');

    expect(await cursorOf(page.getByRole('button', { name: 'Copiar email' }))).toBe(POINTER);
  });

  test('los filtros de trabajos muestran cursor pointer', async ({ page }) => {
    await page.goto('/es/work');

    const firstFilter = page.locator('button').filter({ hasText: /.+/ }).nth(1);
    expect(await cursorOf(firstFilter)).toBe(POINTER);
  });

  test('un control deshabilitado no invita al clic', async ({ page }) => {
    await page.goto('/es');

    const disabledCount = await page.locator('button:disabled').count();
    test.skip(disabledCount === 0, 'no hay controles deshabilitados en esta vista');

    expect(await cursorOf(page.locator('button:disabled').first())).toBe(NOT_ALLOWED);
  });
});
