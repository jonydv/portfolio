import type { Experience } from '@/lib/content/repository';
import type { Locale } from '@/lib/i18n/routing';
import { formatPeriod } from '@/lib/format/period';

type ExperienceTimelineProps = {
  entries: Experience[];
  locale: Locale;
  presentLabel: string;
};

export function ExperienceTimeline({ entries, locale, presentLabel }: ExperienceTimelineProps) {
  return (
    <ol className="space-y-16">
      {entries.map((entry, index) => (
        <li
          key={entry.id}
          className="grid gap-6 border-t border-hairline pt-6 lg:grid-cols-[14rem_minmax(0,1fr)]"
        >
          <div>
            <p className="metaline">{String(index + 1).padStart(2, '0')}</p>
            <p className="metaline mt-2 text-ink">
              {formatPeriod(entry.start, entry.end, locale, presentLabel)}
            </p>
            {entry.location ? <p className="metaline mt-2">{entry.location}</p> : null}
          </div>

          <div>
            <h3 className="text-title text-ink">{entry.company}</h3>
            <p className="mt-1 text-ink-muted">{entry.role}</p>

            <ul className="mt-6 space-y-3">
              {entry.highlights.map((highlight) => (
                <li
                  key={highlight.slice(0, 40)}
                  className="max-w-[var(--container-measure)] text-sm leading-relaxed text-ink-muted before:mr-3 before:text-accent before:content-['—']"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
