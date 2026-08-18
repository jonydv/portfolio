import { expect, test } from '@playwright/test';

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'laptop', width: 1440, height: 900 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
] as const;

for (const viewport of VIEWPORTS) {
  test(`el hero completo entra en pantalla en ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/es');

    const cta = page.locator('main a[href$="/work"]').first();
    const ctaBottom = await cta.evaluate((node) => node.getBoundingClientRect().bottom);

    expect(ctaBottom, `${viewport.name}: el CTA queda a ${Math.round(ctaBottom)}px`).toBeLessThanOrEqual(
      viewport.height,
    );
  });

  test(`el titular no desborda horizontalmente en ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/es');

    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );

    expect(overflows).toBe(false);
  });
}

test('el titular ocupa como maximo tres lineas en desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/es');

  const lineCount = await page.getByRole('heading', { level: 1 }).evaluate((node) => {
    const style = getComputedStyle(node);
    const lineHeight = Number.parseFloat(style.lineHeight);
    return Math.round(node.getBoundingClientRect().height / lineHeight);
  });

  expect(lineCount).toBeLessThanOrEqual(3);
});
