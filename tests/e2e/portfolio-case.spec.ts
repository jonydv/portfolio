import { expect, test } from '@playwright/test';

const SLUG = 'portfolio-enterprise';

const CASE_EXPECTATIONS = [
  { locale: 'es', migrationTerm: 'IA agéntica', originTerm: 'Angular 15' },
  { locale: 'en', migrationTerm: 'agentic AI', originTerm: 'Angular 15' },
] as const;

for (const { locale, migrationTerm, originTerm } of CASE_EXPECTATIONS) {
  test(`el caso del portfolio en ${locale} cuenta la migracion`, async ({ page }) => {
    await page.goto(`/${locale}/work/${SLUG}`);

    await expect(page.locator('h1')).toHaveText('Portfolio Frontend Enterprise');
    await expect(page.getByText(migrationTerm).first()).toBeVisible();
    await expect(page.getByText(originTerm).first()).toBeVisible();
  });
}

test('el caso del portfolio enlaza al sitio y al repositorio', async ({ page }) => {
  await page.goto(`/es/work/${SLUG}`);

  await expect(
    page.locator('a[href="https://www.jonatandvillalbaweb.com.ar"]').first(),
  ).toBeVisible();
  await expect(
    page.locator('a[href="https://github.com/jonydv/portfolio"]').first(),
  ).toBeVisible();
});

test('el portfolio aparece destacado en la portada', async ({ page }) => {
  await page.goto('/es');

  await expect(page.locator(`main a[href$="/work/${SLUG}"]`).first()).toBeVisible();
});
