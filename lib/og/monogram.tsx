const ACCENT = '#ff6b4a';
const ACCENT_INK = '#12100e';

export const MONOGRAM_TEXT = 'JDV';

export function MonogramMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ACCENT,
        color: ACCENT_INK,
        fontSize: size * 0.36,
        fontWeight: 700,
        letterSpacing: size * -0.012,
        borderRadius: size * 0.17,
      }}
    >
      {MONOGRAM_TEXT}
    </div>
  );
}
