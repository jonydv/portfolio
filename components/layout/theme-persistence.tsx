'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { restoreThemeFromCookie } from '@/lib/theme/apply-theme';

export function ThemePersistence() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    restoreThemeFromCookie();
  }, [pathname]);

  return null;
}
