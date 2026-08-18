import type { Locale } from '@/lib/i18n/routing';

export type ApiMeta = {
  locale: Locale;
  version: string;
  generatedAt: string;
  count?: number;
};

export type ApiSuccess<Data> = {
  data: Data;
  meta: ApiMeta;
};

export const API_ERROR_CODES = [
  'NOT_FOUND',
  'INVALID_LOCALE',
  'INVALID_REQUEST',
  'METHOD_NOT_ALLOWED',
  'INTERNAL',
] as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[number];

export type ApiError = {
  error: {
    code: ApiErrorCode;
    message: string;
    details?: unknown;
  };
  meta: Pick<ApiMeta, 'version' | 'generatedAt'>;
};

export type ApiResponse<Data> = ApiSuccess<Data> | ApiError;
