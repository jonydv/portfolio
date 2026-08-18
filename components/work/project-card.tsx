import { Link } from '@/lib/i18n/navigation';
import type { Project } from '@/lib/content/repository';
import { formatYearRange } from '@/lib/format/period';
import { ProjectCardScreenshot } from './project-card-screenshot';
import { ProjectCardGenerative } from './project-card-generative';

export function ProjectCard({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index: number;
  priority?: boolean;
}) {
  const orderLabel = String(index + 1).padStart(2, '0');

  return (
    <article data-project-card data-tags={project.tags.join(' ')} className="group">
      <Link href={project.path} className="block">
        {project.media.kind === 'screenshots' ? (
          <ProjectCardScreenshot image={project.media.desktop} priority={priority} />
        ) : (
          <ProjectCardGenerative media={project.media} title={project.title} />
        )}

        <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-hairline pt-3">
          <h3 className="text-title text-ink transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <span className="metaline shrink-0">
            {orderLabel} · {formatYearRange(project.startYear, project.endYear)}
          </span>
        </div>

        <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-ink-muted">{project.summary}</p>
        <p className="metaline mt-3">{project.stack.slice(0, 4).join(' · ')}</p>
      </Link>
    </article>
  );
}
