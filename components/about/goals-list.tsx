import type { Goal } from '@/lib/content/repository';
import type { IconName } from '@/lib/content/schema/primitives';
import { Icon } from '@/components/icons';

export function GoalsList({ goals }: { goals: Goal[] }) {
  return (
    <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
      {goals.map((goal, index) => (
        <li key={goal.id} className="border-t border-hairline pt-5">
          <div className="mb-4 flex items-center gap-3">
            <Icon name={goal.icon as IconName} className="size-4 text-accent" />
            <span className="metaline">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <p className="max-w-[var(--container-measure)] text-sm leading-relaxed text-ink-muted">
            {goal.text}
          </p>
        </li>
      ))}
    </ul>
  );
}
