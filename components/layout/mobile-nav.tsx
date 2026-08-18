'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { NAV_ITEMS } from '@/lib/i18n/nav-items';
import { Icon } from '@/components/icons';
import { cn } from '@/lib/utils/cn';

type MobileNavProps = {
  labels: Record<string, string>;
  menuLabel: string;
  openLabel: string;
  closeLabel: string;
};

const PANEL_ID = 'mobile-nav-panel';

export function MobileNav({ labels, menuLabel, openLabel, closeLabel }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector('a')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      trigger?.focus();
    };
  }, [isOpen]);

  const panel = (
    <div
      id={PANEL_ID}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={menuLabel}
      className="fixed inset-0 z-50 flex flex-col bg-canvas px-gutter pt-24 md:hidden"
    >
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        aria-label={closeLabel}
        className="absolute right-gutter top-5 grid size-9 place-items-center rounded-full border border-hairline text-ink transition-colors hover:border-accent hover:text-accent"
      >
        <Icon name="close" className="size-5" />
      </button>

      <nav>
        <ul className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block border-b border-hairline py-4 text-title',
                  pathname === item.href ? 'text-accent' : 'text-ink',
                )}
              >
                {labels[item.key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        aria-label={openLabel}
        className="grid size-9 place-items-center rounded-full border border-hairline text-ink transition-colors hover:border-accent hover:text-accent"
      >
        <Icon name="menu" className="size-5" />
      </button>

      {isOpen ? createPortal(panel, document.body) : null}
    </div>
  );
}
