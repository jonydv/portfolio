import { expect, test } from '@playwright/test';

const RESUME_BY_LOCALE = [
  { locale: 'es', downloadLabel: /Descargar PDF/, file: 'cv-es-jonatan-villalba.pdf' },
  { locale: 'en', downloadLabel: /Download PDF/, file: 'cv-en-jonatan-villalba.pdf' },
] as const;

for (const { locale, downloadLabel, file } of RESUME_BY_LOCALE) {
  test(`el pdf del cv en ${locale} se sirve correctamente`, async ({ page, request }) => {
    await page.goto(`/${locale}/cv`);

    const href = await page.getByRole('link', { name: downloadLabel }).getAttribute('href');
    expect(href).toContain(file);

    const response = await request.get(href!);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
  });
}

test('cada idioma ofrece su propio pdf y no avisa de traduccion', async ({ page }) => {
  await page.goto('/es/cv');

  await expect(page.getByRole('link', { name: /en inglés/ })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Descargar PDF/ })).toBeVisible();
});

test('la version impresa usa fondo claro y oculta la navegacion', async ({ page }) => {
  await page.goto('/es/cv');
  await page.emulateMedia({ media: 'print' });

  await expect(page.locator('header[data-site-header]')).toBeHidden();
  await expect(page.locator('footer')).toBeHidden();

  const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(background).toBe('rgb(255, 255, 255)');
});
