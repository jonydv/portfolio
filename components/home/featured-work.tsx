import type { Project } from '@/lib/content/repository';
import { Link } from '@/lib/i18n/navigation';
import { Rail, RailControls, RailItem, RailTrack } from '@/components/ui/rail';
import { ProjectCard } from '@/components/work/project-card';

const FEATURED_TRACK_ID = 'featured-work-track';

type FeaturedWorkProps = {
  projects: Project[];
  labels: { viewAll: string; previous: string; next: string };
};

export function FeaturedWork({ projects, labels }: FeaturedWorkProps) {
  return (
    <Rail>
      <div className="mb-8 flex items-center justify-between">
        <Link href="/work" className="metaline text-ink-muted transition-colors hover:text-accent">
          {labels.viewAll} →
        </Link>
        <RailControls
          trackId={FEATURED_TRACK_ID}
          previousLabel={labels.previous}
          nextLabel={labels.next}
        />
      </div>

      <RailTrack id={FEATURED_TRACK_ID}>
        {projects.map((project, index) => (
          <RailItem key={project.slug}>
            <ProjectCard project={project} index={index} />
          </RailItem>
        ))}
      </RailTrack>
    </Rail>
  );
}
