import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

const navigationState = vi.hoisted(() => ({
  searchParams: new URLSearchParams(),
  pathname: '/',
  listeners: new Set<() => void>(),
}));

export function setTestSearchParams(query: string) {
  navigationState.searchParams = new URLSearchParams(query);
}

afterEach(() => {
  cleanup();
  document.body.innerHTML = '';
  navigationState.searchParams = new URLSearchParams();
});

vi.mock('next/navigation', async () => {
  const { useSyncExternalStore } = await import('react');

  const subscribe = (onStoreChange: () => void) => {
    navigationState.listeners.add(onStoreChange);
    return () => navigationState.listeners.delete(onStoreChange);
  };

  const notify = () => {
    for (const listener of navigationState.listeners) listener();
  };

  const replace = (url: string) => {
    const [, query = ''] = url.split('?');
    navigationState.searchParams = new URLSearchParams(query);
    notify();
  };

  return {
    useRouter: () => ({ replace, push: replace, refresh: vi.fn() }),
    useSearchParams: () =>
      useSyncExternalStore(
        subscribe,
        () => navigationState.searchParams,
        () => navigationState.searchParams,
      ),
    useParams: () => ({ locale: 'es' }),
    usePathname: () => navigationState.pathname,
  };
});
