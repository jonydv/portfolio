import type { ReactNode } from 'react';

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="metaline inline-flex items-center rounded-full border border-hairline px-3 py-1 text-ink-muted">
      {children}
    </span>
  );
}

export function TagList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
