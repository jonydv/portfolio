import { ImageResponse } from 'next/og';
import { MonogramMark } from '@/lib/og/monogram';

const APPLE_ICON_SIZE = 180;

export const size = { width: APPLE_ICON_SIZE, height: APPLE_ICON_SIZE };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(<MonogramMark size={APPLE_ICON_SIZE} />, size);
}
