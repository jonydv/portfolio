import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { Section } from '@/components/ui/section';

export default async function LocaleNotFound() {
  const t = await getTranslations('error');

  return (
    <Section>
      <p className="metaline mb-6">404</p>
      <h1 className="text-headline">
        {t('notFoundTitle')}
      </h1>
      <p className="mt-6 max-w-[var(--container-measure)] text-lede text-ink-muted">
        {t('notFoundDescription')}
      </p>
      <Link href="/" className="metaline mt-10 inline-block text-accent">
        {t('backHome')} ↗
      </Link>
    </Section>
  );
}
