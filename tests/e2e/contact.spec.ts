import { expect, test } from '@playwright/test';

const EMAIL = 'jonatandavidvillalba@gmail.com';

const LOCALE_EXPECTATIONS = [
  { locale: 'es', subject: 'Consulta desde el portfolio', copyLabel: 'Copiar email' },
  { locale: 'en', subject: 'Enquiry from your portfolio', copyLabel: 'Copy email' },
] as const;

for (const { locale, subject, copyLabel } of LOCALE_EXPECTATIONS) {
  test.describe(`contacto en ${locale}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${locale}/contact`);
    });

    test('el enlace principal abre el correo con asunto y cuerpo precargados', async ({ page }) => {
      const mailLink = page.getByRole('link', { name: new RegExp(EMAIL) });
      await expect(mailLink).toBeVisible();

      const href = await mailLink.getAttribute('href');
      const url = new URL(href ?? '');

      expect(url.protocol).toBe('mailto:');
      expect(url.pathname).toBe(EMAIL);
      expect(url.searchParams.get('subject')).toBe(subject);
      expect(url.searchParams.get('body')).toContain('Jonatan');
    });

    test('copia el email al portapapeles como alternativa al cliente de correo', async ({
      page,
      context,
    }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);

      await page.getByRole('button', { name: copyLabel }).click();

      const clipboardValue = await page.evaluate(() => navigator.clipboard.readText());
      expect(clipboardValue).toBe(EMAIL);
    });

    test('no queda ningun formulario de contacto en la pagina', async ({ page }) => {
      await expect(page.locator('form')).toHaveCount(0);
      await expect(page.getByRole('textbox')).toHaveCount(0);
    });

    test('los canales alternativos siguen disponibles', async ({ page }) => {
      const channels = page.getByRole('link', { name: /GitHub|LinkedIn/ });
      await expect(channels.first()).toBeVisible();
    });
  });
}
