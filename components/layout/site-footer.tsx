import { getTranslations } from 'next-intl/server';
import { getSocialLinks } from '@/lib/content/repository';
import { Icon } from '@/components/icons';
import type { IconName } from '@/lib/content/schema/primitives';

export async function SiteFooter() {
  const t = await getTranslations('footer');
  const links = getSocialLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline px-[var(--spacing-gutter)] py-12 print:hidden">
      <div className="mx-auto flex w-full max-w-[var(--container-page)] flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="metaline">
          © {year} Jonatan David Villalba. {t('copyright')}
        </p>

        <ul className="flex items-center gap-5">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-ink-muted transition-colors hover:text-accent"
              >
                <Icon name={link.icon as IconName} className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
