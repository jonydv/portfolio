import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCredentials, getExperience, getProfile, getSkillGroups } from '@/lib/content/repository';
import { isLocale } from '@/lib/i18n/locale';
import { SKILL_CATEGORIES } from '@/lib/content/schema/skill.schema';
import { Section } from '@/components/ui/section';
import { ExperienceTimeline } from '@/components/about/experience-timeline';
import { CredentialList } from '@/components/about/credential-list';
import { PrintButton } from '@/components/cv/print-button';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import './print.css';

export async function generateMetadata({ params }: PageProps<'/[locale]/cv'>) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'cv');
}

export default async function CvPage({ params }: PageProps<'/[locale]/cv'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);

  const [tCv, tAbout, tSkills] = await Promise.all([
    getTranslations('cv'),
    getTranslations('about'),
    getTranslations('skills'),
  ]);

  const profile = getProfile(locale);
  const downloadLabel = profile.resume.isTranslated ? tCv('download') : tCv('downloadInEnglish');
  const categoryLabels = Object.fromEntries(
    SKILL_CATEGORIES.map((category) => [category, tSkills(category)]),
  );

  return (
    <Section>
      <header className="border-t border-hairline pt-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1 className="text-headline">{profile.name}</h1>
            <p className="mt-3 text-lede text-ink-muted">
              {profile.headline} · {profile.focus}
            </p>
            <p className="metaline mt-4">
              {profile.email} · {profile.location} · {profile.availability}
            </p>
          </div>

          <div className="flex flex-wrap gap-3" data-print-hidden>
            <a
              href={profile.resume.href}
              download
              className="metaline rounded-full bg-accent px-4 py-2 text-accent-ink transition-opacity hover:opacity-90"
            >
              {downloadLabel}
            </a>
            <PrintButton label={tCv('print')} />
          </div>
        </div>

        <p className="mt-8 max-w-[var(--container-measure)] text-sm leading-relaxed text-ink-muted">
          {profile.summary}
        </p>
      </header>

      <div className="mt-16">
        <h2 className="metaline mb-8">{tAbout('experienceTitle')}</h2>
        <ExperienceTimeline
          entries={getExperience(locale)}
          locale={locale}
          presentLabel={tAbout('present')}
        />
      </div>

      <div className="mt-16">
        <h2 className="metaline mb-8">{tAbout('skillsTitle')}</h2>
        <ul className="space-y-4">
          {getSkillGroups().map((group) => (
            <li key={group.category} data-print-entry>
              <p className="metaline">{categoryLabels[group.category]}</p>
              <p className="mt-2 text-sm text-ink-muted">
                {group.skills.map((skill) => skill.label).join(' · ')}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-16">
        <h2 className="metaline mb-8">{tAbout('credentialsTitle')}</h2>
        <CredentialList credentials={getCredentials(locale)} viewLabel={tAbout('viewCredential')} />
      </div>
    </Section>
  );
}
