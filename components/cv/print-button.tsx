'use client';

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="metaline rounded-full border border-hairline px-4 py-2 text-ink-muted transition-colors hover:border-accent hover:text-accent"
    >
      {label}
    </button>
  );
}
