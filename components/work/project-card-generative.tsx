import type { ProjectMedia } from '@/lib/content/repository';

type GenerativeMedia = Extract<ProjectMedia, { kind: 'generated' }>;

export function ProjectCardGenerative({ media, title }: { media: GenerativeMedia; title: string }) {
  return (
    <div
      role="img"
      aria-label={title}
      className="grid aspect-[16/10] w-full place-items-center overflow-hidden rounded-sm"
      style={{
        backgroundImage: `linear-gradient(${media.gradientAngle}deg, ${media.gradientFrom}, ${media.gradientTo})`,
      }}
    >
      <span
        aria-hidden
        className="font-mono text-6xl font-medium tracking-tight text-black/70 mix-blend-overlay sm:text-7xl"
      >
        {media.monogram}
      </span>
    </div>
  );
}
