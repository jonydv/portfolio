'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const REVEAL_ATTRIBUTE = 'data-revealed';
const INTERSECTION_THRESHOLD = 0.15;

let sharedObserver: IntersectionObserver | null = null;

function supportsScrollDrivenAnimations(): boolean {
  return typeof CSS !== 'undefined' && CSS.supports('animation-timeline: view()');
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getSharedObserver(): IntersectionObserver {
  sharedObserver ??= new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute(REVEAL_ATTRIBUTE, 'true');
        observer.unobserve(entry.target);
      }
    },
    { threshold: INTERSECTION_THRESHOLD },
  );

  return sharedObserver;
}

export function Reveal({ children }: { children: ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    if (supportsScrollDrivenAnimations() || prefersReducedMotion()) return;

    element.setAttribute(REVEAL_ATTRIBUTE, 'false');
    const observer = getSharedObserver();
    observer.observe(element);

    return () => observer.unobserve(element);
  }, []);

  return (
    <div ref={elementRef} className="reveal">
      {children}
    </div>
  );
}
