import type { SocialLink } from '@/lib/content/repository';
import type { IconName } from '@/lib/content/schema/primitives';
import { Icon } from '@/components/icons';

export function ContactChannels({ links, title }: { links: SocialLink[]; title: string }) {
  return (
    <div>
      <p className="metaline mb-6">{title}</p>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-ink transition-colors hover:text-accent"
            >
              <Icon name={link.icon as IconName} className="size-4" />
              <span>{link.label}</span>
              <span aria-hidden className="text-ink-faint group-hover:text-accent">
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
