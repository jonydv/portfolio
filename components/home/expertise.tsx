import Image from 'next/image';
import type { Service } from '@/lib/content/repository';

const SERVICE_SIZES = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw';
const SERVICE_QUALITY = 70;

export function Expertise({ services, intro }: { services: Service[]; intro: string }) {
  return (
    <div>
      <p className="mb-14 max-w-[var(--container-measure)] text-lede text-ink-muted">{intro}</p>

      <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <li key={service.slug} className="border-t border-hairline pt-5">
            <div className="mb-5 size-12 opacity-80">
              <Image
                src={service.image.src}
                alt=""
                width={service.image.width}
                height={service.image.height}
                sizes={SERVICE_SIZES}
                quality={SERVICE_QUALITY}
                className="size-full object-contain"
              />
            </div>
            <p className="metaline mb-3">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="text-title text-ink">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
