import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MobileNav } from '@/components/layout/mobile-nav';

vi.mock('@/lib/i18n/navigation', () => ({
  Link: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
  usePathname: () => '/work',
}));

const LABELS = { work: 'Trabajos', about: 'Sobre mí', cv: 'Curriculum', contact: 'Contacto' };

function renderNav() {
  return render(
    <MobileNav labels={LABELS} menuLabel="Menú" openLabel="Abrir menú" closeLabel="Cerrar menú" />,
  );
}

describe('MobileNav', () => {
  it('empieza cerrado', () => {
    renderNav();
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('abre el panel y muestra los enlaces', async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));

    for (const label of Object.values(LABELS)) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });

  it('bloquea el scroll del body mientras esta abierto y lo libera al cerrar', async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    expect(document.body.style.overflow).toBe('hidden');

    await user.click(screen.getAllByRole('button', { name: 'Cerrar menú' })[0]!);
    expect(document.body.style.overflow).toBe('');
  });

  it('cierra con la tecla Escape', async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    await user.keyboard('{Escape}');

    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(document.body.style.overflow).toBe('');
  });
});
