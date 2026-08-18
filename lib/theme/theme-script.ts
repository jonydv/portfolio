export const THEME_COOKIE_NAME = 'theme';
export const THEME_ATTRIBUTE = 'data-theme';
export const THEMES = ['light', 'dark'] as const;

export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME = 'dark';

export const THEME_INIT_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|; )theme=(light|dark)/);var t=m?m[1]:'${DEFAULT_THEME}';document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t;}catch(e){}})();`;
