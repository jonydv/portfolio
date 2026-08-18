import { isLocale } from '@/lib/i18n/locale';
import { getResume } from '@/lib/content/repository';
import { invalidLocale, ok } from '@/lib/api/response';
import { localeStaticParams } from '@/lib/api/static-params';

export const dynamicParams = true;

export function generateStaticParams() {
  return localeStaticParams();
}

export async function GET(_request: Request, { params }: RouteContext<'/api/[locale]/resume'>) {
  const { locale } = await params;
  if (!isLocale(locale)) return invalidLocale(locale);

  return ok(getResume(locale), locale);
}
