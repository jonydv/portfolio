import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

export function Rail({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('relative', className)}>{children}</div>;
}

export function RailTrack({ id, children }: { id: string; children: ReactNode }) {
  return (
    <ul
      id={id}
      className="grid snap-x snap-mandatory auto-cols-[clamp(15rem,26vw,24rem)] grid-flow-col gap-6 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ scrollPaddingInline: 'var(--spacing-gutter)' }}
    >
      {children}
    </ul>
  );
}

export function RailItem({ children }: { children: ReactNode }) {
  return <li className="snap-start">{children}</li>;
}
