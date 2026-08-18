import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getProjects } from '@/lib/content/repository';
import { isLocale } from '@/lib/i18n/locale';
import { Section } from '@/components/ui/section';
import { ProjectCard } from '@/components/work/project-card';
import { WorkFilters } from '@/components/work/work-filters';
import { buildPageMetadata } from '@/lib/seo/page-metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, projectListJsonLd } from '@/lib/seo/jsonld';

const PRIORITY_CARD_COUNT = 3;

export async function generateMetadata({ params }: PageProps<'/[locale]/work'>) {
  const { locale } = await params;
  return buildPageMetadata(locale, 'work');
}

export default async function WorkPage({ params }: PageProps<'/[locale]/work'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);

  const t = await getTranslations('work');
  const projects = getProjects(locale);
  const tags = [...new Set(projects.flatMap((project) => project.tags))].sort();

  return (
    <Section>
      <JsonLd data={projectListJsonLd(projects, locale)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: 'Home', path: '' },
            { name: t('allProjects'), path: '/work' },
          ],
          locale,
        )}
      />

      <header className="mb-14 border-t border-hairline pt-6">
        <p className="metaline">{t('index')}</p>
        <h1 className="mt-6 text-headline">{t('allProjects')}</h1>
        <p className="metaline mt-6">
          <span data-visible-count>{projects.length}</span> / {projects.length}
        </p>
      </header>

      <div className="mb-12">
        <Suspense fallback={null}>
          <WorkFilters tags={tags} allLabel={t('allProjects')} />
        </Suspense>
      </div>

      <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            priority={index < PRIORITY_CARD_COUNT}
          />
        ))}
      </div>

      <p data-empty-state hidden className="metaline mt-12">
        {t('empty')}
      </p>
    </Section>
  );
}
