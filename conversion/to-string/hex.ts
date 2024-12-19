import { RGBArray, HexString } from '../../types.d.ts';

export function getHexString(rgbArray: RGBArray): HexString {
  return `#${rgbArray
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('')}` as HexString;
}
