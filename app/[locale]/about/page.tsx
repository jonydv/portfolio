import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getCredentials,
  getExperience,
  getGoals,
  getProfile,
  getSkillGroups,
} from '@/lib/content/repository';
import { isLocale } from '@/lib/i18n/locale';
import { SKILL_CATEGORIES } from '@/lib/content/schema/skill.schema';
import { Section, SectionHeader } from '@/components/ui/section';
import { ExperienceTimeline } from '@/components/about/experience-timeline';
import { CredentialList } from '@/components/about/credential-list';
import { GoalsList } from '@/components/about/goals-list';
import { SkillsMatrix } from '@/components/home/skills-matrix';
import { buildPageMetadata } from '@/lib/seo/page-metadata';

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'about');
}

export default async function AboutPage({ params }: PageProps<'/[locale]/about'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);

  const [tAbout, tSkills] = await Promise.all([
    getTranslations('about'),
    getTranslations('skills'),
  ]);

  const profile = getProfile(locale);
  const categoryLabels = Object.fromEntries(
    SKILL_CATEGORIES.map((category) => [category, tSkills(category)]),
  );

  return (
    <>
      <Section className="pb-0!">
        <p className="metaline">{profile.location}</p>
        <h1 className="mt-8 max-w-[18ch] text-headline">{profile.headline}</h1>
        <p className="mt-4 text-title text-ink-muted">{profile.focus}</p>
        <p className="mt-10 max-w-[var(--container-measure)] text-lede text-ink-muted">
          {profile.summary}
        </p>
        <p className="mt-6 max-w-[var(--container-measure)] text-lede text-ink-muted">
          {profile.bio}
        </p>
      </Section>

      <Section>
        <SectionHeader index={tAbout('experienceIndex')} title={tAbout('experienceTitle')} />
        <ExperienceTimeline
          entries={getExperience(locale)}
          locale={locale}
          presentLabel={tAbout('present')}
        />
      </Section>

      <Section>
        <SectionHeader index={tAbout('credentialsIndex')} title={tAbout('credentialsTitle')} />
        <CredentialList
          credentials={getCredentials(locale)}
          viewLabel={tAbout('viewCredential')}
        />
      </Section>

      <Section>
        <SectionHeader index={tAbout('skillsIndex')} title={tAbout('skillsTitle')} />
        <SkillsMatrix groups={getSkillGroups()} categoryLabels={categoryLabels} />
      </Section>

      <Section>
        <SectionHeader index={tAbout('goalsIndex')} title={tAbout('goalsTitle')} />
        <GoalsList goals={getGoals(locale)} />
      </Section>
    </>
  );
}
