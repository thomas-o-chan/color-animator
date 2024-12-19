import { RGBArray, RGBString } from '../../types.d.ts';

export function getRGBArray(rgb: RGBString): RGBArray {
  const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
  const result = rgb.match(rgbRegex);
  return result!.slice(1).map(Number) as RGBArray;
}
