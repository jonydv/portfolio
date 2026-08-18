import type { Credential } from '@/lib/content/repository';
import type { IconName } from '@/lib/content/schema/primitives';
import { Icon } from '@/components/icons';

function formatCredentialDate(credential: Credential): string {
  if (credential.issuedAt) return credential.issuedAt.replace('-', '/');
  if (credential.startYear && credential.endYear) return `${credential.startYear}—${credential.endYear}`;
  if (credential.startYear) return String(credential.startYear);
  return '';
}

export function CredentialList({
  credentials,
  viewLabel,
}: {
  credentials: Credential[];
  viewLabel: string;
}) {
  return (
    <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
      {credentials.map((credential) => (
        <li key={credential.id} className="border-t border-hairline pt-5">
          <div className="flex items-start gap-3">
            <Icon name={credential.icon as IconName} className="mt-1 size-4 shrink-0 text-accent" />
            <div className="min-w-0">
              <p className="metaline">
                {credential.issuer ?? ''} {formatCredentialDate(credential)}
              </p>
              <h3 className="mt-2 text-ink">{credential.title}</h3>
              {credential.subtitle ? (
                <p className="mt-1 text-sm text-ink-muted">{credential.subtitle}</p>
              ) : null}
              {credential.credentialUrl ? (
                <a
                  href={credential.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="metaline mt-3 inline-block text-accent print:hidden"
                >
                  {viewLabel} ↗
                </a>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
