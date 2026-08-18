import Image from 'next/image';
import type { SkillGroup } from '@/lib/content/repository';

const SKILL_ICON_SIZE = 20;

export function SkillsMatrix({
  groups,
  categoryLabels,
}: {
  groups: SkillGroup[];
  categoryLabels: Record<string, string>;
}) {
  return (
    <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <li key={group.category} className="border-t border-hairline pt-5">
          <p className="metaline mb-5">{categoryLabels[group.category]}</p>
          <ul className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <li
                key={skill.id}
                className="flex items-center gap-2 rounded-full border border-hairline px-3 py-1.5"
              >
                {skill.icon ? (
                  <Image
                    src={skill.icon}
                    alt=""
                    width={SKILL_ICON_SIZE}
                    height={SKILL_ICON_SIZE}
                    unoptimized
                    className="size-4 object-contain"
                  />
                ) : null}
                <span className="font-mono text-xs text-ink-muted">{skill.label}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
