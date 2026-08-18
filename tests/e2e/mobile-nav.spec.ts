import { expect, test } from '@playwright/test';

const MOBILE_VIEWPORT = { width: 390, height: 844 };
const OPAQUE_ALPHA = 'rgb(';

test.use({ viewport: MOBILE_VIEWPORT });

test.describe('menu movil', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/es/about');
  });

  test('el disparador es un icono con nombre accesible, no texto visible', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Abrir menú' });

    await expect(trigger).toBeVisible();
    await expect(trigger.locator('svg')).toBeVisible();
    await expect(trigger).toHaveText('');
  });

  test('el panel cubre la pantalla completa y no deja ver el contenido detras', async ({ page }) => {
    await page.getByRole('button', { name: 'Abrir menú' }).click();

    const panel = page.getByRole('dialog', { name: 'Menú' });
    await expect(panel).toBeVisible();

    const box = await panel.boundingBox();
    expect(box?.width).toBe(MOBILE_VIEWPORT.width);
    expect(box?.height).toBe(MOBILE_VIEWPORT.height);
    expect(box?.y).toBe(0);

    const background = await panel.evaluate((node) => getComputedStyle(node).backgroundColor);
    expect(background.startsWith(OPAQUE_ALPHA)).toBe(true);
  });

  test('el panel se monta fuera del header para escapar su backdrop-filter', async ({ page }) => {
    await page.getByRole('button', { name: 'Abrir menú' }).click();

    const isInsideHeader = await page
      .getByRole('dialog', { name: 'Menú' })
      .evaluate((node) => node.closest('[data-site-header]') !== null);

    expect(isInsideHeader).toBe(false);
  });

  test('el contenido de la pagina queda oculto al usuario mientras el panel esta abierto', async ({
    page,
  }) => {
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();

    await page.getByRole('button', { name: 'Abrir menú' }).click();

    const headingCovered = await heading.evaluate((node) => {
      const rect = node.getBoundingClientRect();
      const topElement = document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
      return topElement !== node && !node.contains(topElement);
    });

    expect(headingCovered).toBe(true);
  });

  test('cierra con el icono X y devuelve el foco al disparador', async ({ page }) => {
    const trigger = page.getByRole('button', { name: 'Abrir menú' });
    await trigger.click();

    const closeButton = page.getByRole('button', { name: 'Cerrar menú' });
    await expect(closeButton).toHaveText('');
    await closeButton.click();

    await expect(page.getByRole('dialog', { name: 'Menú' })).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });
});
