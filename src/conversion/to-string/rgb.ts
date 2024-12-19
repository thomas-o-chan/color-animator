import { RGBArray, RGBString } from '../../types.d.ts';

export function getRGBString(rgbArray: RGBArray): RGBString {
  return `rgb(${rgbArray.join(', ')})` as RGBString;
}
