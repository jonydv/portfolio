import { LOCALES, DEFAULT_LOCALE, type Locale } from './routing';

export function isLocale(candidate: string): candidate is Locale {
  return (LOCALES as readonly string[]).includes(candidate);
}

type LanguagePreference = {
  tag: string;
  quality: number;
};

function parsePreference(rawPreference: string): LanguagePreference | null {
  const [tag, ...parameters] = rawPreference.trim().split(';');
  if (!tag) return null;

  const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith('q='));
  const quality = qualityParameter ? Number.parseFloat(qualityParameter.split('=')[1] ?? '') : 1;

  return {
    tag: tag.trim().toLowerCase(),
    quality: Number.isFinite(quality) ? quality : 0,
  };
}

export function parseAcceptLanguage(headerValue: string | null): Locale {
  if (!headerValue) return DEFAULT_LOCALE;

  const preferences = headerValue
    .split(',')
    .map(parsePreference)
    .filter((preference): preference is LanguagePreference => preference !== null)
    .sort((left, right) => right.quality - left.quality);

  for (const preference of preferences) {
    const baseTag = preference.tag.split('-')[0] ?? '';
    if (isLocale(baseTag)) return baseTag;
  }

  return DEFAULT_LOCALE;
}
