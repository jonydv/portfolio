import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getFeaturedProjects,
  getProfile,
  getServices,
  getSkillGroups,
} from '@/lib/content/repository';
import { isLocale } from '@/lib/i18n/locale';
import { SKILL_CATEGORIES } from '@/lib/content/schema/skill.schema';
import { Section, SectionHeader } from '@/components/ui/section';
import { Hero } from '@/components/home/hero';
import { FeaturedWork } from '@/components/home/featured-work';
import { Expertise } from '@/components/home/expertise';
import { SkillsMatrix } from '@/components/home/skills-matrix';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { personJsonLd, websiteJsonLd } from '@/lib/seo/jsonld';
import { getCredentials, getExperience, getSocialLinks } from '@/lib/content/repository';

export async function generateMetadata({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'home');
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);

  const [tHome, tWork, tSkills] = await Promise.all([
    getTranslations('home'),
    getTranslations('work'),
    getTranslations('skills'),
  ]);

  const profile = getProfile(locale);
  const featured = getFeaturedProjects(locale);
  const services = getServices(locale);
  const skillGroups = getSkillGroups();

  const categoryLabels = Object.fromEntries(
    SKILL_CATEGORIES.map((category) => [category, tSkills(category)]),
  );

  const socialUrls = getSocialLinks().map((link) => link.url);

  return (
    <>
      <JsonLd
        data={personJsonLd(
          profile,
          getExperience(locale),
          getCredentials(locale),
          socialUrls,
          locale,
        )}
      />
      <JsonLd data={websiteJsonLd(locale)} />

      <Section className="pb-0!">
        <Hero profile={profile} ctaLabel={tHome('viewAllWork')} />
      </Section>

      <Section>
        <SectionHeader index={tHome('featuredIndex')} title={tHome('featuredTitle')} />
        <FeaturedWork
          projects={featured}
          labels={{
            viewAll: tHome('viewAllWork'),
            previous: tWork('previousProject'),
            next: tWork('nextProject'),
          }}
        />
      </Section>

      <Section>
        <SectionHeader index={tHome('expertiseIndex')} title={tHome('expertiseTitle')} />
        <Expertise services={services} intro={profile.expertiseIntro} />
      </Section>

      <Section>
        <SectionHeader index={tHome('skillsIndex')} title={tHome('skillsTitle')} />
        <SkillsMatrix groups={skillGroups} categoryLabels={categoryLabels} />
      </Section>
    </>
  );
}
