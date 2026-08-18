import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { WorkFilters } from '@/components/work/work-filters';

const TAGS = ['angular', 'nextjs', 'ecommerce'];

function renderWithCards() {
  document.body.innerHTML = `
    <div id="cards">
      <article data-project-card data-tags="angular ecommerce"></article>
      <article data-project-card data-tags="nextjs"></article>
      <article data-project-card data-tags="angular"></article>
      <p data-empty-state hidden></p>
      <span data-visible-count>3</span>
    </div>
  `;

  const container = document.createElement('div');
  document.body.appendChild(container);
  return render(<WorkFilters tags={TAGS} allLabel="Todos" />, { container });
}

function visibleCards(): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>('[data-project-card]')].filter(
    (card) => !card.hidden,
  );
}

describe('WorkFilters', () => {
  it('muestra un boton por tag mas el de todos', () => {
    renderWithCards();
    expect(screen.getByRole('button', { name: 'Todos' })).toBeInTheDocument();
    for (const tag of TAGS) {
      expect(screen.getByRole('button', { name: tag })).toBeInTheDocument();
    }
  });

  it('reduce la lista al filtrar por un tag', async () => {
    const user = userEvent.setup();
    renderWithCards();

    await user.click(screen.getByRole('button', { name: 'nextjs' }));

    expect(visibleCards()).toHaveLength(1);
  });

  it('restaura la lista completa con el boton de todos', async () => {
    const user = userEvent.setup();
    renderWithCards();

    await user.click(screen.getByRole('button', { name: 'nextjs' }));
    await user.click(screen.getByRole('button', { name: 'Todos' }));

    expect(visibleCards()).toHaveLength(3);
  });

  it('actualiza el contador visible', async () => {
    const user = userEvent.setup();
    renderWithCards();

    await user.click(screen.getByRole('button', { name: 'angular' }));

    expect(document.querySelector('[data-visible-count]')?.textContent).toBe('2');
  });

  it('muestra el estado vacio cuando ningun proyecto coincide', async () => {
    const user = userEvent.setup();
    renderWithCards();

    await user.click(screen.getByRole('button', { name: 'ecommerce' }));
    await user.click(screen.getByRole('button', { name: 'nextjs' }));

    expect(visibleCards()).toHaveLength(1);
    expect(document.querySelector<HTMLElement>('[data-empty-state]')?.hidden).toBe(true);
  });

  it('marca el filtro activo con aria-pressed', async () => {
    const user = userEvent.setup();
    renderWithCards();

    expect(screen.getByRole('button', { name: 'Todos' })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: 'angular' }));

    expect(screen.getByRole('button', { name: 'angular' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Todos' })).toHaveAttribute('aria-pressed', 'false');
  });
});
