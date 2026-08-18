import { ImageResponse } from 'next/og';
import { isLocale } from '@/lib/i18n/locale';
import { DEFAULT_LOCALE } from '@/lib/i18n/routing';
import { getProjectBySlug } from '@/lib/content/repository';
import { localeAndSlugStaticParams } from '@/lib/api/static-params';
import { OG_IMAGE_SIZE } from '@/lib/seo/site';
import { OgTemplate } from '@/lib/og/template';
import { formatYearRange } from '@/lib/format/period';

export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return localeAndSlugStaticParams();
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const project = getProjectBySlug(locale, slug);

  if (!project) {
    return new ImageResponse(<OgTemplate eyebrow="Work" title="Not found" meta="" />, size);
  }

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={`${project.country} · ${formatYearRange(project.startYear, project.endYear)}`}
        title={project.title}
        meta={project.stack.slice(0, 4).join(' · ')}
      />
    ),
    size,
  );
}
