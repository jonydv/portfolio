import { z } from 'zod';
import { LOCALES, type Locale } from '@/lib/i18n/routing';

export type Localized<T> = Record<Locale, T>;

export const OG_DESCRIPTION_MAX_LENGTH = 200;
export const SUMMARY_MIN_LENGTH = 40;
export const DEFAULT_GRADIENT_ANGLE = 135;

const LATIN1_DECODED_AS_UTF8 = /[ÃÂ]\s*[-¿]|â€/;
const MOJIBAKE_MESSAGE = 'Mojibake detectado. Re-extraer el contenido con encoding utf8.';

export const rejectsMojibake = (value: string) => !LATIN1_DECODED_AS_UTF8.test(value);

export const localized = <Schema extends z.ZodTypeAny>(inner: Schema) =>
  z.object({ es: inner, en: inner });

export const text = (min = 1, max = 4000) =>
  z.string().trim().min(min).max(max).refine(rejectsMojibake, { message: MOJIBAKE_MESSAGE });

export const kebabSlug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Se requiere kebab-case');

export const publicAssetPath = z
  .string()
  .regex(/^\/[\w\-./]+\.(webp|avif|png|jpg|jpeg|svg|pdf)$/i, 'Ruta publica invalida');

export const httpsUrl = z.url().startsWith('https://');

export const contactUrl = z.union([httpsUrl, z.string().startsWith('mailto:')]);

export const isoMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Se requiere formato YYYY-MM');

export const hexColor = z.string().regex(/^#[0-9a-f]{6}$/i, 'Se requiere color hexadecimal');

export const calendarYear = z.number().int().min(2015).max(2100);

export const localeCode = z.enum(LOCALES);

export const ICON_NAMES = [
  'code',
  'university',
  'robot',
  'flag',
  'layers',
  'package',
  'rocket',
  'users',
  'sparkles',
  'shield',
  'database',
  'store',
  'lightbulb',
  'github',
  'linkedin',
  'mail',
  'arrow-up-right',
  'chevron-left',
  'chevron-right',
  'download',
  'printer',
  'menu',
  'close',
  'sun',
  'moon',
  'copy',
  'check',
] as const;

export const iconName = z.enum(ICON_NAMES);
export type IconName = (typeof ICON_NAMES)[number];

export const COUNTRY_CODES = ['AR', 'CL', 'PE', 'EC', 'MX', 'ES', 'US', 'XX'] as const;
export const countryCode = z.enum(COUNTRY_CODES);
export type CountryCode = (typeof COUNTRY_CODES)[number];

export const summaryText = () => localized(text(SUMMARY_MIN_LENGTH, OG_DESCRIPTION_MAX_LENGTH));
export const bodyParagraphs = () => localized(z.array(text(20, 2000)).min(1).max(12));
export const roleText = () => localized(text(3, 140));
export const skillIdRefs = () => z.array(kebabSlug).min(1).max(12);
