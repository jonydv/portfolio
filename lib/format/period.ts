import type { Locale } from '@/lib/i18n/routing';

const MONTH_FORMAT: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };

export function formatIsoMonth(isoMonth: string, locale: Locale): string {
  const [year, month] = isoMonth.split('-').map(Number);
  if (!year || !month) return isoMonth;

  const formatted = new Intl.DateTimeFormat(locale, MONTH_FORMAT).format(new Date(year, month - 1));
  return formatted.replace(/\./g, '');
}

export function formatPeriod(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
): string {
  const startLabel = formatIsoMonth(start, locale);
  const endLabel = end === null ? presentLabel : formatIsoMonth(end, locale);
  return `${startLabel} — ${endLabel}`;
}

export function formatYearRange(startYear: number, endYear: number | null): string {
  if (endYear === null || endYear === startYear) return String(startYear);
  return `${startYear}—${endYear}`;
}
