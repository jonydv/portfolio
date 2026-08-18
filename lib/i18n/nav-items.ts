export const NAV_ITEMS = [
  { key: 'work', href: '/work' },
  { key: 'about', href: '/about' },
  { key: 'cv', href: '/cv' },
  { key: 'contact', href: '/contact' },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
