import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const ONE_YEAR_IN_SECONDS = 31536000;

const LEGACY_REDIRECTS = [
  { source: '/works', destination: '/es/work' },
  { source: '/curriculum', destination: '/es/cv' },
  { source: '/es/works', destination: '/es/work' },
  { source: '/en/works', destination: '/en/work' },
  { source: '/es/curriculum', destination: '/es/cv' },
  { source: '/en/curriculum', destination: '/en/cv' },
  { source: '/assets/:path*', destination: '/:path*' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return LEGACY_REDIRECTS.map((redirect) => ({ ...redirect, permanent: true }));
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [96, 160, 256, 384],
    qualities: [70, 80],
    minimumCacheTTL: ONE_YEAR_IN_SECONDS,
  },
};

export default withNextIntl(nextConfig);
