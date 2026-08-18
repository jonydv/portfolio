import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { THEME_ATTRIBUTE } from '@/lib/theme/theme-script';

function renderToggle() {
  return render(<ThemeToggle label="Cambiar tema" />);
}

function iconClasses(): string[] {
  return [...screen.getByRole('button').querySelectorAll('svg')].map(
    (icon) => icon.getAttribute('class') ?? '',
  );
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, 'light');
    document.cookie = 'theme=; max-age=0; path=/';
  });

  it('renderiza el mismo markup en ambos temas para no romper la hidratacion', () => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, 'light');
    const { container: lightContainer } = renderToggle();
    const lightMarkup = lightContainer.innerHTML;

    cleanup();

    document.documentElement.setAttribute(THEME_ATTRIBUTE, 'dark');
    const { container: darkContainer } = renderToggle();

    expect(darkContainer.innerHTML).toBe(lightMarkup);
  });

  it('renderiza los dos iconos y delega el cambio al CSS', () => {
    renderToggle();

    const classes = iconClasses();

    expect(classes).toHaveLength(2);
    expect(classes[0]).toContain('dark:hidden');
    expect(classes[1]).toContain('dark:block');
  });

  it('escribe el atributo y la cookie al alternar', async () => {
    const user = userEvent.setup();
    renderToggle();

    await user.click(screen.getByRole('button', { name: 'Cambiar tema' }));

    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe('dark');
    expect(document.cookie).toContain('theme=dark');
  });

  it('vuelve a claro en el segundo clic', async () => {
    const user = userEvent.setup();
    renderToggle();

    const button = screen.getByRole('button', { name: 'Cambiar tema' });
    await user.click(button);
    await user.click(button);

    expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe('light');
  });

  it('expone una etiqueta accesible', () => {
    renderToggle();
    expect(screen.getByRole('button', { name: 'Cambiar tema' })).toBeInTheDocument();
  });
});
