import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAdjacentProjects, getProjectBySlug } from '@/lib/content/repository';
import { isLocale } from '@/lib/i18n/locale';
import { localeAndSlugStaticParams } from '@/lib/api/static-params';
import { Section } from '@/components/ui/section';
import { Link } from '@/lib/i18n/navigation';
import { CaseStudyHero } from '@/components/work/case-study/case-study-hero';
import { CaseStudyBody } from '@/components/work/case-study/case-study-body';
import { NextProject } from '@/components/work/case-study/next-project';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbJsonLd, creativeWorkJsonLd } from '@/lib/seo/jsonld';

export const dynamicParams = false;

export function generateStaticParams() {
  return localeAndSlugStaticParams();
}

export async function generateMetadata({ params }: PageProps<'/[locale]/work/[slug]'>) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const project = getProjectBySlug(locale, slug);
  if (!project) return {};

  return buildMetadata({
    locale,
    path: project.path,
    title: project.title,
    description: project.summary,
    hasOwnOpenGraphImage: true,
  });
}

export default async function CaseStudyPage({ params }: PageProps<'/[locale]/work/[slug]'>) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);

  const project = getProjectBySlug(locale, slug);
  if (!project) notFound();

  const t = await getTranslations('work');
  const { previous, next } = getAdjacentProjects(locale, slug);

  return (
    <Section>
      <JsonLd data={creativeWorkJsonLd(project, locale)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: 'Home', path: '' },
            { name: t('allProjects'), path: '/work' },
            { name: project.title, path: project.path },
          ],
          locale,
        )}
      />

      <Link href="/work" className="metaline mb-12 inline-block text-ink-muted hover:text-accent">
        ← {t('backToWork')}
      </Link>

      <CaseStudyHero
        project={project}
        labels={{ role: t('role'), year: t('year'), client: t('client') }}
      />

      <CaseStudyBody
        project={project}
        labels={{ stack: t('stack'), visitSite: t('visitSite'), viewCode: t('viewCode') }}
      />

      <NextProject
        previous={previous}
        next={next}
        labels={{ previous: t('previousProject'), next: t('nextProject') }}
      />
    </Section>
  );
}
