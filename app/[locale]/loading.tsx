export default function Loading() {
  return (
    <div className="px-[var(--spacing-gutter)] py-[var(--spacing-section)]">
      <div className="mx-auto w-full max-w-[var(--container-page)] space-y-6">
        <div className="h-3 w-24 animate-pulse rounded bg-elevated" />
        <div className="h-24 w-3/4 animate-pulse rounded bg-elevated" />
        <div className="h-3 w-full max-w-xl animate-pulse rounded bg-elevated" />
      </div>
    </div>
  );
}
