import 'server-only';

const ONE_YEAR_IN_SECONDS = 31536000;
const ERROR_CACHE_SECONDS = 60;

export const CACHE_HEADERS = {
  immutableUntilDeploy: {
    'Cache-Control': 'public, max-age=0, must-revalidate',
    'CDN-Cache-Control': `public, s-maxage=${ONE_YEAR_IN_SECONDS}`,
    'Vercel-CDN-Cache-Control': `public, s-maxage=${ONE_YEAR_IN_SECONDS}`,
  },
  error: {
    'Cache-Control': `public, max-age=0, s-maxage=${ERROR_CACHE_SECONDS}`,
  },
} as const;
