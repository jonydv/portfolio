import { expect, test } from '@playwright/test';

const HERO_EXPECTATIONS = [
  {
    locale: 'es',
    greeting: 'Hola, soy',
    availability: 'Abierto a remoto (US / LATAM) — UTC-3, full ET overlap',
  },
  {
    locale: 'en',
    greeting: "Hi, I'm",
    availability: 'Open to Remote (US / LATAM) — UTC-3, full ET overlap',
  },
] as const;

const FULL_NAME = 'Jonatan David Villalba';
const LOCATION = 'Buenos Aires, Argentina';

for (const { locale, greeting, availability } of HERO_EXPECTATIONS) {
  test.describe(`hero en ${locale}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${locale}`);
    });

    test('el saludo presenta el nombre y no la ubicacion', async ({ page }) => {
      const eyebrow = page.locator('main p.metaline').first();
      const text = (await eyebrow.textContent())?.replace(/\s+/g, ' ').trim();

      expect(text).toBe(`${greeting} ${FULL_NAME}`);
      expect(text).not.toContain(LOCATION);
    });

    test('el nombre completo es visible en el hero', async ({ page }) => {
      await expect(page.getByText(FULL_NAME, { exact: false }).first()).toBeVisible();
    });

    test('la ubicacion vive en la fila de metadatos junto a la disponibilidad', async ({ page }) => {
      const rowText = await page
        .locator('main a[href$="/work"]')
        .first()
        .evaluate((cta) => cta.parentElement?.textContent?.replace(/\s+/g, ' ').trim() ?? '');

      expect(rowText).toContain(availability);
      expect(rowText).toContain(LOCATION);
    });

    test('el h1 comunica el rol profesional', async ({ page }) => {
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toHaveText('Senior Full-Stack Engineer');
    });

    test('la especializacion vive fuera del h1, como linea secundaria', async ({ page }) => {
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).not.toContainText('SAP Spartacus');

      await expect(
        page.locator('main').getByText('TypeScript · Node.js · NestJS · AI Features · SAP Spartacus'),
      ).toBeVisible();
    });
  });
}
