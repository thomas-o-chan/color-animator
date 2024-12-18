import { RGBArray } from "../types.d.ts";

export function getRGBArray(hex: string): RGBArray {
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }

  if (hex.length !== 6) {
    throw new Error('Invalid hex color');
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b] as RGBArray;
}
