import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { isLocale } from '@/lib/i18n/locale';
import { DEFAULT_LOCALE } from '@/lib/i18n/routing';
import { getProfile } from '@/lib/content/repository';
import { localeStaticParams } from '@/lib/api/static-params';
import { OG_IMAGE_SIZE } from '@/lib/seo/site';
import { OgTemplate } from '@/lib/og/template';

export const size = OG_IMAGE_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return localeStaticParams();
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const t = await getTranslations({ locale, namespace: 'meta' });
  const profile = getProfile(locale);

  return new ImageResponse(
    (
      <OgTemplate
        eyebrow={profile.location}
        title={profile.name}
        meta={t('home.title')}
      />
    ),
    size,
  );
}
