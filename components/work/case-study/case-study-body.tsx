import Image from 'next/image';
import type { Project } from '@/lib/content/repository';
import { TagList } from '@/components/ui/tag';
import { ExternalLink } from '@/components/ui/external-link';

const INLINE_SIZES = '(min-width: 768px) 40vw, 70vw';
const INLINE_QUALITY = 70;

type CaseStudyBodyProps = {
  project: Project;
  labels: { stack: string; visitSite: string; viewCode: string };
};

export function CaseStudyBody({ project, labels }: CaseStudyBodyProps) {
  return (
    <div className="mt-20 grid gap-16 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="max-w-[var(--container-measure)] space-y-6">
        {project.body.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="text-lede text-ink-muted">
            {paragraph}
          </p>
        ))}
      </div>

      <aside className="space-y-10">
        <div>
          <p className="metaline mb-4">{labels.stack}</p>
          <TagList items={project.stack} />
        </div>

        {project.url ? (
          <div>
            <ExternalLink href={project.url}>{labels.visitSite}</ExternalLink>
          </div>
        ) : null}

        {project.repoUrl ? (
          <div>
            <ExternalLink href={project.repoUrl}>{labels.viewCode}</ExternalLink>
          </div>
        ) : null}

        {project.media.kind === 'screenshots' ? (
          <Image
            src={project.media.mobile.src}
            alt={project.media.mobile.alt}
            width={project.media.mobile.width}
            height={project.media.mobile.height}
            sizes={INLINE_SIZES}
            quality={INLINE_QUALITY}
            placeholder={project.media.mobile.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={project.media.mobile.blurDataURL}
            className="w-full rounded-sm border border-hairline"
          />
        ) : null}
      </aside>
    </div>
  );
}
