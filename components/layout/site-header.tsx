import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { NAV_ITEMS } from '@/lib/i18n/nav-items';
import { getProfile } from '@/lib/content/repository';
import { isLocale } from '@/lib/i18n/locale';
import { DEFAULT_LOCALE } from '@/lib/i18n/routing';
import { LocaleSwitcher } from './locale-switcher';
import { MobileNav } from './mobile-nav';
import { ThemeToggle } from './theme-toggle';
import { Wordmark } from './wordmark';

export async function SiteHeader() {
  const t = await getTranslations('nav');
  const rawLocale = await getLocale();
  const profile = getProfile(isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE);
  const labels = Object.fromEntries(NAV_ITEMS.map((item) => [item.key, t(item.key)]));

  return (
    <header
      data-site-header
      className="sticky top-0 z-40 border-b border-hairline bg-canvas/85 backdrop-blur print:hidden"
    >
      <div className="mx-auto flex h-16 w-full max-w-[var(--container-page)] items-center justify-between px-[var(--spacing-gutter)]">
        <Wordmark label={`${profile.name} — ${t('home')}`} />

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="metaline text-ink-muted transition-colors hover:text-accent"
                >
                  {labels[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <ThemeToggle label={t('toggleTheme')} />
          <MobileNav
            labels={labels}
            menuLabel={t('menu')}
            openLabel={t('openMenu')}
            closeLabel={t('closeMenu')}
          />
        </div>
      </div>
    </header>
  );
}
