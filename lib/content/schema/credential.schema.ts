import { z } from 'zod';
import { httpsUrl, iconName, isoMonth, kebabSlug, localized, text } from './primitives';

export const CREDENTIAL_KINDS = ['degree', 'certification', 'language'] as const;
export const credentialKind = z.enum(CREDENTIAL_KINDS);
export type CredentialKind = (typeof CREDENTIAL_KINDS)[number];

const academicYear = z.number().int().min(1980).max(2100);

export const credentialSchema = z
  .object({
    id: kebabSlug,
    kind: credentialKind,
    order: z.number().int().nonnegative(),
    icon: iconName,
    issuer: z.string().trim().min(1).max(80).nullable().default(null),
    title: localized(text(2, 160)),
    subtitle: localized(text(2, 200)).nullable().default(null),
    startYear: academicYear.nullable().default(null),
    endYear: academicYear.nullable().default(null),
    issuedAt: isoMonth.nullable().default(null),
    credentialUrl: httpsUrl.nullable().default(null),
  })
  .refine((entry) => entry.endYear === null || entry.startYear === null || entry.endYear >= entry.startYear, {
    message: 'endYear debe ser mayor o igual que startYear',
    path: ['endYear'],
  });

export const credentialsSchema = z.array(credentialSchema);

export type CredentialSource = z.infer<typeof credentialSchema>;
