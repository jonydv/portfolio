'use client';

import { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

const TAG_QUERY_PARAM = 'tag';
const CARD_SELECTOR = '[data-project-card]';
const COUNT_SELECTOR = '[data-visible-count]';
const EMPTY_SELECTOR = '[data-empty-state]';

function applyTagFilter(activeTag: string | null): number {
  const cards = document.querySelectorAll<HTMLElement>(CARD_SELECTOR);
  let visibleCount = 0;

  for (const card of cards) {
    const tags = (card.dataset.tags ?? '').split(' ');
    const isVisible = activeTag === null || tags.includes(activeTag);
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  }

  const emptyState = document.querySelector<HTMLElement>(EMPTY_SELECTOR);
  if (emptyState) emptyState.hidden = visibleCount > 0;

  const counter = document.querySelector<HTMLElement>(COUNT_SELECTOR);
  if (counter) counter.textContent = String(visibleCount);

  return visibleCount;
}

export function WorkFilters({ tags, allLabel }: { tags: string[]; allLabel: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tagFromUrl = searchParams.get(TAG_QUERY_PARAM);
  const activeTag = tagFromUrl && tags.includes(tagFromUrl) ? tagFromUrl : null;

  useEffect(() => {
    applyTagFilter(activeTag);
  }, [activeTag]);

  const selectTag = useCallback(
    (tag: string | null) => {
      applyTagFilter(tag);

      const params = new URLSearchParams(searchParams.toString());
      if (tag === null) params.delete(TAG_QUERY_PARAM);
      else params.set(TAG_QUERY_PARAM, tag);

      const query = params.toString();
      router.replace(query ? `?${query}` : '?', { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <div className="flex flex-wrap gap-2">
      <FilterButton isActive={activeTag === null} onSelect={() => selectTag(null)} label={allLabel} />
      {tags.map((tag) => (
        <FilterButton
          key={tag}
          isActive={activeTag === tag}
          onSelect={() => selectTag(tag)}
          label={tag}
        />
      ))}
    </div>
  );
}

function FilterButton({
  isActive,
  onSelect,
  label,
}: {
  isActive: boolean;
  onSelect: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={cn(
        'metaline rounded-full border px-3 py-1 transition-colors',
        isActive
          ? 'border-accent text-accent'
          : 'border-hairline text-ink-muted hover:border-ink-muted hover:text-ink',
      )}
    >
      {label}
    </button>
  );
}
