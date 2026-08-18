import 'server-only';
import type { Locale } from '@/lib/i18n/routing';
import { getContentMeta } from '@/lib/content/repository';
import { CACHE_HEADERS } from './cache';
import type { ApiError, ApiErrorCode, ApiSuccess } from './contract';

const BAD_REQUEST = 400;

export function ok<Data>(data: Data, locale: Locale): Response {
  const { version, generatedAt } = getContentMeta();

  const body: ApiSuccess<Data> = {
    data,
    meta: {
      locale,
      version,
      generatedAt,
      ...(Array.isArray(data) ? { count: data.length } : {}),
    },
  };

  return Response.json(body, {
    headers: { ...CACHE_HEADERS.immutableUntilDeploy, ETag: `W/"${version}-${locale}"` },
  });
}

export function fail(
  code: ApiErrorCode,
  message: string,
  status: number,
  details?: unknown,
): Response {
  const { version, generatedAt } = getContentMeta();

  const body: ApiError = {
    error: { code, message, ...(details === undefined ? {} : { details }) },
    meta: { version, generatedAt },
  };

  return Response.json(body, { status, headers: CACHE_HEADERS.error });
}

export function invalidLocale(locale: string): Response {
  return fail('INVALID_LOCALE', `Locale desconocido "${locale}"`, BAD_REQUEST);
}
