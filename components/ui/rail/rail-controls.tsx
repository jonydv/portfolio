'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';

const SCROLL_STEP_RATIO = 0.8;
const BOUND_TOLERANCE = 4;

export function RailControls({
  trackId,
  previousLabel,
  nextLabel,
}: {
  trackId: string;
  previousLabel: string;
  nextLabel: string;
}) {
  const trackRef = useRef<HTMLElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncBounds = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    setAtStart(track.scrollLeft <= BOUND_TOLERANCE);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - BOUND_TOLERANCE);
  }, []);

  useEffect(() => {
    const track = document.getElementById(trackId);
    trackRef.current = track;
    if (!track) return;

    syncBounds();
    track.addEventListener('scroll', syncBounds, { passive: true });
    window.addEventListener('resize', syncBounds);

    return () => {
      track.removeEventListener('scroll', syncBounds);
      window.removeEventListener('resize', syncBounds);
    };
  }, [trackId, syncBounds]);

  const scrollByStep = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({ left: direction * track.clientWidth * SCROLL_STEP_RATIO, behavior: 'smooth' });
  };

  return (
    <div className="flex gap-2">
      <ControlButton
        label={previousLabel}
        glyph="←"
        disabled={atStart}
        onPress={() => scrollByStep(-1)}
      />
      <ControlButton label={nextLabel} glyph="→" disabled={atEnd} onPress={() => scrollByStep(1)} />
    </div>
  );
}

function ControlButton({
  label,
  glyph,
  disabled,
  onPress,
}: {
  label: string;
  glyph: string;
  disabled: boolean;
  onPress: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'grid size-9 place-items-center rounded-full border transition-colors',
        disabled
          ? 'border-hairline text-ink-faint'
          : 'border-hairline text-ink-muted hover:border-accent hover:text-accent',
      )}
    >
      <span aria-hidden>{glyph}</span>
    </button>
  );
}
