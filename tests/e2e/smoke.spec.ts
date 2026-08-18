import { expect, test } from '@playwright/test';

const ROUTES = ['', '/work', '/about', '/cv', '/contact'];
const LOCALES = ['es', 'en'] as const;
const VERCEL_ONLY_ENDPOINT = '/_vercel/';

for (const locale of LOCALES) {
  for (const route of ROUTES) {
    const path = `/${locale}${route}`;

    test(`${path} responde 200 sin recursos rotos`, async ({ page }) => {
      const brokenResources: string[] = [];
      const pageErrors: string[] = [];

      page.on('response', (response) => {
        const url = response.url();
        if (response.status() >= 400 && !url.includes(VERCEL_ONLY_ENDPOINT)) {
          brokenResources.push(`${response.status()} ${url}`);
        }
      });

      page.on('pageerror', (error) => pageErrors.push(error.message));

      const response = await page.goto(path);

      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      expect(brokenResources).toEqual([]);
      expect(pageErrors).toEqual([]);
    });
  }
}

test('una pagina inexistente devuelve 404', async ({ page }) => {
  const response = await page.goto('/es/no-existe');
  expect(response?.status()).toBe(404);
});
