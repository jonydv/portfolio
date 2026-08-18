import Image from 'next/image';
import type { Profile } from '@/lib/content/repository';
import { Link } from '@/lib/i18n/navigation';

const PORTRAIT_MAX_WIDTH_PX = 384;
const PORTRAIT_SIZES = `(min-width: 640px) ${PORTRAIT_MAX_WIDTH_PX}px, 60vw`;
const PORTRAIT_QUALITY = 80;

export function Hero({ profile, ctaLabel }: { profile: Profile; ctaLabel: string }) {
  return (
    <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div>
        <p className="metaline">
          {profile.greeting} <span className="text-ink">{profile.name}</span>
        </p>

        <h1 className="mt-6 text-display text-balance">{profile.headline}</h1>

        <p className="mt-6 flex items-baseline gap-3 text-title text-ink-muted">
          <span aria-hidden className="text-accent">
            /
          </span>
          {profile.focus}
        </p>

        <p className="metaline mt-6">{profile.specialties.join(' · ')}</p>

        <p className="mt-10 max-w-[var(--container-measure)] text-lede text-ink-muted">
          {profile.summary}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link
            href="/work"
            className="metaline rounded-full bg-accent px-6 py-3 text-accent-ink transition-opacity hover:opacity-90"
          >
            {ctaLabel} →
          </Link>
          <span className="metaline flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent" aria-hidden />
            {profile.availability}
          </span>
          <span className="metaline">{profile.location}</span>
        </div>
      </div>

      <div className="max-w-sm lg:justify-self-end">
        <Image
          src={profile.image.src}
          alt={profile.image.alt}
          width={profile.image.width}
          height={profile.image.height}
          sizes={PORTRAIT_SIZES}
          quality={PORTRAIT_QUALITY}
          priority
          placeholder={profile.image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={profile.image.blurDataURL}
          className="w-full rounded-sm border border-hairline object-cover"
        />
      </div>
    </div>
  );
}
