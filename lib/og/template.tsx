import { OG_IMAGE_SIZE } from '@/lib/seo/site';

const CANVAS_BACKGROUND = '#0b0b0c';
const INK = '#f5f3f0';
const INK_MUTED = '#8f8a85';
const ACCENT = '#ff6b4a';

export function OgTemplate({
  title,
  meta,
  eyebrow,
}: {
  title: string;
  meta: string;
  eyebrow: string;
}) {
  return (
    <div
      style={{
        width: OG_IMAGE_SIZE.width,
        height: OG_IMAGE_SIZE.height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: CANVAS_BACKGROUND,
        padding: '72px 80px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: INK_MUTED, fontSize: 24, letterSpacing: 6, textTransform: 'uppercase' }}>
          {eyebrow}
        </span>
        <span style={{ color: ACCENT, fontSize: 24, letterSpacing: 6 }}>JDV</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: 96, height: 4, backgroundColor: ACCENT, marginBottom: 32 }} />
        <span
          style={{
            color: INK,
            fontSize: title.length > 40 ? 68 : 88,
            lineHeight: 1.02,
            letterSpacing: -2,
          }}
        >
          {title}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: INK_MUTED, fontSize: 26 }}>{meta}</span>
        <span style={{ color: INK_MUTED, fontSize: 26 }}>jonatandvillalbaweb.com.ar</span>
      </div>
    </div>
  );
}
