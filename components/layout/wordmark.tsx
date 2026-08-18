import { Link } from '@/lib/i18n/navigation';

const MONOGRAM = 'JDV';

export function Wordmark({ label }: { label: string }) {
  return (
    <Link
      href="/"
      aria-label={label}
      className="group flex items-center gap-2 text-ink transition-colors hover:text-accent"
    >
      <span className="grid size-8 place-items-center rounded-sm bg-ink text-[0.7rem] font-bold leading-none tracking-tight text-canvas transition-colors group-hover:bg-accent group-hover:text-accent-ink">
        {MONOGRAM}
      </span>
      <span aria-hidden className="hidden text-base font-semibold tracking-[-0.03em] sm:inline">
        Villalba
      </span>
    </Link>
  );
}
