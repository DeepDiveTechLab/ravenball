export const FRAME_COUNT = 141;
export const FRAME_WIDTH = 960;
export const FRAME_HEIGHT = 1198;

export function frameUrl(index: number) {
  const n = Math.min(Math.max(index, 1), FRAME_COUNT);
  return `/frames/frame-${String(n).padStart(4, "0")}.webp`;
}
