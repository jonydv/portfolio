import { buildDiscoveryDocument } from '@/lib/api/discovery';
import { CACHE_HEADERS } from '@/lib/api/cache';

export const dynamic = 'force-static';

export function GET() {
  return Response.json(buildDiscoveryDocument(), {
    headers: CACHE_HEADERS.immutableUntilDeploy,
  });
}
