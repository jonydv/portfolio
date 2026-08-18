import Image from 'next/image';
import type { ImageAsset } from '@/lib/content/schema/media.schema';

const CARD_SIZES = '(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw';
const CARD_QUALITY = 70;

export function ProjectCardScreenshot({
  image,
  priority,
}: {
  image: ImageAsset;
  priority: boolean;
}) {
  return (
    <div className="aspect-[16/10] w-full overflow-hidden rounded-sm bg-elevated">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={CARD_SIZES}
        quality={CARD_QUALITY}
        priority={priority}
        placeholder={image.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={image.blurDataURL}
        className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
      />
    </div>
  );
}
