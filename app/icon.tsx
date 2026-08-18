import { ImageResponse } from 'next/og';
import { MonogramMark } from '@/lib/og/monogram';

const ICON_SIZE = 64;

export const size = { width: ICON_SIZE, height: ICON_SIZE };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(<MonogramMark size={ICON_SIZE} />, size);
}
