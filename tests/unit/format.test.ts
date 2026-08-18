import { describe, expect, it } from 'vitest';
import { formatPeriod, formatYearRange } from '@/lib/format/period';

describe('formatPeriod', () => {
  it('usa la etiqueta de presente cuando no hay fin', () => {
    expect(formatPeriod('2021-03', null, 'es', 'Actualidad')).toContain('Actualidad');
  });

  it('formatea un rango cerrado', () => {
    const formatted = formatPeriod('2021-03', '2026-06', 'es', 'Actualidad');
    expect(formatted).toContain('2021');
    expect(formatted).toContain('2026');
    expect(formatted).toContain('—');
  });

  it('respeta el idioma', () => {
    const spanish = formatPeriod('2023-02', '2023-07', 'es', 'Actualidad');
    const english = formatPeriod('2023-02', '2023-07', 'en', 'Present');
    expect(spanish).not.toBe(english);
  });
});

describe('formatYearRange', () => {
  it('colapsa cuando no hay fin', () => {
    expect(formatYearRange(2024, null)).toBe('2024');
  });

  it('colapsa cuando el ano es el mismo', () => {
    expect(formatYearRange(2024, 2024)).toBe('2024');
  });

  it('muestra el rango completo', () => {
    expect(formatYearRange(2021, 2026)).toBe('2021—2026');
  });
});
