import { describe, expect, it } from 'vitest';
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';

type MessageTree = { [key: string]: string | MessageTree };

const ICU_PLACEHOLDER = /\{(\w+)/g;

function collectKeys(tree: MessageTree, prefix = ''): string[] {
  return Object.entries(tree).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === 'string' ? [path] : collectKeys(value, path);
  });
}

function collectValues(tree: MessageTree, prefix = ''): Map<string, string> {
  const values = new Map<string, string>();

  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') values.set(path, value);
    else for (const [nested, nestedValue] of collectValues(value, path)) values.set(nested, nestedValue);
  }

  return values;
}

function placeholdersOf(message: string): Set<string> {
  return new Set([...message.matchAll(ICU_PLACEHOLDER)].map((match) => match[1] as string));
}

const esKeys = collectKeys(esMessages as MessageTree);
const enKeys = collectKeys(enMessages as MessageTree);
const esValues = collectValues(esMessages as MessageTree);
const enValues = collectValues(enMessages as MessageTree);

describe('paridad de mensajes', () => {
  it('los dos idiomas tienen exactamente las mismas claves', () => {
    expect(esKeys.sort()).toEqual(enKeys.sort());
  });

  it('ningun mensaje esta vacio', () => {
    for (const [key, value] of esValues) expect(value.trim().length, `es.${key}`).toBeGreaterThan(0);
    for (const [key, value] of enValues) expect(value.trim().length, `en.${key}`).toBeGreaterThan(0);
  });

  it('los placeholders ICU coinciden entre idiomas', () => {
    for (const [key, esValue] of esValues) {
      const enValue = enValues.get(key) ?? '';
      expect([...placeholdersOf(esValue)].sort(), key).toEqual([...placeholdersOf(enValue)].sort());
    }
  });
});
