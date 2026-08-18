import { isLocale } from '@/lib/i18n/locale';
import { getProjectBySlug } from '@/lib/content/repository';
import { fail, invalidLocale, ok } from '@/lib/api/response';
import { localeAndSlugStaticParams } from '@/lib/api/static-params';

const NOT_FOUND = 404;

export const dynamicParams = true;

export function generateStaticParams() {
  return localeAndSlugStaticParams();
}

export async function GET(
  _request: Request,
  { params }: RouteContext<'/api/[locale]/projects/[slug]'>,
) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return invalidLocale(locale);

  const project = getProjectBySlug(locale, slug);
  if (!project) return fail('NOT_FOUND', `No existe el proyecto "${slug}"`, NOT_FOUND);

  return ok(project, locale);
}
