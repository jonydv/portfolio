import Image from 'next/image';
import type { Project } from '@/lib/content/repository';
import { formatYearRange } from '@/lib/format/period';
import { ProjectCardGenerative } from '../project-card-generative';

const HERO_SIZES = '(min-width: 1024px) min(1100px, 92vw), 100vw';
const HERO_QUALITY = 80;

type CaseStudyHeroProps = {
  project: Project;
  labels: { role: string; year: string; client: string };
};

export function CaseStudyHero({ project, labels }: CaseStudyHeroProps) {
  return (
    <div>
      <h1 className="max-w-[14ch] text-display">{project.title}</h1>

      <dl className="mt-10 grid gap-6 border-t border-hairline pt-6 sm:grid-cols-3">
        <MetaField label={labels.role} value={project.role} />
        <MetaField label={labels.year} value={formatYearRange(project.startYear, project.endYear)} />
        <MetaField label={labels.client} value={project.client ?? '—'} />
      </dl>

      <div className="mt-12">
        {project.media.kind === 'screenshots' ? (
          <Image
            src={project.media.desktop.src}
            alt={project.media.desktop.alt}
            width={project.media.desktop.width}
            height={project.media.desktop.height}
            sizes={HERO_SIZES}
            quality={HERO_QUALITY}
            priority
            placeholder={project.media.desktop.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={project.media.desktop.blurDataURL}
            className="w-full rounded-sm border border-hairline"
          />
        ) : (
          <ProjectCardGenerative media={project.media} title={project.title} />
        )}
      </div>
    </div>
  );
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="metaline">{label}</dt>
      <dd className="mt-2 text-ink">{value}</dd>
    </div>
  );
}
