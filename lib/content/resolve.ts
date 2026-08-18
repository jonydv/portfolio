import 'server-only';
import type { Locale } from '@/lib/i18n/routing';
import type { ImageAsset, Localized } from './schema';
import { getSource } from './source';
import { MissingMediaError } from './errors';

export function pick<Value>(localizedValue: Localized<Value>, locale: Locale): Value {
  return localizedValue[locale];
}

export function pickNullable<Value>(
  localizedValue: Localized<Value> | null,
  locale: Locale,
): Value | null {
  return localizedValue === null ? null : localizedValue[locale];
}

export function hydrateImage(assetPath: string, alt: string): ImageAsset {
  const entry = getSource().media[assetPath];

  if (!entry) {
    throw new MissingMediaError(assetPath);
  }

  const asset: ImageAsset = {
    src: assetPath,
    width: entry.width,
    height: entry.height,
    alt,
  };

  return entry.blurDataURL ? { ...asset, blurDataURL: entry.blurDataURL } : asset;
}
