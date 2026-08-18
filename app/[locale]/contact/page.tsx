import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getProfile, getSocialLinks } from '@/lib/content/repository';
import { isLocale } from '@/lib/i18n/locale';
import { Section } from '@/components/ui/section';
import { ContactChannels } from '@/components/contact/contact-channels';
import { CopyEmail } from '@/components/contact/copy-email';
import { Icon } from '@/components/icons';
import { buildMailtoHref } from '@/lib/contact/mailto';
import { buildPageMetadata } from '@/lib/seo/page-metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'contact');
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);

  const t = await getTranslations('contact');
  const profile = getProfile(locale);

  const mailtoHref = buildMailtoHref({
    email: profile.email,
    subject: t('mailSubject'),
    body: t('mailBody'),
  });

  return (
    <Section>
      <header className="mb-16 border-t border-hairline pt-6">
        <p className="metaline">{t('index')}</p>
        <h1 className="mt-6 text-headline">{t('title')}</h1>
        <p className="mt-8 max-w-measure text-lede text-ink-muted">{t('intro')}</p>
      </header>

      <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <a
            href={mailtoHref}
            className="group inline-flex max-w-full items-center gap-4 border-b border-hairline pb-4 text-title text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <Icon name="mail" className="size-6 shrink-0" />
            <span className="truncate">{profile.email}</span>
            <span aria-hidden className="text-ink-faint transition-colors group-hover:text-accent">
              ↗
            </span>
          </a>

          <div className="mt-6">
            <CopyEmail
              email={profile.email}
              copyLabel={t('copyEmail')}
              copiedLabel={t('emailCopied')}
            />
          </div>

          <p className="mt-12 max-w-measure text-ink-muted">{t('responseTime')}</p>
        </div>

        <aside className="space-y-10">
          <ContactChannels links={getSocialLinks()} title={t('channels')} />
        </aside>
      </div>
    </Section>
  );
}
