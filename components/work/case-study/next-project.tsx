import { Link } from '@/lib/i18n/navigation';
import type { Project } from '@/lib/content/repository';

type NextProjectProps = {
  previous: Project | null;
  next: Project | null;
  labels: { previous: string; next: string };
};

export function NextProject({ previous, next, labels }: NextProjectProps) {
  return (
    <nav className="mt-24 grid gap-6 border-t border-hairline pt-8 sm:grid-cols-2">
      {previous ? (
        <Link href={previous.path} className="group">
          <p className="metaline">← {labels.previous}</p>
          <p className="mt-2 text-title text-ink transition-colors group-hover:text-accent">
            {previous.title}
          </p>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link href={next.path} className="group sm:text-right">
          <p className="metaline">{labels.next} →</p>
          <p className="mt-2 text-title text-ink transition-colors group-hover:text-accent">
            {next.title}
          </p>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
