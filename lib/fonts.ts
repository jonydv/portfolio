import { Geist, Geist_Mono } from 'next/font/google';

export const displayFont = Geist({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-geist-display',
  display: 'swap',
  preload: true,
});

export const monoFont = Geist_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: false,
});

export const fontVariables = `${displayFont.variable} ${monoFont.variable}`;
