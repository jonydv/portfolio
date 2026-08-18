import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Section } from '@/components/ui/section';
import { TagList } from '@/components/ui/tag';
import { ExternalLink } from '@/components/ui/external-link';
import { ThemeToggle } from '@/components/layout/theme-toggle';

export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
};

const TOKEN_SWATCHES = [
  'canvas',
  'surface',
  'elevated',
  'ink',
  'ink-muted',
  'ink-faint',
  'hairline',
  'accent',
] as const;

const TYPE_SPECIMENS = [
  { token: 'display', sample: 'Frontend Architect' },
  { token: 'headline', sample: 'Selected work' },
  { token: 'title', sample: 'SAP Composable Storefront' },
  { token: 'lede', sample: 'Arquitecturas de e-commerce enterprise con Angular y Next.js.' },
] as const;

export default async function StyleguidePage({ params }: PageProps<'/[locale]/styleguide'>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Section>
      <div className="mb-16 flex items-center justify-between">
        <p className="metaline">Styleguide — {locale}</p>
        <ThemeToggle label="Cambiar tema" />
      </div>

      <div className="mb-20 grid gap-3 sm:grid-cols-4">
        {TOKEN_SWATCHES.map((token) => (
          <div key={token} className="rounded-lg border border-hairline p-3">
            <div
              className="mb-3 h-16 w-full rounded border border-hairline"
              style={{ backgroundColor: `var(--color-${token})` }}
            />
            <p className="metaline">{token}</p>
          </div>
        ))}
      </div>

      <div className="mb-20 space-y-10">
        {TYPE_SPECIMENS.map((specimen) => (
          <div key={specimen.token}>
            <p className="metaline mb-3">{specimen.token}</p>
            <p
              style={{
                fontSize: `var(--text-${specimen.token})`,
                lineHeight: `var(--text-${specimen.token}--line-height, 1.2)`,
                letterSpacing: `var(--text-${specimen.token}--letter-spacing, normal)`,
              }}
            >
              {specimen.sample}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-20">
        <p className="metaline mb-4">tags</p>
        <TagList items={['Angular', 'Next.js', 'SAP Spartacus', 'TypeScript', 'NgRx']} />
      </div>

      <div>
        <p className="metaline mb-4">external link</p>
        <ExternalLink href="https://www.jonatandvillalbaweb.com.ar">jonatandvillalbaweb.com.ar</ExternalLink>
      </div>
    </Section>
  );
}
