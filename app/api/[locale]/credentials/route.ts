import { isLocale } from '@/lib/i18n/locale';
import { getCredentials } from '@/lib/content/repository';
import { invalidLocale, ok } from '@/lib/api/response';
import { localeStaticParams } from '@/lib/api/static-params';

export const dynamicParams = true;

export function generateStaticParams() {
  return localeStaticParams();
}

export async function GET(_request: Request, { params }: RouteContext<'/api/[locale]/credentials'>) {
  const { locale } = await params;
  if (!isLocale(locale)) return invalidLocale(locale);

  return ok(getCredentials(locale), locale);
}
