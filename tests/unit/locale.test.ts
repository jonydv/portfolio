import { describe, expect, it } from 'vitest';
import { isLocale, parseAcceptLanguage } from '@/lib/i18n/locale';

describe('isLocale', () => {
  it('acepta los idiomas soportados', () => {
    expect(isLocale('es')).toBe(true);
    expect(isLocale('en')).toBe(true);
  });

  it('rechaza cualquier otro valor', () => {
    expect(isLocale('fr')).toBe(false);
    expect(isLocale('')).toBe(false);
    expect(isLocale('ES')).toBe(false);
  });
});

describe('parseAcceptLanguage', () => {
  it('resuelve el idioma de mayor calidad', () => {
    expect(parseAcceptLanguage('es-AR,es;q=0.9,en;q=0.8')).toBe('es');
    expect(parseAcceptLanguage('en-US,en;q=0.9,es;q=0.5')).toBe('en');
  });

  it('ignora los idiomas no soportados', () => {
    expect(parseAcceptLanguage('fr-FR,fr;q=0.9,en;q=0.4')).toBe('en');
  });

  it('cae al idioma por defecto', () => {
    expect(parseAcceptLanguage(null)).toBe('es');
    expect(parseAcceptLanguage('')).toBe('es');
    expect(parseAcceptLanguage('fr')).toBe('es');
    expect(parseAcceptLanguage('*')).toBe('es');
  });

  it('tolera valores de q malformados', () => {
    expect(parseAcceptLanguage('en;q=abc,es;q=0.1')).toBe('es');
  });
});
